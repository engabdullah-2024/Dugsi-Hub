import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ courseId: string; lessonId: string }> }
) {
    try {
        const { userId } = await auth();
        const { isCompleted } = await req.json();
        const { courseId, lessonId } = await params;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const dbUser = await db.user.findUnique({
            where: { userId }
        });

        if (!dbUser) {
            return new NextResponse("User not found", { status: 404 });
        }

        const userProgress = await db.progress.upsert({
            where: {
                userId_lessonId: {
                    userId: dbUser.id,
                    lessonId: lessonId,
                }
            },
            update: {
                isCompleted
            },
            create: {
                userId: dbUser.id,
                lessonId: lessonId,
                isCompleted,
            }
        });

        return NextResponse.json(userProgress);
    } catch (error) {
        console.log("[PROGRESS_PUT]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
