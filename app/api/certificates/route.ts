import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
    try {
        const { userId: clerkUserId } = await auth();
        const { userId, courseId } = await req.json();

        if (!clerkUserId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const dbUser = await db.user.findUnique({
            where: { userId: clerkUserId }
        });

        if (dbUser?.role !== "SUPERADMIN") {
            return new NextResponse("Forbidden", { status: 403 });
        }

        // Check if already exists
        const existing = await db.certificate.findFirst({
            where: {
                userId,
                courseId
            }
        });

        if (existing) {
            return new NextResponse("Certificate already issued", { status: 400 });
        }

        // DH-YEAR-RANDOM
        const year = new Date().getFullYear();
        const random = crypto.randomBytes(3).toString('hex').toUpperCase();
        const certificateCode = `DH-${year}-${random}`;

        const certificate = await db.certificate.create({
            data: {
                userId,
                courseId,
                certificateCode,
            }
        });

        return NextResponse.json(certificate);
    } catch (error) {
        console.error("[CERTIFICATES_POST_ERROR]", error);
        return new NextResponse("Internal Error: " + (error as Error).message, { status: 500 });
    }
}
