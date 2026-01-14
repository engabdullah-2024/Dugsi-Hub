import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export async function POST(
    req: Request,
    { params }: { params: Promise<{ courseId: string }> }
) {
    const { courseId } = await params;
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const dbUser = await db.user.findUnique({
            where: { userId },
        });

        if (!dbUser) {
            return new NextResponse("User not found", { status: 404 });
        }

        // Check if already enrolled
        const existingEnrollment = await db.enrollment.findUnique({
            where: {
                userId_courseId: {
                    userId: dbUser.id,
                    courseId: courseId,
                },
            },
        });

        if (existingEnrollment) {
            return new NextResponse("Already enrolled", { status: 400 });
        }

        const enrollment = await db.enrollment.create({
            data: {
                userId: dbUser.id,
                courseId: courseId,
            },
        });

        // In a real app, you would redirect to a payment success page or the course page
        return NextResponse.redirect(`${new URL(req.url).origin}/courses/${courseId}?success=1`);
    } catch (error) {
        console.log("[COURSE_ID_ENROLL]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
