"use client";

import { Pencil, Trash2, Eye, Clock } from "lucide-react";
import Link from "next/link";
import { IAssignment } from "@/types/assignment.interface";

interface AssignmentsTableProps {
    assignments: IAssignment[];
    onEdit: (assignment: IAssignment) => void;
    onDelete: (assignment: IAssignment) => void;
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

export default function AssignmentsTable({
    assignments,
    onEdit,
    onDelete,
}: AssignmentsTableProps) {
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const isDeadlinePassed = (deadline: string) => {
        return new Date(deadline) < new Date();
    };

    return (
        <div className="bg-[#111118]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
            {/* Table Header */}
            <div className="p-6 border-b border-white/6">
                <h2 className="text-lg font-semibold text-white">
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
                                Submissions
                            </th>
                            <th className="text-left px-6 py-4 text-white/40 text-[12px] font-medium uppercase tracking-wider">
                                Status
                            </th>
                            <th className="text-right px-6 py-4 text-white/40 text-[12px] font-medium uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {assignments.map((assignment) => {
                            const difficulty = difficultyConfig[assignment.difficulty];
                            const passed = isDeadlinePassed(assignment.deadline);
                            const submissionCount = assignment.submissions?.length || 0;

                            return (
                                <tr
                                    key={assignment.id}
                                    className="group hover:bg-white/2 transition-colors duration-200"
                                >
                                    {/* Assignment Title & Description */}
                                    <td className="px-6 py-5">
                                        <div className="max-w-xs">
                                            <Link
                                                href={`/instructor/dashboard/my-assignments/${assignment.id}`}
                                                className="text-white text-[14px] font-medium hover:text-violet-400 transition-colors line-clamp-1"
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
                                            <span
                                                className={`w-1.5 h-1.5 rounded-full ${difficulty.dot}`}
                                            />
                                            {difficulty.label}
                                        </span>
                                    </td>

                                    {/* Deadline */}
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            <Clock
                                                className={`w-3.5 h-3.5 ${passed ? "text-red-400" : "text-white/30"
                                                    }`}
                                            />
                                            <span
                                                className={`text-[13px] ${passed ? "text-red-400" : "text-white/50"
                                                    }`}
                                            >
                                                {formatDate(assignment.deadline)}
                                            </span>
                                        </div>
                                        {passed && (
                                            <span className="text-[10px] text-red-400/70 mt-0.5 block">
                                                Deadline passed
                                            </span>
                                        )}
                                    </td>

                                    {/* Submissions */}
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            <span className="text-white text-[14px] font-semibold">
                                                {submissionCount}
                                            </span>
                                            <span className="text-white/30 text-[12px]">
                                                {submissionCount === 1 ? "submission" : "submissions"}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-5">
                                        {passed ? (
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
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-5">
                                        <div className="flex items-center justify-end gap-1">
                                            <Link
                                                href={`/instructor/dashboard/my-assignments/${assignment.id}`}
                                                className="w-8 h-8 flex items-center justify-center rounded-lg text-white/30 hover:text-white/70 hover:bg-white/5 transition-all duration-200"
                                                title="View"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => onEdit(assignment)}
                                                className="w-8 h-8 flex items-center justify-center rounded-lg text-white/30 hover:text-violet-400 hover:bg-violet-500/10 transition-all duration-200"
                                                title="Edit"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => onDelete(assignment)}
                                                className="w-8 h-8 flex items-center justify-center rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
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
