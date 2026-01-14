"use server";

import { currentUser, clerkClient } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { UserRole } from "@prisma/client";

export const syncUser = async () => {
    const user = await currentUser();

    if (!user) return null;

    const existingUser = await db.user.findUnique({
        where: { userId: user.id },
    });

    const email = user.emailAddresses[0]?.emailAddress;
    const isSuperAdmin = email === process.env.SUPERADMIN_EMAIL;
    const role = isSuperAdmin ? UserRole.SUPERADMIN : UserRole.STUDENT;

    // Update Clerk metadata if not already set or if it's different
    if (user.publicMetadata.role !== role) {
        const client = await clerkClient();
        await client.users.updateUserMetadata(user.id, {
            publicMetadata: {
                role: role
            }
        });
    }

    if (existingUser) return existingUser;

    if (!email) return null;

    const newUser = await db.user.create({
        data: {
            userId: user.id,
            email: email,
            name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || undefined,
            imageUrl: user.imageUrl,
            role: role,
        },
    });

    return newUser;
};
