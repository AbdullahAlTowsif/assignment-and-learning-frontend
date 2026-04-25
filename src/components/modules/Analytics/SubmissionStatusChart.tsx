/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface SubmissionStatusChartProps {
    data: {
        pending: number;
        accepted: number;
        needsImprovement: number;
        total: number;
    };
}

const COLORS = {
    Pending: "#f59e0b", // amber-500
    Accepted: "#10b981", // emerald-500
    "Needs Improvement": "#ef4444", // red-500
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CHART_DATA_KEYS = [
    { key: "pending", name: "Pending", color: COLORS.Pending },
    { key: "accepted", name: "Accepted", color: COLORS.Accepted },
    { key: "needsImprovement", name: "Needs Improvement", color: COLORS["Needs Improvement"] },
];

export default function SubmissionStatusChart({ data }: SubmissionStatusChartProps) {
    const chartData = [
        { name: "Pending", value: data.pending, color: COLORS.Pending },
        { name: "Accepted", value: data.accepted, color: COLORS.Accepted },
        { name: "Needs Improvement", value: data.needsImprovement, color: COLORS["Needs Improvement"] },
    ].filter((item) => item.value > 0);

    // If all values are 0, show a placeholder
    if (chartData.length === 0) {
        chartData.push({ name: "No Data", value: 1, color: "#374151" });
    }

    const customTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            const percentage = ((data.value / (data.value === 1 && data.name === "No Data" ? 1 : data.value)) * 100).toFixed(1);
            return (
                <div className="bg-[#1A1A24] border border-white/10 rounded-xl p-3 shadow-2xl">
                    <p className="text-white text-[13px] font-medium mb-1">{data.name}</p>
                    <p className="text-white/60 text-[12px]">
                        {data.value} submissions
                        {data.name !== "No Data" && ` (${percentage}%)`}
                    </p>
                </div>
            );
        }
        return null;
    };

    const renderLegend = (props: any) => {
        const { payload } = props;
        return (
            <div className="flex flex-wrap justify-center gap-4 mt-4">
                {payload.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-white/60 text-[12px]">{entry.value}</span>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="45%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={3}
                        dataKey="value"
                        strokeWidth={0}
                    >
                        {chartData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.color}
                                className="hover:opacity-80 transition-opacity duration-200"
                            />
                        ))}
                    </Pie>
                    <Tooltip content={customTooltip} />
                    <Legend content={renderLegend} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}