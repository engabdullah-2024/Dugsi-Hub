import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DollarSign, UserCheck, TrendingUp, BarChart3 } from "lucide-react";

import { getAnalytics } from "@/app/actions/get-analytics";
import { DataCard } from "./_components/data-card";
import { Chart } from "./_components/chart";

const AnalyticsPage = async () => {
    const { userId } = await auth();

    if (!userId) {
        return redirect("/");
    }

    const {
        data,
        totalRevenue,
        totalSales,
    } = await getAnalytics();

    return (
        <div className="p-6 md:p-10 space-y-12">
            <div className="flex flex-col gap-y-2">
                <h1 className="text-4xl font-black tracking-tight">Analytics Dashboard</h1>
                <p className="text-muted-foreground font-medium">Real-time performance and financial insights.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <DataCard
                    label="Total Revenue"
                    value={`$${totalRevenue.toFixed(2)}`}
                    icon={DollarSign}
                    description="Total earnings from all course sales"
                    colorClass="text-emerald-500 bg-emerald-500/10"
                />
                <DataCard
                    label="Total Enrollments"
                    value={totalSales}
                    icon={UserCheck}
                    description="Number of students joined across all courses"
                    colorClass="text-blue-500 bg-blue-500/10"
                />
                <DataCard
                    label="Growth Rate"
                    value="+12.5%"
                    icon={TrendingUp}
                    description="Compared to previous 30 days"
                    colorClass="text-purple-500 bg-purple-500/10"
                />
            </div>

            <Chart data={data} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-10 rounded-[2rem] border-2 border-primary/5 bg-gradient-to-br from-primary/5 to-purple-500/5 flex flex-col items-center text-center justify-center space-y-4">
                    <BarChart3 className="h-12 w-12 text-primary opacity-20" />
                    <h3 className="text-xl font-black">Strategic Insights</h3>
                    <p className="text-muted-foreground max-w-sm font-medium">Your courses are performing 15% better than last month. Focus on video optimization to increase retention.</p>
                </div>
                <div className="p-10 rounded-[2rem] border-2 border-primary/5 bg-background shadow-xl flex flex-col justify-center space-y-4">
                    <h3 className="text-xl font-black">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="p-4 rounded-3xl bg-primary/5 hover:bg-primary/10 transition text-sm font-bold text-primary">Export Report</button>
                        <button className="p-4 rounded-3xl bg-purple-500/5 hover:bg-purple-500/10 transition text-sm font-bold text-purple-600">Sync Data</button>
                        <button className="p-4 rounded-3xl bg-emerald-500/5 hover:bg-emerald-500/10 transition text-sm font-bold text-emerald-600">View Invoices</button>
                        <button className="p-4 rounded-3xl bg-orange-500/5 hover:bg-orange-500/10 transition text-sm font-bold text-orange-600">Help Center</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AnalyticsPage;
