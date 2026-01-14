"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

interface AutoRedirectProps {
    courseId: string;
}

export const AutoRedirect = ({ courseId }: AutoRedirectProps) => {
    const router = useRouter();

    useEffect(() => {
        let isApproved = false;

        const checkStatus = async () => {
            try {
                const response = await axios.get(`/api/courses/${courseId}/enrollment-status`);
                if (response.data.status === "ACTIVE") {
                    isApproved = true;
                    toast.success("Access Granted! Opening course...", {
                        icon: '🎉',
                        duration: 5000
                    });
                    router.push(`/courses/${courseId}/learn`);
                }

                if (response.data.status === "REJECTED") {
                    isApproved = true; // Stop polling
                    toast.error("Payment Verification Failed. Access Denied.");
                    router.push("/dashboard");
                }
            } catch (error) {
                console.error("Status check failed", error);
            }
        };

        // Poll every 3 seconds
        const interval = setInterval(() => {
            if (!isApproved) {
                checkStatus();
            } else {
                clearInterval(interval);
            }
        }, 3000);

        // Initial check
        checkStatus();

        return () => clearInterval(interval);
    }, [courseId, router]);

    return (
        <div className="mt-4 flex flex-col items-center gap-4 bg-white/50 backdrop-blur-sm p-6 rounded-3xl border-2 border-emerald-500/20 shadow-xl">
            <div className="flex items-center gap-3 text-emerald-700 font-black text-lg animate-pulse">
                <div className="relative flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
                </div>
                Payment Secured! 🛡️
            </div>

            <div className="space-y-2 text-center">
                <p className="text-sm font-bold text-emerald-800">
                    Waiting for Admin Verification...
                </p>
                <p className="text-[10px] text-muted-foreground font-medium italic max-w-[250px]">
                    To protect our students and prevent fraud, an admin will verify your purchase within minutes.
                    <span className="block mt-1 text-primary font-bold">This page will open naturally once approved.</span>
                </p>
            </div>
        </div>
    );
};
