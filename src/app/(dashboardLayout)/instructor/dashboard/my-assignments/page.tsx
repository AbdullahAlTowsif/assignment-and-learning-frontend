import { Metadata } from "next";
import { Suspense } from "react";
import AssignmentsLoading from "@/components/modules/Assignment/AssignmentsLoading";
import AssignmentsPage from "@/components/modules/Assignment/AssignmentsPage";

export const metadata: Metadata = {
    title: "My Assignments | Assess.ai",
    description: "Manage and track all your created assignments",
};

export default function Assignments() {
    return (
        <div className="relative min-h-screen bg-[#0A0A0F]">
            {/* Background effects */}
            <div
                aria-hidden
                className="absolute top-[-5%] right-[10%] w-96 h-96 rounded-full pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse at center, rgba(109,40,217,0.12) 0%, transparent 70%)",
                    filter: "blur(40px)",
                }}
            />
            <div
                aria-hidden
                className="absolute bottom-0 left-[5%] w-80 h-80 rounded-full pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse at center, rgba(16,185,129,0.06) 0%, transparent 70%)",
                    filter: "blur(50px)",
                }}
            />

            <Suspense fallback={<AssignmentsLoading />}>
                <AssignmentsPage />
            </Suspense>
        </div>
    );
}
