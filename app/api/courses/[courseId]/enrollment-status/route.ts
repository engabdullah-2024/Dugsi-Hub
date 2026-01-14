import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ courseId: string }> }
) {
    try {
        const { userId } = await auth();
        const { courseId } = await params;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const dbUser = await db.user.findUnique({
            where: { userId }
        });

        if (!dbUser) {
            return new NextResponse("User not found", { status: 404 });
        }

        const enrollment = await db.enrollment.findUnique({
            where: {
                userId_courseId: {
                    userId: dbUser.id,
                    courseId: courseId,
                }
            }
        });

        if (!enrollment) {
            return NextResponse.json({ status: "NONE" });
        }

        return NextResponse.json({ status: enrollment.status });
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
