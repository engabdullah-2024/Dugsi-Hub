import { db } from "@/lib/prisma";
import {
    Users as UsersIcon,
    ShieldCheck,
    ShieldAlert,
    Mail,
    User as UserIcon,
    Search
} from "lucide-react";
import { UserActions } from "./_components/user-actions";
import { Input } from "@/components/ui/input";

export default async function AdminUsersPage() {
    const users = await db.user.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tight">User Management</h1>
                    <p className="text-muted-foreground font-medium">Manage roles and permissions for all platform users.</p>
                </div>
                <div className="w-full md:w-[300px] relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                        placeholder="Search by name or email..."
                        className="pl-9 rounded-2xl border-2 focus-visible:ring-primary/10"
                    />
                </div>
            </div>

            <div className="rounded-[2rem] border-2 bg-card shadow-xl overflow-hidden border-primary/5">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm font-medium">
                        <thead className="bg-muted/50 border-b text-muted-foreground font-black uppercase tracking-widest text-[10px]">
                            <tr>
                                <th className="px-8 py-5">User</th>
                                <th className="px-8 py-5">Email</th>
                                <th className="px-8 py-5">Role</th>
                                <th className="px-8 py-5">Joined</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-primary/5">
                            {users.map((user: any) => (
                                <tr key={user.id} className="hover:bg-primary/5 transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 flex-shrink-0 rounded-2xl bg-muted overflow-hidden shadow-sm border-2 border-background">
                                                {user.imageUrl ? (
                                                    <img src={user.imageUrl} alt={user.name || ""} className="h-full w-full object-cover" />
                                                ) : (
                                                    <div className="h-full w-full flex items-center justify-center bg-primary/10 text-primary">
                                                        <UserIcon className="h-5 w-5" />
                                                    </div>
                                                )}
                                            </div>
                                            <span className="font-bold text-foreground group-hover:text-primary transition-colors">{user.name || "Anonymous User"}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Mail className="h-4 w-4 opacity-50" />
                                            {user.email}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${user.role === "SUPERADMIN"
                                            ? "bg-purple-500/10 text-purple-600 border border-purple-500/10 shadow-sm shadow-purple-500/10"
                                            : "bg-blue-500/10 text-blue-600 border border-blue-500/10 shadow-sm shadow-blue-500/10"
                                            }`}>
                                            {user.role === "SUPERADMIN" ? (
                                                <ShieldCheck className="h-3 w-3" />
                                            ) : (
                                                <ShieldAlert className="h-3 w-3" />
                                            )}
                                            {user.role}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-muted-foreground font-bold italic opacity-60">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <UserActions userId={user.id} currentRole={user.role} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
