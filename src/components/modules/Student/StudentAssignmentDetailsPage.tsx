/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    Clock,
    Calendar,
    MessageSquare,
    Send,
    CheckCircle,
    AlertCircle,
    Eye,
} from "lucide-react";
import { IAssignment, ISubmission, Status } from "@/types/assignment.interface";
import { getSingleAssignment } from "@/services/assignment/assignment.service";
import { getMySubmissions } from "@/services/submission/submission.service";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import SubmitAssignmentDialog from "./SubmitAssignmentDialog";

interface StudentAssignmentDetailsPageProps {
    assignmentId: string;
}

const difficultyConfig = {
    BEGINNER: {
        label: "Beginner",
        classes: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        dot: "bg-emerald-400",
    },
    INTERMEDIATE: {
        label: "Intermediate",
        classes: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        dot: "bg-amber-400",
    },
    ADVANCED: {
        label: "Advanced",
        classes: "bg-red-500/10 text-red-400 border-red-500/20",
        dot: "bg-red-400",
    },
};

const statusConfig = {
    PENDING: {
        label: "Pending Review",
        classes: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        icon: Clock,
    },
    ACCEPTED: {
        label: "Accepted",
        classes: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        icon: CheckCircle,
    },
    NEEDS_IMPROVEMENT: {
        label: "Needs Improvement",
        classes: "bg-red-500/10 text-red-400 border-red-500/20",
        icon: AlertCircle,
    },
};

