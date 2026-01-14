"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, XCircle, RefreshCw } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface EnrollmentActionsProps {
    enrollmentId: string;
    status: "PENDING" | "ACTIVE" | "REJECTED";
}

export const EnrollmentActions = ({ enrollmentId, status }: EnrollmentActionsProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onApprove = async () => {
        try {
            setIsLoading(true);
            await axios.patch(`/api/enrollments/${enrollmentId}/approve`);
            toast.success("Access unlocked for student! 🔓", {
                icon: "✅",
                style: {
                    borderRadius: '10px',
                    background: '#059669',
                    color: '#fff',
                },
            });
            router.refresh();
        } catch (error) {
            toast.error("Process failed");
        } finally {
            setIsLoading(false);
        }
    };

    const onReject = async () => {
        if (!confirm("Are you sure you want to DISAPPROVE/REJECT this student? They will lose access immediately.")) return;

        try {
            setIsLoading(true);
            await axios.patch(`/api/enrollments/${enrollmentId}/reject`);
            toast.error("Enrollment Rejected & Closed ❌", {
                style: {
                    borderRadius: '10px',
                    background: '#dc2626',
                    color: '#fff',
                },
            });
            router.refresh();
        } catch (error) {
            toast.error("Failed to reject");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center gap-2">
            {status !== "ACTIVE" && (
                <Button
                    onClick={onApprove}
                    disabled={isLoading}
                    size="sm"
                    className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-[10px] font-black uppercase shadow-[0_8px_20px_rgba(16,185,129,0.2)]"
                >
                    {isLoading ? (
                        <Loader2 className="h-3 w-3 animate-spin mr-1.5" />
                    ) : (
                        <CheckCircle2 className="h-3 w-3 mr-1.5" />
                    )}
                    Verify & Approve
                </Button>
            )}

            {status !== "REJECTED" && (
                <Button
                    onClick={onReject}
                    disabled={isLoading}
                    variant="outline"
                    size="sm"
                    className="rounded-full border-2 border-red-100 text-red-600 hover:bg-red-50 text-[10px] font-black uppercase"
                >
                    {isLoading ? (
                        <Loader2 className="h-3 w-3 animate-spin mr-1.5" />
                    ) : (
                        <XCircle className="h-3 w-3 mr-1.5" />
                    )}
                    {status === "ACTIVE" ? "Revoke Access" : "Reject Order"}
                </Button>
            )}

            {status === "REJECTED" && (
                <Button
                    onClick={onApprove}
                    disabled={isLoading}
                    variant="ghost"
                    size="sm"
                    className="rounded-full text-slate-500 hover:text-emerald-600 text-[10px] font-black uppercase gap-1.5"
                >
                    <RefreshCw className={cn("h-3 w-3", isLoading && "animate-spin")} />
                    Re-verify Student
                </Button>
            )}
        </div>
    );
};
