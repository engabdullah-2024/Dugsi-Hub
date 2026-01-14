import { db } from "@/lib/prisma";
import {
    CreditCard,
    User as UserIcon,
    BookOpen,
    Search,
    Calendar,
    Plus,
    CheckCircle2,
    Clock,
    XCircle,
    AlertCircle,
    ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ManualEnrollmentModal } from "./_components/manual-enrollment-modal";
import { EnrollmentActions } from "./_components/enrollment-actions";

export default async function AdminSalesPage() {
    const enrollments = await db.enrollment.findMany({
        include: {
            user: true,
            course: true,
        },
        orderBy: { enrolledAt: "desc" },
    });

    const users = await db.user.findMany({
        where: { role: "STUDENT" },
        select: { id: true, name: true, email: true }
    });

    const courses = await db.course.findMany({
        select: { id: true, title: true, price: true }
    });

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header with Security Notice */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 -m-12 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
                <div className="relative z-10 space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-emerald-400 border border-white/10">
                        <ShieldCheck className="h-4 w-4" />
                        Security Level: SuperAdmin
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter">Sales & Access Hub</h1>
                    <p className="max-w-md text-white/60 font-medium">Verify student payments manually before granting access. Use the "Reject" button to revoke access if payment is disputed.</p>
                </div>
                <div className="relative z-10 flex flex-col gap-3">
                    <ManualEnrollmentModal users={users} courses={courses} />
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase text-white/40 tracking-[0.2em] bg-white/5 p-3 rounded-2xl border border-white/5">
                        <AlertCircle className="h-3 w-3 text-orange-400" />
                        Don't approve until payment is confirmed
                    </div>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="rounded-3xl border-2 bg-white p-6 shadow-sm border-slate-50">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Revenue</p>
                    <h3 className="text-2xl font-black text-emerald-600">${enrollments.filter((e: any) => e.status === "ACTIVE").reduce((acc: number, curr: any) => acc + (curr.course.price || 0), 0).toFixed(2)}</h3>
                </div>
                <div className="rounded-3xl border-2 bg-white p-6 shadow-sm border-slate-50">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Students</p>
                    <h3 className="text-2xl font-black text-indigo-600">{enrollments.filter((e: any) => e.status === "ACTIVE").length}</h3>
                </div>
                <div className="rounded-3xl border-2 bg-white p-6 shadow-sm border-orange-100 bg-orange-50/10">
                    <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-1">Pending Orders</p>
                    <h3 className="text-2xl font-black text-orange-600">{enrollments.filter((e: any) => e.status === "PENDING").length}</h3>
                </div>
                <div className="rounded-3xl border-2 bg-white p-6 shadow-sm border-red-100 bg-red-50/10">
                    <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-1">Rejected/Revoked</p>
                    <h3 className="text-2xl font-black text-red-600">{enrollments.filter((e: any) => e.status === "REJECTED").length}</h3>
                </div>
            </div>

            {/* Sales Table */}
            <div className="rounded-[2.5rem] border-2 bg-white shadow-xl overflow-hidden border-slate-50">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm font-outfit">
                        <thead className="bg-slate-50 border-b text-slate-400 font-black uppercase tracking-widest text-[10px]">
                            <tr>
                                <th className="px-8 py-6">Student Info</th>
                                <th className="px-8 py-6">Course Item</th>
                                <th className="px-8 py-6">Amount</th>
                                <th className="px-8 py-6">Date</th>
                                <th className="px-8 py-6">Control Panel</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {enrollments.map((enrollment: any) => (
                                <tr key={enrollment.id} className="hover:bg-slate-50 transition-all group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="h-11 w-11 flex-shrink-0 rounded-2xl bg-slate-100 overflow-hidden border-2 border-white shadow-sm transition-transform group-hover:scale-110">
                                                {enrollment.user.imageUrl ? (
                                                    <img src={enrollment.user.imageUrl} alt="" className="h-full w-full object-cover" />
                                                ) : (
                                                    <div className="h-full w-full flex items-center justify-center bg-indigo-100 text-indigo-600 uppercase font-black text-xs">
                                                        {enrollment.user.name?.[0] || enrollment.user.email[0]}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-900 leading-tight">{enrollment.user.name || "Anonymous Student"}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{enrollment.user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="space-y-1">
                                            <p className="font-black text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors uppercase text-[11px] tracking-tight">{enrollment.course.title}</p>
                                            <div className="flex items-center gap-2">
                                                <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Course ID: {enrollment.course.id.slice(-6)}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700 border border-emerald-100 shadow-sm">
                                            ${enrollment.course.price?.toFixed(2) || "0.00"}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <p className="font-black text-slate-700 text-xs">{new Date(enrollment.enrolledAt).toLocaleDateString()}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">{new Date(enrollment.enrolledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col gap-3">
                                            {enrollment.status === "ACTIVE" ? (
                                                <div className="flex items-center justify-between gap-4">
                                                    <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-600 border border-emerald-500/10">
                                                        <CheckCircle2 className="h-3.5 w-3.5" />
                                                        Watching Lessons
                                                    </div>
                                                    <EnrollmentActions enrollmentId={enrollment.id} status={enrollment.status} />
                                                </div>
                                            ) : enrollment.status === "PENDING" ? (
                                                <div className="space-y-2">
                                                    <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-orange-600 border border-orange-500/10 w-fit animate-pulse">
                                                        <Clock className="h-3.5 w-3.5" />
                                                        Verify Payment Now
                                                    </div>
                                                    <EnrollmentActions enrollmentId={enrollment.id} status={enrollment.status} />
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-between gap-4">
                                                    <div className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-red-600 border border-red-500/10">
                                                        <XCircle className="h-3.5 w-3.5" />
                                                        Access Revoked
                                                    </div>
                                                    <EnrollmentActions enrollmentId={enrollment.id} status={enrollment.status} />
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

const GraduationCap = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
);
