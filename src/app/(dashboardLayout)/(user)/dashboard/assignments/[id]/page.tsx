import { Metadata } from "next";
import { Suspense } from "react";
import StudentAssignmentsLoading from "@/components/modules/Student/StudentAssignmentsLoading";
import StudentAssignmentDetailsPage from "@/components/modules/Student/StudentAssignmentDetailsPage";

export const metadata: Metadata = {
    title: "Assignment Details | Assess.ai",
    description: "View assignment details and submit your work",
};

export default async function StudentAssignmentDetails({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return (
        <div className="relative min-h-screen bg-[#0A0A0F]">
            <div
                aria-hidden
                className="absolute top-[-5%] right-[10%] w-96 h-96 rounded-full pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse at center, rgba(16,185,129,0.1) 0%, transparent 70%)",
                    filter: "blur(40px)",
                }}
            />

            <Suspense fallback={<StudentAssignmentsLoading />}>
                <StudentAssignmentDetailsPage assignmentId={id} />
            </Suspense>
        </div>
    );
}
