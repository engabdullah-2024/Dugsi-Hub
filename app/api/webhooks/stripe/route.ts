import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { db } from "@/lib/prisma";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session?.metadata?.userId;
    const courseId = session?.metadata?.courseId;

    console.log(`[STRIPE_WEBHOOK] Event: ${event.type}, User: ${userId}, Course: ${courseId}`);

    if (event.type === "checkout.session.completed") {
        if (!userId || !courseId) {
            console.error("[STRIPE_WEBHOOK] Error: Missing metadata in session", session.id);
            return new NextResponse("Webhook Error: Missing metadata", { status: 400 });
        }

        // Check if enrollment already exists to avoid duplicates
        const existingEnrollment = await db.enrollment.findUnique({
            where: {
                userId_courseId: {
                    userId: userId,
                    courseId: courseId,
                }
            }
        });

        if (existingEnrollment) {
            console.log("[STRIPE_WEBHOOK] Enrollment already exists, skipping.");
            return new NextResponse("Success (Duplicate)", { status: 200 });
        }

        await db.enrollment.create({
            data: {
                courseId: courseId,
                userId: userId,
                status: "PENDING"
            }
        });

        console.log(`[STRIPE_WEBHOOK] Success: user ${userId} enrolled in ${courseId}`);

        // Also ensure user has progress initialized or at least we know they are in.
    }

    return new NextResponse(null, { status: 200 });
}
