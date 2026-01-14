"use client"

import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    categoryId: z.string().min(1, { message: "Category is required" }),
    price: z.string().min(1, { message: "Price is required" }),
    imageType: z.enum(["link", "local"]),
    imageUrl: z.string().min(1, { message: "Image link or path is required" }),
});

interface CreateCourseFormProps {
    categories: { id: string; name: string }[];
}

export function CreateCourseForm({ categories }: CreateCourseFormProps) {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            categoryId: "",
            price: "0",
            imageType: "link",
            imageUrl: "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post("/api/courses", values);
            toast.success("Course created successfully!");
            router.push("/admin/courses");
            router.refresh();
        } catch {
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Course Title</FormLabel>
                            <FormControl>
                                <Input disabled={isSubmitting} placeholder="e.g. 'Advanced Web Development'" {...field} />
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
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea disabled={isSubmitting} placeholder="What will students learn in this course?" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price ($)</FormLabel>
                                <FormControl>
                                    <Input type="number" step="0.01" disabled={isSubmitting} placeholder="0.00" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="space-y-4 rounded-lg border p-4 bg-muted/30">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Media Assets</h3>

                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="imageType"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Thumbnail Auth</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex gap-4"
                                        >
                                            <FormItem className="flex items-center space-x-2 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="link" />
                                                </FormControl>
                                                <FormLabel className="font-normal">URL Link</FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-2 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="local" />
                                                </FormControl>
                                                <FormLabel className="font-normal">Local Path</FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input disabled={isSubmitting} placeholder={form.watch("imageType") === "link" ? "https://example.com/image.jpg" : "/uploads/courses/image.jpg"} {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        {form.watch("imageType") === "link" ? "Enter a valid image URL" : "Enter the relative path from public directory"}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-x-2">
                    <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
                    <Button type="submit" disabled={!isValid || isSubmitting} className="rounded-full px-8">
                        Create Course
                    </Button>
                </div>
            </form>
        </Form>
    );
}
