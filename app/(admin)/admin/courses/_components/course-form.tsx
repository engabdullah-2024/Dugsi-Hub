"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2, Trash2 } from "lucide-react";

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
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().optional(),
    price: z.number().min(0),
    imageUrl: z.string().optional(),
    published: z.boolean(),
});

type CourseFormValues = z.infer<typeof formSchema>;

interface CourseFormProps {
    initialData: {
        id: string;
        title: string;
        description: string | null;
        price: number | null;
        imageUrl: string | null;
        published: boolean;
    };
}

export const CourseForm = ({ initialData }: CourseFormProps) => {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const form = useForm<CourseFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialData.title || "",
            description: initialData.description || "",
            price: initialData.price || 0,
            imageUrl: initialData.imageUrl || "",
            published: initialData.published || false,
        },
    });

    const { isSubmitting } = form.formState;

    const onSubmit = async (values: CourseFormValues) => {
        try {
            await axios.patch(`/api/courses/${initialData.id}`, values);
            toast.success("Course updated");
            router.push(`/admin/courses/${initialData.id}`);
            router.refresh();
        } catch {
            toast.error("Something went wrong");
        }
    };

    const onDelete = async () => {
        try {
            setIsDeleting(true);
            await axios.delete(`/api/courses/${initialData.id}`);
            toast.success("Course deleted");
            router.push(`/admin/courses`);
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
                <h2 className="text-3xl font-black italic tracking-tighter">Edit Course Details</h2>
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
                                <FormLabel className="font-black uppercase tracking-widest text-[10px] text-primary">Course Title</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isSubmitting}
                                        placeholder="e.g. 'Advanced Next.js Mastery'"
                                        className="rounded-2xl border-2 py-6 px-6 font-bold focus-visible:ring-primary/10"
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
                                        placeholder="What will students learn?"
                                        className="rounded-[2rem] border-2 p-6 font-medium min-h-[150px] focus-visible:ring-primary/10"
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
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-black uppercase tracking-widest text-[10px] text-primary">Price ($)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            disabled={isSubmitting}
                                            placeholder="0.00"
                                            className="rounded-2xl border-2 py-6 px-6 font-bold focus-visible:ring-primary/10"
                                            value={field.value}
                                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="published"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-[2rem] border-2 p-6 bg-muted/30">
                                    <div className="space-y-0.5">
                                        <FormLabel className="font-black uppercase tracking-widest text-[10px] text-primary">Publish Status</FormLabel>
                                        <FormDescription className="text-[10px] font-bold">
                                            Make this course visible to students.
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <input
                                            type="checkbox"
                                            className="h-6 w-6 rounded-lg border-2 border-primary accent-primary cursor-pointer"
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
                            className="w-full rounded-full py-8 text-lg font-black shadow-xl transition-all hover:scale-102"
                            type="submit"
                        >
                            {isSubmitting ? <Loader2 className="h-6 w-6 animate-spin" /> : "Save Changes"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};
