"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
    MoreVertical,
    ShieldCheck,
    ShieldAlert,
    Trash2,
    Loader2
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface UserActionsProps {
    userId: string;
    currentRole: string;
}

export const UserActions = ({
    userId,
    currentRole
}: UserActionsProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onRoleChange = async () => {
        try {
            setIsLoading(true);
            const newRole = currentRole === "SUPERADMIN" ? "STUDENT" : "SUPERADMIN";
            await axios.patch(`/api/users/${userId}`, { role: newRole });
            toast.success("User role updated");
            router.refresh();
        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setIsLoading(true);
            await axios.delete(`/api/users/${userId}`);
            toast.success("User deleted");
            router.refresh();
        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-4 w-4 p-0">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-2xl border-2 p-2 shadow-2xl">
                <DropdownMenuItem
                    onClick={onRoleChange}
                    disabled={isLoading}
                    className="rounded-xl flex items-center gap-2 font-bold cursor-pointer"
                >
                    {currentRole === "SUPERADMIN" ? (
                        <><ShieldAlert className="h-4 w-4" /> Change to Student</>
                    ) : (
                        <><ShieldCheck className="h-4 w-4" /> Make SuperAdmin</>
                    )}
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={onDelete}
                    disabled={isLoading}
                    className="rounded-xl flex items-center gap-2 font-bold text-destructive cursor-pointer"
                >
                    <Trash2 className="h-4 w-4" />
                    Delete User
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
