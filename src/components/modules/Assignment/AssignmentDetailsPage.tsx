/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    Clock,
    Users,
    CheckCircle,
    AlertCircle,
    Pencil,
    Eye,
    MessageSquare,
    Calendar,
    TrendingUp,
    BarChart3,
} from "lucide-react";
import { IAssignment, ISubmission, Status, Level } from "@/types/assignment.interface";
import { getSingleAssignment } from "@/services/assignment/assignment.service";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import EditAssignmentDialog from "./EditAssignmentDialog";
import SubmissionDetailsDialog from "../Submission/SubmissionDetailsDialog";

interface AssignmentDetailsPageProps {
    assignmentId: string;
}

const difficultyConfig = {
    BEGINNER: {
        label: "Beginner",
        classes: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        dot: "bg-emerald-400",
        icon: "🟢",
    },
    INTERMEDIATE: {
        label: "Intermediate",
        classes: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        dot: "bg-amber-400",
        icon: "🟡",
    },
    ADVANCED: {
        label: "Advanced",
        classes: "bg-red-500/10 text-red-400 border-red-500/20",
        dot: "bg-red-400",
        icon: "🔴",
    },
};

const statusConfig = {
    PENDING: {
        label: "Pending Review",
        classes: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        dot: "bg-amber-400",
    },
    ACCEPTED: {
        label: "Accepted",
        classes: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        dot: "bg-emerald-400",
    },
    NEEDS_IMPROVEMENT: {
        label: "Needs Improvement",
        classes: "bg-red-500/10 text-red-400 border-red-500/20",
        dot: "bg-red-400",
    },
};

