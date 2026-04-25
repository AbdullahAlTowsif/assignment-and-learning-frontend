import { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import CreateAssignmentForm from "@/components/modules/Instructor/CreateAssignmentForm";

export const metadata: Metadata = {
    title: "Create Assignment | Assess.ai",
    description: "Create and publish assignments for your students with AI-powered analytics",
};

const CreateAssignmentPage = () => {
    return (
        <div className="relative min-h-screen bg-[#0A0A0F]">
            {/* Background effects */}
            <div
                aria-hidden
                className="absolute top-[-5%] right-[10%] w-96 h-96 rounded-full pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse at center, rgba(109,40,217,0.15) 0%, transparent 70%)",
                    filter: "blur(40px)",
                }}
            />
            <div
                aria-hidden
                className="absolute bottom-0 left-[5%] w-80 h-80 rounded-full pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse at center, rgba(16,185,129,0.08) 0%, transparent 70%)",
                    filter: "blur(50px)",
                }}
            />

            <div className="relative z-10 max-w-6xl mx-auto py-8 px-4">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-white/30 text-[12px] mb-8">
                    <Link
                        href="/"
                        className="hover:text-white/60 transition-colors"
                    >
                        Home
                    </Link>
                    <span>/</span>
                    <span className="text-white/50">Create Assignment</span>
                </div>

                {/* Header Section */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 border border-violet-500/30 bg-violet-500/10 text-violet-300 text-[12px] font-medium px-3.5 py-1.5 rounded-full mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                        Assignment Builder
                    </div>
                    <h1
                        className="text-white font-bold leading-[1.1] tracking-[-0.03em] mb-4"
                        style={{
                            fontSize: "clamp(2rem, 4vw, 3rem)",
                            fontFamily: "'Playfair Display', Georgia, serif",
                        }}
                    >
                        Create a New{" "}
                        <span
                            style={{
                                background:
                                    "linear-gradient(135deg, #a78bfa 0%, #7c3aed 40%, #10b981 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            Assignment
                        </span>
                    </h1>
                    <p className="text-white/40 text-[15px] max-w-xl mx-auto leading-relaxed">
                        Design engaging assignments, set deadlines, and leverage AI to provide
                        meaningful feedback to your students.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-[#111118]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
                            <div className="p-6 md:p-8">
                                <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/6">
                                    <div>
                                        <h2 className="text-xl font-bold text-white mb-1">
                                            Assignment Details
                                        </h2>
                                        <p className="text-white/40 text-[13px]">
                                            Fields marked with{" "}
                                            <span className="text-violet-400">*</span> are required
                                        </p>
                                    </div>
                                    <div className="hidden md:flex items-center gap-2 bg-violet-500/10 text-violet-300 border border-violet-500/20 px-4 py-2 rounded-full">
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                        <span className="text-[12px] font-medium">
                                            AI-Powered
                                        </span>
                                    </div>
                                </div>

                                <Suspense
                                    fallback={
                                        <div className="space-y-4">
                                            <div className="h-10 bg-white/5 rounded-lg animate-pulse" />
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="h-10 bg-white/5 rounded-lg animate-pulse" />
                                                <div className="h-10 bg-white/5 rounded-lg animate-pulse" />
                                            </div>
                                            <div className="h-32 bg-white/5 rounded-lg animate-pulse" />
                                        </div>
                                    }
                                >
                                    <CreateAssignmentForm />
                                </Suspense>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Tips & Guidelines */}
                    <div className="lg:col-span-1">
                        <div className="space-y-6">
                            {/* Pro Tips Card */}
                            <div className="bg-[#111118]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-violet-500/15 flex items-center justify-center">
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#a78bfa"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                    </div>
                                    Pro Tips
                                </h3>
                                <ul className="space-y-3">
                                    {[
                                        {
                                            title: "Clear titles",
                                            desc: "Use descriptive titles that reflect the assignment's objective",
                                        },
                                        {
                                            title: "Detailed descriptions",
                                            desc: "Include clear instructions, requirements, and evaluation criteria",
                                        },
                                        {
                                            title: "Realistic deadlines",
                                            desc: "Give students enough time while maintaining momentum",
                                        },
                                        {
                                            title: "Appropriate difficulty",
                                            desc: "Match the difficulty to your students' current level",
                                        },
                                    ].map((tip, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-violet-500/60 mt-2 shrink-0" />
                                            <div>
                                                <p className="text-white/70 text-[13px] font-medium">
                                                    {tip.title}
                                                </p>
                                                <p className="text-white/35 text-[12px] leading-relaxed">
                                                    {tip.desc}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* AI Features Card */}
                            <div className="bg-[#111118]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#34d399"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M12 2a10 10 0 1 0 10 10h-10V2z" />
                                            <path d="M12 2a10 10 0 0 0 0 20" />
                                        </svg>
                                    </div>
                                    AI Features
                                </h3>
                                <ul className="space-y-3">
                                    {[
                                        {
                                            icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
                                            text: "AI-powered submission analysis",
                                        },
                                        {
                                            icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                                            text: "Automated feedback suggestions",
                                        },
                                        {
                                            icon: "M13 10V3L4 14h7v7l9-11h-7z",
                                            text: "Plagiarism detection",
                                        },
                                        {
                                            icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
                                            text: "Performance analytics dashboard",
                                        },
                                    ].map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                                                <svg
                                                    width="12"
                                                    height="12"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="#34d399"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d={feature.icon} />
                                                </svg>
                                            </div>
                                            <span className="text-white/50 text-[13px]">
                                                {feature.text}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Info */}
                <div className="mt-12 text-center">
                    <div className="inline-flex flex-wrap items-center justify-center gap-6 text-white/25 text-[12px]">
                        <span className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                            Real-time validation
                        </span>
                        <span className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Auto-save drafts
                        </span>
                        <span className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                            Mobile responsive
                        </span>
                    </div>
                    <p className="mt-4 text-white/15 text-[12px]">
                        Create meaningful assignments that drive student engagement and learning outcomes.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CreateAssignmentPage;
