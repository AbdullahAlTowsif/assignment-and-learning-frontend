/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateAssignment } from "@/services/assignment/assignment.service";
import { toast } from "sonner";
import { IAssignment, Level } from "@/types/assignment.interface";

interface EditAssignmentDialogProps {
    assignment: IAssignment;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onUpdate: (assignment: IAssignment) => void;
}

const difficultyLevels: { value: Level; label: string }[] = [
    { value: Level.BEGINNER, label: "Beginner" },
    { value: Level.INTERMEDIATE, label: "Intermediate" },
    { value: Level.ADVANCED, label: "Advanced" },
];

export default function EditAssignmentDialog({
    assignment,
    open,
    onOpenChange,
    onUpdate,
}: EditAssignmentDialogProps) {
    const [title, setTitle] = useState(assignment.title);
    const [description, setDescription] = useState(assignment.description);
    const [difficulty, setDifficulty] = useState(assignment.difficulty);
    const [deadline, setDeadline] = useState(
        new Date(assignment.deadline).toISOString().slice(0, 16)
    );
    const [isUpdating, setIsUpdating] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUpdating(true);

        try {
            const result = await updateAssignment(assignment.id, {
                title,
                description,
                difficulty,
                deadline: new Date(deadline).toISOString(),
            });

            if (result.success) {
                onUpdate({ ...assignment, title, description, difficulty, deadline: new Date(deadline).toISOString() });
                onOpenChange(false);
                toast.success("Assignment updated successfully");
            } else {
                toast.error(result.message || "Failed to update assignment");
            }
        } catch (error) {
            toast.error("An error occurred while updating assignment");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-[#111118] border border-white/10 text-white max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-white text-lg font-bold">
                        Edit Assignment
                    </DialogTitle>
                    <DialogDescription className="text-white/40">
                        Update the details of your assignment
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-5 mt-4">
                    {/* Title */}
                    <div>
                        <label className="text-white/60 text-[13px] font-medium block mb-1.5">
                            Title <span className="text-violet-400">*</span>
                        </label>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 transition-all"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-white/60 text-[13px] font-medium block mb-1.5">
                            Description <span className="text-violet-400">*</span>
                        </label>
                        <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            rows={5}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-violet-500/50 transition-all resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Difficulty */}
                        <div>
                            <label className="text-white/60 text-[13px] font-medium block mb-1.5">
                                Difficulty <span className="text-violet-400">*</span>
                            </label>
                            <Select value={difficulty} onValueChange={(value) => setDifficulty(value as Level)}>
                                <SelectTrigger className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-[14px] focus:outline-none focus:border-violet-500/50 transition-all">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-[#1A1A24] border-white/10 text-white">
                                    {difficultyLevels.map((level) => (
                                        <SelectItem
                                            key={level.value}
                                            value={level.value}
                                            className="focus:bg-violet-500/20 focus:text-white cursor-pointer"
                                        >
                                            {level.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Deadline */}
                        <div>
                            <label className="text-white/60 text-[13px] font-medium block mb-1.5">
                                Deadline <span className="text-violet-400">*</span>
                            </label>
                            <Input
                                type="datetime-local"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-[14px] focus:outline-none focus:border-violet-500/50 transition-all scheme-dark"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button
                            type="submit"
                            disabled={isUpdating}
                            className="flex-1 bg-violet-600 hover:bg-violet-500 disabled:bg-violet-600/50 text-white text-[14px] font-semibold py-2.5 rounded-xl transition-all duration-200"
                        >
                            {isUpdating ? "Updating..." : "Update Assignment"}
                        </Button>
                        <Button
                            type="button"
                            onClick={() => onOpenChange(false)}
                            variant="outline"
                            className="flex-1 border border-white/10 text-white/50 hover:text-white/80 hover:border-white/20 bg-transparent py-2.5 rounded-xl transition-all duration-200"
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
