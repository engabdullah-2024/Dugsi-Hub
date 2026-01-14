import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/prisma";
import {
    BookOpen,
    Clock,
    Search,
    LayoutGrid,
    List,
    Filter,
    Calendar,
    ArrowRight,
    Star,
    MonitorPlay,
    Award
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function MyCoursesPage() {
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
                },
                orderBy: {
                    enrolledAt: "desc"
                }
            },
            progress: true
        }
    });

    if (!dbUser) {
        return redirect("/");
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
            enrolledAt: env.enrolledAt,
            certificateId: certificate?.id
        };
    });

    return (
        <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-10">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                        <MonitorPlay className="h-3 w-3" />
                        My Learning Library
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter text-slate-900">
                        My <span className="text-emerald-600">Courses</span>
                    </h1>
                    <p className="text-slate-500 font-medium">Manage and access all your purchased professional content.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative group hidden sm:block">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                        <input
                            placeholder="Search your library..."
                            className="bg-white border-2 border-slate-100 rounded-2xl py-3 pl-12 pr-6 text-sm font-medium focus:outline-none focus:border-emerald-500 transition-all w-64 shadow-sm"
                        />
                    </div>
                    <Button variant="outline" className="rounded-2xl border-2 py-6 px-5 border-slate-100 bg-white hover:bg-slate-50">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                    </Button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Completed", value: enrolledCourses.filter((c: any) => c.progressPercentage === 100).length, color: "text-emerald-600", bg: "bg-emerald-50" },
                    { label: "In Progress", value: enrolledCourses.filter((c: any) => c.progressPercentage > 0 && c.progressPercentage < 100).length, color: "text-indigo-600", bg: "bg-indigo-50" },
                    { label: "Not Started", value: enrolledCourses.filter((c: any) => c.progressPercentage === 0).length, color: "text-slate-600", bg: "bg-slate-50" },
                    { label: "Certificates", value: enrolledCourses.filter((c: any) => c.certificateId).length, color: "text-purple-600", bg: "bg-purple-50" },
                ].map((stat, i) => (
                    <div key={i} className={cn("p-6 rounded-[2rem] border-2 border-transparent hover:border-slate-100 transition-all bg-white shadow-sm flex items-center justify-between group cursor-default")}>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
                            <h4 className={cn("text-3xl font-black", stat.color)}>{stat.value}</h4>
                        </div>
                        <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm", stat.bg)}>
                            <Star className={cn("h-6 w-6", stat.color)} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Course List */}
            {enrolledCourses.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-100 shadow-xl">
                    <div className="h-24 w-24 rounded-[2rem] bg-slate-50 flex items-center justify-center mb-6">
                        <BookOpen className="h-10 w-10 text-slate-200" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">No courses found</h3>
                    <p className="text-slate-500 font-medium mb-8">You haven't enrolled in any courses yet.</p>
                    <Link href="/courses">
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-10 py-7 rounded-full text-lg shadow-2xl shadow-emerald-200 hover:scale-105 transition-all">
                            Browse Courses
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {enrolledCourses.map((course: any) => (
                        <div key={course.id} className="group relative bg-white rounded-[2.5rem] border-2 border-slate-50 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col">
                            {/* Course Image & Overlay */}
                            <div className="aspect-[16/10] relative overflow-hidden p-3">
                                {course.imageUrl ? (
                                    <img src={course.imageUrl} alt={course.title} className="h-full w-full object-cover rounded-[2rem] transition-transform duration-700 group-hover:scale-110" />
                                ) : (
                                    <div className="h-full w-full bg-emerald-50 rounded-[2rem] flex items-center justify-center">
                                        <BookOpen className="h-12 w-12 text-emerald-200" />
                                    </div>
                                )}

                                {/* Top Badges */}
                                <div className="absolute top-6 left-6 flex gap-2">
                                    <span className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-600 shadow-sm border border-emerald-50">
                                        {course.category.name}
                                    </span>
                                </div>

                                {/* Access Status */}
                                {course.status === "PENDING" && (
                                    <div className="absolute inset-x-3 inset-y-3 bg-slate-900/60 backdrop-blur-sm rounded-[2rem] flex items-center justify-center text-center p-6">
                                        <div className="space-y-3">
                                            <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center mx-auto border border-white/20 animate-pulse">
                                                <Clock className="h-6 w-6 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-white font-black text-sm uppercase tracking-tighter">Pending Approval</p>
                                                <p className="text-white/60 text-[10px] font-bold">Admin is verifying payment</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-8 flex flex-1 flex-col space-y-6">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-slate-400">
                                        <Calendar className="h-3 w-3" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Enrolled {new Date(course.enrolledAt).toLocaleDateString()}</span>
                                    </div>
                                    <h3 className="text-xl font-black text-slate-900 leading-tight line-clamp-2 group-hover:text-emerald-600 transition-colors">
                                        {course.title}
                                    </h3>
                                </div>

                                {course.status === "ACTIVE" ? (
                                    <div className="mt-auto space-y-6">
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest">
                                                <span className="text-emerald-600 flex items-center gap-1.5">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                    {Math.round(course.progressPercentage)}% Complete
                                                </span>
                                                <span className="text-slate-400">{course.completedLessons}/{course.totalLessons} Lessons</span>
                                            </div>
                                            <div className="h-3 w-full bg-slate-50 rounded-full border border-slate-100 overflow-hidden p-[1px]">
                                                <div
                                                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full animate-shimmer bg-[length:200%_auto] transition-all duration-1000"
                                                    style={{ width: `${course.progressPercentage}%` }}
                                                />
                                            </div>

                                            {course.certificateId && (
                                                <Link href={`/certificates/${course.certificateId}`} target="_blank" className="block mt-2">
                                                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-black text-[10px] uppercase tracking-widest rounded-xl h-9 shadow-sm shadow-yellow-100 gap-2">
                                                        <Award className="h-3 w-3" />
                                                        View Certificate
                                                    </Button>
                                                </Link>
                                            )}
                                        </div>
                                        <Link href={`/courses/${course.id}/learn`} className="block">
                                            <Button className="w-full rounded-2xl bg-slate-900 text-white font-black py-7 group-hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200 group-hover:shadow-emerald-200">
                                                Continue Learning
                                                <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                                            </Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="mt-auto bg-slate-50 rounded-3xl p-6 text-center border-2 border-dashed border-slate-100 italic">
                                        <p className="text-xs font-bold text-slate-400">Please wait for admin approval to start this course.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