export default function StudentAssignmentDetailsPage({
    assignmentId,
}: StudentAssignmentDetailsPageProps) {
    const [assignment, setAssignment] = useState<IAssignment | null>(null);
    const [submission, setSubmission] = useState<ISubmission | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Dialog state
    const [submitDialogOpen, setSubmitDialogOpen] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const [assignmentResult, submissionsResult] = await Promise.all([
                getSingleAssignment(assignmentId),
                getMySubmissions(),
            ]);

            if (assignmentResult.success) {
                setAssignment(assignmentResult.data);
            } else {
                setError(assignmentResult.message || "Failed to load assignment");
            }

            if (submissionsResult.success) {
                const mySubmission = submissionsResult.data?.find(
                    (sub: ISubmission) => sub.assignmentId === assignmentId
                );
                setSubmission(mySubmission || null);
            }
        } catch (error) {
            setError("An error occurred while fetching data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void Promise.resolve().then(fetchData);
    }, [assignmentId]);

    const handleSubmissionSuccess = () => {
        fetchData();
        setSubmitDialogOpen(false);
        toast.success("Assignment submitted successfully!");
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

    if (loading) {
        return (
            <div className="relative z-10 py-12 px-4 max-w-7xl mx-auto">
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
                        <h3 className="text-xl font-semibold text-white">
                            Loading assignment...
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
                    <Link href="/student/assignments">
                        <Button className="bg-emerald-600 hover:bg-emerald-500 text-white">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Assignments
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    const difficulty = difficultyConfig[assignment.difficulty];
    const isDeadlinePassed = new Date(assignment.deadline) < new Date();

    return (
        <div className="relative z-10 py-8 px-4 max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white/30 text-[12px] mb-8">
                <Link href="/student/dashboard" className="hover:text-white/60 transition-colors">
                    Dashboard
                </Link>
                <span>/</span>
                <Link href="/student/assignments" className="hover:text-white/60 transition-colors">
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
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {!isDeadlinePassed && (
                            <Button
                                onClick={() => setSubmitDialogOpen(true)}
                                className="bg-emerald-600 hover:bg-emerald-500 text-white"
                            >
                                <Send className="w-4 h-4 mr-2" />
                                {submission ? "Update Submission" : "Submit Assignment"}
                            </Button>
                        )}
                        <Link href="/dashboard/assignments">
                            <Button
                                variant="outline"
                                className="border border-white/10 text-white/50 hover:text-white/80 hover:border-white/20 bg-transparent"
                            >
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
                            <MessageSquare className="w-5 h-5 text-emerald-400" />
                            Description
                        </h2>
                        <div className="text-white/60 text-[14px] leading-relaxed whitespace-pre-wrap">
                            {assignment.description}
                        </div>
                    </div>

                    {/* My Submission */}
                    {submission && (
                        <div className="bg-[#111118]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                <Eye className="w-5 h-5 text-violet-400" />
                                My Submission
                            </h2>

                            <div className="space-y-4">
                                {/* Status */}
                                <div className="flex items-center justify-between p-4 rounded-xl bg-white/2 border border-white/5">
                                    <span className="text-white/60 text-[13px]">Status</span>
                                    {(() => {
                                        const status = statusConfig[submission.status];
                                        const StatusIcon = status.icon;
                                        return (
                                            <span
                                                className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border ${status.classes}`}
                                            >
                                                <StatusIcon className="w-3 h-3" />
                                                {status.label}
                                            </span>
                                        );
                                    })()}
                                </div>

                                {/* Submission URL */}
                                <div className="p-4 rounded-xl bg-white/2 border border-white/5">
                                    <label className="text-white/40 text-[12px] block mb-1">
                                        Submission URL
                                    </label>
                                    <Link
                                        href={submission.studentUrl}
                                        target="_blank"
                                        className="text-emerald-400 hover:text-emerald-300 text-[14px] break-all"
                                    >
                                        {submission.studentUrl}
                                    </Link>
                                </div>

                                {/* Student Note */}
                                <div className="p-4 rounded-xl bg-white/2 border border-white/5">
                                    <label className="text-white/40 text-[12px] block mb-1">
                                        Your Note
                                    </label>
                                    <p className="text-white/60 text-[14px] leading-relaxed">
                                        {submission.studentNote}
                                    </p>
                                </div>

                                {/* Submitted Date */}
                                <div className="flex items-center gap-2 text-white/30 text-[12px]">
                                    <Calendar className="w-3.5 h-3.5" />
                                    Submitted on {formatDate(submission.submittedAt)}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Feedback Section */}
                    {submission?.feedback && (
                        <div className="bg-[#111118]/80 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-8">
                            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-emerald-400" />
                                Instructor Feedback
                            </h2>
                            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                                <p className="text-white/70 text-[14px] leading-relaxed whitespace-pre-wrap">
                                    {submission.feedback.content}
                                </p>
                                <p className="text-white/30 text-[11px] mt-3">
                                    Feedback given on {formatDate(submission.feedback.createdAt)}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Assignment Info */}
                    <div className="bg-[#111118]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-6">Assignment Info</h3>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-white/40 text-[13px]">Deadline</span>
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
                                <span className="text-white/40 text-[13px]">Difficulty</span>
                                <span
                                    className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border ${difficulty.classes}`}
                                >
                                    <span className={`w-1.5 h-1.5 rounded-full ${difficulty.dot}`} />
                                    {difficulty.label}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-white/40 text-[13px]">Submission Status</span>
                                {submission ? (
                                    <span className="text-emerald-400 text-[13px] font-medium">
                                        Submitted
                                    </span>
                                ) : (
                                    <span className="text-white/20 text-[13px]">Not submitted</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Instructor Info */}
                    {assignment.instructor && (
                        <div className="bg-[#111118]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">Instructor</h3>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center">
                                    <span className="text-violet-400 text-[14px] font-semibold">
                                        {assignment.instructor.name?.charAt(0)?.toUpperCase() ||
                                            assignment.instructor.email?.charAt(0)?.toUpperCase() ||
                                            "I"}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-white text-[14px] font-medium">
                                        {assignment.instructor.name || "Instructor"}
                                    </p>
                                    <p className="text-white/30 text-[12px]">
                                        {assignment.instructor.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Submit Assignment Dialog */}
            <SubmitAssignmentDialog
                assignment={assignment}
                existingSubmission={submission}
                open={submitDialogOpen}
                onOpenChange={setSubmitDialogOpen}
                onSuccess={handleSubmissionSuccess}
            />
        </div>
    );
}
