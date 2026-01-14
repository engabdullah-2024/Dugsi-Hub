import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { UserRole } from "@prisma/client";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await currentUser();

    if (!user) {
        return redirect("/");
    }

    const dbUser = await db.user.findUnique({
        where: { userId: user.id },
    });

    if (!dbUser || dbUser.role !== UserRole.SUPERADMIN) {
        return redirect("/");
    }

    return (
        <div className="flex min-h-screen bg-muted/30">
            <AdminSidebar />
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    );
}
