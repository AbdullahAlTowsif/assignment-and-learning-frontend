"use client";

import { useState, useEffect, useMemo } from "react";
import { Plus, Search, AlertCircle, BookOpen, Users, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getAllAssignments, deleteAssignment } from "@/services/assignment/assignment.service";
import { toast } from "sonner";
import { IAssignment } from "@/types/assignment.interface";
import AssignmentsTable from "./AssignmentsTable";
import EditAssignmentDialog from "./EditAssignmentDialog";
import DeleteAssignmentDialog from "./DeleteAssignmentDialog";

export default function AssignmentsPage() {
    const [assignments, setAssignments] = useState<IAssignment[]>([]);
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
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState<IAssignment | null>(null);

    const fetchAssignments = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await getAllAssignments();
            if (result.success) {
                setAssignments(result.data || []);
            } else {
                setError(result.message || "Failed to load assignments");
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setError("An error occurred while fetching assignments");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void Promise.resolve().then(fetchAssignments);
    }, []);

    const handleEditAssignment = (assignment: IAssignment) => {
        setSelectedAssignment(assignment);
        setEditDialogOpen(true);
    };

    const handleDeleteAssignment = (assignment: IAssignment) => {
        setSelectedAssignment(assignment);
        setDeleteDialogOpen(true);
    };

    const handleUpdateAssignment = async (updatedAssignment: IAssignment) => {
        setAssignments((prev) =>
            prev.map((assignment) =>
                assignment.id === updatedAssignment.id
                    ? { ...assignment, ...updatedAssignment }
                    : assignment
            )
        );
        setEditDialogOpen(false);
        setSelectedAssignment(null);
        toast.success("Assignment updated successfully");
    };

    const handleConfirmDelete = async () => {
        if (!selectedAssignment?.id) return;

        try {
            const result = await deleteAssignment(selectedAssignment.id);
            if (result.success) {
                setAssignments((prev) =>
                    prev.filter((assignment) => assignment.id !== selectedAssignment.id)
                );
                setDeleteDialogOpen(false);
                setSelectedAssignment(null);
                toast.success("Assignment deleted successfully");
            } else {
                toast.error(result.message || "Failed to delete assignment");
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error("An error occurred while deleting assignment");
        }
    };

    const getTotalSubmissions = () => {
        return assignments.reduce(
            (total, assignment) => total + (assignment.submissions?.length || 0),
            0
        );
    };

    const getPendingReviews = () => {
        return assignments.reduce((total, assignment) => {
            const pending = assignment.submissions?.filter(
                (sub) => sub.status === "PENDING"
            ).length || 0;
            return total + pending;
        }, 0);
    };

    const getActiveAssignments = () => {
        return assignments.filter(
            (assignment) => new Date(assignment.deadline) > new Date()
        ).length;
    };

    if (loading) {
        return (
            <div className="relative z-10 py-12 px-4 max-w-7xl mx-auto">
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
                        <h3 className="text-xl font-semibold text-white">
                            Loading your assignments...
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
                            My Assignments
                        </h1>
                        <p className="text-white/40 text-[14px]">
                            Manage and track all your created assignments
                        </p>
                    </div>
                    <Link href="/instructor/dashboard/create-assignment">
                        <Button className="group flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-[14px] font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 hover:scale-[1.02]">
                            <Plus className="w-4 h-4" />
                            Create Assignment
                        </Button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-[#111118]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white/40 text-[12px] font-medium mb-1">
                                    Total Assignments
                                </p>
                                <p className="text-2xl font-bold text-white">
                                    {assignments.length}
                                </p>
                            </div>
                            <div className="w-8 h-8 rounded-lg bg-violet-500/15 flex items-center justify-center">
                                <BookOpen className="w-4 h-4 text-violet-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#111118]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white/40 text-[12px] font-medium mb-1">
                                    Total Submissions
                                </p>
                                <p className="text-2xl font-bold text-white">
                                    {getTotalSubmissions()}
                                </p>
                            </div>
                            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                                <Users className="w-4 h-4 text-emerald-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#111118]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white/40 text-[12px] font-medium mb-1">
                                    Pending Reviews
                                </p>
                                <p className="text-2xl font-bold text-white">
                                    {getPendingReviews()}
                                </p>
                            </div>
                            <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center">
                                <AlertCircle className="w-4 h-4 text-amber-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#111118]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white/40 text-[12px] font-medium mb-1">
                                    Active
                                </p>
                                <p className="text-2xl font-bold text-white">
                                    {getActiveAssignments()}
                                </p>
                            </div>
                            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                                <Clock className="w-4 h-4 text-emerald-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <Alert variant="destructive" className="mb-6 bg-red-500/10 border-red-500/20 text-red-400">
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
                        className="pl-10 py-6 bg-white/5 border border-white/10 rounded-xl text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.07] transition-all duration-200"
                    />
                </div>
            </div>

            {/* Assignments Table */}
            {filteredAssignments.length === 0 ? (
                <div className="bg-[#111118]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-16 text-center">
                    <BookOpen className="w-16 h-16 text-white/10 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">
                        {assignments.length === 0
                            ? "No Assignments Created Yet"
                            : "No Assignments Match Your Search"}
                    </h3>
                    <p className="text-white/30 text-[14px] mb-6">
                        {assignments.length === 0
                            ? "Start by creating your first assignment to engage your students"
                            : "Try adjusting your search criteria"}
                    </p>
                    {assignments.length === 0 && (
                        <Link href="/instructor/dashboard/create-assignment">
                            <Button className="group flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-[14px] font-semibold px-5 py-2.5 rounded-xl transition-all duration-200">
                                <Plus className="w-4 h-4" />
                                Create Your First Assignment
                            </Button>
                        </Link>
                    )}
                </div>
            ) : (
                <AssignmentsTable
                    assignments={filteredAssignments}
                    onEdit={handleEditAssignment}
                    onDelete={handleDeleteAssignment}
                />
            )}

            {/* Edit Assignment Dialog */}
            {selectedAssignment && (
                <EditAssignmentDialog
                    assignment={selectedAssignment}
                    open={editDialogOpen}
                    onOpenChange={setEditDialogOpen}
                    onUpdate={handleUpdateAssignment}
                />
            )}

            {/* Delete Assignment Dialog */}
            {selectedAssignment && (
                <DeleteAssignmentDialog
                    assignment={selectedAssignment}
                    open={deleteDialogOpen}
                    onOpenChange={setDeleteDialogOpen}
                    onConfirm={handleConfirmDelete}
                />
            )}
        </div>
    );
}
