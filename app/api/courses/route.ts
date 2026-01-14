import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { UserRole } from "@prisma/client";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        const { title, description, categoryId, price, imageUrl, imageType, videoUrl, videoType } = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const dbUser = await db.user.findUnique({
            where: { userId },
        });

        if (!dbUser || dbUser.role !== UserRole.SUPERADMIN) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const course = await db.course.create({
            data: {
                title,
                description,
                categoryId,
                price: parseFloat(price) || 0,
                imageUrl,
                imageType,
                videoUrl,
                videoType,
                creatorId: dbUser.id,
            },
        });

        return NextResponse.json(course);
    } catch (error) {
        console.log("[COURSES_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
