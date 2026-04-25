import { z } from "zod";

export const createAssignmentValidation = z.object({
    title: z
        .string()
        .min(1, "Title is required")
        .max(100, "Title should not exceed 100 characters"),

    description: z
        .string()
        .min(1, "Description is required")
        .max(1000, "Description should not exceed 1000 characters"),

    deadline: z
        .string()
        .min(1, "Deadline is required")
        .refine(
            (date) => !isNaN(Date.parse(date)),
            "Invalid deadline format"
        ),

    difficulty: z.enum(
        ["BEGINNER", "INTERMEDIATE", "ADVANCED"],
        { message: "Difficulty must be 'BEGINNER', 'INTERMEDIATE' or 'ADVANCED' " }
    ),
});

export const updateAssignmentValidation = z.object({
    title: z
        .string()
        .min(1, "Title cannot be empty")
        .max(100, "Title should not exceed 100 characters")
        .optional(),

    description: z
        .string()
        .min(1, "Description cannot be empty")
        .max(1000, "Description should not exceed 1000 characters")
        .optional(),

    deadline: z
        .string()
        .optional()
        .refine(
            (date) => !date || !isNaN(Date.parse(date)),
            "Invalid deadline format"
        ),

    difficulty: z
        .enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"], { message: "Difficulty must be 'BEGINNER', 'INTERMEDIATE' or 'ADVANCED' " })
        .optional(),
});
