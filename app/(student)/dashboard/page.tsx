import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/prisma";

export const dynamic = "force-dynamic";
import {
    BookOpen,
    Clock,
    PlayCircle,
    Trophy,
    Zap,
    Calendar,
    ArrowRight,
    Star,
    Video,
    Search,
    XCircle,
    Award
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function StudentDashboardPage() {
    const user = await currentUser();

    if (!user) {
        return redirect("/");
    }

    const dbUser = await db.user.findUnique({
        where: { userId: user.id },
        include: {
            enrollments: {
                include: {
                    course: {
                        include: {
                            category: true,
                            certificates: true,
                            lessons: {
                                where: { isPublished: true },
                                select: { id: true }
                            },
                        }
                    }
                }
            },
            progress: true
        }
    });

    if (!dbUser) {
        return redirect("/");
    }

    if (dbUser.role === "SUPERADMIN") {
        return redirect("/admin");
    }

    const enrolledCourses = (dbUser.enrollments || []).map((env: any) => {
        const course = env.course;
        const totalLessons = course.lessons.length;
        const completedLessons = dbUser.progress.filter((p: any) =>
            course.lessons.some((l: any) => l.id === p.lessonId) && p.isCompleted
        ).length;
        const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
        const certificate = course.certificates?.find((c: any) => c.userId === dbUser.id);

        return {
            ...course,
            completedLessons,
            totalLessons,
            progressPercentage,
            status: env.status,
            certificateId: certificate?.id
        };
    });

    return (
        <div className="p-8 space-y-10">
            {/* Unique Welcome Hero */}
            <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-indigo-700 via-violet-800 to-indigo-900 p-10 md:p-16 text-white shadow-3xl">
                <div className="absolute top-0 right-0 -m-12 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute bottom-0 left-0 -m-12 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="space-y-4 max-w-xl">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em]">
                            <Zap className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                            Premium Student
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
                            Hey {user.firstName || "Scholar"}! <br />
                            <span className="text-indigo-200 uppercase italic">Ready to level up?</span>
                        </h1>
                        <p className="text-lg font-medium text-white/70">
                            You've completed <span className="text-white font-black">{Math.round(enrolledCourses.reduce((acc: number, curr: any) => acc + (curr.progressPercentage || 0), 0) / (enrolledCourses.length || 1))}%</span> of your active courses. Keep the momentum high!
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/10 backdrop-blur-lg rounded-[2rem] p-6 text-center border border-white/10 animate-fade-in shadow-xl">
                            <h3 className="text-3xl font-black">{enrolledCourses.length}</h3>
                            <p className="text-[10px] uppercase font-bold text-white/50 tracking-widest">Active Courses</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-lg rounded-[2rem] p-6 text-center border border-white/10 animate-fade-in shadow-xl">
                            <div className="flex items-center justify-center gap-2 text-yellow-400 mb-1">
                                <Award className="h-4 w-4 fill-yellow-400" />
                                <h3 className="text-3xl font-black text-white">{enrolledCourses.filter((c: any) => c.certificateId).length}</h3>
                            </div>
                            <p className="text-[10px] uppercase font-bold text-white/50 tracking-widest">Certificates Earned</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                {/* Courses Section */}
                <div className="xl:col-span-2 space-y-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 flex items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 shadow-sm shadow-indigo-100">
                                <BookOpen className="h-5 w-5" />
                            </div>
                            <h2 className="text-2xl font-black tracking-tight">Continue Learning</h2>
                        </div>
                        <Link href="/courses" className="text-sm font-black text-indigo-600 hover:text-indigo-700 transition-colors flex items-center gap-1 group">
                            View All <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {enrolledCourses.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-[3rem] border-4 border-dashed bg-white p-20 text-center shadow-xl border-slate-100">
                            <div className="mb-6 rounded-3xl bg-indigo-50 p-8 flex items-center justify-center">
                                <Search className="h-10 w-10 text-indigo-400 opacity-40" />
                            </div>
                            <h3 className="text-2xl font-black mb-2 text-slate-900">Explore New Skills</h3>
                            <p className="mb-8 text-slate-500 max-w-md mx-auto font-medium">
                                Find the perfect course to kickstart your career.
                            </p>
                            <Link href="/courses">
                                <Button className="rounded-full px-10 py-6 text-lg font-black shadow-xl hover:scale-105 transition-all bg-indigo-600 hover:bg-indigo-700" size="lg">Browse Catalog</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-outfit">
                            {enrolledCourses.map((course: any) => (
                                <Link
                                    key={course.id}
                                    href={course.status === "ACTIVE" ? `/courses/${course.id}/learn` : `/courses/${course.id}`}
                                    className="group"
                                >
                                    <div className="h-full rounded-[2.5rem] border-2 bg-white shadow-sm transition-all hover:shadow-2xl hover:-translate-y-2 overflow-hidden flex flex-col border-slate-50">
                                        <div className="aspect-[16/10] relative overflow-hidden bg-slate-100 p-2">
                                            {course.imageUrl ? (
                                                <img src={course.imageUrl} alt={course.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 rounded-[2rem]" />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-indigo-50/50 rounded-[2rem]">
                                                    <BookOpen className="h-10 w-10 text-indigo-200" />
                                                </div>
                                            )}

                                            <div className="absolute top-5 left-5 flex gap-2">
                                                <span className="rounded-full bg-white/90 backdrop-blur-md px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-indigo-600 shadow-sm">
                                                    {course.category.name}
                                                </span>
                                            </div>

                                            {course.status === "PENDING" && (
                                                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center text-white">
                                                    <div className="text-center">
                                                        <Clock className="h-8 w-8 mx-auto mb-2 animate-spin-slow" />
                                                        <p className="text-[10px] font-black uppercase tracking-widest">Pending Verification</p>
                                                    </div>
                                                </div>
                                            )}

                                            {course.status === "REJECTED" && (
                                                <div className="absolute inset-0 bg-red-950/60 backdrop-blur-sm flex items-center justify-center text-white p-6">
                                                    <div className="text-center">
                                                        <XCircle className="h-8 w-8 mx-auto mb-2 text-red-400" />
                                                        <p className="text-[10px] font-black uppercase tracking-widest">Access Denied</p>
                                                        <p className="text-[8px] font-bold text-white/60">Contact support for payment issues</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-8 flex flex-1 flex-col">
                                            <h3 className="font-black text-xl mb-4 line-clamp-2 group-hover:text-indigo-600 transition-colors tracking-tight leading-snug">
                                                {course.title}
                                            </h3>

                                            {course.status === "ACTIVE" ? (
                                                <div className="mt-auto space-y-4">
                                                    <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-slate-400">
                                                        <span className="flex items-center gap-1.5 text-emerald-600">
                                                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                                            On Track
                                                        </span>
                                                        <span>{Math.round(course.progressPercentage)}%</span>
                                                    </div>
                                                    <div className="h-2.5 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100 shadow-inner">
                                                        <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_auto] animate-shimmer rounded-full transition-all duration-1000" style={{ width: `${course.progressPercentage}%` }}></div>
                                                    </div>

                                                    {course.certificateId && (
                                                        <Link href={`/certificates/${course.certificateId}`} target="_blank" className="block pt-2">
                                                            <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-black text-[10px] uppercase tracking-widest rounded-xl h-10 shadow-lg shadow-yellow-100 gap-2">
                                                                <Award className="h-4 w-4" />
                                                                View Digital Certificate
                                                            </Button>
                                                        </Link>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="mt-auto pt-4 flex flex-col gap-2">
                                                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden animate-pulse" />
                                                    <p className="text-[10px] font-bold text-slate-400 italic">Activation pending admin review</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Sidebar Stats & Activity */}
                <div className="space-y-10">
                    {/* Live Sessions Mock */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 flex items-center justify-center rounded-2xl bg-orange-100 text-orange-600 shadow-sm shadow-orange-100">
                                <Video className="h-5 w-5" />
                            </div>
                            <h2 className="text-xl font-black tracking-tight">Today's Live</h2>
                        </div>
                        <div className="bg-white rounded-[2.5rem] border-2 border-slate-50 p-6 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
                            <div className="absolute top-0 right-0 h-2 bg-orange-500 w-full" />
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="rounded-full bg-orange-500/10 px-3 py-1 text-[10px] font-black uppercase text-orange-600">Starting in 2h</div>
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="h-8 w-8 rounded-full bg-slate-200 border-2 border-white shadow-sm" />
                                        ))}
                                    </div>
                                </div>
                                <h4 className="font-black text-lg">Web Design Q&A Session</h4>
                                <p className="text-xs text-slate-500 font-medium">Join Eng Abdalla for a live deep dive into UI micro-interactions.</p>
                                <Button className="w-full rounded-2xl bg-slate-900 text-white font-black py-6">Remind Me</Button>
                            </div>
                        </div>
                    </div>

                    {/* Weekly Goal Progress */}
                    <div className="bg-white rounded-[2.5rem] border-2 border-slate-50 p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-10 w-10 flex items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                                <Trophy className="h-5 w-5" />
                            </div>
                            <h2 className="text-xl font-black tracking-tight">Weekly Goal</h2>
                        </div>
                        <div className="space-y-6 text-center">
                            <div className="relative h-40 w-40 mx-auto">
                                <svg className="h-full w-full" viewBox="0 0 36 36">
                                    <path className="stroke-slate-50 stroke-[3]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" />
                                    <path className="stroke-indigo-600 stroke-[3] stroke-dasharray-[75,100] stroke-linecap-round shadow-lg shadow-indigo-600/50 flex" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" style={{ strokeDasharray: '75, 100' }} />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-4xl font-black">75%</span>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target</span>
                                </div>
                            </div>
                            <p className="text-sm font-bold text-slate-600">3/4 Modules completed this week. You're almost there!</p>
                            <div className="grid grid-cols-7 gap-1">
                                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                                    <div key={i} className="flex flex-col items-center gap-2">
                                        <div className={cn("h-6 w-1 rounded-full", i < 4 ? "bg-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.5)]" : "bg-slate-100")} />
                                        <span className="text-[10px] font-black text-slate-400">{day}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
