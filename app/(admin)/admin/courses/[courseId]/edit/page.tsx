import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { CourseForm } from "../../_components/course-form";

const CourseEditPage = async ({
    params
}: {
    params: Promise<{ courseId: string }>
}) => {
    const { courseId } = await params;
    const { userId } = await auth();

    if (!userId) {
        return redirect("/");
    }

    const course = await db.course.findUnique({
        where: { id: courseId }
    });

    if (!course) {
        return redirect("/admin/courses");
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
                Back to management
            </Link>

            <CourseForm initialData={course} />
        </div>
    );
}

export default CourseEditPage;
