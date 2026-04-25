"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { IAssignment } from "@/types/assignment.interface";

interface DeleteAssignmentDialogProps {
    assignment: IAssignment;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
}

export default function DeleteAssignmentDialog({
    assignment,
    open,
    onOpenChange,
    onConfirm,
}: DeleteAssignmentDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-[#111118] border border-white/10 text-white max-w-md">
                <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-red-400" />
                        </div>
                        <DialogTitle className="text-white text-lg font-bold">
                            Delete Assignment
                        </DialogTitle>
                    </div>
                    <DialogDescription className="text-white/40 text-left">
                        Are you sure you want to delete{" "}
                        <span className="text-white/60 font-medium">
                            &ldquo;{assignment.title}&rdquo;
                        </span>
                        ? This action cannot be undone. All associated submissions and feedback
                        will also be permanently deleted.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex gap-3 mt-6">
                    <Button
                        onClick={onConfirm}
                        className="flex-1 bg-red-600 hover:bg-red-500 text-white text-[14px] font-semibold py-2.5 rounded-xl transition-all duration-200"
                    >
                        Delete Assignment
                    </Button>
                    <Button
                        onClick={() => onOpenChange(false)}
                        variant="outline"
                        className="flex-1 border border-white/10 text-white/50 hover:text-white/80 hover:border-white/20 bg-transparent py-2.5 rounded-xl transition-all duration-200"
                    >
                        Cancel
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
