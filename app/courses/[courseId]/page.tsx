import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import {
    BookOpen,
    CheckCircle2,
    Clock,
    PlayCircle,
    Lock,
    ArrowRight,
    Star,
    Users
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { EnrollSignInButton } from "@/components/clerk-auth-buttons";
import { CourseEnrollButton } from "@/components/course-enroll-button";
import { AutoRedirect } from "./_components/auto-redirect";

export default async function CourseDetailPage({
    params,
    searchParams,
}: {
    params: Promise<{ courseId: string }>;
    searchParams: Promise<{ success?: string; canceled?: string }>;
}) {
    const { courseId } = await params;
    const { success, canceled } = await searchParams;
    const { userId } = await auth();

    const course = await db.course.findUnique({
        where: { id: courseId },
        include: {
            category: true,
            lessons: {
                where: { isPublished: true },
                orderBy: { position: "asc" }
            },
            _count: {
                select: { enrollments: true }
            }
        }
    });

    if (!course) {
        return redirect("/courses");
    }

    const dbUser = userId ? await db.user.findUnique({ where: { userId } }) : null;

    const enrollment = dbUser ? await db.enrollment.findUnique({
        where: {
            userId_courseId: {
                userId: dbUser.id,
                courseId: courseId,
            }
        }
    }) : null;

    return (
        <>
            <Header />
            <main className="flex-1 bg-muted/20">
                <div className="container px-4 py-8 md:py-12">
                    {success && (
                        <div className="mb-8 p-6 rounded-[2rem] bg-emerald-500/10 border-2 border-emerald-500/20 flex flex-col items-center text-center space-y-3 animate-in fade-in zoom-in duration-500">
                            <div className="h-16 w-16 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/40">
                                <CheckCircle2 className="h-8 w-8 text-white" />
                            </div>
                            <h2 className="text-2xl font-black text-emerald-700">Congratulations!</h2>
                            <p className="font-bold text-emerald-600/80">You are now enrolled. Your learning journey starts now!</p>
                            {enrollment?.status === "PENDING" && <AutoRedirect courseId={courseId} />}
                        </div>
                    )}

                    {canceled && (
                        <div className="mb-8 p-6 rounded-[2rem] bg-orange-500/10 border-2 border-orange-500/20 flex flex-col items-center text-center space-y-3 animate-in fade-in zoom-in duration-500">
                            <h2 className="text-2xl font-black text-orange-700">Payment Canceled</h2>
                            <p className="font-bold text-orange-600/80">Don't worry, you haven't been charged. Feel free to try again whenever you're ready!</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Left Column: Course Info */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="space-y-4">
                                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                                    {course.category.name}
                                </span>
                                <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">{course.title}</h1>
                                <p className="text-xl text-muted-foreground">{course.description}</p>
                                <div className="flex items-center gap-6 pt-2">
                                    <div className="flex items-center gap-2">
                                        <Users className="h-5 w-5 text-muted-foreground" />
                                        <span className="text-sm font-medium">{course._count.enrollments} Students</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                                        <span className="text-sm font-medium">4.8 (120 Reviews)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Course Image Preview */}
                            <div className="overflow-hidden rounded-[2.5rem] border-8 border-card shadow-2xl bg-muted aspect-video relative group">
                                {course.imageUrl ? (
                                    <img
                                        src={course.imageUrl}
                                        alt={course.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-primary/5">
                                        <BookOpen className="h-20 w-20 text-primary opacity-20" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                            </div>

                            {/* Course Content */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold">Course Content</h2>
                                    <span className="text-sm font-medium text-muted-foreground">{course.lessons.length} Chapters</span>
                                </div>
                                <div className="rounded-2xl border bg-card shadow-sm divide-y overflow-hidden">
                                    {course.lessons.map((lesson: any, index: number) => (
                                        <div key={lesson.id} className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-bold">
                                                {index + 1}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold">{lesson.title}</h3>
                                                <p className="text-xs text-muted-foreground">Video • 5m 30s</p>
                                            </div>
                                            {!enrollment && !lesson.isFree ? (
                                                <Lock className="h-4 w-4 text-muted-foreground" />
                                            ) : (
                                                <PlayCircle className="h-4 w-4 text-primary" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Checkout Sidebar */}
                        <div className="space-y-6">
                            <div className="sticky top-24 rounded-3xl border bg-card p-8 shadow-xl">
                                <div className="mb-6 space-y-2">
                                    <span className="text-sm font-medium text-muted-foreground">Price</span>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-extrabold">{course.price === 0 ? "Free" : `$${course.price}`}</span>
                                        {course.price! > 0 && <span className="text-muted-foreground line-through">$99.99</span>}
                                    </div>
                                </div>

                                {enrollment || dbUser?.role === "SUPERADMIN" ? (
                                    <div className="space-y-4">
                                        {enrollment?.status === "PENDING" && dbUser?.role !== "SUPERADMIN" ? (
                                            <div className="space-y-4">
                                                <Button disabled className="w-full rounded-full py-8 text-lg font-black bg-orange-500/10 text-orange-600 border-2 border-orange-500/20" size="lg">
                                                    <Clock className="mr-3 h-6 w-6 animate-pulse" />
                                                    Waiting for Approval...
                                                </Button>
                                                <p className="text-center text-[10px] font-bold text-muted-foreground italic">
                                                    An admin is verifying your payment. Access will be granted shortly.
                                                </p>
                                                <AutoRedirect courseId={course.id} />
                                            </div>
                                        ) : (
                                            <>
                                                <Link href={`/courses/${course.id}/learn`}>
                                                    <Button className="w-full rounded-full py-8 text-xl font-black shadow-xl hover:scale-105 transition-all bg-emerald-600 hover:bg-emerald-700" size="lg">
                                                        {dbUser?.role === "SUPERADMIN" ? "Watch as Admin" : "Watch Now Dear Student! ✨"}
                                                        <ArrowRight className="ml-3 h-6 w-6" />
                                                    </Button>
                                                </Link>
                                                {dbUser?.role !== "SUPERADMIN" && (
                                                    <p className="text-center text-xs font-bold text-muted-foreground italic">
                                                        You have full lifetime access to this course.
                                                    </p>
                                                )}
                                            </>
                                        )}
                                    </div>
                                ) : userId ? (
                                    <CourseEnrollButton courseId={course.id} price={course.price || 0} />
                                ) : (
                                    <EnrollSignInButton courseId={course.id} price={course.price || 0} />
                                )}

                                <div className="mt-8 space-y-4">
                                    <h4 className="text-sm font-bold uppercase tracking-wider">This course includes:</h4>
                                    <ul className="space-y-3">
                                        <li className="flex items-center gap-3 text-sm">
                                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                            Full lifetime access
                                        </li>
                                        <li className="flex items-center gap-3 text-sm">
                                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                            Access on mobile and TV
                                        </li>
                                        <li className="flex items-center gap-3 text-sm">
                                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                            Certificate of completion
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
