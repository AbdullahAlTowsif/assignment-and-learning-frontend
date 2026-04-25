import { z } from "zod";

export const generateFeedbackValidation = z.object({
    studentNote: z
        .string()
        .min(1, "Student note is required")
        .max(1000, "Note is too long"),
});

export const improveDescriptionValidation = z.object({
    description: z
        .string()
        .min(1, "Description is required")
        .max(2000, "Description is too long"),
});
