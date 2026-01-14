import { db } from "@/lib/prisma";

export const getAnalytics = async () => {
    try {
        const enrollments = await db.enrollment.findMany({
            include: {
                course: true,
            },
        });

        const groupedEarnings = enrollments.reduce((acc: any, enrollment: any) => {
            const courseTitle = enrollment.course.title;
            if (!acc[courseTitle]) {
                acc[courseTitle] = 0;
            }
            acc[courseTitle] += enrollment.course.price || 0;
            return acc;
        }, {});

        const data = Object.entries(groupedEarnings).map(([courseTitle, total]) => ({
            name: courseTitle,
            total: total as number,
        }));

        const totalRevenue = data.reduce((acc, curr: any) => acc + curr.total, 0);
        const totalSales = enrollments.length;

        return {
            data,
            totalRevenue,
            totalSales,
        };
    } catch (error) {
        console.log("[GET_ANALYTICS]", error);
        return {
            data: [],
            totalRevenue: 0,
            totalSales: 0,
        };
    }
};
