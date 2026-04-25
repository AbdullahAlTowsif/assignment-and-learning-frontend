"use client";

import { useEffect, useRef, useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const INSTRUCTOR_STEPS = [
    {
        number: "01",
        title: "Create an Assignment",
        description:
            "Define the title, description, deadline, and difficulty level. Use the AI assistant to refine wording and ensure clarity before publishing.",
        tag: "Instructor",
        tagColor: "violet",
        visual: <AssignmentVisual />,
    },
    {
        number: "02",
        title: "Review Submissions",
        description:
            "Access every student submission in one view. Update statuses to Accepted, Pending, or Needs Improvement and leave qualitative feedback.",
        tag: "Instructor",
        tagColor: "violet",
        visual: <ReviewVisual />,
    },
    {
        number: "03",
        title: "Analyze Performance",
        description:
            "Visual dashboards surface submission trends, acceptance rates, and which assignments are causing the most friction across your class.",
        tag: "Instructor",
        tagColor: "violet",
        visual: <AnalyticsVisual />,
    },
];

const STUDENT_STEPS = [
    {
        number: "04",
        title: "Browse Assignments",
        description:
            "Filter by difficulty — beginner, intermediate, or advanced. See deadlines and full descriptions before you start.",
        tag: "Student",
        tagColor: "emerald",
        visual: <BrowseVisual />,
    },
    {
        number: "05",
        title: "Submit Your Work",
        description:
            "Paste a URL to your project and add a descriptive note summarising your approach. Submit in seconds, no file uploads needed.",
        tag: "Student",
        tagColor: "emerald",
        visual: <SubmitVisual />,
    },
    {
        number: "06",
        title: "Track Your Growth",
        description:
            "Watch your submission status update in real time. Read instructor feedback and iterate — your whole journey is logged and visible.",
        tag: "Student",
        tagColor: "emerald",
        visual: <TrackVisual />,
    },
];

// ─── Mini UI Visuals ─────────────────────────────────────────────────────────

function AssignmentVisual() {
    return (
        <div className="w-full bg-[#0d0d14] rounded-xl border border-white/8 p-4 font-mono text-[11px]">
            <div className="flex items-center gap-1.5 mb-3">
                {["#FF5F57", "#FFBD2E", "#28C840"].map((c) => (
                    <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                ))}
            </div>
            <div className="space-y-2.5">
                <div>
                    <div className="text-white/30 mb-1">Title</div>
                    <div className="bg-white/5 border border-white/8 rounded-md px-3 py-2 text-white/70">
                        Build a REST API with Express.js
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <div className="text-white/30 mb-1">Difficulty</div>
                        <div className="bg-violet-500/15 border border-violet-500/25 rounded-md px-3 py-2 text-violet-300">
                            Intermediate
                        </div>
                    </div>
                    <div>
                        <div className="text-white/30 mb-1">Deadline</div>
                        <div className="bg-white/5 border border-white/8 rounded-md px-3 py-2 text-white/50">
                            Dec 28, 2025
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-7 rounded-md bg-violet-600 flex items-center justify-center text-white text-[10px] font-semibold">
                        Publish Assignment
                    </div>
                    <div className="h-7 px-3 rounded-md border border-white/10 flex items-center text-white/40 text-[10px]">
                        AI Refine ✦
                    </div>
                </div>
            </div>
        </div>
    );
}

function ReviewVisual() {
    const rows = [
        { name: "Arif Hassan", note: "Used Prisma ORM...", status: "Accepted", color: "emerald" },
        { name: "Sara Karim", note: "Implemented auth...", status: "Pending", color: "amber" },
        { name: "Nabil Hossain", note: "Basic CRUD done...", status: "Needs Improvement", color: "red" },
    ];
    return (
        <div className="w-full bg-[#0d0d14] rounded-xl border border-white/8 p-4 text-[11px]">
            <div className="text-white/30 mb-3 flex items-center justify-between">
                <span>Student Submissions</span>
                <span className="bg-white/5 px-2 py-0.5 rounded-full text-white/40">3 total</span>
            </div>
            <div className="space-y-2">
                {rows.map((r) => (
                    <div key={r.name} className="flex items-center gap-3 bg-white/3 border border-white/6 rounded-lg px-3 py-2">
                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[9px] text-white/50 shrink-0">
                            {r.name[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-white/70 font-medium truncate">{r.name}</div>
                            <div className="text-white/25 truncate">{r.note}</div>
                        </div>
                        <div
                            className={`shrink-0 text-[9px] font-semibold px-2 py-0.5 rounded-full ${r.color === "emerald"
                                    ? "bg-emerald-500/15 text-emerald-400"
                                    : r.color === "amber"
                                        ? "bg-amber-500/15 text-amber-400"
                                        : "bg-red-500/15 text-red-400"
                                }`}
                        >
                            {r.status}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function AnalyticsVisual() {
    const bars = [
        { label: "Beginner", value: 82, color: "#10b981" },
        { label: "Intermediate", value: 55, color: "#a78bfa" },
        { label: "Advanced", value: 34, color: "#f59e0b" },
    ];
    return (
        <div className="w-full bg-[#0d0d14] rounded-xl border border-white/8 p-4 text-[11px]">
            <div className="text-white/30 mb-4">Acceptance Rate by Difficulty</div>
            <div className="space-y-3">
                {bars.map((b) => (
                    <div key={b.label}>
                        <div className="flex justify-between text-white/40 mb-1">
                            <span>{b.label}</span>
                            <span style={{ color: b.color }}>{b.value}%</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                            <div
                                className="h-full rounded-full"
                                style={{
                                    width: `${b.value}%`,
                                    background: b.color,
                                    opacity: 0.8,
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4 flex gap-2">
                {[["24", "Submitted"], ["18", "Accepted"], ["6", "Pending"]].map(([n, l]) => (
                    <div key={l} className="flex-1 bg-white/3 rounded-lg px-2 py-2 text-center border border-white/6">
                        <div className="text-white/80 font-semibold text-[13px]">{n}</div>
                        <div className="text-white/25">{l}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function BrowseVisual() {
    const items = [
        { title: "Build a REST API", level: "Intermediate", due: "Dec 28", color: "violet" },
        { title: "React Todo App", level: "Beginner", due: "Jan 5", color: "emerald" },
        { title: "Auth System", level: "Advanced", due: "Jan 12", color: "amber" },
    ];
    return (
        <div className="w-full bg-[#0d0d14] rounded-xl border border-white/8 p-4 text-[11px]">
            <div className="flex gap-1.5 mb-3">
                {["All", "Beginner", "Intermediate", "Advanced"].map((f, i) => (
                    <div
                        key={f}
                        className={`px-2.5 py-1 rounded-full text-[10px] cursor-default ${i === 0
                                ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                                : "bg-white/4 text-white/30 border border-white/8"
                            }`}
                    >
                        {f}
                    </div>
                ))}
            </div>
            <div className="space-y-2">
                {items.map((it) => (
                    <div key={it.title} className="flex items-center gap-3 bg-white/3 border border-white/6 rounded-lg px-3 py-2.5 hover:border-white/12 transition-colors">
                        <div
                            className={`w-1.5 h-8 rounded-full shrink-0 ${it.color === "violet"
                                    ? "bg-violet-500"
                                    : it.color === "emerald"
                                        ? "bg-emerald-500"
                                        : "bg-amber-500"
                                }`}
                        />
                        <div className="flex-1">
                            <div className="text-white/70 font-medium">{it.title}</div>
                            <div className="text-white/25">{it.level} · Due {it.due}</div>
                        </div>
                        <div className="text-white/20 text-[10px]">→</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function SubmitVisual() {
    return (
        <div className="w-full bg-[#0d0d14] rounded-xl border border-white/8 p-4 text-[11px]">
            <div className="text-white/30 mb-3">Submit: Build a REST API</div>
            <div className="space-y-3">
                <div>
                    <div className="text-white/30 mb-1">Project URL</div>
                    <div className="flex items-center gap-2 bg-white/5 border border-white/8 rounded-md px-3 py-2">
                        <span className="text-violet-400">↗</span>
                        <span className="text-white/40 truncate">https://github.com/arif/rest-api</span>
                    </div>
                </div>
                <div>
                    <div className="text-white/30 mb-1">Notes</div>
                    <div className="bg-white/5 border border-white/8 rounded-md px-3 py-2 text-white/40 leading-relaxed">
                        Built with Express + Prisma. Implemented JWT auth and full CRUD for users...
                    </div>
                </div>
                <div className="h-8 rounded-md bg-emerald-600 flex items-center justify-center text-white text-[10px] font-semibold gap-1.5">
                    <span>Submit Assignment</span>
                    <span>✓</span>
                </div>
            </div>
        </div>
    );
}

function TrackVisual() {
    const timeline = [
        { action: "Submitted", time: "2 days ago", dot: "bg-white/20" },
        { action: "Under Review", time: "1 day ago", dot: "bg-amber-400" },
        { action: "Feedback Added", time: "3 hrs ago", dot: "bg-violet-400" },
        { action: "Accepted ✓", time: "Just now", dot: "bg-emerald-400" },
    ];
    return (
        <div className="w-full bg-[#0d0d14] rounded-xl border border-white/8 p-4 text-[11px]">
            <div className="flex items-center justify-between mb-3">
                <span className="text-white/30">Submission Timeline</span>
                <span className="text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full text-[10px]">Accepted</span>
            </div>
            <div className="relative pl-4">
                <div className="absolute left-1.75 top-2 bottom-2 w-px bg-white/8" />
                <div className="space-y-3.5">
                    {timeline.map((t) => (
                        <div key={t.action} className="flex items-start gap-3">
                            <div className={`w-3 h-3 rounded-full shrink-0 mt-0.5 -ml-4 border-2 border-[#0d0d14] ${t.dot}`} />
                            <div>
                                <div className="text-white/60 font-medium">{t.action}</div>
                                <div className="text-white/25">{t.time}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-4 bg-violet-500/8 border border-violet-500/15 rounded-lg px-3 py-2.5">
                <div className="text-violet-300/70 text-[10px] mb-0.5">Instructor Feedback</div>
                <div className="text-white/40 leading-relaxed">&quot;Great implementation. Auth flow is solid. Consider adding rate limiting next time.&quot;</div>
            </div>
        </div>
    );
}

// ─── Step Card ────────────────────────────────────────────────────────────────

function StepCard({
    step,
    index,
    isVisible,
}: {
    step: (typeof INSTRUCTOR_STEPS)[0];
    index: number;
    isVisible: boolean;
}) {
    const isViolet = step.tagColor === "violet";

    return (
        <div
            className="group relative"
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(32px)",
                transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s`,
            }}
        >
            {/* Step number — oversized, bleeds behind card */}
            <div
                className="absolute -top-6 -left-2 text-[80px] font-black leading-none select-none pointer-events-none z-0"
                style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    color: isViolet ? "rgba(109,40,217,0.10)" : "rgba(16,185,129,0.08)",
                }}
            >
                {step.number}
            </div>

            <div
                className="relative z-10 bg-[#0d0d14] border rounded-2xl p-5 flex flex-col gap-4 h-full
          hover:border-white/12 transition-all duration-300 hover:-translate-y-1"
                style={{ borderColor: "rgba(255,255,255,0.07)" }}
            >
                {/* Tag */}
                <div className="flex items-center justify-between">
                    <span
                        className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${isViolet
                                ? "bg-violet-500/12 text-violet-400 border border-violet-500/20"
                                : "bg-emerald-500/12 text-emerald-400 border border-emerald-500/20"
                            }`}
                    >
                        {step.tag}
                    </span>
                    <span className="text-[11px] text-white/20 font-mono">{step.number}</span>
                </div>

                {/* Title */}
                <div>
                    <h3
                        className="text-white/90 text-[17px] font-bold leading-snug mb-2"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                        {step.title}
                    </h3>
                    <p className="text-white/38 text-[13px] leading-[1.7]">{step.description}</p>
                </div>

                {/* Visual preview */}
                <div className="mt-auto">{step.visual}</div>
            </div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function HowItWorks() {
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={ref}
            className="relative bg-[#08080e] overflow-hidden py-28 px-6"
        >
            {/* Background texture — subtle grid lines */}
            <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Glow top-center */}
            <div
                aria-hidden
                className="absolute top-0 left-1/2 -translate-x-1/2 w-175 h-75 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse at top, rgba(109,40,217,0.12) 0%, transparent 65%)",
                }}
            />

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Section header */}
                <div
                    className="text-center mb-20"
                    style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(20px)",
                        transition: "opacity 0.7s ease, transform 0.7s ease",
                    }}
                >
                    <div className="inline-flex items-center gap-2 border border-white/10 bg-white/3 text-white/40 text-[12px] font-medium px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
                        How It Works
                    </div>
                    <h2
                        className="text-white font-bold mb-5 leading-tight tracking-[-0.03em]"
                        style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontSize: "clamp(2rem, 4vw, 3.2rem)",
                        }}
                    >
                        Two roles.{" "}
                        <span
                            style={{
                                background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            One platform.
                        </span>
                    </h2>
                    <p className="text-white/35 text-[15px] leading-[1.75] max-w-120 mx-auto">
                        Instructors and students each have a tailored workflow — from
                        creating assignments to tracking growth.
                    </p>
                </div>

                {/* Role label — Instructor */}
                <RoleLabel
                    label="Instructor Flow"
                    color="violet"
                    visible={visible}
                    delay={0}
                />

                {/* Instructor steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
                    {INSTRUCTOR_STEPS.map((step, i) => (
                        <StepCard key={step.number} step={step} index={i} isVisible={visible} />
                    ))}
                </div>

                {/* Divider with connector */}
                <div
                    className="flex items-center gap-4 mb-16"
                    style={{
                        opacity: visible ? 1 : 0,
                        transition: "opacity 0.6s ease 0.5s",
                    }}
                >
                    <div className="flex-1 h-px bg-linear-to-r from-transparent via-white/8 to-white/8" />
                    <div className="flex items-center gap-3 border border-white/8 bg-[#0d0d14] rounded-full px-4 py-2">
                        <div className="w-2 h-2 rounded-full bg-violet-500" />
                        <span className="text-white/25 text-[11px] font-medium">then</span>
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                    <div className="flex-1 h-px bg-linear-to-l from-transparent via-white/8 to-white/8" />
                </div>

                {/* Role label — Student */}
                <RoleLabel
                    label="Student Flow"
                    color="emerald"
                    visible={visible}
                    delay={0.3}
                />

                {/* Student steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
                    {STUDENT_STEPS.map((step, i) => (
                        <StepCard
                            key={step.number}
                            step={step}
                            index={i + 3}
                            isVisible={visible}
                        />
                    ))}
                </div>

                {/* Bottom CTA strip */}
                <div
                    className="relative border border-white/8 rounded-2xl bg-[#0d0d14] overflow-hidden"
                    style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(24px)",
                        transition: "opacity 0.7s ease 0.8s, transform 0.7s ease 0.8s",
                    }}
                >
                    {/* glow inside cta */}
                    <div
                        aria-hidden
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(ellipse at 50% 0%, rgba(109,40,217,0.12) 0%, transparent 60%)",
                        }}
                    />
                    <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-7">
                        <div>
                            <p
                                className="text-white/85 text-[18px] font-bold mb-1"
                                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                            >
                                Ready to transform your classroom?
                            </p>
                            <p className="text-white/35 text-[13px]">
                                Join hundreds of instructors already using EduMetrics.
                            </p>
                        </div>
                        <div className="flex gap-3 shrink-0">
                            <a
                                href="/register?role=instructor"
                                className="bg-violet-600 hover:bg-violet-500 text-white text-[13px] font-semibold px-5 py-2.5 rounded-xl transition-colors duration-200 whitespace-nowrap"
                            >
                                Start Teaching →
                            </a>
                            <a
                                href="/register?role=student"
                                className="border border-white/10 hover:border-white/20 bg-white/4 text-white/65 hover:text-white text-[13px] font-medium px-5 py-2.5 rounded-xl transition-all duration-200 whitespace-nowrap"
                            >
                                Join as Student
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&display=swap');
      `}</style>
        </section>
    );
}

// ─── Role Label ───────────────────────────────────────────────────────────────

function RoleLabel({
    label,
    color,
    visible,
    delay,
}: {
    label: string;
    color: "violet" | "emerald";
    visible: boolean;
    delay: number;
}) {
    return (
        <div
            className="flex items-center gap-3 mb-6"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-16px)",
                transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
            }}
        >
            <div
                className={`w-3 h-3 rounded-full ${color === "violet" ? "bg-violet-500" : "bg-emerald-500"
                    }`}
            />
            <span className="text-white/45 text-[12px] font-semibold tracking-widest uppercase">
                {label}
            </span>
            <div className="flex-1 h-px bg-white/6" />
        </div>
    );
}
