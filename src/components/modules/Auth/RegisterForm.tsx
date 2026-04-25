"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InputFieldError from "@/components/shared/InputFieldError";
import Link from "next/link";
import { registerUser } from "@/services/auth/registerUser";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const RegisterForm = () => {
    const [state, formAction, isPending] = useActionState(registerUser, null);
    console.log(state);
    const [role, setRole] = useState<"INSTRUCTOR" | "STUDENT">(
        (state?.formData?.role as "INSTRUCTOR" | "STUDENT") || "STUDENT"
    );

    useEffect(() => {
        if (state && !state.success && state.message) {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <form action={formAction} className="space-y-5">
            <FieldGroup>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <Field>
                        <FieldLabel
                            htmlFor="name"
                            className="text-white/60 text-[13px] font-medium"
                        >
                            Full Name
                        </FieldLabel>
                        <div className="relative mt-1.5">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="rgba(255,255,255,0.3)"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </div>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="John Doe"
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.07] transition-all duration-200"
                            />
                        </div>
                        <InputFieldError field="name" state={state} />
                    </Field>

                    {/* Email */}
                    <Field>
                        <FieldLabel
                            htmlFor="email"
                            className="text-white/60 text-[13px] font-medium"
                        >
                            Email Address
                        </FieldLabel>
                        <div className="relative mt-1.5">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="rgba(255,255,255,0.3)"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                            </div>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.07] transition-all duration-200"
                            />
                        </div>
                        <InputFieldError field="email" state={state} />
                    </Field>

                    {/* Role */}
                    <Field>
                        <FieldLabel
                            htmlFor="role"
                            className="text-white/60 text-[13px] font-medium"
                        >
                            Role
                        </FieldLabel>
                        <div className="mt-1.5">
                            <Input
                                id="role"
                                name="role"
                                type="hidden"
                                value={role}
                            />
                            <Select
                                value={role}
                                onValueChange={(value) => setRole(value as "INSTRUCTOR" | "STUDENT")}
                            >
                                <SelectTrigger className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.07] transition-all duration-200">
                                    <SelectValue placeholder="Select your role" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1A1A24] border-white/10 text-white">
                                    <SelectItem
                                        value="STUDENT"
                                        className="focus:bg-violet-500/20 focus:text-white cursor-pointer"
                                    >
                                        <div className="flex items-center gap-2">
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                                <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" />
                                            </svg>
                                            Student
                                        </div>
                                    </SelectItem>
                                    <SelectItem
                                        value="INSTRUCTOR"
                                        className="focus:bg-violet-500/20 focus:text-white cursor-pointer"
                                    >
                                        <div className="flex items-center gap-2">
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                <circle cx="12" cy="7" r="4" />
                                                <path d="M16 3.5a4 4 0 0 1 0 7" />
                                            </svg>
                                            Instructor
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <InputFieldError field="role" state={state} />
                    </Field>

                    {/* Password */}
                    <Field>
                        <FieldLabel
                            htmlFor="password"
                            className="text-white/60 text-[13px] font-medium"
                        >
                            Password
                        </FieldLabel>
                        <div className="relative mt-1.5">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="rgba(255,255,255,0.3)"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                            </div>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Create a password"
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.07] transition-all duration-200"
                            />
                        </div>
                        <InputFieldError field="password" state={state} />
                    </Field>

                    {/* Confirm Password */}
                    <Field>
                        <FieldLabel
                            htmlFor="confirmPassword"
                            className="text-white/60 text-[13px] font-medium"
                        >
                            Confirm Password
                        </FieldLabel>
                        <div className="relative mt-1.5">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="rgba(255,255,255,0.3)"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                            </div>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.07] transition-all duration-200"
                            />
                        </div>
                        <InputFieldError field="confirmPassword" state={state} />
                    </Field>

                    {/* Role description card */}
                    <Field className="md:col-span-2">
                        <div className="mt-1 p-4 rounded-xl bg-white/2 border border-white/5">
                            <div className="flex items-start gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${role === "INSTRUCTOR"
                                        ? "bg-violet-500/15"
                                        : "bg-emerald-500/15"
                                    }`}>
                                    {role === "INSTRUCTOR" ? (
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                        </svg>
                                    ) : (
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                            <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" />
                                        </svg>
                                    )}
                                </div>
                                <div>
                                    <p className={`text-[13px] font-medium mb-1 ${role === "INSTRUCTOR" ? "text-violet-300" : "text-emerald-300"
                                        }`}>
                                        {role === "INSTRUCTOR" ? "Instructor Account" : "Student Account"}
                                    </p>
                                    <p className="text-white/30 text-[12px] leading-normal">
                                        {role === "INSTRUCTOR"
                                            ? "Create assignments, review submissions, access AI feedback tools, and track student analytics."
                                            : "Browse assignments, submit your work, track feedback, and monitor your progress over time."
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Field>
                </div>

                {/* Submit Button */}
                <div className="mt-6 space-y-4">
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="group flex items-center justify-center gap-2 w-full bg-violet-600 hover:bg-violet-500 disabled:bg-violet-600/50 text-white text-[14px] font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] disabled:hover:scale-100 disabled:cursor-not-allowed"
                    >
                        {isPending ? (
                            <>
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
                                Creating Account...
                            </>
                        ) : (
                            <>
                                Create Account
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 14 14"
                                    fill="none"
                                    className="group-hover:translate-x-0.5 transition-transform"
                                >
                                    <path
                                        d="M2 7H12M8 3L12 7L8 11"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </>
                        )}
                    </Button>

                    {/* Login link */}
                    <FieldDescription className="text-center text-white/30 text-[12px]">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="text-violet-400 hover:text-violet-300 transition-colors"
                        >
                            Sign in
                        </Link>
                    </FieldDescription>
                </div>
            </FieldGroup>
        </form>
    );
};

export default RegisterForm;
