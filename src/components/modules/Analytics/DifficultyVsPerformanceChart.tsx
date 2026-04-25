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
    Legend,
} from "recharts";

interface DifficultyPerformanceData {
    difficulty: string;
    assignmentId: string;
    title: string;
    totalSubmissions: number;
    accepted: number;
    acceptanceRate: number;
}

interface DifficultyVsPerformanceChartProps {
    data: DifficultyPerformanceData[];
}

export default function DifficultyVsPerformanceChart({
    data,
}: DifficultyVsPerformanceChartProps) {
    // Calculate needs improvement count (total - accepted)
    const chartData = data.map((item) => ({
        ...item,
        difficulty:
            item.difficulty.charAt(0).toUpperCase() +
            item.difficulty.slice(1).toLowerCase(),
        needsImprovement: item.totalSubmissions - item.accepted,
        total: item.totalSubmissions,
    }));

    const customTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#1A1A24] border border-white/10 rounded-xl p-3 shadow-2xl">
                    <p className="text-white text-[13px] font-medium mb-2">{label}</p>
                    {payload.map((entry: any, index: number) => (
                        <div key={index} className="flex items-center gap-2 mb-1">
                            <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-white/60 text-[12px]">
                                {entry.name}: {entry.value}
                            </span>
                        </div>
                    ))}
                    <div className="mt-2 pt-2 border-t border-white/10">
                        <span className="text-white/40 text-[11px]">
                            Total: {payload[0].payload.total} | Rate: {payload[0].payload.acceptanceRate}%
                        </span>
                    </div>
                </div>
            );
        }
        return null;
    };

    const renderLegend = (props: any) => {
        const { payload } = props;
        return (
            <div className="flex justify-center gap-6 mt-2">
                {payload.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                        <div
                            className="w-3 h-3 rounded"
                            style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-white/50 text-[12px]">{entry.value}</span>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={chartData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
                    barGap={8}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(255,255,255,0.05)"
                        vertical={false}
                    />
                    <XAxis
                        dataKey="difficulty"
                        tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
                        axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                        axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                        tickLine={false}
                        allowDecimals={false}
                    />
                    <Tooltip content={customTooltip} />
                    <Legend content={renderLegend} />
                    <Bar
                        dataKey="accepted"
                        name="Accepted"
                        fill="#10b981"
                        radius={[4, 4, 0, 0]}
                        maxBarSize={40}
                    />
                    <Bar
                        dataKey="needsImprovement"
                        name="Needs Improvement"
                        fill="#ef4444"
                        radius={[4, 4, 0, 0]}
                        maxBarSize={40}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
