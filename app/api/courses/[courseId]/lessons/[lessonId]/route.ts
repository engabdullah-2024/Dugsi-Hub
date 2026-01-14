import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { UserRole } from "@prisma/client";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ courseId: string; lessonId: string }> }
) {
    try {
        const { courseId, lessonId } = await params;
        const { userId } = await auth();
        const values = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const dbUser = await db.user.findUnique({
            where: { userId },
        });

        if (!dbUser || dbUser.role !== UserRole.SUPERADMIN) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const lesson = await db.lesson.update({
            where: {
                id: lessonId,
                courseId: courseId,
            },
            data: { ...values },
        });

        return NextResponse.json(lesson);
    } catch (error) {
        console.log("[LESSON_ID_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ courseId: string; lessonId: string }> }
) {
    try {
        const { courseId, lessonId } = await params;
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const dbUser = await db.user.findUnique({
            where: { userId },
        });

        if (!dbUser || dbUser.role !== UserRole.SUPERADMIN) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const lesson = await db.lesson.delete({
            where: {
                id: lessonId,
                courseId: courseId,
            },
        });

        return NextResponse.json(lesson);
    } catch (error) {
        console.log("[LESSON_ID_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
