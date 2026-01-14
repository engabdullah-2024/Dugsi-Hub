"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2, Trash2, Video } from "lucide-react";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    videoUrl: z.string().optional(),
    isFree: z.boolean(),
    isPublished: z.boolean(),
});

type LessonFormValues = z.infer<typeof formSchema>;

interface LessonFormProps {
    initialData: {
        id: string;
        title: string;
        description: string | null;
        videoUrl: string | null;
        isFree: boolean;
        isPublished: boolean;
    };
    courseId: string;
    lessonId: string;
}

export const LessonForm = ({
    initialData,
    courseId,
    lessonId
}: LessonFormProps) => {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const form = useForm<LessonFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialData?.title || "",
            description: initialData?.description || "",
            videoUrl: initialData?.videoUrl || "",
            isFree: !!initialData?.isFree,
            isPublished: !!initialData?.isPublished,
        },
    });

    const { isSubmitting } = form.formState;

    const onSubmit = async (values: LessonFormValues) => {
        try {
            await axios.patch(`/api/courses/${courseId}/lessons/${lessonId}`, values);
            toast.success("Chapter updated");
            router.push(`/admin/courses/${courseId}`);
            router.refresh();
        } catch {
            toast.error("Something went wrong");
        }
    };

    const onDelete = async () => {
        try {
            setIsDeleting(true);
            await axios.delete(`/api/courses/${courseId}/lessons/${lessonId}`);
            toast.success("Chapter deleted");
            router.push(`/admin/courses/${courseId}`);
            router.refresh();
        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-10 bg-card border-2 border-primary/5 rounded-[3rem] shadow-2xl">
            <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl font-black italic tracking-tighter">Edit Chapter</h2>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onDelete}
                    disabled={isDeleting || isSubmitting}
                    className="rounded-2xl text-destructive hover:bg-destructive/10"
                >
                    <Trash2 className="h-5 w-5 mr-2" />
                    Delete
                </Button>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-black uppercase tracking-widest text-[10px] text-primary">Chapter Title</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isSubmitting}
                                        className="rounded-2xl border-2 py-6 px-6 font-bold"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-black uppercase tracking-widest text-[10px] text-primary">Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        disabled={isSubmitting}
                                        className="rounded-[2rem] border-2 p-6 font-medium min-h-[120px]"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="videoUrl"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center gap-x-2">
                                    <Video className="h-4 w-4 text-primary" />
                                    <FormLabel className="font-black uppercase tracking-widest text-[10px] text-primary">Video URL / Link</FormLabel>
                                </div>
                                <FormControl>
                                    <Input
                                        disabled={isSubmitting}
                                        placeholder="YouTube, Vimeo, or direct link"
                                        className="rounded-2xl border-2 py-6 px-6 font-bold"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FormField
                            control={form.control}
                            name="isFree"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-[2rem] border-2 p-6 bg-muted/30">
                                    <div className="space-y-0.5">
                                        <FormLabel className="font-black uppercase tracking-widest text-[10px] text-primary">Free Preview</FormLabel>
                                        <FormDescription className="text-[10px] font-bold">
                                            Check this to make it free.
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <input
                                            type="checkbox"
                                            className="h-6 w-6 rounded-lg accent-emerald-500 cursor-pointer"
                                            checked={field.value}
                                            onChange={field.onChange}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="isPublished"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-[2rem] border-2 p-6 bg-muted/30">
                                    <div className="space-y-0.5">
                                        <FormLabel className="font-black uppercase tracking-widest text-[10px] text-primary">Published</FormLabel>
                                        <FormDescription className="text-[10px] font-bold">
                                            Make this live in the course.
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <input
                                            type="checkbox"
                                            className="h-6 w-6 rounded-lg accent-primary cursor-pointer"
                                            checked={field.value}
                                            onChange={field.onChange}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="pt-6">
                        <Button
                            disabled={isSubmitting}
                            className="w-full rounded-full py-8 text-lg font-black shadow-xl"
                            type="submit"
                        >
                            {isSubmitting ? <Loader2 className="h-6 w-6 animate-spin" /> : "Save Chapter"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};
