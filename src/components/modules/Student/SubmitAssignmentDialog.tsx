/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/modules/Student/SubmitAssignmentDialog.tsx
"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IAssignment, ISubmission } from "@/types/assignment.interface";
import { createSubmission, updateSubmission } from "@/services/submission/submission.service";
import { toast } from "sonner";
import { Link2, MessageSquare, ExternalLink } from "lucide-react";

interface SubmitAssignmentDialogProps {
    assignment: IAssignment;
    existingSubmission?: ISubmission | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
}

export default function SubmitAssignmentDialog({
    assignment,
    existingSubmission,
    open,
    onOpenChange,
    onSuccess,
}: SubmitAssignmentDialogProps) {
    const [studentUrl, setStudentUrl] = useState("");
    const [studentNote, setStudentNote] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        void Promise.resolve().then(() => {
            if (existingSubmission) {
                setStudentUrl(existingSubmission.studentUrl || "");
                setStudentNote(existingSubmission.studentNote || "");
            } else {
                setStudentUrl("");
                setStudentNote("");
            }
            setErrors({});
        });
    }, [existingSubmission, open]);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!studentUrl.trim()) {
            newErrors.studentUrl = "Submission URL is required";
        } else if (!studentUrl.match(/^https?:\/\/.+/)) {
            newErrors.studentUrl = "Please enter a valid URL (starting with http:// or https://)";
        }

        if (!studentNote.trim()) {
            newErrors.studentNote = "Please add a note about your submission";
        } else if (studentNote.length < 10) {
            newErrors.studentNote = "Note must be at least 10 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const data = {
                studentUrl,
                studentNote,
                assignmentId: assignment.id,
            };

            let result;
            if (existingSubmission) {
                result = await updateSubmission(existingSubmission.id, data);
            } else {
                result = await createSubmission(data);
            }

            if (result.success) {
                toast.success(
                    existingSubmission
                        ? "Submission updated successfully!"
                        : "Assignment submitted successfully!"
                );
                onSuccess();
            } else {
                toast.error(result.message || "Failed to submit assignment");
                if (result.errors) {
                    const fieldErrors: Record<string, string> = {};
                    result.errors.forEach((err: any) => {
                        fieldErrors[err.field] = err.message;
                    });
                    setErrors(fieldErrors);
                }
            }
        } catch (error) {
            toast.error("An error occurred while submitting");
        } finally {
            setIsSubmitting(false);
        }
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

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-[#111118] border border-white/10 text-white max-w-xl">
                <DialogHeader>
                    <DialogTitle className="text-white text-lg font-bold">
                        {existingSubmission ? "Update Submission" : "Submit Assignment"}
                    </DialogTitle>
                    <DialogDescription className="text-white/40">
                        {existingSubmission
                            ? "Update your submission for this assignment"
                            : "Submit your work for review"}
                    </DialogDescription>
                </DialogHeader>

                {/* Assignment Info */}
                <div className="p-4 rounded-xl bg-white/2 border border-white/5 mb-2">
                    <h4 className="text-white text-[14px] font-medium mb-1">{assignment.title}</h4>
                    <p className="text-white/30 text-[12px] line-clamp-2">
                        {assignment.description}
                    </p>
                    <p className="text-white/20 text-[11px] mt-2">
                        Deadline: {formatDate(assignment.deadline)}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 mt-4">
                    {/* Submission URL */}
                    <div>
                        <label className="text-white/60 text-[13px] font-medium flex items-center gap-2 mb-1.5">
                            <Link2 className="w-4 h-4" />
                            Submission URL <span className="text-emerald-400">*</span>
                        </label>
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <ExternalLink className="w-4 h-4 text-white/20" />
                            </div>
                            <Input
                                value={studentUrl}
                                onChange={(e) => setStudentUrl(e.target.value)}
                                placeholder="https://github.com/yourusername/project"
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.07] transition-all duration-200"
                            />
                        </div>
                        {errors.studentUrl && (
                            <p className="text-red-400 text-[11px] mt-1.5">{errors.studentUrl}</p>
                        )}
                        <p className="text-white/25 text-[11px] mt-1.5">
                            Provide a link to your work (GitHub, Google Docs, etc.)
                        </p>
                    </div>

                    {/* Student Note */}
                    <div>
                        <label className="text-white/60 text-[13px] font-medium flex items-center gap-2 mb-1.5">
                            <MessageSquare className="w-4 h-4" />
                            Your Note <span className="text-emerald-400">*</span>
                        </label>
                        <div className="relative">
                            <div className="absolute left-3 top-3 pointer-events-none">
                                <MessageSquare className="w-4 h-4 text-white/20" />
                            </div>
                            <Textarea
                                value={studentNote}
                                onChange={(e) => setStudentNote(e.target.value)}
                                placeholder="What did you learn? What challenges did you face? Any notes for the instructor..."
                                rows={4}
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.07] transition-all duration-200 resize-none"
                            />
                        </div>
                        {errors.studentNote && (
                            <p className="text-red-400 text-[11px] mt-1.5">{errors.studentNote}</p>
                        )}
                        <p className="text-white/25 text-[11px] mt-1.5">
                            Share your learning experience and any comments for the instructor
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-600/50 text-white text-[14px] font-semibold py-2.5 rounded-xl transition-all duration-200"
                        >
                            {isSubmitting ? (
                                <div className="flex items-center gap-2">
                                    <svg
                                        className="animate-spin h-4 w-4"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                        />
                                    </svg>
                                    {existingSubmission ? "Updating..." : "Submitting..."}
                                </div>
                            ) : (
                                <>{existingSubmission ? "Update Submission" : "Submit Assignment"}</>
                            )}
                        </Button>
                        <Button
                            type="button"
                            onClick={() => onOpenChange(false)}
                            variant="outline"
                            className="border border-white/10 text-white/50 hover:text-white/80 hover:border-white/20 bg-transparent py-2.5 rounded-xl transition-all duration-200"
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
