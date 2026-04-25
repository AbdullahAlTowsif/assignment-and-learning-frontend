/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

interface SubmissionData {
    assignmentId: string;
    title: string;
    submissionCount: number;
}

interface SubmissionsPerAssignmentChartProps {
    data: SubmissionData[];
}

export default function SubmissionsPerAssignmentChart({
    data,
}: SubmissionsPerAssignmentChartProps) {
    // Sort by submission count descending and take top 8
    const sortedData = [...data]
        .sort((a, b) => b.submissionCount - a.submissionCount)
        .slice(0, 8)
        .map((item) => ({
            ...item,
            shortTitle:
                item.title.length > 25 ? item.title.substring(0, 25) + "..." : item.title,
            count: item.submissionCount,
        }));

    const customTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#1A1A24] border border-white/10 rounded-xl p-3 shadow-2xl">
                    <p className="text-white text-[12px] font-medium mb-1">
                        {payload[0].payload.title}
                    </p>
                    <p className="text-blue-400 text-[13px] font-semibold">
                        {payload[0].value} submissions
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={sortedData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(255,255,255,0.05)"
                        vertical={false}
                    />
                    <XAxis
                        dataKey="shortTitle"
                        tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                        axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                        tickLine={false}
                        interval={0}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                    />
                    <YAxis
                        tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                        axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                        tickLine={false}
                        allowDecimals={false}
                    />
                    <Tooltip content={customTooltip} />
                    <Bar
                        dataKey="count"
                        fill="url(#colorGradient)"
                        radius={[6, 6, 0, 0]}
                        maxBarSize={50}
                    />
                    <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#818cf8" stopOpacity={1} />
                            <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.8} />
                        </linearGradient>
                    </defs>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
