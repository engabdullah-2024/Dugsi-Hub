"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ApproveEnrollmentButtonProps {
    enrollmentId: string;
}

export const ApproveEnrollmentButton = ({ enrollmentId }: ApproveEnrollmentButtonProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onApprove = async () => {
        try {
            setIsLoading(true);
            await axios.patch(`/api/enrollments/${enrollmentId}/approve`);
            toast.success("Enrollment approved successfully!");
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            onClick={onApprove}
            disabled={isLoading}
            size="sm"
            className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-xs font-black shadow-lg shadow-emerald-500/20"
        >
            {isLoading ? (
                <Loader2 className="h-3 w-3 animate-spin mr-2" />
            ) : (
                <CheckCircle2 className="h-3 w-3 mr-2" />
            )}
            Approve Access
        </Button>
    );
};
