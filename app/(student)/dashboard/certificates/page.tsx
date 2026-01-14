import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/prisma";
import { Award, Download, ExternalLink, Calendar, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function CertificatesPage() {
    const user = await currentUser();

    if (!user) {
        return redirect("/");
    }

    const dbUser = await db.user.findUnique({
        where: { userId: user.id },
        include: {
            certificates: {
                include: {
                    course: {
                        include: {
                            category: true
                        }
                    }
                },
                orderBy: {
                    issuedAt: "desc"
                }
            }
        }
    });

    if (!dbUser) {
        return redirect("/");
    }

    const certificates = dbUser.certificates;

    return (
        <div className="p-8 space-y-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4 max-w-2xl">
                    <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-amber-600 border border-amber-100">
                        <Award className="h-3.5 w-3.5" />
                        Official Credentials
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 leading-tight">
                        Your <span className="text-amber-500 italic">Hall of Fame</span>
                    </h1>
                    <p className="text-lg font-medium text-slate-500">
                        Showcase your verified skills. View, download, and share your professional certifications with the world.
                    </p>
                </div>
            </div>

            {/* Certificates Grid */}
            {certificates.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-[3rem] border-4 border-dashed bg-white p-20 text-center shadow-sm border-slate-100">
                    <div className="mb-6 rounded-3xl bg-amber-50 p-8 flex items-center justify-center">
                        <Award className="h-12 w-12 text-amber-400 opacity-40" />
                    </div>
                    <h3 className="text-2xl font-black mb-2 text-slate-900">No Certificates Yet</h3>
                    <p className="mb-8 text-slate-500 max-w-md mx-auto font-medium">
                        Complete courses to earn verified credentials and build your portfolio.
                    </p>
                    <Link href="/courses">
                        <Button className="rounded-full px-10 py-6 text-lg font-black shadow-xl hover:scale-105 transition-all bg-slate-900 text-white hover:bg-slate-800" size="lg">Start Learning</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {certificates.map((cert) => (
                        <div key={cert.id} className="group relative bg-white rounded-[2.5rem] border-2 border-slate-50 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col">
                            {/* Certificate Preview Mockup */}
                            <div className="aspect-[1.414/1] bg-slate-100 relative p-6 flex flex-col items-center justify-center overflow-hidden border-b border-slate-100">
                                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-200 via-slate-100 to-transparent" />

                                <div className="w-[80%] h-[80%] bg-white shadow-xl flex flex-col items-center justify-center p-4 border border-slate-200 relative transform transition-transform duration-700 group-hover:scale-105">
                                    {/* Mini Mockup Content */}
                                    <div className="absolute top-0 right-0 h-16 w-16 bg-amber-500/10 rounded-bl-full" />
                                    <Award className="h-8 w-8 text-amber-500 mb-2" />
                                    <div className="h-1 w-12 bg-slate-200 mb-2" />
                                    <div className="h-1 w-24 bg-slate-100" />

                                    <div className="absolute bottom-4 right-4 h-6 w-6 rounded-full bg-amber-500 flex items-center justify-center text-white">
                                        <CheckCircle2 className="h-3 w-3" />
                                    </div>
                                </div>

                                <Link
                                    href={`/certificates/${cert.id}`}
                                    className="absolute inset-0 flex items-center justify-center bg-slate-900/0 group-hover:bg-slate-900/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300"
                                >
                                    <Button className="rounded-full bg-white text-slate-900 font-black hover:bg-slate-50">
                                        View Full Preview
                                    </Button>
                                </Link>
                            </div>

                            {/* Details */}
                            <div className="p-8 space-y-6 flex-1 flex flex-col">
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-[10px] uppercase font-black tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                                            Verified
                                        </span>
                                        <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-widest">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(cert.issuedAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-black text-slate-900 leading-tight mb-1 group-hover:text-amber-500 transition-colors">
                                        {cert.course.title}
                                    </h3>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                        {cert.course.category.name}
                                    </p>
                                </div>

                                <div className="mt-auto grid grid-cols-2 gap-3 pt-4 border-t border-slate-50">
                                    <Link href={`/certificates/${cert.id}`} className="w-full">
                                        <Button variant="outline" className="w-full rounded-xl border-2 border-slate-100 bg-slate-50 hover:bg-white hover:border-amber-200 text-slate-600 font-bold text-xs h-12">
                                            <ExternalLink className="h-3.5 w-3.5 mr-2" />
                                            Verify
                                        </Button>
                                    </Link>
                                    <Link href={`/certificates/${cert.id}`} target="_blank" className="w-full">
                                        <Button className="w-full rounded-xl bg-slate-900 text-white hover:bg-amber-500 font-bold text-xs h-12 shadow-lg shadow-slate-200 group-hover:shadow-amber-200 transition-all">
                                            <Download className="h-3.5 w-3.5 mr-2" />
                                            Download
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
