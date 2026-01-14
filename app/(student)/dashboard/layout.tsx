import { StudentSidebar } from "@/components/student/student-sidebar";

export default function StudentDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-full bg-slate-50/50">
            <StudentSidebar />
            <main className="lg:pl-72 flex-1 min-h-screen">
                <div className="h-full w-full">
                    {children}
                </div>
            </main>
        </div>
    );
}
