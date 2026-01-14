import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { UserRole } from "@prisma/client";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ courseId: string }> }
) {
    try {
        const { courseId } = await params;
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

        const course = await db.course.update({
            where: { id: courseId },
            data: { ...values },
        });

        return NextResponse.json(course);
    } catch (error) {
        console.log("[COURSE_ID_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ courseId: string }> }
) {
    try {
        const { courseId } = await params;
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

        const course = await db.course.findUnique({
            where: { id: courseId },
        });

        if (!course) {
            return new NextResponse("Not Found", { status: 404 });
        }

        const deletedCourse = await db.course.delete({
            where: { id: courseId },
        });

        return NextResponse.json(deletedCourse);
    } catch (error) {
        console.log("[COURSE_ID_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
