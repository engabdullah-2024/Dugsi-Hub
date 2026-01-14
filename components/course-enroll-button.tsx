"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";

interface CourseEnrollButtonProps {
    courseId: string;
    price: number;
}

export function CourseEnrollButton({
    courseId,
    price,
}: CourseEnrollButtonProps) {
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);

            if (price === 0) {
                // Free enrollment
                const response = await axios.post(`/api/courses/${courseId}/enroll`);
                window.location.assign(`/courses/${courseId}?success=1`);
                return;
            }

            // Paid enrollment via Stripe
            const response = await axios.post(`/api/courses/${courseId}/checkout`);
            window.location.assign(response.data.url);
        } catch (error: any) {
            console.error("Enrollment error:", error);
            let errorMessage = "Something went wrong";

            if (axios.isAxiosError(error) && error.response) {
                // Specific error from the API
                errorMessage = error.response.data.message || error.response.data || errorMessage;
                console.error("API Error Details:", error.response.data);
            } else if (error instanceof Error) {
                // General JavaScript error
                errorMessage = error.message;
            }

            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            onClick={onClick}
            disabled={isLoading}
            className="w-full rounded-full py-6 text-lg font-black shadow-lg hover:scale-105 transition-all"
            size="lg"
        >
            {price === 0 ? "Enroll Now" : "Buy For Now"}
        </Button>
    );
}
