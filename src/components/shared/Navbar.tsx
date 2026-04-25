import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
// import Image from "next/image";
import { getCookie } from "@/services/auth/tokenHandlers";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { UserInfo } from "@/types/user.interface";
import LogoutButton from "./LogoutButton";
import ProfileDropdown from "./ProfileDropDown";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavItem {
    href: string;
    label: string;
    roles: string[];
}

// ─── Nav Items ────────────────────────────────────────────────────────────────

const navItems: NavItem[] = [
    {
        href: "/assignments",
        label: "Assignments",
        roles: ["GUEST", "STUDENT", "INSTRUCTOR"],
    },
    {
        href: "/ass",
        label: "Ass",
        roles: ["COMMON"],
    },
    {
        href: "/student/dashboard",
        label: "My Progress",
        roles: ["STUDENT"],
    },
    {
        href: "/instructor/assignments/create",
        label: "Create Assignment",
        roles: ["INSTRUCTOR"],
    },
    {
        href: "/instructor/dashboard",
        label: "Dashboard",
        roles: ["INSTRUCTOR"],
    },
    {
        href: "/instructor/analytics",
        label: "Analytics",
        roles: ["INSTRUCTOR"],
    },
];

// ─── Role Badge ───────────────────────────────────────────────────────────────

function RoleBadge({ role }: { role: string }) {
    const map: Record<string, { label: string; classes: string }> = {
        INSTRUCTOR: {
            label: "Instructor",
            classes:
                "bg-violet-500/12 text-violet-400 border border-violet-500/20",
        },
        STUDENT: {
            label: "Student",
            classes:
                "bg-emerald-500/12 text-emerald-400 border border-emerald-500/20",
        },
    };
    const config = map[role];
    if (!config) return null;
    return (
        <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${config.classes}`}
        >
            {config.label}
        </span>
    );
}

// ─── Logo ─────────────────────────────────────────────────────────────────────

function NavLogo() {
    return (
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center shadow-[0_0_12px_rgba(124,58,237,0.4)]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                        d="M2 12L6 4L10 9L12 6L14 12H2Z"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
            <span
                className="text-white font-bold text-[15px] tracking-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
                EduMetrics
            </span>
        </Link>
    );
}

// ─── Main Navbar (async server component) ────────────────────────────────────

const Navbar = async () => {
    const userInfo = (await getUserInfo()) as UserInfo;
    const userRole = userInfo?.role || "GUEST";
    const accessToken = await getCookie("accessToken");

    const getName = () => {
        if (!userInfo) return "";
        switch (userInfo.role) {
            case "STUDENT":
                return userInfo.name || userInfo.email?.split("@")[0];
            case "INSTRUCTOR":
                return userInfo.name || userInfo.email?.split("@")[0];
            default:
                return userInfo.email?.split("@")[0] || "";
        }
    };

    const filteredLinks = navItems.filter((item) =>
        item.roles.includes(userRole)
    );

    const userName = getName();

    return (
        <>
            {/* Google Font */}
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');`}</style>

            <header
                className="sticky top-0 z-50 w-full"
                style={{
                    background: "rgba(10, 10, 15, 0.85)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
            >
                <div className="max-w-7xl mx-auto flex h-15.5 items-center justify-between px-6">
                    {/* ── Logo ── */}
                    <NavLogo />

                    {/* ── Desktop Nav Links ── */}
                    <nav className="hidden md:flex items-center gap-1">
                        {filteredLinks.map((link) => (
                            <Link
                                key={`${link.href}-${link.label}`}
                                href={link.href}
                                className="relative px-3.5 py-2 text-[13px] font-medium text-white/45 hover:text-white/90 rounded-lg hover:bg-white/5 transition-all duration-200"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* ── Desktop Auth ── */}
                    <div className="hidden md:flex items-center gap-3">
                        {accessToken ? (
                            <div className="flex items-center gap-3">
                                {/* Role badge */}
                                <RoleBadge role={userRole} />

                                {/* Divider */}
                                <div className="w-px h-4 bg-white/10" />

                                {/* User name */}
                                <span className="text-[13px] text-white/55 font-medium">
                                    {userName}
                                </span>

                                {/* Profile dropdown */}
                                {/* <ProfileDropdown userInfo={userInfo} /> */}
                            </div>
                        ) : (
                            <div className="flex items-center gap-2.5">
                                <Link
                                    href="/login"
                                    className="text-[13px] font-medium text-white/50 hover:text-white/90 px-3 py-2 rounded-lg hover:bg-white/5 transition-all duration-200"
                                >
                                    Sign in
                                </Link>
                                <Link
                                    href="/register"
                                    className="text-[13px] font-semibold bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-lg transition-colors duration-200 shadow-[0_0_16px_rgba(124,58,237,0.3)] hover:shadow-[0_0_20px_rgba(124,58,237,0.45)]"
                                >
                                    Get started
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* ── Mobile Menu ── */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <button
                                    className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 text-white/50 hover:text-white/80 hover:bg-white/6 transition-all duration-200"
                                    aria-label="Open menu"
                                >
                                    <Menu className="h-4.5 w-4.5" />
                                </button>
                            </SheetTrigger>

                            <SheetContent
                                side="right"
                                className="w-75 sm:w-90 border-l border-white/8 p-0 flex flex-col"
                                style={{ background: "#0d0d14" }}
                            >
                                {/* Sheet header */}
                                <div className="flex items-center justify-between px-5 py-4 border-b border-white/6">
                                    <NavLogo />
                                </div>

                                {/* User profile block (mobile) */}
                                {accessToken && (
                                    <div className="px-5 py-4 border-b border-white/6">
                                        <div className="flex items-center gap-3">
                                            <ProfileDropdown userInfo={userInfo} mobileView />
                                            <div className="flex flex-col gap-0.5">
                                                <span className="text-[13px] font-semibold text-white/80">
                                                    {userName || "User"}
                                                </span>
                                                <span className="text-[11px] text-white/30">
                                                    {userInfo?.email || ""}
                                                </span>
                                                <RoleBadge role={userRole} />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Nav links */}
                                <nav className="flex-1 flex flex-col gap-1 px-3 py-4 overflow-y-auto">
                                    {filteredLinks.map((link) => (
                                        <Link
                                            key={`${link.href}-${link.label}`}
                                            href={link.href}
                                            className="flex items-center gap-3 px-3 py-3 text-[13px] font-medium text-white/50 hover:text-white/90 rounded-xl hover:bg-white/5 transition-all duration-200"
                                        >
                                            {/* Role-colored left accent dot */}
                                            <span
                                                className={`w-1.5 h-1.5 rounded-full shrink-0 ${userRole === "INSTRUCTOR"
                                                        ? "bg-violet-500/50"
                                                        : "bg-emerald-500/50"
                                                    }`}
                                            />
                                            {link.label}
                                        </Link>
                                    ))}
                                </nav>

                                {/* Bottom auth section */}
                                <div
                                    className="px-4 py-4 border-t border-white/6"
                                    style={{ marginTop: "auto" }}
                                >
                                    {accessToken ? (
                                        <LogoutButton />
                                    ) : (
                                        <div className="flex flex-col gap-2">
                                            <Link
                                                href="/register"
                                                className="w-full text-center text-[13px] font-semibold bg-violet-600 hover:bg-violet-500 text-white py-2.5 rounded-xl transition-colors duration-200"
                                            >
                                                Get started
                                            </Link>
                                            <Link
                                                href="/login"
                                                className="w-full text-center text-[13px] font-medium border border-white/10 text-white/50 hover:text-white/80 hover:border-white/20 py-2.5 rounded-xl transition-all duration-200"
                                            >
                                                Sign in
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>

                {/* Bottom glow line */}
                <div
                    aria-hidden
                    className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
                    style={{
                        background:
                            "linear-gradient(90deg, transparent 0%, rgba(124,58,237,0.4) 30%, rgba(124,58,237,0.4) 70%, transparent 100%)",
                        opacity: 0.6,
                    }}
                />
            </header>
        </>
    );
};

export default Navbar;
