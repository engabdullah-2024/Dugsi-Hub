"use client";

import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";

interface CourseProgressButtonProps {
    courseId: string;
    lessonId: string;
    isCompleted?: boolean;
    nextLessonId?: string;
}

export const CourseProgressButton = ({
    courseId,
    lessonId,
    isCompleted,
    nextLessonId
}: CourseProgressButtonProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);

            await axios.put(`/api/courses/${courseId}/lessons/${lessonId}/progress`, {
                isCompleted: !isCompleted
            });

            if (!isCompleted && nextLessonId) {
                router.push(`/courses/${courseId}/learn?lessonId=${nextLessonId}`);
            }

            toast.success("Progress updated");
            router.refresh();
        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    const Icon = isCompleted ? XCircle : CheckCircle;

    return (
        <Button
            onClick={onClick}
            disabled={isLoading}
            type="button"
            variant={isCompleted ? "outline" : "default"}
            className="w-full md:w-auto rounded-full font-bold shadow-md"
        >
            {isCompleted ? "Mark as Not Complete" : "Mark as Complete"}
            <Icon className="h-4 w-4 ml-2" />
        </Button>
    )
}
