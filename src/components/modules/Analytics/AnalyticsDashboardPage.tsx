/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { useState, useEffect } from "react";
import {
    TrendingUp,
    Users,
    CheckCircle,
    AlertCircle,
    BarChart3,
    PieChart,
    Activity,
    Target,
} from "lucide-react";
import {
    getSubmissionStatusCount,
    getAcceptanceRate,
    getSubmissionsPerAssignment,
    getDifficultyVsPerformance,
} from "@/services/analytics/analytics.service";
import { Alert, AlertDescription } from "@/components/ui/alert";
import SubmissionStatusChart from "./SubmissionStatusChart";
import AcceptanceRateCard from "./AcceptanceRateCard";
import SubmissionsPerAssignmentChart from "./SubmissionsPerAssignmentChart";
import DifficultyVsPerformanceChart from "./DifficultyVsPerformanceChart";

// Updated interfaces to match actual API responses
interface StatusCountItem {
    _count: {
        status: number;
    };
    status: "ACCEPTED" | "PENDING" | "NEEDS_IMPROVEMENT";
}

interface AcceptanceRateData {
    total: number;
    accepted: number;
    acceptanceRate: number;
}

interface SubmissionPerAssignment {
    assignmentId: string;
    title: string;
    count: number;
}

interface SubmissionData {
    assignmentId: string;
    title: string;
    submissionCount: number;
}

interface DifficultyPerformanceData {
    difficulty: string;
    assignmentId: string;
    title: string;
    totalSubmissions: number;
    accepted: number;
    acceptanceRate: number;
}

interface StatusCount {
    pending: number;
    accepted: number;
    needsImprovement: number;
    total: number;
}

interface AnalyticsData {
    statusCount: StatusCount | null;
    acceptanceRate: AcceptanceRateData | null;
    submissionsPerAssignment: SubmissionData[] | null;
    difficultyPerformance: DifficultyPerformanceData[] | null;
}

