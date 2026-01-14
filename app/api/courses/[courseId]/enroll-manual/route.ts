import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export async function POST(
    req: Request,
    { params }: { params: Promise<{ courseId: string }> }
) {
    try {
        const { userId: clerkUserId } = await auth();
        const { userId } = await req.json(); // The ID of the student to enroll
        const { courseId } = await params;

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

        if (!userId || !courseId) {
            return new NextResponse("Missing student or course ID", { status: 400 });
        }

        // Check if enrollment already exists
        const existingEnrollment = await db.enrollment.findUnique({
            where: {
                userId_courseId: {
                    userId: userId,
                    courseId: courseId,
                }
            }
        });

        if (existingEnrollment) {
            return new NextResponse("Student is already enrolled in this course", { status: 400 });
        }

        // Create the manual enrollment
        const enrollment = await db.enrollment.create({
            data: {
                userId: userId,
                courseId: courseId,
                status: "ACTIVE"
            }
        });

        return NextResponse.json(enrollment);
    } catch (error) {
        console.log("[MANUAL_ENROLL_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
