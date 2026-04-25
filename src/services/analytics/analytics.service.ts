/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

export const getSubmissionStatusCount = async () => {
    try {
        const res = await serverFetch.get("/analytics/status-count");

        const result = await res.json();

        return result;
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to fetch status count",
        };
    }
};

export const getAcceptanceRate = async () => {
    try {
        const res = await serverFetch.get("/analytics/acceptance-rate");

        const result = await res.json();

        return result;
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to fetch acceptance rate",
        };
    }
};


export const getSubmissionsPerAssignment = async () => {
    try {
        const res = await serverFetch.get(
            "/analytics/submissions-per-assignment"
        );

        const result = await res.json();

        return result;
    } catch (error: any) {
        return {
            success: false,
            message:
                error.message || "Failed to fetch submissions per assignment",
        };
    }
};


export const getDifficultyVsPerformance = async () => {
    try {
        const res = await serverFetch.get(
            "/analytics/difficulty-performance"
        );

        const result = await res.json();

        return result;
    } catch (error: any) {
        return {
            success: false,
            message:
                error.message || "Failed to fetch difficulty performance",
        };
    }
};

