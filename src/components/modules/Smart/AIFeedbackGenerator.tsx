/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/modules/Smart/AIFeedbackGenerator.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { generateFeedback } from "@/services/smart/smart.service";
import { toast } from "sonner";
import { Sparkles, Copy, Check, RefreshCw, Brain, Lightbulb } from "lucide-react";

interface AIFeedbackGeneratorProps {
    studentNote: string;
    assignmentTitle: string;
    assignmentDescription: string;
    submissionId?: string;
    onFeedbackGenerated?: (feedback: string) => void;
}

export default function AIFeedbackGenerator({
    studentNote,
    assignmentTitle,
    assignmentDescription,
    submissionId,
    onFeedbackGenerated,
}: AIFeedbackGeneratorProps) {
    const [feedback, setFeedback] = useState<string>("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const handleGenerateFeedback = async () => {
        if (!studentNote || studentNote.length < 10) {
            toast.error("Student note is too short to generate meaningful feedback");
            return;
        }

        setIsGenerating(true);
        try {
            const result = await generateFeedback({
                studentNote,
                assignmentTitle,
                assignmentDescription,
            });

            if (result.success) {
                setFeedback(result.data.feedback || result.data.content || result.data);
                toast.success("AI feedback generated successfully!");
                if (onFeedbackGenerated && result.data.feedback) {
                    onFeedbackGenerated(result.data.feedback);
                }
            } else {
                toast.error(result.message || "Failed to generate feedback");
            }
        } catch (error) {
            toast.error("An error occurred while generating feedback");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCopy = async () => {
        if (feedback) {
            await navigator.clipboard.writeText(feedback);
            setIsCopied(true);
            toast.success("Feedback copied to clipboard!");
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

    const handleClear = () => {
        setFeedback("");
    };

    return (
        <div className="space-y-4">
            {/* Generate Button */}
            <div className="flex items-center gap-3">
                <Button
                    onClick={handleGenerateFeedback}
                    disabled={isGenerating || !studentNote}
                    className="group flex items-center gap-2 bg-linear-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 disabled:from-violet-600/50 disabled:to-purple-600/50 text-white text-[13px] font-medium px-4 py-2.5 rounded-xl transition-all duration-200 hover:scale-[1.02] disabled:hover:scale-100 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(124,58,237,0.3)]"
                >
                    {isGenerating ? (
                        <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                            Generate AI Feedback
                        </>
                    )}
                </Button>
            </div>

            {/* Generated Feedback */}
            {feedback && (
                <div className="relative">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-lg bg-violet-500/15 flex items-center justify-center">
                            <Brain className="w-3.5 h-3.5 text-violet-400" />
                        </div>
                        <span className="text-white/60 text-[13px] font-medium">
                            AI Generated Feedback
                        </span>
                        <span className="text-violet-400 text-[10px] bg-violet-500/10 px-2 py-0.5 rounded-full">
                            Powered by AI
                        </span>
                    </div>

                    <div className="relative p-4 rounded-xl bg-linear-to-br from-violet-500/5 to-purple-500/5 border border-violet-500/20">
                        <div className="absolute top-3 left-3">
                            <Lightbulb className="w-4 h-4 text-violet-400/50" />
                        </div>
                        <div className="pl-7 pr-16">
                            <p className="text-white/80 text-[14px] leading-relaxed whitespace-pre-wrap">
                                {feedback}
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="absolute top-3 right-3 flex gap-1">
                            <button
                                onClick={handleCopy}
                                className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white/80 transition-all duration-200"
                                title="Copy feedback"
                            >
                                {isCopied ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                )}
                            </button>
                            <button
                                onClick={handleClear}
                                className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-red-400 transition-all duration-200"
                                title="Clear feedback"
                            >
                                <RefreshCw className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>

                    {/* Action Hint */}
                    <p className="text-white/25 text-[11px] mt-2">
                        Click the copy icon to copy this feedback. You can use it when reviewing the submission.
                    </p>
                </div>
            )}

            {/* Empty State */}
            {!feedback && !isGenerating && (
                <div className="p-4 rounded-xl bg-white/2 border border-white/5 text-center">
                    <Sparkles className="w-8 h-8 text-white/10 mx-auto mb-2" />
                    <p className="text-white/30 text-[12px]">
                        Click the button above to generate AI-powered feedback based on the student&apos;s note
                    </p>
                </div>
            )}
        </div>
    );
}