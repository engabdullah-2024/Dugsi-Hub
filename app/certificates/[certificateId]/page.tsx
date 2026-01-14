import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Award, CheckCircle2, ShieldCheck, Globe, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PrintButton } from "@/components/print-button";

export default async function CertificatePage({
    params
}: {
    params: Promise<{ certificateId: string }>
}) {
    const { certificateId } = await params;

    const certificate = await db.certificate.findUnique({
        where: { id: certificateId },
        include: {
            user: true,
            course: true
        }
    });

    if (!certificate) {
        return notFound();
    }

    const formattedDate = new Date(certificate.issuedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center py-20 px-4 sm:px-6">
            {/* Action Bar */}
            <div className="max-w-[1000px] w-full mb-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center">
                        <Award className="h-5 w-5 text-white" />
                    </div>
                    <h1 className="text-xl font-black tracking-tighter text-slate-900 uppercase italic">Digital Credential</h1>
                </div>
                <div className="flex gap-4">
                    {/* In a real app, you'd use a PDF generation lib, for now we print */}
                    {/* In a real app, you'd use a PDF generation lib, for now we print */}
                    <PrintButton />
                    <Button className="rounded-full bg-slate-900 text-white font-black text-xs uppercase tracking-widest px-8 shadow-xl">
                        <Share2 className="mr-2 h-4 w-4" /> Share
                    </Button>
                </div>
            </div>

            {/* THE ACTUAL CERTIFICATE */}
            <div
                id="certificate-print"
                className="max-w-[1000px] w-full aspect-[1.414/1] bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] rounded-[3rem] p-16 relative overflow-hidden border-[12px] border-double border-slate-100 print:shadow-none print:rounded-none"
            >
                {/* Visual Ornaments */}
                <div className="absolute top-0 right-0 -m-20 h-[400px] w-[400px] rounded-full bg-indigo-500/5 blur-3xl" />
                <div className="absolute bottom-0 left-0 -m-20 h-[400px] w-[400px] rounded-full bg-purple-500/5 blur-3xl" />

                {/* Secure Border Pattern (Inner) */}
                <div className="absolute inset-8 border border-slate-50 rounded-[2rem] pointer-events-none" />

                <div className="h-full w-full flex flex-col items-center justify-between relative z-10 border-2 border-slate-50 rounded-[1.8rem] p-12 bg-white/50 backdrop-blur-sm shadow-inner">

                    {/* Header */}
                    <div className="w-full flex justify-between items-start">
                        <div className="flex items-center gap-3">
                            <div className="h-14 w-14 rounded-2xl bg-slate-900 flex items-center justify-center shadow-lg shadow-slate-200">
                                <ShieldCheck className="h-8 w-8 text-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-black text-slate-900 tracking-tighter leading-noneUppercase">DugsiHub</span>
                                <span className="text-[10px] font-black uppercase text-indigo-600 tracking-[0.3em] mt-1">Verified Credential</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Serial Number</p>
                            <p className="text-sm font-black text-slate-900 font-mono tracking-tighter">{certificate.certificateCode}</p>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="text-center space-y-12">
                        <div className="space-y-4">
                            <p className="text-xs font-black uppercase tracking-[0.4em] text-indigo-600">Certificate of Completion</p>
                            <h2 className="text-lg font-medium text-slate-500 italic">This is to successfully certify that</h2>
                        </div>

                        <h3 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase italic py-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 underline decoration-indigo-200 underline-offset-[12px] decoration-4">
                            {certificate.user.name || "Valued Student"}
                        </h3>

                        <div className="space-y-4">
                            <p className="text-lg font-medium text-slate-500">has successfully mastered all professional modules for the course</p>
                            <h4 className="text-3xl font-black text-indigo-600 tracking-tight leading-tight uppercase underline decoration-indigo-100 underline-offset-8">
                                {certificate.course.title}
                            </h4>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="w-full grid grid-cols-3 items-end pt-12">
                        {/* Signatures */}
                        <div className="space-y-2 border-t-2 border-slate-100 pt-3 max-w-[200px]">
                            <p className="font-outfit text-2xl font-black italic text-slate-800 opacity-80">Eng Abdalla Ali</p>
                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Lead Instructor</p>
                        </div>

                        {/* Seal */}
                        <div className="flex justify-center flex-shrink-0">
                            <div className="h-40 w-40 rounded-full border-4 border-slate-50 p-2 relative flex items-center justify-center bg-white shadow-2xl">
                                <div className="absolute inset-0 border-8 border-indigo-50/50 rounded-full flex items-center justify-center animate-spin-slow">
                                    <div className="h-full w-full border-t-8 border-indigo-100 rounded-full" />
                                </div>
                                <div className="h-full w-full rounded-full bg-indigo-600 flex flex-col items-center justify-center text-white p-4 text-center shadow-lg relative z-20">
                                    <Medal className="h-10 w-10 mb-1" />
                                    <p className="text-[8px] font-black uppercase tracking-widest leading-none">Official Distinguished Seal</p>
                                </div>
                            </div>
                        </div>

                        {/* Date & Verification */}
                        <div className="text-right space-y-6">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Issued Date</p>
                                <p className="text-sm font-black text-slate-900 uppercase">{formattedDate}</p>
                            </div>
                            <div className="inline-flex items-center gap-2 text-indigo-600 bg-indigo-50 px-4 py-2 rounded-2xl border border-indigo-100">
                                <CheckCircle2 className="h-4 w-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">DugsiHub Verified</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Verification Info */}
            <div className="mt-12 max-w-[800px] w-full bg-white rounded-3xl p-8 border-2 border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-emerald-600">
                        <Globe className="h-5 w-5" />
                        <h5 className="font-black text-sm uppercase tracking-widest">Public Verification</h5>
                    </div>
                    <p className="text-slate-500 font-medium text-sm leading-relaxed max-w-[400px]">
                        This certificate can be publicly verified using the serial number or QR code. It remains valid for lifetime as proof of professional excellence.
                    </p>
                </div>
                <div className="h-20 w-px bg-slate-100 hidden md:block" />
                <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Verification Link</p>
                    <p className="text-xs font-bold text-indigo-600 break-all bg-slate-50 px-4 py-2 rounded-xl">dugsihub.com/certificates/{certificate.id}</p>
                </div>
            </div>
        </div>
    );
}

const Medal = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15" /><path d="M11 12 5.12 2.2" /><path d="m13 12 5.88-9.8" /><path d="M8 7h8" /><circle cx="12" cy="17" r="5" /><path d="M12 18v-2" /></svg>
);
