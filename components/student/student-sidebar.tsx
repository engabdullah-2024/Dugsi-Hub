"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    BookOpen,
    Search,
    MessageSquare,
    Settings,
    LogOut,
    GraduationCap,
    Clock,
    Flame,
    Compass,
    Award
} from "lucide-react";
import { cn } from "@/lib/utils";
import { UserButton, useUser, SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        activeColor: "text-indigo-600",
        bgColor: "bg-indigo-600/10",
    },
    {
        label: "My Courses",
        icon: BookOpen,
        href: "/dashboard/my-courses",
        activeColor: "text-emerald-600",
        bgColor: "bg-emerald-600/10",
    },
    {
        label: "Explore",
        icon: Compass,
        href: "/courses",
        activeColor: "text-purple-600",
        bgColor: "bg-purple-600/10",
    },
    {
        label: "Certificates",
        icon: Award,
        href: "/dashboard/certificates",
        activeColor: "text-amber-500",
        bgColor: "bg-amber-500/10",
    },
    {
        label: "Discussions",
        icon: MessageSquare,
        href: "/dashboard/discussions",
        activeColor: "text-orange-600",
        bgColor: "bg-orange-600/10",
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/dashboard/settings",
        activeColor: "text-slate-600",
        bgColor: "bg-slate-600/10",
    },
];

export const StudentSidebar = () => {
    const pathname = usePathname();
    const { user } = useUser();

    return (
        <div className="hidden lg:flex h-full w-72 flex-col fixed inset-y-0 z-50 overflow-y-auto bg-white border-r border-slate-100 shadow-[20px_0_40px_rgba(0,0,0,0.02)]">
            <div className="p-8 flex flex-col h-full">
                {/* Brand Logo */}
                <Link href="/" className="flex items-center gap-3 mb-10 group">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 shadow-lg shadow-indigo-200 group-hover:rotate-6 transition-transform">
                        <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 tracking-tighter">
                        Dugsi Hub
                    </span>
                </Link>

                {/* Main Navigation */}
                <div className="flex flex-col gap-2 mb-10">
                    <p className="px-3 mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Main Menu</p>
                    {routes.map((route) => {
                        const isActive = pathname === route.href;
                        return (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-bold transition-all duration-300 group",
                                    isActive
                                        ? cn("shadow-sm shadow-slate-100", route.bgColor, route.activeColor)
                                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                )}
                            >
                                <route.icon className={cn(
                                    "h-5 w-5 transition-transform group-hover:scale-110",
                                    isActive ? route.activeColor : "text-slate-400"
                                )} />
                                {route.label}
                                {isActive && (
                                    <div className={cn("ml-auto w-1.5 h-1.5 rounded-full", route.activeColor.replace('text', 'bg'))} />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Learning Stats Card */}
                <div className="mt-4 p-5 rounded-[2rem] bg-slate-900 text-white shadow-2xl relative overflow-hidden group">
                    <div className="absolute -top-10 -right-10 h-32 w-32 bg-indigo-500/20 rounded-full blur-3xl" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 bg-white/10 rounded-xl">
                                <Flame className="h-4 w-4 text-orange-400" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-widest text-white/60">Streak</span>
                        </div>
                        <h4 className="text-3xl font-black mb-1">12 Days</h4>
                        <p className="text-[10px] font-bold text-white/40 italic">You're on fire! Keep going. 🔥</p>
                    </div>
                </div>

                {/* User Connection */}
                <div className="mt-auto pt-8 border-t border-slate-100">
                    <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-3xl border border-slate-100 mb-4">
                        <div className="scale-110 shadow-md rounded-full">
                            <UserButton afterSignOutUrl="/" />
                        </div>
                        <div className="flex flex-col min-w-0">
                            <p className="text-sm font-black text-slate-900 truncate tracking-tight">
                                {user?.fullName || "Student"}
                            </p>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                Pro Member
                            </p>
                        </div>
                    </div>
                    <SignOutButton>
                        <Button variant="ghost" className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-2xl">
                            <LogOut className="h-4 w-4" />
                            Sign Out
                        </Button>
                    </SignOutButton>
                </div>
            </div>
        </div>
    );
};
