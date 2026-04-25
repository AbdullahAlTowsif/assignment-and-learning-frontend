"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { loginUser } from "@/services/auth/login";
import InputFieldError from "@/components/shared/InputFieldError";

const LoginForm = ({ redirect }: { redirect?: string }) => {
    const [state, formAction, isPending] = useActionState(loginUser, null);
    console.log(state);

    useEffect(() => {
        if (state && !state.success && state.message) {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <form action={formAction} className="space-y-5">
            {redirect && <input type="hidden" name="redirect" value={redirect} />}

            <FieldGroup>
                <div className="grid grid-cols-1 gap-5">
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

                    {/* Password */}
                    <Field>
                        <div className="flex items-center justify-between">
                            <FieldLabel
                                htmlFor="password"
                                className="text-white/60 text-[13px] font-medium"
                            >
                                Password
                            </FieldLabel>
                            <Link
                                href="/forgot-password"
                                className="text-violet-400 hover:text-violet-300 text-[12px] transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>
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
                                placeholder="Enter your password"
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.07] transition-all duration-200"
                            />
                        </div>
                        <InputFieldError field="password" state={state} />
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
                                Signing in...
                            </>
                        ) : (
                            <>
                                Sign in
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

                    {/* Register link */}
                    <FieldDescription className="text-center text-white/30 text-[12px]">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/register"
                            className="text-violet-400 hover:text-violet-300 transition-colors"
                        >
                            Create one
                        </Link>
                    </FieldDescription>
                </div>
            </FieldGroup>
        </form>
    );
};

export default LoginForm;
