"use client";

import {
    Bar,
    BarChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
    Cell
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ChartProps {
    data: {
        name: string;
        total: number;
    }[];
}

export const Chart = ({ data }: ChartProps) => {
    return (
        <Card className="col-span-4 rounded-[2rem] border-2 shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden border-primary/5">
            <CardHeader className="flex flex-row items-center justify-between pb-8">
                <CardTitle className="text-xl font-black tracking-tight">Revenue per Course</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={data}>
                        <XAxis
                            dataKey="name"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tick={{ fill: 'currentColor', opacity: 0.5 }}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `$${value}`}
                            tick={{ fill: 'currentColor', opacity: 0.5 }}
                        />
                        <Tooltip
                            cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                        <div className="bg-background border-2 border-primary/10 p-4 rounded-2xl shadow-2xl">
                                            <p className="text-sm font-black">{payload[0].payload.name}</p>
                                            <p className="text-primary text-lg font-black">${payload[0].value}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Bar
                            dataKey="total"
                            radius={[10, 10, 0, 0]}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "var(--primary)" : "#a855f7"} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};
