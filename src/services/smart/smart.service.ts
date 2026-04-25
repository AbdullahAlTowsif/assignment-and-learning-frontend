/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { generateFeedbackValidation, improveDescriptionValidation } from "@/zod/smart.validation";

export const generateFeedback = async (data: any) => {
    try {
        const validation = zodValidator(data, generateFeedbackValidation);

        if (!validation.success) return validation;

        const res = await serverFetch.post("/ai/generate-feedback", {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(validation.data),
        });

        const result = await res.json();

        return result;
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to generate feedback",
        };
    }
};


export const improveDescription = async (data: any) => {
    try {
        const validation = zodValidator(
            data,
            improveDescriptionValidation
        );

        if (!validation.success) return validation;

        const res = await serverFetch.post("/ai/improve-description", {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(validation.data),
        });

        const result = await res.json();

        return result;
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to improve description",
        };
    }
};