export default function AnalyticsDashboardPage() {
    const [data, setData] = useState<AnalyticsData>({
        statusCount: null,
        acceptanceRate: null,
        submissionsPerAssignment: null,
        difficultyPerformance: null,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const processStatusCount = (statusData: StatusCountItem[]): StatusCount => {
        const result: StatusCount = {
            pending: 0,
            accepted: 0,
            needsImprovement: 0,
            total: 0,
        };

        statusData.forEach((item) => {
            const count = item._count.status;
            result.total += count;

            switch (item.status) {
                case "ACCEPTED":
                    result.accepted = count;
                    break;
                case "PENDING":
                    result.pending = count;
                    break;
                case "NEEDS_IMPROVEMENT":
                    result.needsImprovement = count;
                    break;
            }
        });

        return result;
    };

    const processDifficultyPerformance = (difficultyData: any[]): DifficultyPerformanceData[] => {
        return difficultyData.map((item) => ({
            difficulty: item.difficulty,
            assignmentId: item.assignmentId,
            title: item.title,
            totalSubmissions: item.totalSubmissions || item.total || 0,
            accepted: item.accepted || 0,
            acceptanceRate: item.acceptanceRate || (item.total > 0 ? Math.round((item.accepted / item.total) * 100) : 0),
        }));
    };

    const processSubmissionsPerAssignment = (submissionsData: SubmissionPerAssignment[]): SubmissionData[] => {
        return submissionsData.map((item) => ({
            assignmentId: item.assignmentId,
            title: item.title,
            submissionCount: item.count,
        }));
    };

    const fetchAllAnalytics = async () => {
        setLoading(true);
        setError(null);
        try {
            const [statusCountRes, acceptanceRateRes, submissionsPerAssignmentRes, difficultyPerformanceRes] =
                await Promise.all([
                    getSubmissionStatusCount(),
                    getAcceptanceRate(),
                    getSubmissionsPerAssignment(),
                    getDifficultyVsPerformance(),
                ]);

            // Process status count data
            let processedStatusCount: StatusCount | null = null;
            if (statusCountRes.success && Array.isArray(statusCountRes.data)) {
                processedStatusCount = processStatusCount(statusCountRes.data);
            }

            // Process difficulty performance data
            let processedDifficultyPerformance: DifficultyPerformanceData[] | null = null;
            if (difficultyPerformanceRes.success && Array.isArray(difficultyPerformanceRes.data)) {
                processedDifficultyPerformance = processDifficultyPerformance(difficultyPerformanceRes.data);
            }

            // Process submissions per assignment data
            let processedSubmissionsPerAssignment: SubmissionData[] | null = null;
            if (submissionsPerAssignmentRes.success && Array.isArray(submissionsPerAssignmentRes.data)) {
                processedSubmissionsPerAssignment = processSubmissionsPerAssignment(submissionsPerAssignmentRes.data);
            }

            setData({
                statusCount: processedStatusCount,
                acceptanceRate: acceptanceRateRes.success ? acceptanceRateRes.data : null,
                submissionsPerAssignment: processedSubmissionsPerAssignment,
                difficultyPerformance: processedDifficultyPerformance,
            });

            // Check for any errors
            const errors = [];
            if (!statusCountRes.success) errors.push("status count");
            if (!acceptanceRateRes.success) errors.push("acceptance rate");
            if (!submissionsPerAssignmentRes.success) errors.push("submissions per assignment");
            if (!difficultyPerformanceRes.success) errors.push("difficulty performance");

            if (errors.length > 0) {
                setError(`Failed to load: ${errors.join(", ")}`);
            }
        } catch (error) {
            setError("An error occurred while fetching analytics data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void Promise.resolve().then(fetchAllAnalytics);
    }, []);

    if (loading) {
        return (
            <div className="relative z-10 py-12 px-4 max-w-7xl mx-auto">
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
                        <h3 className="text-xl font-semibold text-white">
                            Loading analytics...
                        </h3>
                    </div>
                </div>
            </div>
        );
    }

    const totalSubmissions = data.statusCount?.total || 0;
    const acceptanceRate = data.acceptanceRate?.acceptanceRate || 0;
    const pendingCount = data.statusCount?.pending || 0;

    return (
        <div className="relative z-10 py-8 px-4 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1
                    className="text-3xl md:text-4xl font-bold text-white mb-2"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                    Analytics{" "}
                    <span
                        style={{
                            background:
                                "linear-gradient(135deg, #a78bfa 0%, #7c3aed 40%, #10b981 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        Dashboard
                    </span>
                </h1>
                <p className="text-white/40 text-[14px]">
                    Track submission analytics, acceptance rates, and student performance metrics
                </p>
            </div>

            {/* Error Message */}
            {error && (
                <Alert className="mb-8 bg-red-500/10 border-red-500/20 text-red-400">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {/* Total Submissions */}
                <div className="bg-[#111118]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-white/40 text-[12px] font-medium uppercase tracking-wider">
                            Total Submissions
                        </span>
                        <div className="w-10 h-10 rounded-lg bg-violet-500/15 flex items-center justify-center">
                            <BarChart3 className="w-5 h-5 text-violet-400" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-white mb-1">{totalSubmissions}</p>
                    <div className="flex items-center gap-1.5 text-emerald-400 text-[11px]">
                        <TrendingUp className="w-3 h-3" />
                        <span>All time submissions</span>
                    </div>
                </div>

                {/* Acceptance Rate */}
                <div className="bg-[#111118]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-white/40 text-[12px] font-medium uppercase tracking-wider">
                            Acceptance Rate
                        </span>
                        <div className="w-10 h-10 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-emerald-400" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-white mb-1">{acceptanceRate}%</p>
                    <div className="flex items-center gap-1.5 text-white/30 text-[11px]">
                        <Activity className="w-3 h-3" />
                        <span>
                            {data.acceptanceRate?.accepted || 0} of {data.acceptanceRate?.total || 0} accepted
                        </span>
                    </div>
                </div>

                {/* Pending Reviews */}
                <div className="bg-[#111118]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-white/40 text-[12px] font-medium uppercase tracking-wider">
                            Pending Reviews
                        </span>
                        <div className="w-10 h-10 rounded-lg bg-amber-500/15 flex items-center justify-center">
                            <AlertCircle className="w-5 h-5 text-amber-400" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-white mb-1">{pendingCount}</p>
                    <div className="flex items-center gap-1.5 text-amber-400 text-[11px]">
                        <Target className="w-3 h-3" />
                        <span>Need attention</span>
                    </div>
                </div>

                {/* Active Assignments */}
                <div className="bg-[#111118]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-white/40 text-[12px] font-medium uppercase tracking-wider">
                            Assignments
                        </span>
                        <div className="w-10 h-10 rounded-lg bg-blue-500/15 flex items-center justify-center">
                            <Users className="w-5 h-5 text-blue-400" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-white mb-1">
                        {data.submissionsPerAssignment?.length || 0}
                    </p>
                    <div className="flex items-center gap-1.5 text-white/30 text-[11px]">
                        <PieChart className="w-3 h-3" />
                        <span>Active assignments</span>
                    </div>
                </div>
            </div>

            {/* Charts Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Submission Status Pie Chart */}
                <div className="bg-[#111118]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                        <PieChart className="w-5 h-5 text-violet-400" />
                        Submission Status
                    </h2>
                    <p className="text-white/30 text-[12px] mb-6">
                        Distribution of submission statuses
                    </p>
                    {data.statusCount && data.statusCount.total > 0 ? (
                        <SubmissionStatusChart data={data.statusCount} />
                    ) : (
                        <div className="flex items-center justify-center h-64 text-white/20 text-[14px]">
                            No submission data available
                        </div>
                    )}
                </div>

                {/* Acceptance Rate Card */}
                <div className="bg-[#111118]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                        Acceptance Progress
                    </h2>
                    <p className="text-white/30 text-[12px] mb-6">
                        Overall acceptance rate with detailed breakdown
                    </p>
                    {data.statusCount && data.statusCount.total > 0 ? (
                        <AcceptanceRateCard data={data.statusCount} />
                    ) : (
                        <div className="flex items-center justify-center h-64 text-white/20 text-[14px]">
                            No submission data available
                        </div>
                    )}
                </div>

                {/* Submissions Per Assignment Bar Chart */}
                <div className="bg-[#111118]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-blue-400" />
                        Submissions per Assignment
                    </h2>
                    <p className="text-white/30 text-[12px] mb-6">
                        Number of submissions for each assignment
                    </p>
                    {data.submissionsPerAssignment && data.submissionsPerAssignment.length > 0 ? (
                        <SubmissionsPerAssignmentChart data={data.submissionsPerAssignment} />
                    ) : (
                        <div className="flex items-center justify-center h-64 text-white/20 text-[14px]">
                            No assignment data available
                        </div>
                    )}
                </div>

                {/* Difficulty vs Performance Chart */}
                <div className="bg-[#111118]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-amber-400" />
                        Difficulty vs Performance
                    </h2>
                    <p className="text-white/30 text-[12px] mb-6">
                        Acceptance and improvement rates by difficulty level
                    </p>
                    {data.difficultyPerformance && data.difficultyPerformance.length > 0 ? (
                        <DifficultyVsPerformanceChart data={data.difficultyPerformance} />
                    ) : (
                        <div className="flex items-center justify-center h-64 text-white/20 text-[14px]">
                            No performance data available
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
