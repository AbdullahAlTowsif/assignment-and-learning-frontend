import { Metadata } from "next";
import { Suspense } from "react";
import AnalyticsDashboardPage from "@/components/modules/Analytics/AnalyticsDashboardPage";
import AnalyticsLoading from "@/components/modules/Analytics/AnalyticsLoading";

export const metadata: Metadata = {
    title: "Analytics Dashboard | Assess.ai",
    description: "Track submission analytics, acceptance rates, and student performance",
};

export default function AnalyticsPage() {
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
                        "radial-gradient(ellipse at center, rgba(16,185,129,0.1) 0%, transparent 70%)",
                    filter: "blur(50px)",
                }}
            />

            <Suspense fallback={<AnalyticsLoading />}>
                <AnalyticsDashboardPage />
            </Suspense>
        </div>
    );
}
