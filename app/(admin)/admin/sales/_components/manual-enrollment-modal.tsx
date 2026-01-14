"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    Plus,
    Search,
    User as UserIcon,
    BookOpen,
    Loader2,
    CheckCircle2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ManualEnrollmentModalProps {
    users: { id: string; name: string | null; email: string }[];
    courses: { id: string; title: string; price: number | null }[];
}

export const ManualEnrollmentModal = ({ users, courses }: ManualEnrollmentModalProps) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [selectedUserId, setSelectedUserId] = useState("");
    const [selectedCourseId, setSelectedCourseId] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [searchCourseTerm, setSearchCourseTerm] = useState("");

    const filteredUsers = users.filter(u =>
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (u.name && u.name.toLowerCase().includes(searchTerm.toLowerCase()))
    ).slice(0, 5);

    const filteredCourses = courses.filter(c =>
        c.title.toLowerCase().includes(searchCourseTerm.toLowerCase())
    ).slice(0, 5);

    const onSubmit = async () => {
        try {
            if (!selectedUserId || !selectedCourseId) {
                toast.error("Please select both a student and a course");
                return;
            }

            setIsLoading(true);
            await axios.post(`/api/courses/${selectedCourseId}/enroll-manual`, {
                userId: selectedUserId
            });

            toast.success("Student successfully enrolled!");
            setOpen(false);
            router.refresh();

            // Reset state
            setSelectedUserId("");
            setSelectedCourseId("");
            setSearchTerm("");
            setSearchCourseTerm("");
        } catch (error: any) {
            toast.error(error.response?.data || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="rounded-full font-black shadow-lg hover:scale-105 transition-all bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="mr-2 h-5 w-5" />
                    Manual Enrollment
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden">
                <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-8 text-white">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black italic">Grant Access 🚀</DialogTitle>
                        <p className="text-emerald-50/70 font-medium">Manually unlock a course for a student.</p>
                    </DialogHeader>
                </div>

                <div className="p-8 space-y-6">
                    {/* Step 1: Select Student */}
                    <div className="space-y-3">
                        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">1. Select Student</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search email or name..."
                                className="pl-9 rounded-2xl border-2 focus-visible:ring-emerald-500/10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2 mt-2">
                            {filteredUsers.map((user) => (
                                <button
                                    key={user.id}
                                    onClick={() => {
                                        setSelectedUserId(user.id);
                                        setSearchTerm(user.email);
                                    }}
                                    className={`flex items-center justify-between p-3 rounded-2xl border-2 transition-all ${selectedUserId === user.id
                                            ? "border-emerald-500 bg-emerald-500/5 shadow-sm"
                                            : "border-transparent bg-muted/30 hover:bg-muted/50"
                                        }`}
                                >
                                    <div className="flex items-center gap-3 text-left">
                                        <div className="h-8 w-8 rounded-xl bg-background border flex items-center justify-center">
                                            <UserIcon className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold">{user.name || "Anonymous"}</p>
                                            <p className="text-[10px] text-muted-foreground truncate max-w-[150px]">{user.email}</p>
                                        </div>
                                    </div>
                                    {selectedUserId === user.id && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Step 2: Select Course */}
                    <div className="space-y-3">
                        <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">2. Select Course</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search course title..."
                                className="pl-9 rounded-2xl border-2 focus-visible:ring-emerald-500/10"
                                value={searchCourseTerm}
                                onChange={(e) => setSearchCourseTerm(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2 mt-2">
                            {filteredCourses.map((course) => (
                                <button
                                    key={course.id}
                                    onClick={() => {
                                        setSelectedCourseId(course.id);
                                        setSearchCourseTerm(course.title);
                                    }}
                                    className={`flex items-center justify-between p-3 rounded-2xl border-2 transition-all ${selectedCourseId === course.id
                                            ? "border-emerald-500 bg-emerald-500/5 shadow-sm"
                                            : "border-transparent bg-muted/30 hover:bg-muted/50"
                                        }`}
                                >
                                    <div className="flex items-center gap-3 text-left">
                                        <div className="h-8 w-8 rounded-xl bg-background border flex items-center justify-center">
                                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold truncate max-w-[200px]">{course.title}</p>
                                            <p className="text-[10px] text-emerald-600 font-bold">${course.price || "0"}</p>
                                        </div>
                                    </div>
                                    {selectedCourseId === course.id && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4">
                        <Button
                            className="w-full rounded-2xl py-6 font-black text-lg bg-emerald-600 hover:bg-emerald-700 shadow-xl shadow-emerald-500/20"
                            onClick={onSubmit}
                            disabled={isLoading || !selectedUserId || !selectedCourseId}
                        >
                            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Confirm Enrollment"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
