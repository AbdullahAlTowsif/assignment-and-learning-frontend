"use client";

import { useEffect, useRef, useState } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const FAQ_CATEGORIES = [
    {
        id: "general",
        label: "General",
        dot: "bg-white/30",
    },
    {
        id: "instructor",
        label: "Instructors",
        dot: "bg-violet-500",
    },
    {
        id: "student",
        label: "Students",
        dot: "bg-emerald-500",
    },
    {
        id: "ai",
        label: "AI Features",
        dot: "bg-amber-500",
    },
];

const FAQS: {
    id: string;
    category: string;
    question: string;
    answer: string;
}[] = [
        // General
        {
            id: "g1",
            category: "general",
            question: "What exactly is EduMetrics?",
            answer:
                "EduMetrics is a full-stack assignment and learning analytics platform built for programming education. It connects instructors and students in a shared workspace where assignments are created, submitted, reviewed, and analyzed — all in one place, with AI assistance woven in.",
        },
        {
            id: "g2",
            category: "general",
            question: "Do I need to pay to use EduMetrics?",
            answer:
                "EduMetrics offers a free tier for both instructors and students that covers core assignment management. Advanced analytics, AI-assisted feedback generation, and unlimited submissions are available on the Pro plan.",
        },
        {
            id: "g3",
            category: "general",
            question: "How is role access controlled?",
            answer:
                "Role-based access control is enforced at both the route and API level. Instructors can access analytics dashboards and review panels that students simply cannot navigate to — middleware blocks those routes entirely based on the session token.",
        },
        {
            id: "g4",
            category: "general",
            question: "Is EduMetrics mobile friendly?",
            answer:
                "Yes — every page is fully responsive. Students can browse assignments and check submission status on their phones. Instructors can review and update submission statuses from any device, though the full analytics dashboard is best experienced on a wider screen.",
        },

        // Instructor
        {
            id: "i1",
            category: "instructor",
            question: "How do I create an assignment?",
            answer:
                "From your Instructor Dashboard, click 'Create Assignment'. You'll fill in a title, description, deadline, and select a difficulty level — Beginner, Intermediate, or Advanced. You can also trigger the AI assistant to refine your description before publishing.",
        },
        {
            id: "i2",
            category: "instructor",
            question: "What does the review workflow look like?",
            answer:
                "The Review Panel shows every student submission for an assignment in one scrollable view. You can read the student's notes and project URL, then update the status to Accepted, Pending, or Needs Improvement. You can also leave freeform qualitative feedback that the student sees immediately.",
        },
        {
            id: "i3",
            category: "instructor",
            question: "What analytics are available to instructors?",
            answer:
                "The Analytics Dashboard provides a pie chart of submission status distributions, bar charts breaking down acceptance rates by difficulty level, and trend lines showing submission volume over time. These help you quickly identify which assignments are causing the most friction.",
        },
        {
            id: "i4",
            category: "instructor",
            question: "Can I edit or delete an assignment after publishing?",
            answer:
                "Yes. You can edit the title, description, and deadline at any time. Difficulty level can also be adjusted. If submissions already exist, students will be notified of any changes. Deleting an assignment will archive — not destroy — existing submissions so your records remain intact.",
        },

        // Student
        {
            id: "s1",
            category: "student",
            question: "How do I submit an assignment?",
            answer:
                "Navigate to the assignment from your Assignments page, click 'Submit', paste the URL of your project (a GitHub repo, live deployment, or any publicly accessible link), and write a descriptive note about your approach. Hit Submit and you're done — no file uploads required.",
        },
        {
            id: "s2",
            category: "student",
            question: "Can I see my instructor's feedback?",
            answer:
                "Yes — feedback is visible immediately once your instructor adds it. Your Submission History page shows the current status and the full text of any feedback for every assignment you've submitted. You can check it any time without refreshing.",
        },
        {
            id: "s3",
            category: "student",
            question: "What happens if my submission is marked 'Needs Improvement'?",
            answer:
                "You'll see your instructor's feedback explaining what to improve. You can update your submission — edit the URL or notes — and resubmit. The status will return to Pending for re-review. This iterative cycle is intentional and central to how EduMetrics supports learning.",
        },
        {
            id: "s4",
            category: "student",
            question: "Can I filter assignments by difficulty?",
            answer:
                "Absolutely. The Assignments page has filter tabs for All, Beginner, Intermediate, and Advanced. You can also sort by deadline. Assignments you've already submitted are visually differentiated so you always know your current standing at a glance.",
        },

        // AI
        {
            id: "a1",
            category: "ai",
            question: "What AI features are built into EduMetrics?",
            answer:
                "Currently there are two AI utilities: an Assignment Clarity Refiner for instructors (which rewrites vague assignment descriptions into precise, actionable ones) and a Preliminary Feedback Generator (which drafts initial feedback based on a student's submission notes, which instructors can edit before sending).",
        },
        {
            id: "a2",
            category: "ai",
            question: "Which AI model powers the assistant?",
            answer:
                "The AI features connect to the Anthropic Claude API. All prompts are designed to keep academic context intact — the assistant understands programming assignment language, difficulty levels, and instructor-student dynamics.",
        },
        {
            id: "a3",
            category: "ai",
            question: "Can students use AI to write their submission notes?",
            answer:
                "Students can use the AI Note Enhancer to improve the clarity of their submission notes — it helps them articulate their approach better, not write it for them. The tool works on the student's draft and improves structure without changing the substance of what they wrote.",
        },
    ];

