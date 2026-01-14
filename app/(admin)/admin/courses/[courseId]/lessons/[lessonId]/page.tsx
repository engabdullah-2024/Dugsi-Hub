import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { LessonForm } from "../../../_components/lesson-form";

const LessonPage = async ({
    params,
}: {
    params: Promise<{ courseId: string; lessonId: string }>;
}) => {
    const { courseId, lessonId } = await params;
    const { userId } = await auth();

    if (!userId) {
        return redirect("/");
    }

    const lesson = await db.lesson.findUnique({
        where: {
            id: lessonId,
            courseId: courseId,
        },
    });

    if (!lesson) {
        return redirect(`/admin/courses/${courseId}`);
    }

    return (
        <div className="p-6 md:p-10 space-y-8">
            <Link
                href={`/admin/courses/${courseId}`}
                className="flex items-center text-sm font-bold text-muted-foreground hover:text-primary transition-colors group"
            >
                <div className="p-2 rounded-xl bg-muted group-hover:bg-primary/10 mr-3">
                    <ArrowLeft className="h-4 w-4" />
                </div>
                Back to course management
            </Link>
            <LessonForm
                initialData={lesson}
                courseId={courseId}
                lessonId={lessonId}
            />
        </div>
    );
};

export default LessonPage;
