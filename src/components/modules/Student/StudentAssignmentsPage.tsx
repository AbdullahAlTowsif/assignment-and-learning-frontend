/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useMemo } from "react";
import { BookOpen, Search, Clock, AlertCircle } from "lucide-react";
import { IAssignment } from "@/types/assignment.interface";
import { getAllAssignments } from "@/services/assignment/assignment.service";
import { getMySubmissions } from "@/services/submission/submission.service";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import StudentAssignmentsTable from "./StudentAssignmentsTable";
import SubmitAssignmentDialog from "./SubmitAssignmentDialog";

export default function StudentAssignmentsPage() {
    const [assignments, setAssignments] = useState<IAssignment[]>([]);
    const [submissions, setSubmissions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState<string | null>(null);

    const filteredAssignments = useMemo(() => {
        if (!searchQuery) {
            return assignments;
        }

        return assignments.filter(
            (assignment) =>
                assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                assignment.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [assignments, searchQuery]);

    // Dialog states
    const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState<IAssignment | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const [assignmentsResult, submissionsResult] = await Promise.all([
                getAllAssignments(),
                getMySubmissions(),
            ]);

            if (assignmentsResult.success) {
                setAssignments(assignmentsResult.data || []);
            } else {
                setError(assignmentsResult.message || "Failed to load assignments");
            }

            if (submissionsResult.success) {
                setSubmissions(submissionsResult.data || []);
            }
        } catch (error) {
            setError("An error occurred while fetching data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void Promise.resolve().then(fetchData);
    }, []);

    const getSubmissionForAssignment = (assignmentId: string) => {
        return submissions.find((sub) => sub.assignmentId === assignmentId);
    };

    const handleSubmitAssignment = (assignment: IAssignment) => {
        setSelectedAssignment(assignment);
        setSubmitDialogOpen(true);
    };

    const handleSubmissionSuccess = () => {
        fetchData();
        setSubmitDialogOpen(false);
        setSelectedAssignment(null);
        toast.success("Assignment submitted successfully!");
    };

    const getActiveAssignments = () => {
        return assignments.filter(
            (assignment) => new Date(assignment.deadline) > new Date()
        ).length;
    };

    const getSubmittedCount = () => {
        return submissions.length;
    };

    const getPendingReviewCount = () => {
        return submissions.filter((sub) => sub.status === "PENDING").length;
    };

    if (loading) {
        return (
            <div className="relative z-10 py-12 px-4 max-w-7xl mx-auto">
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
                        <h3 className="text-xl font-semibold text-white">
                            Loading assignments...
                        </h3>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative z-10 py-8 px-4 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1
                            className="text-3xl md:text-4xl font-bold text-white mb-2"
                            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                        >
                            Browse Assignments
                        </h1>
                        <p className="text-white/40 text-[14px]">
                            View all available assignments and submit your work
                        </p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-[#111118]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white/40 text-[12px] font-medium mb-1">
                                    Available Assignments
                                </p>
                                <p className="text-2xl font-bold text-white">
                                    {getActiveAssignments()}
                                </p>
                            </div>
                            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                                <BookOpen className="w-4 h-4 text-emerald-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#111118]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white/40 text-[12px] font-medium mb-1">
                                    Submitted
                                </p>
                                <p className="text-2xl font-bold text-white">
                                    {getSubmittedCount()}
                                </p>
                            </div>
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
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                    <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#111118]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white/40 text-[12px] font-medium mb-1">
                                    Pending Review
                                </p>
                                <p className="text-2xl font-bold text-white">
                                    {getPendingReviewCount()}
                                </p>
                            </div>
                            <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center">
                                <Clock className="w-4 h-4 text-amber-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <Alert className="mb-6 bg-red-500/10 border-red-500/20 text-red-400">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {/* Search Bar */}
            <div className="bg-[#111118]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/20 w-5 h-5" />
                    <Input
                        placeholder="Search assignments by title or description..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 py-6 bg-white/5 border border-white/10 rounded-xl text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.07] transition-all duration-200"
                    />
                </div>
            </div>

            {/* Assignments Table */}
            {filteredAssignments.length === 0 ? (
                <div className="bg-[#111118]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-16 text-center">
                    <BookOpen className="w-16 h-16 text-white/10 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">
                        {assignments.length === 0
                            ? "No Assignments Available"
                            : "No Assignments Match Your Search"}
                    </h3>
                    <p className="text-white/30 text-[14px]">
                        {assignments.length === 0
                            ? "Check back later for new assignments from your instructors"
                            : "Try adjusting your search criteria"}
                    </p>
                </div>
            ) : (
                <StudentAssignmentsTable
                    assignments={filteredAssignments}
                    submissions={submissions}
                    onSubmit={handleSubmitAssignment}
                />
            )}

            {/* Submit Assignment Dialog */}
            {selectedAssignment && (
                <SubmitAssignmentDialog
                    assignment={selectedAssignment}
                    existingSubmission={getSubmissionForAssignment(selectedAssignment.id)}
                    open={submitDialogOpen}
                    onOpenChange={setSubmitDialogOpen}
                    onSuccess={handleSubmissionSuccess}
                />
            )}
        </div>
    );
}
