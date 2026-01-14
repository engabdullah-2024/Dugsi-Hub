import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
import {
    Award,
    CheckCircle2,
    Search,
    User,
    BookOpen,
    ExternalLink,
    Plus,
    Clock,
    Medal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IssueCertificateButton } from "./_components/issue-certificate-button";

export default async function AdminCertificatesPage() {
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
        return redirect("/");
    }

    const dbUser = await db.user.findUnique({
        where: { userId: clerkUserId }
    });

    if (dbUser?.role !== "SUPERADMIN") {
        return redirect("/");
    }

    // Fetch enrollments with lessons and progress to determine completion
    // This is a bit heavy, but fine for admin
    const enrollments = await db.enrollment.findMany({
        where: {
            status: "ACTIVE"
        },
        include: {
            user: {
                include: {
                    progress: true
                }
            },
            course: {
                include: {
                    lessons: {
                        where: { isPublished: true },
                        select: { id: true }
                    },
                    certificates: true
                }
            }
        },
        orderBy: {
            enrolledAt: "desc"
        }
    });

    const completionData = enrollments.map((env: any) => {
        const totalLessons = env.course.lessons.length;
        const userProgress = env.user.progress.filter((p: any) =>
            env.course.lessons.some((l: any) => l.id === p.lessonId) && p.isCompleted
        );
        const completedCount = userProgress.length;
        const percentage = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

        // Find if they already have a certificate for this course
        const certificate = env.course.certificates.find((c: any) => c.userId === env.userId);
        const hasCertificate = !!certificate;

        return {
            enrollmentId: env.id,
            userId: env.userId,
            userName: env.user.name || env.user.email,
            userEmail: env.user.email,
            userImageUrl: env.user.imageUrl,
            courseId: env.courseId,
            courseTitle: env.course.title,
            percentage,
            hasCertificate,
            certificateId: certificate?.id,
            certificateCode: certificate?.certificateCode
        };
    });

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 -m-12 h-64 w-64 rounded-full bg-yellow-500/10 blur-3xl" />
                <div className="relative z-10 space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-yellow-400 border border-white/10">
                        <Award className="h-4 w-4" />
                        Certification Center
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter">Award Excellence</h1>
                    <p className="max-w-md text-white/60 font-medium">Verify course completion and issue official digital certificates to your top students.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="rounded-3xl border-2 bg-white p-6 shadow-sm border-slate-50">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Certificates</p>
                    <h3 className="text-2xl font-black text-slate-900">{completionData.filter((d: any) => d.hasCertificate).length}</h3>
                </div>
                <div className="rounded-3xl border-2 bg-white p-6 shadow-sm border-emerald-50 bg-emerald-50/10">
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Ready to Award (100%)</p>
                    <h3 className="text-2xl font-black text-emerald-600">{completionData.filter((d: any) => d.percentage === 100 && !d.hasCertificate).length}</h3>
                </div>
                <div className="rounded-3xl border-2 bg-white p-6 shadow-sm border-indigo-50 bg-indigo-50/10">
                    <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">Active Learners</p>
                    <h3 className="text-2xl font-black text-indigo-600">{completionData.length}</h3>
                </div>
            </div>

            <div className="rounded-[2.5rem] border-2 bg-white shadow-xl overflow-hidden border-slate-50">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm font-outfit">
                        <thead className="bg-slate-50 border-b text-slate-400 font-black uppercase tracking-widest text-[10px]">
                            <tr>
                                <th className="px-8 py-6">Student</th>
                                <th className="px-8 py-6">Course</th>
                                <th className="px-8 py-6">Completion</th>
                                <th className="px-8 py-6">Status</th>
                                <th className="px-8 py-6">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {completionData.map((data: any) => (
                                <tr key={`${data.userId}-${data.courseId}`} className="hover:bg-slate-50 transition-all group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="h-11 w-11 flex-shrink-0 rounded-2xl bg-slate-100 overflow-hidden border-2 border-white shadow-sm">
                                                {data.userImageUrl ? (
                                                    <img src={data.userImageUrl} alt="" className="h-full w-full object-cover" />
                                                ) : (
                                                    <div className="h-full w-full flex items-center justify-center bg-indigo-100 text-indigo-600 uppercase font-black text-xs">
                                                        {data.userName[0]}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-900 leading-tight">{data.userName}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{data.userEmail}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="space-y-1">
                                            <p className="font-black text-slate-800 uppercase text-[11px] tracking-tight">{data.courseTitle}</p>
                                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                                                <BookOpen className="h-3 w-3" />
                                                {data.percentage === 100 ? "Completed" : "In Progress"}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-[10px] font-black uppercase text-slate-400">
                                                <span>{Math.round(data.percentage)}%</span>
                                            </div>
                                            <div className="h-2 w-32 bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full transition-all duration-500 ${data.percentage === 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                                                    style={{ width: `${data.percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        {data.hasCertificate ? (
                                            <div className="inline-flex items-center gap-1.5 rounded-full bg-yellow-500/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-yellow-600 border border-yellow-500/10">
                                                <Medal className="h-3.5 w-3.5" />
                                                Issued: {data.certificateCode}
                                            </div>
                                        ) : data.percentage === 100 ? (
                                            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-600 border border-emerald-500/10">
                                                <CheckCircle2 className="h-3.5 w-3.5" />
                                                Eligible
                                            </div>
                                        ) : (
                                            <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 border border-slate-100 font-medium">
                                                <Clock className="h-3.5 w-3.5" />
                                                Learning
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-8 py-6">
                                        {data.hasCertificate ? (
                                            <Link href={`/certificates/${data.certificateId}`} target="_blank">
                                                <Button size="sm" variant="ghost" className="rounded-full text-indigo-600 font-black text-[10px] uppercase gap-2">
                                                    View Certificate
                                                    <ExternalLink className="h-3 w-3" />
                                                </Button>
                                            </Link>
                                        ) : (
                                            <IssueCertificateButton
                                                userId={data.userId}
                                                courseId={data.courseId}
                                                isDisabled={data.percentage < 100}
                                            />
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {completionData.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">
                                        No active enrollments found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
