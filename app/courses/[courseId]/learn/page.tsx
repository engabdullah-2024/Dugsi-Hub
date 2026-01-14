import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Header } from "@/components/layout/header";
import {
    PlayCircle,
    CheckCircle2,
    Lock,
    ChevronLeft,
    ChevronRight,
    Menu,
    FileText
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { VideoPlayer } from "@/components/video-player";
import { CourseProgressButton } from "./_components/course-progress-button";

export default async function CoursePlayerPage({
    params,
    searchParams,
}: {
    params: Promise<{ courseId: string }>;
    searchParams: Promise<{ lessonId?: string }>;
}) {
    const { courseId } = await params;
    const { lessonId } = await searchParams;
    const { userId } = await auth();

    if (!userId) {
        return redirect("/");
    }

    const dbUser = await db.user.findUnique({
        where: { userId },
    });

    if (!dbUser) {
        return redirect("/");
    }

    const course = await db.course.findUnique({
        where: { id: courseId },
        include: {
            lessons: {
                where: { isPublished: true },
                orderBy: { position: "asc" }
            }
        }
    });

    if (!course || course.lessons.length === 0) {
        return redirect("/courses");
    }

    // Check enrollment (SuperAdmin can always watch)
    const isSuperAdmin = dbUser.role === "SUPERADMIN";
    const enrollment = await db.enrollment.findUnique({
        where: {
            userId_courseId: {
                userId: dbUser.id,
                courseId: courseId,
            }
        }
    });

    if ((!enrollment || enrollment.status !== "ACTIVE") && !isSuperAdmin) {
        return redirect(`/courses/${courseId}?success=1`);
    }

    const currentLesson = lessonId
        ? course.lessons.find((l: any) => l.id === lessonId)
        : course.lessons[0];

    if (!currentLesson) {
        return redirect(`/courses/${courseId}/learn`);
    }

    const userProgress = await db.progress.findUnique({
        where: {
            userId_lessonId: {
                userId: dbUser.id,
                lessonId: currentLesson.id
            }
        }
    });

    const allProgress = await db.progress.findMany({
        where: {
            userId: dbUser.id,
            lessonId: {
                in: course.lessons.map((l: { id: string }) => l.id)
            }
        }
    });

    const currentIndex = course.lessons.findIndex((l: any) => l.id === currentLesson.id);
    const nextLesson = course.lessons[currentIndex + 1];
    const prevLesson = course.lessons[currentIndex - 1];

    return (
        <div className="flex h-screen flex-col bg-background">
            {/* Top Bar */}
            <div className="flex h-16 items-center justify-between border-b px-6 bg-card">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                        <ChevronLeft className="mr-1 h-4 w-4" />
                        Back to Dashboard
                    </Link>
                    <div className="h-4 w-px bg-border" />
                    <h1 className="font-bold truncate max-w-[300px] md:max-w-md">{course.title}</h1>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-1 rounded bg-primary/10 text-primary uppercase">
                        {isSuperAdmin ? "Admin View" : "Student View"}
                    </span>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden lg:flex-row flex-col">
                {/* Main Content: Video Player */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="mx-auto max-w-5xl space-y-8">
                        <div className="aspect-video overflow-hidden rounded-[2.5rem] border-8 border-card bg-black shadow-2xl relative">
                            {currentLesson.videoUrl ? (
                                <VideoPlayer videoUrl={currentLesson.videoUrl} />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-muted">
                                    <p className="text-muted-foreground font-medium">No video content for this lesson.</p>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b pb-8">
                            <div className="space-y-1">
                                <h2 className="text-2xl font-bold md:text-3xl">{currentLesson.title}</h2>
                                <p className="text-muted-foreground">{currentLesson.description || "No description provided for this lesson."}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                {prevLesson && (
                                    <Link href={`/courses/${courseId}/learn?lessonId=${prevLesson.id}`}>
                                        <Button variant="outline" size="sm" className="rounded-full">
                                            <ChevronLeft className="mr-2 h-4 w-4" />
                                            Previous
                                        </Button>
                                    </Link>
                                )}
                                {nextLesson && (
                                    <Link href={`/courses/${courseId}/learn?lessonId=${nextLesson.id}`}>
                                        <Button size="sm" variant="outline" className="rounded-full">
                                            Next Lesson
                                            <ChevronRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                )}
                                <CourseProgressButton
                                    courseId={courseId}
                                    lessonId={currentLesson.id}
                                    isCompleted={!!userProgress?.isCompleted}
                                    nextLessonId={nextLesson?.id}
                                />
                            </div>
                        </div>

                        {/* Lesson Resources/Notes Mockup */}
                        <div className="space-y-6 pb-20">
                            <div className="flex items-center gap-2 border-b w-fit pb-2">
                                <FileText className="h-5 w-5 text-primary" />
                                <h3 className="font-bold">Lesson Resources</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 rounded-2xl border bg-card hover:border-primary transition-colors cursor-pointer group">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">Chapter Notes (PDF)</span>
                                        <Button size="sm" variant="ghost" className="text-primary group-hover:bg-primary/10">Download</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Sidebar: Lesson List */}
                <aside className="w-full border-t lg:w-96 lg:border-l lg:border-t-0 bg-muted/30 overflow-y-auto">
                    <div className="p-6">
                        <h3 className="text-lg font-bold mb-6">Course Content</h3>
                        <div className="space-y-3">
                            {course.lessons.map((lesson: any, index: number) => {
                                const isActive = lesson.id === currentLesson.id;
                                return (
                                    <Link
                                        key={lesson.id}
                                        href={`/courses/${courseId}/learn?lessonId=${lesson.id}`}
                                        className={`flex items-start gap-4 p-4 rounded-2xl border transition-all ${isActive
                                            ? "bg-primary text-primary-foreground border-primary shadow-lg scale-102"
                                            : "bg-background hover:border-primary hover:bg-primary/5"
                                            }`}
                                    >
                                        <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${isActive ? "bg-white text-primary" : "bg-muted"
                                            }`}>
                                            {index + 1}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={`font-semibold text-sm truncate ${isActive ? "text-white" : ""}`}>
                                                {lesson.title}
                                            </p>
                                            <p className={`text-[10px] mt-1 ${isActive ? "text-white/70" : "text-muted-foreground"}`}>
                                                Video • 5:30
                                            </p>
                                        </div>
                                        {allProgress.find((p: { lessonId: string }) => p.lessonId === lesson.id)?.isCompleted ? (
                                            <CheckCircle2 className={isActive ? "text-white h-5 w-5" : "text-emerald-500 h-5 w-5"} />
                                        ) : isActive ? (
                                            <PlayCircle className="h-5 w-5 shrink-0" />
                                        ) : (
                                            <div className="h-5 w-5 shrink-0 rounded-full border-2" />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
