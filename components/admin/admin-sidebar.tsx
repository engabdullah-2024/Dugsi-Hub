"use client"
import { SignOutButton } from "@clerk/nextjs";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    BarChart,
    BookOpen,
    LayoutDashboard,
    Settings,
    Users,
    LogOut,
    ChevronLeft,
    CreditCard,
    Award
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const routes = [
    {
        label: "Overview",
        icon: LayoutDashboard,
        href: "/admin",
    },
    {
        label: "Courses",
        icon: BookOpen,
        href: "/admin/courses",
    },
    {
        label: "Users",
        icon: Users,
        href: "/admin/users",
    },
    {
        label: "Analytics",
        icon: BarChart,
        href: "/admin/analytics",
    },
    {
        label: "Sales",
        icon: CreditCard,
        href: "/admin/sales",
    },
    {
        label: "Certificates",
        icon: Award,
        href: "/admin/certificates",
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/admin/settings",
    },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-full w-64 flex-col border-r bg-background px-4 py-8 shadow-sm">
            <div className="mb-10 flex items-center gap-3 px-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                    <BookOpen className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">Admin Hub</span>
            </div>

            <div className="flex flex-1 flex-col gap-2">
                {routes.map((route) => (
                    <Link
                        key={route.href}
                        href={route.href}
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                            pathname === route.href
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                    >
                        <route.icon className="h-4 w-4" />
                        {route.label}
                    </Link>
                ))}
            </div>

            <div className="mt-auto border-t pt-4">
                <Link href="/">
                    <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground">
                        <ChevronLeft className="h-4 w-4" />
                        Back to Site
                    </Button>
                </Link>
                <div className="px-3 py-2">
                    <SignOutButton>
                        <Button variant="ghost" className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50">
                            <LogOut className="h-4 w-4" />
                            Sign Out
                        </Button>
                    </SignOutButton>
                </div>
            </div>
        </div>
    );
}
