import { Skeleton } from "@/components/ui/skeleton";

export default function AssignmentsLoading() {
    return (
        <div className="relative z-10 py-8 px-4 max-w-7xl mx-auto">
            {/* Header Skeleton */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <Skeleton className="h-10 w-64 mb-2 bg-white/5" />
                        <Skeleton className="h-5 w-48 bg-white/5" />
                    </div>
                    <Skeleton className="h-10 w-40 bg-white/5" />
                </div>

                {/* Stats Cards Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="bg-[#111118] border border-white/10 rounded-2xl p-6"
                        >
                            <div className="flex items-center justify-between">
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-24 bg-white/5" />
                                    <Skeleton className="h-8 w-16 bg-white/5" />
                                </div>
                                <Skeleton className="w-8 h-8 rounded-full bg-white/5" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Search Bar Skeleton */}
            <div className="bg-[#111118] border border-white/10 rounded-2xl p-6 mb-8">
                <Skeleton className="h-12 bg-white/5" />
            </div>

            {/* Table Skeleton */}
            <div className="bg-[#111118] border border-white/10 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-white/6">
                    <Skeleton className="h-6 w-48 bg-white/5" />
                </div>
                <div className="p-6 space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center gap-4">
                            <Skeleton className="h-4 w-48 bg-white/5" />
                            <Skeleton className="h-4 w-32 bg-white/5" />
                            <Skeleton className="h-4 w-24 bg-white/5" />
                            <Skeleton className="h-4 w-24 bg-white/5" />
                            <Skeleton className="h-4 w-20 bg-white/5" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
