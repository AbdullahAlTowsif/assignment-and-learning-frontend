"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { ISubmission, IFeedback } from "@/types/assignment.interface";
import { ExternalLink, Calendar, MessageSquare, FileText, Link2 } from "lucide-react";
import Link from "next/link";
import ReviewSubmissionForm from "@/components/modules/Submission/ReviewSubmissionForm";

interface SubmissionDetailsDialogProps {
    submission: ISubmission;
    assignmentTitle: string;
    assignmentDescription: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onRefresh: () => void;
}

const statusConfig: Record<string, { label: string; classes: string }> = {
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
    assignmentTitle,
    assignmentDescription,
    open,
    onOpenChange,
    onRefresh,
}: SubmissionDetailsDialogProps) {
    const [isReviewMode, setIsReviewMode] = useState(false);
    const [localFeedback, setLocalFeedback] = useState<IFeedback | null>(null);
    const [localStatus, setLocalStatus] = useState<string>("PENDING");
    const status = statusConfig[localStatus] || statusConfig.PENDING;

    // Update local state when submission changes or dialog opens
    useEffect(() => {
        // Defer state updates to avoid cascading renders
        Promise.resolve().then(() => {
            setLocalFeedback(submission.feedback || null);
            setLocalStatus(submission.status || "PENDING");
        });
    }, [submission, open]);

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const handleReviewComplete = () => {
        setIsReviewMode(false);
        onRefresh();
        onOpenChange(false);
    };

    const getStudentAvatar = () => {
        if (submission.student?.name) {
            return submission.student.name.charAt(0).toUpperCase();
        }
        if (submission.student?.email) {
            return submission.student.email.charAt(0).toUpperCase();
        }
        return "S";
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-[#111118] border border-white/10 text-white max-w-2xl max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-white text-lg font-bold flex items-center gap-2">
                        {isReviewMode ? "Review Submission" : "Submission Details"}
                    </DialogTitle>
                    <DialogDescription className="text-white/40">
                        {isReviewMode
                            ? "Provide feedback and update the submission status"
                            : `${submission.student?.name || submission.student?.email || "Student"}'s submission`}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                    {/* Student Info */}
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/2 border border-white/5">
                        <div className="w-12 h-12 rounded-full bg-violet-500/10 flex items-center justify-center shrink-0">
                            <span className="text-violet-400 text-[16px] font-semibold">
                                {getStudentAvatar()}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-white font-medium truncate">
                                {submission.student?.name || submission.student?.email || "Unknown Student"}
                            </p>
                            {submission.student?.email && (
                                <p className="text-white/40 text-[12px] truncate">
                                    {submission.student.email}
                                </p>
                            )}
                        </div>
                        {!isReviewMode && (
                            <span
                                className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border shrink-0 ${status.classes}`}
                            >
                                {status.label}
                            </span>
                        )}
                    </div>

                    {/* Submission URL */}
                    <div>
                        <label className="text-white/60 text-[13px] font-medium flex items-center gap-2 mb-2">
                            <Link2 className="w-4 h-4 shrink-0" />
                            Submission URL
                        </label>
                        <Link
                            href={submission.studentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-violet-400 hover:text-violet-300 text-[14px] break-all bg-white/2 border border-white/5 rounded-xl p-3 transition-colors group"
                        >
                            <span className="flex-1">{submission.studentUrl}</span>
                            <ExternalLink className="w-4 h-4 shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" />
                        </Link>
                    </div>

                    {/* Student Note */}
                    <div>
                        <label className="text-white/60 text-[13px] font-medium flex items-center gap-2 mb-2">
                            <MessageSquare className="w-4 h-4 shrink-0" />
                            Student Note
                        </label>
                        <div className="p-4 rounded-xl bg-white/2 border border-white/5">
                            <p className="text-white/60 text-[14px] leading-relaxed whitespace-pre-wrap">
                                {submission.studentNote || "No notes provided"}
                            </p>
                        </div>
                    </div>

                    {/* Existing Feedback (if any) */}
                    {localFeedback && !isReviewMode && (
                        <div>
                            <label className="text-white/60 text-[13px] font-medium flex items-center gap-2 mb-2">
                                <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
                                Your Feedback
                            </label>
                            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-emerald-400 text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded-full font-medium">
                                        Reviewed
                                    </span>
                                    <span className="text-white/25 text-[11px]">
                                        {formatDate(localFeedback.createdAt)}
                                    </span>
                                </div>
                                <p className="text-white/70 text-[14px] leading-relaxed whitespace-pre-wrap">
                                    {localFeedback.content}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* No Feedback Yet */}
                    {!localFeedback && !isReviewMode && (
                        <div className="p-6 rounded-xl bg-white/2 border border-white/5 text-center">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
                                <FileText className="w-5 h-5 text-white/20" />
                            </div>
                            <p className="text-white/30 text-[13px]">
                                No feedback provided yet
                            </p>
                            <p className="text-white/20 text-[11px] mt-1">
                                Click &quot;Review Submission&quot; to provide feedback
                            </p>
                        </div>
                    )}

                    {/* Submission Date */}
                    {!isReviewMode && (
                        <div className="flex items-center gap-2 text-white/30 text-[12px]">
                            <Calendar className="w-3.5 h-3.5 shrink-0" />
                            Submitted on {formatDate(submission.submittedAt)}
                        </div>
                    )}

                    {/* Review Form or Review Button */}
                    {isReviewMode ? (
                        <div className="border-t border-white/6 pt-6">
                            <ReviewSubmissionForm
                                submission={{
                                    id: submission.id,
                                    studentNote: submission.studentNote,
                                    studentUrl: submission.studentUrl,
                                    status: localStatus,
                                    student: submission.student,
                                    feedback: localFeedback,
                                }}
                                assignment={{
                                    title: assignmentTitle,
                                    description: assignmentDescription,
                                }}
                                onReviewComplete={handleReviewComplete}
                            />
                            <button
                                type="button"
                                onClick={() => setIsReviewMode(false)}
                                className="w-full mt-4 text-center text-white/30 hover:text-white/50 text-[12px] transition-colors py-2"
                            >
                                Cancel Review
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-3 pt-4 border-t border-white/6">
                            <button
                                type="button"
                                onClick={() => setIsReviewMode(true)}
                                className="flex-1 bg-violet-600 hover:bg-violet-500 text-white text-[14px] font-semibold py-2.5 rounded-xl transition-all duration-200 hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]"
                            >
                                {localFeedback ? "Update Review" : "Review Submission"}
                            </button>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
