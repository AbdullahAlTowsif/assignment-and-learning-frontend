"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const FLOATING_TAGS = [
    { label: "React Hooks", x: 8, y: 18, delay: 0 },
    { label: "TypeScript", x: 75, y: 10, delay: 0.4 },
    { label: "Algorithms", x: 85, y: 55, delay: 0.8 },
    { label: "Database Design", x: 5, y: 68, delay: 1.2 },
    { label: "REST APIs", x: 60, y: 78, delay: 0.6 },
    { label: "Next.js", x: 40, y: 5, delay: 1.0 },
];

const STATS = [
    { value: "2,400+", label: "Assignments Created" },
    { value: "98%", label: "Submission Rate" },
    { value: "340", label: "Active Students" },
    { value: "4.9★", label: "Instructor Rating" },
];

export default function HeroSection() {
    const [mounted, setMounted] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    // Subtle animated dot grid on canvas
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
                        Math.pow(x - W * 0.55, 2) + Math.pow(y - H * 0.5, 2)
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
        <section className="relative min-h-screen bg-[#0A0A0F] overflow-hidden flex flex-col">
            {/* Animated dot-grid canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
                aria-hidden
            />

            {/* Radial glow blobs */}
            <div
                aria-hidden
                className="absolute top-[-10%] left-[30%] w-150 h-125 rounded-full pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse at center, rgba(109,40,217,0.22) 0%, transparent 70%)",
                    filter: "blur(40px)",
                }}
            />
            <div
                aria-hidden
                className="absolute bottom-0 right-[-5%] w-100 h-100 rounded-full pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse at center, rgba(16,185,129,0.12) 0%, transparent 70%)",
                    filter: "blur(50px)",
                }}
            />

            {/* Navbar */}

            {/* Hero content */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-8 text-center">
                {/* Badge */}
                <div
                    className={`inline-flex items-center gap-2 border border-violet-500/30 bg-violet-500/10 text-violet-300 text-[12px] font-medium px-3.5 py-1.5 rounded-full mb-8 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                        }`}
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                    AI-Powered Learning Analytics
                </div>

                {/* Heading */}
                <h1
                    className={`text-white font-bold leading-[1.08] tracking-[-0.04em] mb-6 transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        }`}
                    style={{
                        fontSize: "clamp(2.8rem, 6vw, 5rem)",
                        fontFamily: "'Playfair Display', Georgia, serif",
                        maxWidth: "780px",
                    }}
                >
                    Where Instruction
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
                        Meets Intelligence
                    </span>
                </h1>

                <p
                    className={`text-white/45 text-[16px] leading-[1.75] max-w-130 mb-10 transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        }`}
                >
                    A unified platform for instructors to create assignments, analyze
                    performance trends, and deliver AI-assisted feedback — while students
                    track their growth in real time.
                </p>

                {/* CTA Buttons */}
                <div
                    className={`flex flex-col sm:flex-row gap-3 mb-16 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        }`}
                >
                    <Link
                        href="/register?role=instructor"
                        className="group flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-[14px] font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:scale-[1.02]"
                    >
                        Start as Instructor
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            className="group-hover:translate-x-0.5 transition-transform"
                        >
                            <path
                                d="M2 7H12M8 3L12 7L8 11"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </Link>
                    <Link
                        href="/register?role=student"
                        className="flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 bg-white/4 hover:bg-white/[0.07] text-white/80 hover:text-white text-[14px] font-medium px-6 py-3 rounded-xl transition-all duration-200"
                    >
                        Join as Student
                    </Link>
                </div>

                {/* Floating topic tags */}
                <div
                    className={`relative w-full max-w-200 h-40 mb-16 transition-all duration-700 delay-500 ${mounted ? "opacity-100" : "opacity-0"
                        }`}
                    aria-hidden
                >
                    {FLOATING_TAGS.map((tag) => (
                        <div
                            key={tag.label}
                            className="absolute border border-white/10 bg-white/4 text-white/40 text-[11px] font-medium px-3 py-1.5 rounded-full backdrop-blur-sm"
                            style={{
                                left: `${tag.x}%`,
                                top: `${tag.y}%`,
                                animation: `floatTag 4s ease-in-out ${tag.delay}s infinite alternate`,
                            }}
                        >
                            {tag.label}
                        </div>
                    ))}

                    {/* Central dashboard preview card */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-70 bg-[#111118] border border-white/10 rounded-2xl p-4 shadow-2xl">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-white/60 text-[11px] font-medium">
                                Submission Overview
                            </span>
                            <span className="text-emerald-400 text-[10px] bg-emerald-400/10 px-2 py-0.5 rounded-full">
                                Live
                            </span>
                        </div>
                        <div className="flex items-end gap-1 h-16 mb-3">
                            {[40, 65, 50, 80, 55, 90, 70].map((h, i) => (
                                <div key={i} className="flex-1 rounded-sm" style={{
                                    height: `${h}%`,
                                    background: i === 5
                                        ? "linear-gradient(to top, #7c3aed, #a78bfa)"
                                        : "rgba(255,255,255,0.08)"
                                }} />
                            ))}
                        </div>
                        <div className="flex items-center justify-between text-[10px]">
                            <span className="text-white/30">Mon — Sun</span>
                            <span className="text-violet-400 font-medium">+12.4% this week</span>
                        </div>
                    </div>
                </div>

                {/* Stats row */}
                <div
                    className={`w-full max-w-175 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/6 rounded-2xl overflow-hidden border border-white/6 transition-all duration-700 delay-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        }`}
                >
                    {STATS.map((stat) => (
                        <div
                            key={stat.label}
                            className="bg-[#0A0A0F] px-5 py-5 text-center"
                        >
                            <div
                                className="text-white text-[22px] font-bold tracking-tight mb-0.5"
                                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                            >
                                {stat.value}
                            </div>
                            <div className="text-white/35 text-[11px] font-medium">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom role split */}
            <div className="relative z-10 grid sm:grid-cols-2 border-t border-white/6">
                {[
                    {
                        role: "Instructor",
                        desc: "Create assignments, review submissions, unlock AI feedback tools and visual analytics.",
                        icon: "M12 4.5v15m7.5-7.5h-15",
                        color: "violet",
                    },
                    {
                        role: "Student",
                        desc: "Browse assignments, submit your work, and track feedback & progress over time.",
                        icon: "M4.5 12.75l6 6 9-13.5",
                        color: "emerald",
                    },
                ].map((item, i) => (
                    <div
                        key={item.role}
                        className={`px-8 py-6 flex items-start gap-4 hover:bg-white/2 transition-colors cursor-default ${i === 0 ? "border-r border-white/6" : ""
                            }`}
                    >
                        <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.color === "violet"
                                    ? "bg-violet-500/15"
                                    : "bg-emerald-500/15"
                                }`}
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke={item.color === "violet" ? "#a78bfa" : "#34d399"}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d={item.icon} />
                            </svg>
                        </div>
                        <div>
                            <p className="text-white/80 text-[13px] font-semibold mb-1">
                                {item.role}
                            </p>
                            <p className="text-white/35 text-[12px] leading-[1.6]">
                                {item.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');
        @keyframes floatTag {
          from { transform: translateY(0px); }
          to { transform: translateY(-10px); }
        }
      `}</style>
        </section>
    );
}
