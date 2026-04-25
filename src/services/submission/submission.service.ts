/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createSubmissionValidation, updateSubmissionValidation, reviewSubmissionValidation } from "@/zod/submission.validation";

export const createSubmission = async (data: any) => {
    try {
        const validation = zodValidator(data, createSubmissionValidation);

        if (!validation.success) return validation;

        const res = await serverFetch.post("/submission", {
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
            message: error.message || "Failed to submit assignment",
        };
    }
};


export const getMySubmissions = async () => {
    try {
        const res = await serverFetch.get("/submission/my");

        const result = await res.json();
        return result;
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to fetch submissions",
        };
    }
};




export const updateSubmission = async (id: string, data: any) => {
    try {
        const validation = zodValidator(data, updateSubmissionValidation);

        if (!validation.success) return validation;

        const res = await serverFetch.patch(`/submission/${id}`, {
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
            message: error.message || "Failed to update submission",
        };
    }
};


export const getSubmissionsByAssignment = async (assignmentId: string) => {
    try {
        const res = await serverFetch.get(
            `/submission/assignment/${assignmentId}`
        );

        const result = await res.json();
        return result;
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to fetch submissions",
        };
    }
};


export const reviewSubmission = async (
    submissionId: string,
    data: any
) => {
    try {
        const validation = zodValidator(data, reviewSubmissionValidation);

        if (!validation.success) return validation;

        const res = await serverFetch.patch(
            `/submission/review/${submissionId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(validation.data),
            }
        );

        const result = await res.json();
        return result;
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to review submission",
        };
    }
};


