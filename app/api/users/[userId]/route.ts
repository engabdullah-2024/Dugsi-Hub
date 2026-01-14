import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { UserRole } from "@prisma/client";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ userId: string }> }
) {
    try {
        const { userId: targetUserId } = await params;
        const { userId: currentUserId } = await auth();
        const { role } = await req.json();

        if (!currentUserId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const currentUser = await db.user.findUnique({
            where: { userId: currentUserId }
        });

        if (!currentUser || currentUser.role !== UserRole.SUPERADMIN) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const updatedUser = await db.user.update({
            where: { id: targetUserId },
            data: { role }
        });

        // Also sync with Clerk metadata
        const client = await clerkClient();
        await client.users.updateUserMetadata(updatedUser.userId, {
            publicMetadata: {
                role: role
            }
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.log("[USER_ID_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ userId: string }> }
) {
    try {
        const { userId: targetUserId } = await params;
        const { userId: currentUserId } = await auth();

        if (!currentUserId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const currentUser = await db.user.findUnique({
            where: { userId: currentUserId }
        });

        if (!currentUser || currentUser.role !== UserRole.SUPERADMIN) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Check if trying to delete self
        if (currentUser.id === targetUserId) {
            return new NextResponse("Cannot delete yourself", { status: 400 });
        }

        const userToDelete = await db.user.findUnique({ where: { id: targetUserId } });
        if (!userToDelete) {
            return new NextResponse("User not found", { status: 404 });
        }

        const deletedUser = await db.user.delete({
            where: { id: targetUserId }
        });

        // Also delete from Clerk
        const client = await clerkClient();
        await client.users.deleteUser(userToDelete.userId);

        return NextResponse.json(deletedUser);
    } catch (error) {
        console.log("[USER_ID_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
