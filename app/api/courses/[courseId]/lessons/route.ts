import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { UserRole } from "@prisma/client";

export async function POST(
    req: Request,
    { params }: { params: Promise<{ courseId: string }> }
) {
    try {
        const { courseId } = await params;
        const { userId } = await auth();
        const { title } = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const dbUser = await db.user.findUnique({
            where: { userId },
        });

        if (!dbUser || dbUser.role !== UserRole.SUPERADMIN) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const courseOwner = await db.course.findUnique({
            where: {
                id: courseId,
                creatorId: dbUser.id,
            }
        });

        if (!courseOwner) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const lastLesson = await db.lesson.findFirst({
            where: {
                courseId: courseId,
            },
            orderBy: {
                position: "desc",
            },
        });

        const newPosition = lastLesson ? lastLesson.position + 1 : 1;

        const lesson = await db.lesson.create({
            data: {
                title,
                courseId: courseId,
                position: newPosition,
            }
        });

        return NextResponse.json(lesson);
    } catch (error) {
        console.log("[LESSONS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
