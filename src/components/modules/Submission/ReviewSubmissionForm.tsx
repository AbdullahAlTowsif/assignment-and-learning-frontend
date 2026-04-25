"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { reviewSubmission } from "@/services/submission/submission.service";
import { toast } from "sonner";
import { Send, Sparkles, Loader2 } from "lucide-react";
import AIFeedbackGenerator from "@/components/modules/Smart/AIFeedbackGenerator";
import { IFeedback } from "@/types/assignment.interface";

interface ReviewSubmissionFormProps {
    submission: {
        id: string;
        studentNote: string;
        studentUrl: string;
        status: string;
        student?: {
            name?: string;
            email: string;
        };
        feedback?: IFeedback | null;
    };
    assignment: {
        title: string;
        description: string;
    };
    onReviewComplete?: () => void;
}

export default function ReviewSubmissionForm({
    submission,
    assignment,
    onReviewComplete,
}: ReviewSubmissionFormProps) {
    const [status, setStatus] = useState<string>(
        submission.status === "PENDING" ? "ACCEPTED" : submission.status
    );
    const [feedbackContent, setFeedbackContent] = useState<string>(
        submission.feedback?.content || ""
    );
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showAITools, setShowAITools] = useState(false);

    const handleFeedbackGenerated = (aiFeedback: string) => {
        setFeedbackContent(aiFeedback);
        toast.success("AI feedback applied! You can edit it before submitting.");
    };

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!feedbackContent.trim()) {
            toast.error("Please provide feedback content");
            return;
        }

        if (feedbackContent.trim().length < 10) {
            toast.error("Feedback must be at least 10 characters");
            return;
        }

        setIsSubmitting(true);
        try {
            const result = await reviewSubmission(submission.id, {
                status: status,
                feedback: feedbackContent.trim(),
            });

            if (result.success) {
                toast.success(
                    submission.feedback
                        ? "Review updated successfully!"
                        : "Review submitted successfully!"
                );
                if (onReviewComplete) {
                    onReviewComplete();
                }
            } else {
                toast.error(result.message || "Failed to submit review");
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error("An error occurred while submitting review");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmitReview} className="space-y-6">
            {/* AI Feedback Generator */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <label className="text-white/60 text-[13px] font-medium flex items-center gap-2">
                        <MessageIcon className="w-4 h-4" />
                        Feedback Content <span className="text-violet-400">*</span>
                    </label>
                    <button
                        type="button"
                        onClick={() => setShowAITools(!showAITools)}
                        className="flex items-center gap-1.5 text-violet-400 hover:text-violet-300 text-[12px] font-medium transition-colors"
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        {showAITools ? "Hide AI Generator" : "AI Generate Feedback"}
                    </button>
                </div>

                {showAITools && (
                    <div className="mb-4 p-4 rounded-xl bg-violet-500/5 border border-violet-500/10">
                        <AIFeedbackGenerator
                            studentNote={submission.studentNote}
                            assignmentTitle={assignment.title}
                            assignmentDescription={assignment.description}
                            submissionId={submission.id}
                            onFeedbackGenerated={handleFeedbackGenerated}
                        />
                    </div>
                )}

                <Textarea
                    value={feedbackContent}
                    onChange={(e) => setFeedbackContent(e.target.value)}
                    placeholder="Provide constructive feedback to the student. What did they do well? What could be improved? Be specific and encouraging..."
                    rows={6}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.07] transition-all duration-200 resize-none"
                />
                <p className="text-white/25 text-[11px] mt-1.5">
                    Minimum 10 characters. Provide specific, actionable feedback.
                </p>
            </div>

            {/* Status */}
            <div>
                <label className="text-white/60 text-[13px] font-medium block mb-1.5">
                    Status <span className="text-violet-400">*</span>
                </label>
                <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-[14px] focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.07] transition-all duration-200">
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1A1A24] border-white/10 text-white">
                        <SelectItem
                            value="ACCEPTED"
                            className="focus:bg-emerald-500/20 focus:text-white cursor-pointer"
                        >
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                Accepted
                            </div>
                        </SelectItem>
                        <SelectItem
                            value="NEEDS_IMPROVEMENT"
                            className="focus:bg-red-500/20 focus:text-white cursor-pointer"
                        >
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                Needs Improvement
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-2">
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-violet-600 hover:bg-violet-500 disabled:bg-violet-600/50 text-white text-[14px] font-semibold py-2.5 rounded-xl transition-all duration-200 hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            {submission.feedback ? "Updating Review..." : "Submitting Review..."}
                        </>
                    ) : (
                        <>
                            <Send className="w-4 h-4 mr-2" />
                            {submission.feedback ? "Update Review" : "Submit Review"}
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
}

// Helper icon component
function MessageIcon({ className }: { className?: string }) {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
    );
}
