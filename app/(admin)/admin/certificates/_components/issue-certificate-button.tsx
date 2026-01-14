"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Award, Loader2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface IssueCertificateButtonProps {
    userId: string;
    courseId: string;
    isDisabled: boolean;
}

export const IssueCertificateButton = ({
    userId,
    courseId,
    isDisabled
}: IssueCertificateButtonProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onIssue = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post("/api/certificates", {
                userId,
                courseId
            });

            toast.success("Certificate Issued Successfully! 🎓", {
                style: {
                    borderRadius: '10px',
                    background: '#0f172a',
                    color: '#fff',
                },
                icon: '👏'
            });

            router.refresh();
        } catch (error: any) {
            toast.error(error.response?.data || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            onClick={onIssue}
            disabled={isLoading || isDisabled}
            size="sm"
            className={`rounded-full font-black text-[10px] uppercase gap-2 transition-all shadow-lg ${isDisabled
                    ? "bg-slate-100 text-slate-400"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200"
                }`}
        >
            {isLoading ? (
                <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
                <Award className="h-3.5 w-3.5" />
            )}
            Issue Certificate
        </Button>
    );
};
