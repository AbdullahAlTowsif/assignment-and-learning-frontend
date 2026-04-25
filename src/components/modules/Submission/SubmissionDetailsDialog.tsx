"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ISubmission } from "@/types/assignment.interface";
import { ExternalLink, Calendar, MessageSquare } from "lucide-react";
import Link from "next/link";

interface SubmissionDetailsDialogProps {
    submission: ISubmission;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onRefresh: () => void;
}

const statusConfig = {
    PENDING: {
        label: "Pending Review",
        classes: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    },
    ACCEPTED: {
        label: "Accepted",
        classes: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    NEEDS_IMPROVEMENT: {
        label: "Needs Improvement",
        classes: "bg-red-500/10 text-red-400 border-red-500/20",
    },
};

export default function SubmissionDetailsDialog({
    submission,
    open,
    onOpenChange,
}: SubmissionDetailsDialogProps) {
    const status = statusConfig[submission.status];

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-[#111118] border border-white/10 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-white text-lg font-bold flex items-center gap-2">
                        Submission Details
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                    {/* Student Info */}
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/2 border border-white/5">
                        <div className="w-12 h-12 rounded-full bg-violet-500/10 flex items-center justify-center">
                            <span className="text-violet-400 text-[16px] font-semibold">
                                {submission.student?.name?.charAt(0)?.toUpperCase() ||
                                    submission.student?.email?.charAt(0)?.toUpperCase() ||
                                    "S"}
                            </span>
                        </div>
                        <div>
                            <p className="text-white font-medium">
                                {submission.student?.name || submission.student?.email || "Unknown Student"}
                            </p>
                            <p className="text-white/40 text-[12px]">
                                {submission.student?.email}
                            </p>
                        </div>
                        <span
                            className={`ml-auto inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border ${status.classes}`}
                        >
                            {status.label}
                        </span>
                    </div>

                    {/* Submission Link */}
                    <div>
                        <label className="text-white/60 text-[13px] font-medium block mb-2">
                            Submission URL
                        </label>
                        <Link
                            href={submission.studentUrl}
                            target="_blank"
                            className="flex items-center gap-2 text-violet-400 hover:text-violet-300 text-[14px] break-all"
                        >
                            {submission.studentUrl}
                            <ExternalLink className="w-4 h-4 shrink-0" />
                        </Link>
                    </div>

                    {/* Student Note */}
                    <div>
                        <label className="text-white/60 text-[13px] font-medium flex items-center gap-2 mb-2">
                            <MessageSquare className="w-4 h-4" />
                            Student Note
                        </label>
                        <div className="p-4 rounded-xl bg-white/2 border border-white/5">
                            <p className="text-white/60 text-[14px] leading-relaxed whitespace-pre-wrap">
                                {submission.studentNote || "No notes provided"}
                            </p>
                        </div>
                    </div>

                    {/* Feedback */}
                    {submission.feedback ? (
                        <div>
                            <label className="text-white/60 text-[13px] font-medium flex items-center gap-2 mb-2">
                                <MessageSquare className="w-4 h-4 text-emerald-400" />
                                Your Feedback
                            </label>
                            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                                <p className="text-white/70 text-[14px] leading-relaxed whitespace-pre-wrap">
                                    {submission.feedback.content}
                                </p>
                                <p className="text-white/30 text-[11px] mt-2">
                                    Given on {formatDate(submission.feedback.createdAt)}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="p-4 rounded-xl bg-white/2 border border-white/5 text-center">
                            <p className="text-white/30 text-[13px]">
                                No feedback provided yet
                            </p>
                        </div>
                    )}

                    {/* Submission Date */}
                    <div className="flex items-center gap-2 text-white/30 text-[12px]">
                        <Calendar className="w-3.5 h-3.5" />
                        Submitted on {formatDate(submission.submittedAt)}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
