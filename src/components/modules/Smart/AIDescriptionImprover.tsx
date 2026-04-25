/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { improveDescription } from "@/services/smart/smart.service";
import { toast } from "sonner";
import { Sparkles, Copy, Check, RefreshCw, Wand2, ArrowRight } from "lucide-react";

interface AIDescriptionImproverProps {
    currentTitle: string;
    currentDescription: string;
    difficulty?: string;
    onDescriptionImproved?: (improvedDescription: string) => void;
}

export default function AIDescriptionImprover({
    currentTitle,
    currentDescription,
    difficulty,
    onDescriptionImproved,
}: AIDescriptionImproverProps) {
    const [improvedDescription, setImprovedDescription] = useState<string>("");
    const [isImproving, setIsImproving] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [showComparison, setShowComparison] = useState(false);

    const handleImproveDescription = async () => {
        if (!currentDescription || currentDescription.length < 20) {
            toast.error("Description is too short to improve. Please add more details first.");
            return;
        }

        setIsImproving(true);
        try {
            const result = await improveDescription({
                title: currentTitle,
                description: currentDescription,
                difficulty: difficulty || "INTERMEDIATE",
            });

            if (result.success) {
                setImprovedDescription(result.data.description || result.data.content || result.data);
                setShowComparison(true);
                toast.success("Description improved successfully!");
                if (onDescriptionImproved && result.data.description) {
                    onDescriptionImproved(result.data.description);
                }
            } else {
                toast.error(result.message || "Failed to improve description");
            }
        } catch (error) {
            toast.error("An error occurred while improving description");
        } finally {
            setIsImproving(false);
        }
    };

    const handleCopy = async () => {
        if (improvedDescription) {
            await navigator.clipboard.writeText(improvedDescription);
            setIsCopied(true);
            toast.success("Improved description copied to clipboard!");
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

    const handleApply = () => {
        if (onDescriptionImproved && improvedDescription) {
            onDescriptionImproved(improvedDescription);
            toast.success("Description applied! Don't forget to save your changes.");
        }
    };

    const handleClear = () => {
        setImprovedDescription("");
        setShowComparison(false);
    };

    return (
        <div className="space-y-4">
            {/* Improve Button */}
            <div className="flex items-center gap-3">
                <Button
                    onClick={handleImproveDescription}
                    disabled={isImproving || !currentDescription || currentDescription.length < 20}
                    className="group flex items-center gap-2 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:from-emerald-600/50 disabled:to-teal-600/50 text-white text-[13px] font-medium px-4 py-2.5 rounded-xl transition-all duration-200 hover:scale-[1.02] disabled:hover:scale-100 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                >
                    {isImproving ? (
                        <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            Improving...
                        </>
                    ) : (
                        <>
                            <Wand2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                            Improve Description
                        </>
                    )}
                </Button>

                {currentDescription.length > 0 && currentDescription.length < 20 && (
                    <span className="text-amber-400 text-[11px]">
                        Need at least 20 characters
                    </span>
                )}
            </div>

            {/* Comparison View */}
            {showComparison && improvedDescription && (
                <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Original */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-white/40 text-[12px] font-medium">
                                    Original Description
                                </span>
                            </div>
                            <div className="p-4 rounded-xl bg-white/2 border border-white/5">
                                <p className="text-white/50 text-[13px] leading-relaxed whitespace-pre-wrap">
                                    {currentDescription}
                                </p>
                            </div>
                        </div>

                        {/* Improved */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-5 h-5 rounded bg-emerald-500/15 flex items-center justify-center">
                                    <Sparkles className="w-3 h-3 text-emerald-400" />
                                </div>
                                <span className="text-emerald-400 text-[12px] font-medium">
                                    AI Improved
                                </span>
                            </div>
                            <div className="relative p-4 rounded-xl bg-linear-to-br from-emerald-500/5 to-teal-500/5 border border-emerald-500/20">
                                <p className="text-white/80 text-[13px] leading-relaxed whitespace-pre-wrap pr-16">
                                    {improvedDescription}
                                </p>

                                {/* Action Buttons */}
                                <div className="absolute top-3 right-3 flex gap-1">
                                    <button
                                        onClick={handleCopy}
                                        className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white/80 transition-all duration-200"
                                        title="Copy improved description"
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
                                        title="Clear"
                                    >
                                        <RefreshCw className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Apply Button */}
                    <div className="flex items-center gap-3">
                        <Button
                            onClick={handleApply}
                            className="group flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-[13px] font-medium px-4 py-2 rounded-xl transition-all duration-200"
                        >
                            Apply Improvement
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Button>
                        <span className="text-white/25 text-[11px]">
                            This will replace your current description
                        </span>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {!improvedDescription && !isImproving && (
                <div className="p-4 rounded-xl bg-white/2 border border-white/5 text-center">
                    <Wand2 className="w-8 h-8 text-white/10 mx-auto mb-2" />
                    <p className="text-white/30 text-[12px]">
                        Click the button above to enhance your assignment description with AI
                    </p>
                    <p className="text-white/20 text-[11px] mt-1">
                        The AI will make it more engaging, clear, and comprehensive
                    </p>
                </div>
            )}
        </div>
    );
}