export default function AssignmentDetailsPage({ assignmentId }: AssignmentDetailsPageProps) {
    const [assignment, setAssignment] = useState<IAssignment | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Dialog states
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedSubmission, setSelectedSubmission] = useState<ISubmission | null>(null);
    const [submissionDialogOpen, setSubmissionDialogOpen] = useState(false);

    const fetchAssignment = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await getSingleAssignment(assignmentId);
            if (result.success) {
                setAssignment(result.data);
            } else {
                setError(result.message || "Failed to load assignment");
            }
        } catch (error) {
            setError("An error occurred while fetching assignment details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void Promise.resolve().then(fetchAssignment);
    }, [assignmentId]);

    const handleUpdateAssignment = (updatedAssignment: IAssignment) => {
        setAssignment((prev) =>
            prev ? { ...prev, ...updatedAssignment } : null
        );
        setEditDialogOpen(false);
        toast.success("Assignment updated successfully");
    };

    const handleViewSubmission = (submission: ISubmission) => {
        setSelectedSubmission(submission);
        setSubmissionDialogOpen(true);
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getTimeRemaining = (deadline: string) => {
        const now = new Date().getTime();
        const deadlineTime = new Date(deadline).getTime();
        const diff = deadlineTime - now;

        if (diff < 0) return "Deadline passed";

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        if (days > 0) return `${days}d ${hours}h remaining`;
        if (hours > 0) return `${hours}h ${minutes}m remaining`;
        return `${minutes}m remaining`;
    };

    const getSubmissionStats = () => {
        if (!assignment?.submissions) return { total: 0, pending: 0, accepted: 0, needsImprovement: 0 };

        const submissions = assignment.submissions;
        return {
            total: submissions.length,
            pending: submissions.filter((s) => s.status === "PENDING").length,
            accepted: submissions.filter((s) => s.status === "ACCEPTED").length,
            needsImprovement: submissions.filter((s) => s.status === "NEEDS_IMPROVEMENT").length,
        };
    };

    if (loading) {
        return (
            <div className="relative z-10 py-12 px-4 max-w-7xl mx-auto">
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
                        <h3 className="text-xl font-semibold text-white">
                            Loading assignment details...
                        </h3>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !assignment) {
        return (
            <div className="relative z-10 py-12 px-4 max-w-7xl mx-auto">
                <div className="bg-[#111118]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-16 text-center">
                    <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Error Loading Assignment</h3>
                    <p className="text-white/40 text-[14px] mb-6">{error || "Assignment not found"}</p>
                    <Link href="/instructor/assignments">
                        <Button className="bg-violet-600 hover:bg-violet-500 text-white">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Assignments
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    const stats = getSubmissionStats();
    const difficulty = difficultyConfig[assignment.difficulty];
    const isDeadlinePassed = new Date(assignment.deadline) < new Date();

    return (
        <div className="relative z-10 py-8 px-4 max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white/30 text-[12px] mb-8">
                <Link
                    href="/instructor/dashboard"
                    className="hover:text-white/60 transition-colors"
                >
                    Dashboard
                </Link>
                <span>/</span>
                <Link
                    href="/instructor/assignments"
                    className="hover:text-white/60 transition-colors"
                >
                    Assignments
                </Link>
                <span>/</span>
                <span className="text-white/50">{assignment.title}</span>
            </div>

            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                        <h1
                            className="text-3xl md:text-4xl font-bold text-white mb-3"
                            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                        >
                            {assignment.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-3">
                            <span
                                className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border ${difficulty.classes}`}
                            >
                                <span className={`w-1.5 h-1.5 rounded-full ${difficulty.dot}`} />
                                {difficulty.label}
                            </span>
                            {isDeadlinePassed ? (
                                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border bg-red-500/10 text-red-400 border-red-500/20">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                    Closed
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    Active
                                </span>
                            )}
                            <span className="text-white/30 text-[12px]">
                                Created {formatDate(assignment.createdAt)}
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            onClick={() => setEditDialogOpen(true)}
                            variant="outline"
                            className="border border-white/10 text-white/50 hover:text-white/80 hover:border-white/20 bg-transparent"
                        >
                            <Pencil className="w-4 h-4 mr-2" />
                            Edit
                        </Button>
                        <Link href="/instructor/dashboard/my-assignments">
                            <Button variant="outline" className="border border-white/10 text-white/50 hover:text-white/80 hover:border-white/20 bg-transparent">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Description */}
                    <div className="bg-[#111118]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-violet-400" />
                            Description
                        </h2>
                        <div className="text-white/60 text-[14px] leading-relaxed whitespace-pre-wrap">
                            {assignment.description}
                        </div>
                    </div>

                    {/* Submissions */}
                    <div className="bg-[#111118]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <Users className="w-5 h-5 text-emerald-400" />
                            Submissions
                            <span className="text-white/30 text-[13px] font-normal ml-2">
                                ({stats.total} {stats.total === 1 ? "submission" : "submissions"})
                            </span>
                        </h2>

                        {stats.total === 0 ? (
                            <div className="text-center py-12">
                                <Users className="w-12 h-12 text-white/10 mx-auto mb-3" />
                                <p className="text-white/40 text-[14px]">
                                    No submissions yet
                                </p>
                                <p className="text-white/20 text-[12px] mt-1">
                                    Submissions will appear here once students submit their work
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {assignment.submissions?.map((submission) => {
                                    const status = statusConfig[submission.status];
                                    return (
                                        <div
                                            key={submission.id}
                                            className="flex items-center justify-between p-4 rounded-xl bg-white/2 border border-white/5 hover:border-white/10 transition-all duration-200 group cursor-pointer"
                                            onClick={() => handleViewSubmission(submission)}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center">
                                                    <span className="text-violet-400 text-[13px] font-semibold">
                                                        {submission.student?.name?.charAt(0)?.toUpperCase() ||
                                                            submission.student?.email?.charAt(0)?.toUpperCase() ||
                                                            "S"}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="text-white text-[14px] font-medium">
                                                        {submission.student?.name || submission.student?.email || "Unknown Student"}
                                                    </p>
                                                    <p className="text-white/30 text-[12px]">
                                                        Submitted {formatDate(submission.submittedAt)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border ${status.classes}`}
                                                >
                                                    <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                                                    {status.label}
                                                </span>
                                                <Eye className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Assignment Info */}
                    <div className="bg-[#111118]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-6">Assignment Info</h3>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-white/40 text-[13px]">
                                    <Calendar className="w-4 h-4" />
                                    Deadline
                                </div>
                                <div className="text-right">
                                    <p className="text-white text-[13px] font-medium">
                                        {formatDate(assignment.deadline)}
                                    </p>
                                    <p
                                        className={`text-[11px] ${isDeadlinePassed ? "text-red-400" : "text-emerald-400"
                                            }`}
                                    >
                                        {getTimeRemaining(assignment.deadline)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-white/40 text-[13px]">
                                    <BarChart3 className="w-4 h-4" />
                                    Difficulty
                                </div>
                                <span
                                    className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border ${difficulty.classes}`}
                                >
                                    <span className={`w-1.5 h-1.5 rounded-full ${difficulty.dot}`} />
                                    {difficulty.label}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-white/40 text-[13px]">
                                    <Users className="w-4 h-4" />
                                    Total Submissions
                                </div>
                                <span className="text-white text-[13px] font-semibold">
                                    {stats.total}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-white/40 text-[13px]">
                                    <Clock className="w-4 h-4" />
                                    Pending Reviews
                                </div>
                                <span className="text-amber-400 text-[13px] font-semibold">
                                    {stats.pending}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-white/40 text-[13px]">
                                    <CheckCircle className="w-4 h-4" />
                                    Accepted
                                </div>
                                <span className="text-emerald-400 text-[13px] font-semibold">
                                    {stats.accepted}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-white/40 text-[13px]">
                                    <AlertCircle className="w-4 h-4" />
                                    Needs Improvement
                                </div>
                                <span className="text-red-400 text-[13px] font-semibold">
                                    {stats.needsImprovement}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-[#111118]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-violet-400" />
                            Quick Stats
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-white/40 text-[12px]">Acceptance Rate</span>
                                    <span className="text-white text-[12px] font-medium">
                                        {stats.total > 0
                                            ? Math.round((stats.accepted / stats.total) * 100)
                                            : 0}
                                        %
                                    </span>
                                </div>
                                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                                        style={{
                                            width: `${stats.total > 0 ? (stats.accepted / stats.total) * 100 : 0}%`,
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-white/40 text-[12px]">Review Progress</span>
                                    <span className="text-white text-[12px] font-medium">
                                        {stats.total > 0
                                            ? Math.round(
                                                ((stats.accepted + stats.needsImprovement) /
                                                    stats.total) *
                                                100
                                            )
                                            : 0}
                                        %
                                    </span>
                                </div>
                                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-violet-500 rounded-full transition-all duration-500"
                                        style={{
                                            width: `${stats.total > 0 ? ((stats.accepted + stats.needsImprovement) / stats.total) * 100 : 0}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Assignment Dialog */}
            {assignment && (
                <EditAssignmentDialog
                    assignment={assignment}
                    open={editDialogOpen}
                    onOpenChange={setEditDialogOpen}
                    onUpdate={handleUpdateAssignment}
                />
            )}

            {/* Submission Details Dialog */}
            {selectedSubmission && (
                <SubmissionDetailsDialog
                    submission={selectedSubmission}
                    open={submissionDialogOpen}
                    onOpenChange={setSubmissionDialogOpen}
                    onRefresh={fetchAssignment}
                />
            )}
        </div>
    );
}
