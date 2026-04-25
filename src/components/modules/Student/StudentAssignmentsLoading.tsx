// src/components/modules/Student/StudentAssignmentsLoading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function StudentAssignmentsLoading() {
    return (
        <div className="relative z-10 py-8 px-4 max-w-7xl mx-auto">
            <div className="mb-8">
                <Skeleton className="h-10 w-64 mb-2 bg-white/5" />
                <Skeleton className="h-5 w-48 bg-white/5" />
            </div>

            <div className="mb-8">
                <Skeleton className="h-12 bg-white/5 rounded-xl" />
            </div>

            <div className="bg-[#111118] border border-white/10 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-white/6">
                    <Skeleton className="h-6 w-48 bg-white/5" />
                </div>
                <div className="p-6 space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center gap-4">
                            <Skeleton className="h-5 w-64 bg-white/5" />
                            <Skeleton className="h-5 w-24 bg-white/5" />
                            <Skeleton className="h-5 w-32 bg-white/5" />
                            <Skeleton className="h-5 w-20 bg-white/5" />
                            <Skeleton className="h-9 w-24 bg-white/5 ml-auto" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
