import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
    ArrowLeft,
    LayoutDashboard,
    Video,
    ListChecks,
    PlusCircle,
    Eye,
    Settings
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChaptersForm } from "../_components/chapters-form";

export default async function CourseManagePage({
    params,
}: {
    params: Promise<{ courseId: string }>;
}) {
    const { courseId } = await params;
    const { userId } = await auth();

    if (!userId) {
        return redirect("/");
    }

    const course = await db.course.findUnique({
        where: { id: courseId },
        include: {
            lessons: {
                orderBy: { position: "asc" }
            }
        }
    });

    if (!course) {
        return redirect("/admin/courses");
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <Link
                        href="/admin/courses"
                        className="flex items-center text-sm hover:opacity-75 transition mb-6"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to courses
                    </Link>
                    <div className="flex items-center gap-x-2">
                        <h1 className="text-3xl font-bold">Course Management</h1>
                    </div>
                    <p className="text-muted-foreground">Manage your course content and settings.</p>
                </div>
                <div className="flex items-center gap-x-2">
                    <Link href={`/courses/${courseId}/learn`}>
                        <Button variant="outline" className="rounded-full shadow-sm hover:bg-primary/5">
                            <Eye className="h-4 w-4 mr-2" />
                            Watch Course
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column: Course Details */}
                <div className="space-y-6">
                    <div className="flex items-center gap-x-2">
                        <div className="rounded-full p-2 bg-primary/10">
                            <LayoutDashboard className="h-6 w-6 text-primary" />
                        </div>
                        <h2 className="text-xl font-bold">Customize your course</h2>
                    </div>

                    <div className="rounded-xl border bg-card p-6 shadow-sm space-y-4 text-sm">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-muted-foreground font-medium">Title:</div>
                            <div className="font-bold">{course.title}</div>
                            <div className="text-muted-foreground font-medium">Price:</div>
                            <div className="font-bold">${course.price}</div>
                            <div className="text-muted-foreground font-medium">Status:</div>
                            <div className={`font-bold ${course.published ? "text-emerald-500" : "text-orange-500"}`}>
                                {course.published ? "Published" : "Draft"}
                            </div>
                        </div>
                        <Link href={`/admin/courses/${courseId}/edit`}>
                            <Button variant="outline" className="w-full rounded-full border-2 font-bold hover:bg-primary/5 transition-all">Edit Details</Button>
                        </Link>
                    </div>
                </div>

                {/* Right Column: Lessons */}
                <div className="space-y-6">
                    <ChaptersForm
                        initialData={course}
                        courseId={course.id}
                    />
                </div>
            </div>
        </div>
    );
}
