import { Skeleton } from "@/components/ui/skeleton";

export default function AssignmentDetailsLoading() {
    return (
        <div className="relative z-10 py-8 px-4 max-w-7xl mx-auto">
            {/* Breadcrumb Skeleton */}
            <div className="flex items-center gap-2 mb-8">
                <Skeleton className="h-4 w-16 bg-white/5" />
                <Skeleton className="h-4 w-4 bg-white/5" />
                <Skeleton className="h-4 w-24 bg-white/5" />
            </div>

            {/* Header Skeleton */}
            <div className="mb-8">
                <Skeleton className="h-10 w-96 bg-white/5 mb-4" />
                <div className="flex gap-3">
                    <Skeleton className="h-6 w-24 bg-white/5 rounded-full" />
                    <Skeleton className="h-6 w-20 bg-white/5 rounded-full" />
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content Skeleton */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-[#111118] border border-white/10 rounded-2xl p-8">
                        <Skeleton className="h-6 w-32 bg-white/5 mb-6" />
                        <Skeleton className="h-4 w-full bg-white/5 mb-2" />
                        <Skeleton className="h-4 w-full bg-white/5 mb-2" />
                        <Skeleton className="h-4 w-3/4 bg-white/5" />
                    </div>

                    <div className="bg-[#111118] border border-white/10 rounded-2xl p-8">
                        <Skeleton className="h-6 w-40 bg-white/5 mb-6" />
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="mb-4 pb-4 border-b border-white/5 last:border-0">
                                <div className="flex items-center justify-between mb-2">
                                    <Skeleton className="h-5 w-48 bg-white/5" />
                                    <Skeleton className="h-5 w-20 bg-white/5 rounded-full" />
                                </div>
                                <Skeleton className="h-4 w-64 bg-white/5" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar Skeleton */}
                <div className="space-y-6">
                    <div className="bg-[#111118] border border-white/10 rounded-2xl p-6">
                        <Skeleton className="h-6 w-32 bg-white/5 mb-6" />
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center justify-between mb-4">
                                <Skeleton className="h-4 w-24 bg-white/5" />
                                <Skeleton className="h-4 w-20 bg-white/5" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
