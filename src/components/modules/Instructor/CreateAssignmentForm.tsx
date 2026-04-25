"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InputFieldError from "@/components/shared/InputFieldError";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createAssignment } from "@/services/assignment/assignment.service";
import AIDescriptionImprover from "@/components/modules/Smart/AIDescriptionImprover";
import { Sparkles } from "lucide-react";

const difficultyLevels = [
    { value: "BEGINNER", label: "Beginner" },
    { value: "INTERMEDIATE", label: "Intermediate" },
    { value: "ADVANCED", label: "Advanced" },
];

const CreateAssignmentForm = () => {
    const [state, formAction, isPending] = useActionState(createAssignment, null);
    const [difficulty, setDifficulty] = useState<string>(
        (state?.formData?.difficulty as string) || "INTERMEDIATE"
    );
    const [title, setTitle] = useState<string>((state?.formData?.title as string) || "");
    const [description, setDescription] = useState<string>((state?.formData?.description as string) || "");
    const [deadline, setDeadline] = useState<string>((state?.formData?.deadline as string) || "");
    const [showAITools, setShowAITools] = useState(false);

    useEffect(() => {
        if (state && !state.success && state.message) {
            toast.error(state.message);
        }
        if (state && state.success && state.message) {
            toast.success(state.message);
            // Reset form asynchronously to avoid cascading renders
            Promise.resolve().then(() => {
                setTitle("");
                setDescription("");
                setDifficulty("INTERMEDIATE");
                setDeadline("");
            });
        }
    }, [state]);

    const getMinDateTime = () => {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        return now.toISOString().slice(0, 16);
    };

    return (
        <form action={formAction} className="space-y-5">
            <FieldGroup>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Title */}
                    <Field className="md:col-span-2">
                        <FieldLabel
                            htmlFor="title"
                            className="text-white/60 text-[13px] font-medium"
                        >
                            Assignment Title <span className="text-violet-400">*</span>
                        </FieldLabel>
                        <div className="relative mt-1.5">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                    <line x1="16" y1="13" x2="8" y2="13" />
                                    <line x1="16" y1="17" x2="8" y2="17" />
                                </svg>
                            </div>
                            <Input
                                id="title"
                                name="title"
                                type="text"
                                placeholder="e.g., Introduction to React Hooks"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.07] transition-all duration-200"
                            />
                        </div>
                        <FieldDescription className="text-white/25 text-[11px] mt-1.5">
                            Make it clear and descriptive (min. 4 characters)
                        </FieldDescription>
                        <InputFieldError field="title" state={state} />
                    </Field>

                    {/* Difficulty Level */}
                    <Field>
                        <FieldLabel htmlFor="difficulty" className="text-white/60 text-[13px] font-medium">
                            Difficulty Level <span className="text-violet-400">*</span>
                        </FieldLabel>
                        <div className="mt-1.5">
                            <Input id="difficulty" name="difficulty" type="hidden" value={difficulty} readOnly />
                            <Select value={difficulty} onValueChange={(value) => setDifficulty(value)}>
                                <SelectTrigger className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.07] transition-all duration-200">
                                    <SelectValue placeholder="Select difficulty" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1A1A24] border-white/10 text-white">
                                    {difficultyLevels.map((level) => (
                                        <SelectItem key={level.value} value={level.value} className="focus:bg-violet-500/20 focus:text-white cursor-pointer">
                                            <div className="flex items-center gap-2">
                                                <span className={`w-1.5 h-1.5 rounded-full ${level.value === "BEGINNER" ? "bg-emerald-400" :
                                                        level.value === "INTERMEDIATE" ? "bg-amber-400" : "bg-red-400"
                                                    }`} />
                                                {level.label}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <InputFieldError field="difficulty" state={state} />
                    </Field>

                    {/* Deadline */}
                    <Field>
                        <FieldLabel htmlFor="deadline" className="text-white/60 text-[13px] font-medium">
                            Deadline <span className="text-violet-400">*</span>
                        </FieldLabel>
                        <div className="relative mt-1.5">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                            </div>
                            <Input
                                id="deadline"
                                name="deadline"
                                type="datetime-local"
                                min={getMinDateTime()}
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.07] transition-all duration-200 scheme-dark"
                            />
                        </div>
                        <FieldDescription className="text-white/25 text-[11px] mt-1.5">
                            Set a realistic deadline for your students
                        </FieldDescription>
                        <InputFieldError field="deadline" state={state} />
                    </Field>

                    {/* Description with AI Improver */}
                    <Field className="md:col-span-2">
                        <div className="flex items-center justify-between">
                            <FieldLabel htmlFor="description" className="text-white/60 text-[13px] font-medium">
                                Description <span className="text-violet-400">*</span>
                            </FieldLabel>
                            <button
                                type="button"
                                onClick={() => setShowAITools(!showAITools)}
                                className="flex items-center gap-1.5 text-violet-400 hover:text-violet-300 text-[12px] font-medium transition-colors"
                            >
                                <Sparkles className="w-3.5 h-3.5" />
                                {showAITools ? "Hide AI Tools" : "AI Tools"}
                            </button>
                        </div>
                        <div className="relative mt-1.5">
                            <div className="absolute left-3 top-3 pointer-events-none">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                </svg>
                            </div>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Describe the assignment objectives, requirements, submission guidelines, and evaluation criteria in detail..."
                                rows={6}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.07] transition-all duration-200 resize-none"
                            />
                        </div>
                        <FieldDescription className="text-white/25 text-[11px] mt-1.5">
                            Minimum 20 characters. Include clear instructions, requirements, and any helpful resources.
                        </FieldDescription>
                        <InputFieldError field="description" state={state} />

                        {/* AI Description Improver */}
                        {showAITools && (
                            <div className="mt-4 p-4 rounded-xl bg-violet-500/5 border border-violet-500/10">
                                <div className="flex items-center gap-2 mb-3">
                                    <Sparkles className="w-4 h-4 text-violet-400" />
                                    <span className="text-violet-300 text-[13px] font-medium">
                                        AI Description Improver
                                    </span>
                                </div>
                                <AIDescriptionImprover
                                    currentTitle={title || "Untitled Assignment"}
                                    currentDescription={description}
                                    difficulty={difficulty}
                                    onDescriptionImproved={(improved) => setDescription(improved)}
                                />
                            </div>
                        )}
                    </Field>

                    {/* AI Feedback Info Card */}
                    <Field className="md:col-span-2">
                        <div className="mt-1 p-4 rounded-xl bg-linear-to-r from-violet-500/5 to-emerald-500/5 border border-white/5">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-violet-500/15 flex items-center justify-center shrink-0">
                                    <Sparkles className="w-4 h-4 text-violet-400" />
                                </div>
                                <div>
                                    <p className="text-violet-300 text-[13px] font-medium mb-1">
                                        AI-Powered Features
                                    </p>
                                    <p className="text-white/30 text-[12px] leading-relaxed">
                                        This assignment will automatically enable AI feedback generation for student submissions.
                                        Use the AI Tools button above to improve your description.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Field>
                </div>

                {/* Submit Button */}
                <div className="mt-8 space-y-4">
                    <div className="flex gap-3">
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="group flex-1 flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 disabled:bg-violet-600/50 text-white text-[14px] font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] disabled:hover:scale-100 disabled:cursor-not-allowed"
                        >
                            {isPending ? (
                                <>
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Creating Assignment...
                                </>
                            ) : (
                                <>
                                    Publish Assignment
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-0.5 transition-transform">
                                        <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </>
                            )}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                setTitle("");
                                setDescription("");
                                setDifficulty("INTERMEDIATE");
                                setDeadline("");
                            }}
                            className="px-6 py-3 rounded-xl border border-white/10 text-white/50 hover:text-white/80 hover:border-white/20 bg-transparent transition-all duration-200"
                        >
                            Reset Form
                        </Button>
                    </div>
                </div>
            </FieldGroup>
        </form>
    );
};

export default CreateAssignmentForm;
