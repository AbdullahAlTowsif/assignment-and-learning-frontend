/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { IAssignment, ISubmission } from "@/types/assignment.interface";
import { Clock, CheckCircle, AlertCircle, Send, FileText, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface StudentAssignmentsTableProps {
    assignments: IAssignment[];
    submissions: ISubmission[];
    onSubmit: (assignment: IAssignment) => void;
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
        dot: "bg-amber-400",
        icon: Clock,
    },
    ACCEPTED: {
        label: "Accepted",
        classes: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        dot: "bg-emerald-400",
        icon: CheckCircle,
    },
    NEEDS_IMPROVEMENT: {
        label: "Needs Improvement",
        classes: "bg-red-500/10 text-red-400 border-red-500/20",
        dot: "bg-red-400",
        icon: AlertCircle,
    },
};

export default function StudentAssignmentsTable({
    assignments,
    submissions,
    onSubmit,
}: StudentAssignmentsTableProps) {
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getTimeRemaining = (deadline: string) => {
        const now = new Date().getTime();
        const deadlineTime = new Date(deadline).getTime();
        const diff = deadlineTime - now;

        if (diff < 0) return { text: "Deadline passed", urgent: true };

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        if (days > 0) return { text: `${days}d ${hours}h left`, urgent: days < 1 };
        if (hours > 0) return { text: `${hours}h left`, urgent: hours < 6 };
        return { text: "Due soon", urgent: true };
    };

    const getSubmissionStatus = (assignmentId: string) => {
        return submissions.find((sub) => sub.assignmentId === assignmentId);
    };

    return (
        <div className="bg-[#111118]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
            {/* Table Header */}
            <div className="p-6 border-b border-white/6">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-400" />
                    All Assignments
                    <span className="text-white/30 text-[13px] font-normal ml-2">
                        ({assignments.length} {assignments.length === 1 ? "assignment" : "assignments"})
                    </span>
                </h2>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/6">
                            <th className="text-left px-6 py-4 text-white/40 text-[12px] font-medium uppercase tracking-wider">
                                Assignment
                            </th>
                            <th className="text-left px-6 py-4 text-white/40 text-[12px] font-medium uppercase tracking-wider">
                                Difficulty
                            </th>
                            <th className="text-left px-6 py-4 text-white/40 text-[12px] font-medium uppercase tracking-wider">
                                Deadline
                            </th>
                            <th className="text-left px-6 py-4 text-white/40 text-[12px] font-medium uppercase tracking-wider">
                                Status
                            </th>
                            <th className="text-right px-6 py-4 text-white/40 text-[12px] font-medium uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {assignments.map((assignment) => {
                            const difficulty = difficultyConfig[assignment.difficulty];
                            const timeRemaining = getTimeRemaining(assignment.deadline);
                            const submission = getSubmissionStatus(assignment.id);
                            const isDeadlinePassed = new Date(assignment.deadline) < new Date();

                            return (
                                <tr
                                    key={assignment.id}
                                    className="group hover:bg-white/2 transition-colors duration-200"
                                >
                                    {/* Assignment Title & Description */}
                                    <td className="px-6 py-5">
                                        <div className="max-w-xs">
                                            <Link
                                                href={`/dashboard/assignments/${assignment.id}`}
                                                className="text-white text-[14px] font-medium hover:text-emerald-400 transition-colors line-clamp-1"
                                            >
                                                {assignment.title}
                                            </Link>
                                            <p className="text-white/25 text-[12px] mt-1 line-clamp-2">
                                                {assignment.description}
                                            </p>
                                        </div>
                                    </td>

                                    {/* Difficulty */}
                                    <td className="px-6 py-5">
                                        <span
                                            className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border ${difficulty.classes}`}
                                        >
                                            <span className={`w-1.5 h-1.5 rounded-full ${difficulty.dot}`} />
                                            {difficulty.label}
                                        </span>
                                    </td>

                                    {/* Deadline */}
                                    <td className="px-6 py-5">
                                        <div>
                                            <span className="text-white/50 text-[13px]">
                                                {formatDate(assignment.deadline)}
                                            </span>
                                            {!isDeadlinePassed && (
                                                <p
                                                    className={`text-[11px] mt-0.5 ${timeRemaining.urgent
                                                        ? "text-red-400"
                                                        : "text-emerald-400"
                                                        }`}
                                                >
                                                    {timeRemaining.text}
                                                </p>
                                            )}
                                            {isDeadlinePassed && (
                                                <p className="text-red-400 text-[11px] mt-0.5">
                                                    Deadline passed
                                                </p>
                                            )}
                                        </div>
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-5">
                                        {submission ? (
                                            <div>
                                                {(() => {
                                                    const status = statusConfig[submission.status];
                                                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                                    const StatusIcon = status.icon;
                                                    return (
                                                        <span
                                                            className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border ${status.classes}`}
                                                        >
                                                            <span
                                                                className={`w-1.5 h-1.5 rounded-full ${status.dot}`}
                                                            />
                                                            {status.label}
                                                        </span>
                                                    );
                                                })()}
                                                {submission.feedback && (
                                                    <div className="flex items-center gap-1 mt-1.5 text-emerald-400 text-[11px]">
                                                        <Eye className="w-3 h-3" />
                                                        Feedback received
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <span className="text-white/20 text-[13px]">
                                                Not submitted
                                            </span>
                                        )}
                                    </td>

                                    {/* Action */}
                                    <td className="px-6 py-5">
                                        <div className="flex items-center justify-end">
                                            {submission ? (
                                                <Button
                                                    onClick={() => onSubmit(assignment)}
                                                    size="sm"
                                                    variant="outline"
                                                    className="border border-white/10 text-white/50 hover:text-white/80 hover:border-white/20 bg-transparent text-[12px]"
                                                >
                                                    <Send className="w-3.5 h-3.5 mr-1.5" />
                                                    Update
                                                </Button>
                                            ) : isDeadlinePassed ? (
                                                <span className="text-red-400/50 text-[12px]">
                                                    Closed
                                                </span>
                                            ) : (
                                                <Button
                                                    onClick={() => onSubmit(assignment)}
                                                    size="sm"
                                                    className="bg-emerald-600 hover:bg-emerald-500 text-white text-[12px] font-medium px-4 py-2 rounded-lg transition-all duration-200"
                                                >
                                                    <Send className="w-3.5 h-3.5 mr-1.5" />
                                                    Submit
                                                </Button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
