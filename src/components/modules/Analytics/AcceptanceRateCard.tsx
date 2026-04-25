// src/components/modules/Analytics/AcceptanceRateCard.tsx
"use client";

import { CheckCircle, AlertCircle, Clock } from "lucide-react";

interface AcceptanceRateCardProps {
    data: {
        pending: number;
        accepted: number;
        needsImprovement: number;
        total: number;
    };
    acceptanceRate?: {
        total: number;
        accepted: number;
        acceptanceRate: number;
    } | null;
}

export default function AcceptanceRateCard({ data, acceptanceRate }: AcceptanceRateCardProps) {
    const rate = acceptanceRate?.acceptanceRate || 0;
    const improvementRate = data.total > 0 ? Math.round((data.needsImprovement / data.total) * 100) : 0;
    const pendingRate = data.total > 0 ? Math.round((data.pending / data.total) * 100) : 0;

    return (
        <div className="space-y-6">
            {/* Main Progress Circle */}
            <div className="flex items-center justify-center">
                <div className="relative w-36 h-36">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                        {/* Background circle */}
                        <circle
                            cx="60"
                            cy="60"
                            r="54"
                            fill="none"
                            stroke="rgba(255,255,255,0.05)"
                            strokeWidth="8"
                        />
                        {/* Accepted arc */}
                        <circle
                            cx="60"
                            cy="60"
                            r="54"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="8"
                            strokeDasharray={`${(rate / 100) * 339.292} 339.292`}
                            strokeLinecap="round"
                            className="transition-all duration-1000 ease-out"
                        />
                        {/* Needs Improvement arc */}
                        <circle
                            cx="60"
                            cy="60"
                            r="54"
                            fill="none"
                            stroke="#ef4444"
                            strokeWidth="8"
                            strokeDasharray={`${(improvementRate / 100) * 339.292} 339.292`}
                            strokeDashoffset={`-${(rate / 100) * 339.292}`}
                            strokeLinecap="round"
                            className="transition-all duration-1000 ease-out"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold text-white">{rate}%</span>
                        <span className="text-white/40 text-[11px]">Acceptance</span>
                    </div>
                </div>
            </div>

            {/* Stats Breakdown */}
            <div className="space-y-3">
                {/* Accepted */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div>
                            <p className="text-white text-[13px] font-medium">Accepted</p>
                            <p className="text-white/30 text-[11px]">{data.accepted} submissions</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-emerald-400 text-lg font-bold">{rate}%</span>
                    </div>
                </div>

                {/* Needs Improvement */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-red-500/5 border border-red-500/10">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-red-500/15 flex items-center justify-center">
                            <AlertCircle className="w-4 h-4 text-red-400" />
                        </div>
                        <div>
                            <p className="text-white text-[13px] font-medium">Needs Improvement</p>
                            <p className="text-white/30 text-[11px]">{data.needsImprovement} submissions</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-red-400 text-lg font-bold">{improvementRate}%</span>
                    </div>
                </div>

                {/* Pending */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-amber-500/5 border border-amber-500/10">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center">
                            <Clock className="w-4 h-4 text-amber-400" />
                        </div>
                        <div>
                            <p className="text-white text-[13px] font-medium">Pending</p>
                            <p className="text-white/30 text-[11px]">{data.pending} submissions</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-amber-400 text-lg font-bold">{pendingRate}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
