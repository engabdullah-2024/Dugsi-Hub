"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, PlusCircle, Grip, Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lesson } from "@prisma/client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface ChaptersFormProps {
    initialData: {
        lessons: Lesson[];
    };
    courseId: string;
}

const formSchema = z.object({
    title: z.string().min(1),
});

export const ChaptersForm = ({
    initialData,
    courseId
}: ChaptersFormProps) => {
    const [isCreating, setIsCreating] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const toggleCreating = () => {
        setIsCreating((current) => !current);
    };

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/courses/${courseId}/lessons`, values);
            toast.success("Chapter created");
            toggleCreating();
            form.reset();
            router.refresh();
        } catch {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="rounded-[2rem] border-2 bg-card p-8 shadow-xl space-y-8 border-primary/5">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-xl font-black italic tracking-tighter">Course Chapters</h2>
                    <p className="text-xs text-muted-foreground font-medium">Manage your chapters and content.</p>
                </div>
                <Button onClick={toggleCreating} variant="ghost" className="rounded-2xl hover:bg-primary/5 font-bold">
                    {isCreating ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2 text-primary" />
                            Add Chapter
                        </>
                    )}
                </Button>
            </div>

            {isCreating && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4 bg-muted/30 p-6 rounded-[2rem] border-2 border-dashed border-primary/20"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'Introduction to the course'"
                                            className="rounded-2xl border-2 py-6 px-6 font-bold focus-visible:ring-primary/10"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            disabled={!isValid || isSubmitting}
                            type="submit"
                            className="w-full rounded-2xl py-6 font-black shadow-lg"
                        >
                            Create Chapter
                        </Button>
                    </form>
                </Form>
            )}

            {!isCreating && (
                <div className={cn(
                    "text-sm mt-2 space-y-3",
                    !initialData.lessons.length && "text-muted-foreground italic bg-muted/20 p-10 rounded-[2rem] border-2 border-dashed flex flex-col items-center text-center"
                )}>
                    {!initialData.lessons.length && (
                        <>
                            <p className="font-medium">No chapters yet. Add one to get started.</p>
                            <Button onClick={toggleCreating} variant="link" className="text-primary font-black mt-2">
                                Click here to add your first chapter
                            </Button>
                        </>
                    )}
                    {initialData.lessons.map((lesson) => (
                        <div
                            key={lesson.id}
                            className="flex items-center gap-x-4 bg-muted/30 border-2 border-primary/5 p-4 rounded-3xl group hover:border-primary/20 transition-all hover:shadow-md"
                        >
                            <div className="h-8 w-8 rounded-xl bg-primary text-white flex items-center justify-center font-black text-xs shadow-sm">
                                {lesson.position}
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-foreground group-hover:text-primary transition-colors">
                                    {lesson.title}
                                </p>
                                {lesson.isFree && (
                                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                                        Free Preview
                                    </span>
                                )}
                            </div>
                            <div className="ml-auto flex items-center gap-x-2">
                                <span className={cn(
                                    "text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full",
                                    lesson.isPublished ? "bg-emerald-500/10 text-emerald-600" : "bg-orange-500/10 text-orange-600"
                                )}>
                                    {lesson.isPublished ? "Published" : "Draft"}
                                </span>
                                <Link href={`/admin/courses/${courseId}/lessons/${lesson.id}`}>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-primary/10 text-primary"
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {!isCreating && initialData.lessons.length > 0 && (
                <p className="text-xs text-muted-foreground mt-4 font-bold italic opacity-60">
                    Drag and drop to reorder chapters (Coming soon).
                </p>
            )}
        </div>
    );
};
