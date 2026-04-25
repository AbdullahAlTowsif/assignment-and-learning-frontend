import { Skeleton } from "@/components/ui/skeleton";

export default function AnalyticsLoading() {
    return (
        <div className="relative z-10 py-8 px-4 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <Skeleton className="h-10 w-80 mb-2 bg-white/5" />
                <Skeleton className="h-5 w-96 bg-white/5" />
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-[#111118] border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <Skeleton className="h-4 w-24 bg-white/5" />
                            <Skeleton className="w-10 h-10 rounded-lg bg-white/5" />
                        </div>
                        <Skeleton className="h-8 w-20 mb-2 bg-white/5" />
                        <Skeleton className="h-3 w-32 bg-white/5" />
                    </div>
                ))}
            </div>

            {/* Charts Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-[#111118] border border-white/10 rounded-2xl p-6">
                        <Skeleton className="h-6 w-48 mb-6 bg-white/5" />
                        <Skeleton className="h-64 w-full bg-white/5 rounded-xl" />
                    </div>
                ))}
            </div>
        </div>
    );
}