import { db } from "@/lib/prisma";
import { CreateCourseForm } from "./_components/create-course-form";

export default async function CreateCoursePage() {
    const categories = await db.category.findMany({
        orderBy: { name: "asc" },
    });

    return (
        <div className="mx-auto max-w-3xl space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Create New Course</h1>
                <p className="text-muted-foreground">Fill in the details below to launch your course.</p>
            </div>

            <div className="rounded-xl border bg-card p-8 shadow-sm">
                <CreateCourseForm categories={categories} />
            </div>
        </div>
    );
}
