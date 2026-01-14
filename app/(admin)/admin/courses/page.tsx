import Link from "next/link";
export const dynamic = "force-dynamic";
import { db } from "@/lib/prisma";
import {
    BookOpen,
    Plus,
    MoreVertical,
    Eye,
    Edit,
    Trash2,
    CheckCircle2,
    XCircle,
    Users
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AdminCoursesPage() {
    const courses = await db.course.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            category: true,
            _count: {
                select: { lessons: true, enrollments: true }
            }
        }
    });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Platform Courses</h1>
                    <p className="text-muted-foreground">Create, edit, and manage all learning content.</p>
                </div>
                <Link href="/admin/courses/create">
                    <Button className="rounded-full shadow-lg gap-2">
                        <Plus className="h-5 w-5" />
                        Create Course
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {courses.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-dashed p-20 text-center">
                        <div className="mb-4 rounded-full bg-muted p-4">
                            <BookOpen className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-bold">No courses found</h3>
                        <p className="mb-6 text-muted-foreground">Get started by creating your first educational course.</p>
                        <Link href="/admin/courses/create">
                            <Button variant="outline" className="rounded-full">Create Course</Button>
                        </Link>
                    </div>
                ) : (
                    courses.map((course: any) => (
                        <Link key={course.id} href={`/admin/courses/${course.id}`} className="group">
                            <div className="overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                                    {course.imageUrl ? (
                                        <img src={course.imageUrl} alt={course.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-primary/5 text-primary">
                                            <BookOpen className="h-10 w-10 opacity-20" />
                                        </div>
                                    )}
                                    <div className="absolute top-3 right-3 flex gap-2">
                                        <div className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${course.published
                                            ? "bg-emerald-500/80 text-white"
                                            : "bg-orange-500/80 text-white"
                                            }`}>
                                            {course.published ? "Published" : "Draft"}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5">
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                                            {course.category.name}
                                        </span>
                                        <div className="flex gap-2">
                                            <Link href={`/courses/${course.id}/learn`} className="text-muted-foreground hover:text-primary transition-colors">
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                            <button className="text-muted-foreground hover:text-foreground"><Edit className="h-4 w-4" /></button>
                                            <button className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                                        </div>
                                    </div>

                                    <h3 className="mb-2 text-lg font-bold line-clamp-1">{course.title}</h3>
                                    <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                                        {course.description || "No description provided."}
                                    </p>

                                    <div className="flex items-center justify-between border-t pt-4">
                                        <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <BookOpen className="h-3 w-3" />
                                                {course._count.lessons} Lessons
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Users className="h-3 w-3" />
                                                {course._count.enrollments} Students
                                            </div>
                                        </div>
                                        <span className="text-lg font-bold text-primary">
                                            ${course.price?.toFixed(2) || "Free"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}