// ─── Accordion Item ───────────────────────────────────────────────────────────

function AccordionItem({
    faq,
    index,
    isOpen,
    onToggle,
    isVisible,
}: {
    faq: (typeof FAQS)[0];
    index: number;
    isOpen: boolean;
    onToggle: () => void;
    isVisible: boolean;
}) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (contentRef.current) {
            setHeight(isOpen ? contentRef.current.scrollHeight : 0);
        }
    }, [isOpen]);

    const categoryColor: Record<string, string> = {
        general: "rgba(255,255,255,0.2)",
        instructor: "rgba(139,92,246,0.6)",
        student: "rgba(16,185,129,0.6)",
        ai: "rgba(245,158,11,0.6)",
    };

    return (
        <div
            className="group border border-white/[0.07] rounded-xl overflow-hidden hover:border-white/12 transition-all duration-300"
            style={{
                background: isOpen
                    ? "rgba(255,255,255,0.03)"
                    : "rgba(255,255,255,0.01)",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease ${index * 0.06}s, transform 0.5s ease ${index * 0.06}s, background 0.2s, border-color 0.2s`,
            }}
        >
            {/* Question row */}
            <button
                onClick={onToggle}
                className="w-full flex items-center gap-4 px-5 py-4 text-left cursor-pointer"
                aria-expanded={isOpen}
            >
                {/* Left accent line */}
                <div
                    className="w-0.5 h-5 rounded-full shrink-0 transition-opacity duration-300"
                    style={{
                        background: categoryColor[faq.category],
                        opacity: isOpen ? 1 : 0.3,
                    }}
                />

                {/* Question text */}
                <span
                    className="flex-1 text-[14px] font-semibold leading-snug transition-colors duration-200"
                    style={{ color: isOpen ? "rgba(255,255,255,0.90)" : "rgba(255,255,255,0.55)" }}
                >
                    {faq.question}
                </span>

                {/* Toggle icon */}
                <div
                    className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center shrink-0 transition-all duration-300"
                    style={{
                        background: isOpen ? "rgba(124,58,237,0.2)" : "transparent",
                        borderColor: isOpen ? "rgba(124,58,237,0.4)" : "rgba(255,255,255,0.10)",
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                >
                    <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                    >
                        <path
                            d="M5 1V9M1 5H9"
                            stroke={isOpen ? "#a78bfa" : "rgba(255,255,255,0.35)"}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>
            </button>

            {/* Answer — animated height */}
            <div
                style={{
                    height: `${height}px`,
                    overflow: "hidden",
                    transition: "height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
            >
                <div ref={contentRef} className="px-5 pb-5 pl-10">
                    <p className="text-[13.5px] text-white/35 leading-[1.8]">
                        {faq.answer}
                    </p>
                </div>
            </div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function FAQSection() {
    const [activeCategory, setActiveCategory] = useState("general");
    const [openId, setOpenId] = useState<string | null>("g1");
    const [visible, setVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.08 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const handleCategoryChange = (id: string) => {
        setActiveCategory(id);
        setOpenId(null);
    };

    const filtered = FAQS.filter((f) => f.category === activeCategory);

    const activeCat = FAQ_CATEGORIES.find((c) => c.id === activeCategory);

    return (
        <section
            ref={sectionRef}
            className="relative bg-[#09090f] overflow-hidden py-28 px-6"
        >
            {/* Background grid */}
            <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)
          `,
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Glow — left side for asymmetry */}
            <div
                aria-hidden
                className="absolute top-1/3 -left-40 w-125 h-125 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse at center, rgba(109,40,217,0.10) 0%, transparent 65%)",
                    filter: "blur(20px)",
                }}
            />
            {/* Glow — right bottom */}
            <div
                aria-hidden
                className="absolute bottom-0 right-0 w-87.5 h-87.5 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse at bottom right, rgba(16,185,129,0.07) 0%, transparent 65%)",
                }}
            />

            <div className="relative z-10 max-w-4xl mx-auto">

                {/* ── Header ───────────────────────────────────────────────── */}
                <div
                    className="text-center mb-14"
                    style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(20px)",
                        transition: "opacity 0.7s ease, transform 0.7s ease",
                    }}
                >
                    <div className="inline-flex items-center gap-2 border border-white/10 bg-white/3 text-white/40 text-[12px] font-medium px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
                        FAQ
                    </div>

                    <h2
                        className="text-white font-bold mb-4 leading-tight tracking-[-0.03em]"
                        style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontSize: "clamp(2rem, 4vw, 3rem)",
                        }}
                    >
                        Questions we{" "}
                        <span
                            style={{
                                background: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 50%, #10b981 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            actually get asked
                        </span>
                    </h2>

                    <p className="text-white/35 text-[14.5px] leading-[1.75] max-w-110 mx-auto">
                        Everything you need to know about EduMetrics — from setup to AI
                        features, for both instructors and students.
                    </p>
                </div>

                {/* ── Category tabs ─────────────────────────────────────────── */}
                <div
                    className="flex items-center justify-center gap-2 flex-wrap mb-10"
                    style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(16px)",
                        transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
                    }}
                >
                    {FAQ_CATEGORIES.map((cat) => {
                        const isActive = activeCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => handleCategoryChange(cat.id)}
                                className="flex items-center gap-2 px-4 py-2 rounded-full text-[12.5px] font-semibold transition-all duration-200 cursor-pointer"
                                style={{
                                    background: isActive
                                        ? "rgba(255,255,255,0.07)"
                                        : "rgba(255,255,255,0.02)",
                                    border: isActive
                                        ? "1px solid rgba(255,255,255,0.14)"
                                        : "1px solid rgba(255,255,255,0.06)",
                                    color: isActive ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.35)",
                                }}
                            >
                                <span
                                    className={`w-1.5 h-1.5 rounded-full ${cat.dot}`}
                                />
                                {cat.label}
                            </button>
                        );
                    })}
                </div>

                {/* ── Two-column layout ─────────────────────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 items-start">

                    {/* Left: context sidebar */}
                    <div
                        className="hidden lg:flex flex-col gap-4 sticky top-24"
                        style={{
                            opacity: visible ? 1 : 0,
                            transform: visible ? "translateX(0)" : "translateX(-20px)",
                            transition: "opacity 0.6s ease 0.25s, transform 0.6s ease 0.25s",
                        }}
                    >
                        <div className="border border-white/[0.07] rounded-xl p-4 bg-white/2">
                            <p className="text-white/25 text-[11px] font-bold tracking-widest uppercase mb-3">
                                Category
                            </p>
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`w-2 h-2 rounded-full ${activeCat?.dot}`} />
                                <span className="text-white/70 text-[13px] font-semibold">
                                    {activeCat?.label}
                                </span>
                            </div>
                            <p className="text-white/25 text-[12px] leading-relaxed">
                                {filtered.length} question{filtered.length !== 1 ? "s" : ""} in this category
                            </p>
                        </div>

                        {/* Quick jump to other categories */}
                        <div className="border border-white/[0.07] rounded-xl p-4 bg-white/2">
                            <p className="text-white/25 text-[11px] font-bold tracking-widest uppercase mb-3">
                                Other Topics
                            </p>
                            <div className="flex flex-col gap-1.5">
                                {FAQ_CATEGORIES.filter((c) => c.id !== activeCategory).map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => handleCategoryChange(cat.id)}
                                        className="flex items-center gap-2 text-[12px] text-white/30 hover:text-white/65 transition-colors duration-200 text-left cursor-pointer"
                                    >
                                        <span className={`w-1.5 h-1.5 rounded-full ${cat.dot} opacity-60`} />
                                        {cat.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Still have questions */}
                        <div
                            className="border border-violet-500/20 rounded-xl p-4"
                            style={{ background: "rgba(124,58,237,0.06)" }}
                        >
                            <p className="text-violet-300/70 text-[12px] font-semibold mb-1">
                                Still have questions?
                            </p>
                            <p className="text-white/25 text-[11px] leading-relaxed mb-3">
                                Reach out to our support team and we&apos;ll get back to you within a few hours.
                            </p>
                            <a
                                href="/contact"
                                className="block text-center text-[11px] font-semibold text-violet-400 border border-violet-500/25 rounded-lg py-1.5 hover:bg-violet-500/10 transition-colors duration-200"
                            >
                                Contact support →
                            </a>
                        </div>
                    </div>

                    {/* Right: accordion */}
                    <div className="flex flex-col gap-2.5">
                        {filtered.map((faq, i) => (
                            <AccordionItem
                                key={faq.id}
                                faq={faq}
                                index={i}
                                isOpen={openId === faq.id}
                                onToggle={() =>
                                    setOpenId(openId === faq.id ? null : faq.id)
                                }
                                isVisible={visible}
                            />
                        ))}
                    </div>
                </div>

                {/* ── Mobile: still have questions ─────────────────────────── */}
                <div
                    className="lg:hidden mt-8 border border-violet-500/20 rounded-xl p-5 text-center"
                    style={{ background: "rgba(124,58,237,0.05)" }}
                >
                    <p className="text-white/60 text-[14px] font-semibold mb-1">
                        Still have questions?
                    </p>
                    <p className="text-white/30 text-[12.5px] mb-4">
                        Our support team is happy to help.
                    </p>
                    <a
                        href="/contact"
                        className="inline-block text-[13px] font-semibold text-violet-400 border border-violet-500/30 rounded-lg px-5 py-2 hover:bg-violet-500/10 transition-colors duration-200"
                    >
                        Contact support →
                    </a>
                </div>
            </div>

            <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');`}</style>
        </section>
    );
}
