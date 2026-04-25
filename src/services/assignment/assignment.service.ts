/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createAssignmentValidation, updateAssignmentValidation } from "@/zod/assignment.validation";


export const createAssignment = async (_currentState: any, formData: FormData) => {
    try {
        const payload = {
            title: formData.get("title"),
            description: formData.get("description"),
            deadline: formData.get("deadline"),
            difficulty: formData.get("difficulty")
        };
        console.log("Payload assignment: ", payload);

        const validationResult = zodValidator(
            payload,
            createAssignmentValidation
        );

        if (!validationResult.success) {
            return validationResult;
        }

        const validatedPayload: any = validationResult.data;

        // ✅ Backend expects JSON (NOT FormData)
        const assignmentData = {
            title: validatedPayload.title,
            description: validatedPayload.description,
            deadline: validatedPayload.deadline,
            difficulty: validatedPayload.difficulty
        };

        const res = await serverFetch.post("/assignment/create-assignment", {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(assignmentData),
        });

        const result = await res.json();
        console.log("Assignment-Service", result);

        return result;
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to create assignment",
        };
    }
};


export const updateAssignment = async (id: string, data: any) => {
    try {
        const validationResult = zodValidator(
            data,
            updateAssignmentValidation
        );

        if (!validationResult.success) {
            return validationResult;
        }

        const validatedData = validationResult.data;

        const res = await serverFetch.patch(`/assignment/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(validatedData),
        });

        const result = await res.json();

        return result;
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to update assignment",
        };
    }
};


export const getAllAssignments = async () => {
    try {
        const res = await serverFetch.get("/assignment");

        const result = await res.json();

        return result;
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to fetch assignments",
        };
    }
};


export const getSingleAssignment = async (id: string) => {
    try {
        const res = await serverFetch.get(`/assignment/${id}`);

        const result = await res.json();

        return result;
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to fetch assignment",
        };
    }
};


export const deleteAssignment = async (id: string) => {
    try {
        const res = await serverFetch.delete(`/assignment/${id}`);

        const result = await res.json();

        return result;
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to delete assignment",
        };
    }
};

