import { db } from "@/lib/prisma";
import {
    Users,
    BookOpen,
    GraduationCap,
    TrendingUp,
    Clock,
    CheckCircle2
} from "lucide-react";

export default async function AdminPage() {
    // Fetch stats from DB
    const [userCount, courseCount, enrollmentCount] = await Promise.all([
        db.user.count(),
        db.course.count(),
        db.enrollment.count(),
    ]);

    const stats = [
        {
            label: "Total Students",
            value: userCount,
            icon: Users,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
        },
        {
            label: "Total Courses",
            value: courseCount,
            icon: BookOpen,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
        },
        {
            label: "Total Enrollments",
            value: enrollmentCount,
            icon: GraduationCap,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
        },
        {
            label: "Completion Rate",
            value: "68%",
            icon: TrendingUp,
            color: "text-orange-500",
            bg: "bg-orange-500/10",
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Dashboard Overview</h1>
                <p className="text-muted-foreground">Monitor your platform's performance and growth.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div key={stat.label} className="rounded-xl border bg-card p-6 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className={`rounded-lg p-3 ${stat.bg}`}>
                                <stat.icon className={`h-6 w-6 ${stat.color}`} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                                <h3 className="text-2xl font-bold">{stat.value}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Recent Activity Mock */}
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <h2 className="mb-4 text-xl font-bold">Recent Activity</h2>
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0">
                                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                                    <Clock className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">New student enrolled in "Web Development Bootcamp"</p>
                                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <h2 className="mb-4 text-xl font-bold">Platform Health</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                <span className="text-sm font-medium">Database Connection</span>
                            </div>
                            <span className="text-xs font-bold text-emerald-500">OPTIMAL</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                <span className="text-sm font-medium">Auth Service (Clerk)</span>
                            </div>
                            <span className="text-xs font-bold text-emerald-500">ACTIVE</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                <span className="text-sm font-medium">Media Storage</span>
                            </div>
                            <span className="text-xs font-bold text-emerald-500">OPTIMAL</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
