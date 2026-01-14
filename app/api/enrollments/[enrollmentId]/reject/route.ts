import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ enrollmentId: string }> }
) {
    try {
        const { userId: clerkUserId } = await auth();
        const { enrollmentId } = await params;

        if (!clerkUserId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Check if current user is SUPERADMIN
        const dbUser = await db.user.findUnique({
            where: { userId: clerkUserId }
        });

        if (dbUser?.role !== "SUPERADMIN") {
            return new NextResponse("Forbidden", { status: 403 });
        }

        const enrollment = await db.enrollment.update({
            where: { id: enrollmentId },
            data: {
                status: "REJECTED"
            }
        });

        return NextResponse.json(enrollment);
    } catch (error) {
        console.log("[ENROLLMENT_REJECT_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
