"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import RegisterForm from "@/components/modules/Auth/RegisterForm";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';

const RegisterPage = () => {
    const [mounted, setMounted] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    // Animated dot grid canvas
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
                className="absolute top-[-10%] left-[20%] w-150 h-125 rounded-full pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse at center, rgba(109,40,217,0.22) 0%, transparent 70%)",
                    filter: "blur(40px)",
                }}
            />
            <div
                aria-hidden
                className="absolute bottom-[-10%] right-[10%] w-100 h-100 rounded-full pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse at center, rgba(16,185,129,0.12) 0%, transparent 70%)",
                    filter: "blur(50px)",
                }}
            />

            {/* Left side - Branding */}
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
                        Start Your
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
                            Teaching Journey
                        </span>
                    </h1>

                    <p className="text-white/40 text-[15px] leading-[1.7] max-w-md mb-12">
                        Join our platform to create assignments, track student progress,
                        and leverage AI-powered analytics for better learning outcomes.
                    </p>

                    {/* Feature list */}
                    <div className="space-y-4">
                        {[
                            {
                                title: "Smart Analytics",
                                desc: "Track student performance with real-time data",
                                icon: "M3 3v18h18",
                            },
                            {
                                title: "AI Feedback",
                                desc: "Automated insights to improve learning",
                                icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
                            },
                            {
                                title: "Easy Management",
                                desc: "Organize assignments and submissions effortlessly",
                                icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
                            },
                        ].map((feature, i) => (
                            <div
                                key={feature.title}
                                className="flex items-start gap-4"
                                style={{
                                    transitionDelay: `${i * 100}ms`,
                                }}
                            >
                                <div className="w-8 h-8 rounded-lg bg-violet-500/15 flex items-center justify-center shrink-0">
                                    <svg
                                        width="15"
                                        height="15"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#a78bfa"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d={feature.icon} />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-white/70 text-[13px] font-medium mb-0.5">
                                        {feature.title}
                                    </p>
                                    <p className="text-white/35 text-[12px] leading-normal">
                                        {feature.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right side - Register Form */}
            <div className="relative z-10 w-full lg:w-1/2 flex items-center justify-center px-6 py-24">
                <div
                    className={`w-full max-w-xl transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
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
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Create Your Account
                            </div>

                            <h2
                                className="text-white text-2xl font-bold mb-2"
                                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                            >
                                Get Started
                            </h2>
                            <p className="text-white/40 text-[14px]">
                                Enter your information to create your account
                            </p>
                        </div>

                        {/* Register Form */}
                        <Suspense
                            fallback={
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="h-10 bg-white/5 rounded-lg animate-pulse" />
                                        <div className="h-10 bg-white/5 rounded-lg animate-pulse" />
                                    </div>
                                    <div className="h-10 bg-white/5 rounded-lg animate-pulse" />
                                    <div className="h-10 bg-white/5 rounded-lg animate-pulse" />
                                    <div className="h-10 bg-violet-500/20 rounded-lg animate-pulse" />
                                </div>
                            }
                        >
                            <RegisterForm />
                        </Suspense>
                    </div>

                    {/* Footer text */}
                    <p className="text-center text-white/20 text-[11px] mt-6">
                        Already have an account?{" "}
                        <Link href="/login" className="text-violet-400 hover:text-violet-300 transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>

            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');
            `}</style>
        </div>
    );
};

export default RegisterPage;
