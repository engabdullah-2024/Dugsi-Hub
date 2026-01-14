import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent, clerkClient } from '@clerk/nextjs/server'
import { db } from '@/lib/prisma'

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
        throw new Error('Please add CLERK_WEBHOOK_SECRET to .env')
    }

    // Get the headers
    const headerPayload = await headers()
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured -- no svix headers', {
            status: 400,
        })
    }

    const payload = await req.json()
    const body = JSON.stringify(payload)

    const wh = new Webhook(WEBHOOK_SECRET)

    let evt: WebhookEvent

    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error verifying webhook:', err)
        return new Response('Error occured', {
            status: 400,
        })
    }

    const eventType = evt.type

    if (eventType === 'user.created' || eventType === 'user.updated') {
        const { id, email_addresses, first_name, last_name, image_url } = evt.data

        const email = email_addresses[0]?.email_address

        if (!email) {
            return new Response('No email found', { status: 400 })
        }

        const isSuperAdmin = email === process.env.SUPERADMIN_EMAIL
        const role = isSuperAdmin ? "SUPERADMIN" : "STUDENT"

        const client = await clerkClient();
        await client.users.updateUserMetadata(id!, {
            publicMetadata: {
                role: role
            }
        });

        await db.user.upsert({
            where: { userId: id },
            update: {
                email: email,
                name: `${first_name || ''} ${last_name || ''}`.trim() || undefined,
                imageUrl: image_url,
                role: role as any,
            },
            create: {
                userId: id,
                email: email,
                name: `${first_name || ''} ${last_name || ''}`.trim() || undefined,
                imageUrl: image_url,
                role: role as any,
            },
        })
    }

    if (eventType === 'user.deleted') {
        const { id } = evt.data
        await db.user.delete({
            where: { userId: id! },
        })
    }

    return new Response('', { status: 200 })
}
