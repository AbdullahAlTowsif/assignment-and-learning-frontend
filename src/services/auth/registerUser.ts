/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { registerUserValidationZodSchema } from "@/zod/auth.validation";
import { loginUser } from "./login";

export const registerUser = async (_currentState: any, formData: FormData) => {
    try {
        const payload = {
            name: formData.get("name"),
            email: formData.get("email"),
            role: formData.get("role"),
            password: formData.get("password"),
            confirmPassword: formData.get("confirmPassword"),
        };
        console.log("Payload Register: ", payload);

        const validationResult = zodValidator(
            payload,
            registerUserValidationZodSchema
        );

        if (!validationResult.success) {
            return validationResult;
        }

        const validatedPayload: any = validationResult.data;

        // ✅ Backend expects JSON (NOT FormData)
        const registerData = {
            name: validatedPayload.name,
            email: validatedPayload.email,
            password: validatedPayload.password,
            role: validatedPayload.role
        };

        const res = await serverFetch.post("/user/register", {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(registerData),
        });

        const result = await res.json();
        console.log("Result-Register-Service", result);

        if (result.success) {
            // 🔐 auto login after register
            await loginUser(_currentState, formData);
        }

        return result;
    } catch (error: any) {
        if (error?.digest?.startsWith("NEXT_REDIRECT")) {
            throw error;
        }

        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Registration Failed. Please try again.",
        };
    }
};
