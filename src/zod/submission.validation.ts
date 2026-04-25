import { z } from "zod";

export const createSubmissionValidation = z.object({
    assignmentId: z.string().min(1, "Assignment is required"),
    studentNote: z.string().min(1, "Note is required"),
    studentUrl: z.string("Invalid URL"),
});

export const updateSubmissionValidation = z.object({
    studentNote: z.string().optional(),
    studentUrl: z.string("Invalid URL").optional(),
});

export const reviewSubmissionValidation = z.object({
    status: z.enum(["PENDING", "ACCEPTED", "NEEDS_IMPROVEMENT"], { message: "Feedback must be 'PENDING', 'ACCEPTED' or 'NEEDS_IMPROVEMENT' " }),
    feedback: z.string().min(1, "Feedback is required"),
});