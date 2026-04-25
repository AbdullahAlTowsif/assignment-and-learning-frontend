"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import LoginForm from "@/components/modules/Auth/LoginForm";
import { Suspense } from "react";

export default function LoginPage() {
    const [mounted, setMounted] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    // Animated dot grid canvas (matching hero section)
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animId: number;
        let t = 0;

        const resize = () => {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };
        resize();
        window.addEventListener("resize", resize);

        const draw = () => {
            const W = canvas.offsetWidth;
            const H = canvas.offsetHeight;
            ctx.clearRect(0, 0, W, H);

            const spacing = 36;
            const cols = Math.ceil(W / spacing) + 1;
            const rows = Math.ceil(H / spacing) + 1;

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const x = c * spacing;
                    const y = r * spacing;
                    const dist = Math.sqrt(
                        Math.pow(x - W * 0.5, 2) + Math.pow(y - H * 0.5, 2)
                    );
                    const wave = Math.sin(dist * 0.025 - t * 0.8) * 0.5 + 0.5;
                    const opacity = wave * 0.18 + 0.04;
                    ctx.beginPath();
                    ctx.arc(x, y, 1.5, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(139, 92, 246, ${opacity})`;
                    ctx.fill();
                }
            }

            t += 0.03;
            animId = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
        };
    }, [mounted]);

    return (
        <div className="relative min-h-screen bg-[#0A0A0F] overflow-hidden flex">
            {/* Animated dot-grid canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
                aria-hidden
            />

            {/* Radial glow blobs */}
            <div
                aria-hidden
                className="absolute top-[-10%] right-[20%] w-150 h-125 rounded-full pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse at center, rgba(109,40,217,0.22) 0%, transparent 70%)",
                    filter: "blur(40px)",
                }}
            />
            <div
                aria-hidden
                className="absolute bottom-[-10%] left-[10%] w-100 h-100 rounded-full pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse at center, rgba(16,185,129,0.12) 0%, transparent 70%)",
                    filter: "blur(50px)",
                }}
            />

            {/* Left side - Branding & Visual */}
            <div className="relative z-10 hidden lg:flex lg:w-1/2 flex-col justify-center px-16">
                <div
                    className={`transition-all duration-700 ${mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                        }`}
                >
                    {/* Logo/Brand */}
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-violet-400 mb-12 hover:text-violet-300 transition-colors"
                    >
                        <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center">
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#a78bfa"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        </div>
                        <span className="text-white font-semibold text-[15px]">
                            Assess.ai
                        </span>
                    </Link>

                    {/* Heading */}
                    <h1
                        className="text-white font-bold leading-[1.1] tracking-[-0.03em] mb-6"
                        style={{
                            fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
                            fontFamily: "'Playfair Display', Georgia, serif",
                        }}
                    >
                        Welcome to the
                        <br />
                        <span
                            style={{
                                background:
                                    "linear-gradient(135deg, #a78bfa 0%, #7c3aed 40%, #10b981 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            Intelligent Classroom
                        </span>
                    </h1>

                    <p className="text-white/40 text-[15px] leading-[1.7] max-w-md mb-12">
                        Where AI-powered analytics meet seamless assignment management.
                        Sign in to unlock personalized insights and feedback tools.
                    </p>

                    {/* Feature pills */}
                    <div className="flex flex-wrap gap-2">
                        {[
                            "Real-time Analytics",
                            "AI Feedback",
                            "Assignment Tracking",
                            "Performance Insights",
                        ].map((feature, i) => (
                            <span
                                key={feature}
                                className="border border-white/8 bg-white/3 text-white/50 text-[11px] px-3 py-1.5 rounded-full backdrop-blur-sm"
                                style={{
                                    animation: mounted
                                        ? `floatTag 3s ease-in-out ${i * 0.2}s infinite alternate`
                                        : "none",
                                }}
                            >
                                {feature}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right side - Login Form */}
            <div className="relative z-10 w-full lg:w-1/2 flex items-center justify-center px-6">
                <div
                    className={`w-full max-w-md transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        }`}
                >
                    {/* Card */}
                    <div className="bg-[#111118]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                        {/* Card header */}
                        <div className="text-center mb-8">
                            <div
                                className={`inline-flex items-center gap-2 border border-violet-500/30 bg-violet-500/10 text-violet-300 text-[12px] font-medium px-3.5 py-1.5 rounded-full mb-6 transition-all duration-700 ${mounted ? "opacity-100" : "opacity-0"
                                    }`}
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                                Secure Authentication
                            </div>

                            <h2
                                className="text-white text-2xl font-bold mb-2"
                                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                            >
                                Sign In
                            </h2>
                            <p className="text-white/40 text-[14px]">
                                Enter your credentials to continue
                            </p>
                        </div>

                        {/* Login Form */}
                        <Suspense
                            fallback={
                                <div className="space-y-4">
                                    <div className="h-10 bg-white/5 rounded-lg animate-pulse" />
                                    <div className="h-10 bg-white/5 rounded-lg animate-pulse" />
                                    <div className="h-10 bg-violet-500/20 rounded-lg animate-pulse" />
                                </div>
                            }
                        >
                            <LoginForm />
                        </Suspense>

                        {/* Divider */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/8" />
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="bg-[#111118] px-4 text-white/30">
                                    New to Assess.ai?
                                </span>
                            </div>
                        </div>

                        {/* Register CTA */}
                        <Link
                            href="/register"
                            className="flex items-center justify-center gap-2 w-full border border-violet-500/30 bg-violet-500/5 hover:bg-violet-500/10 text-violet-300 hover:text-violet-200 text-[14px] font-medium px-6 py-3 rounded-xl transition-all duration-200 hover:border-violet-500/50"
                        >
                            Create an account
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                className="transition-transform group-hover:translate-x-0.5"
                            >
                                <path
                                    d="M2 7H12M8 3L12 7L8 11"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </Link>
                    </div>

                    {/* Footer text */}
                    <p className="text-center text-white/20 text-[11px] mt-6">
                        By continuing, you agree to our{" "}
                        <Link href="/terms" className="text-white/40 hover:text-white/60 underline">
                            Terms
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-white/40 hover:text-white/60 underline">
                            Privacy Policy
                        </Link>
                    </p>
                </div>
            </div>

            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');
                @keyframes floatTag {
                    from {
                        transform: translateY(0px);
                    }
                    to {
                        transform: translateY(-6px);
                    }
                }
            `}</style>
        </div>
    );
}
