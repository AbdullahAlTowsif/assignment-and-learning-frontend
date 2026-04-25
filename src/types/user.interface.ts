import { UserRole } from "@/lib/auth-utils";
import { IAssignment, IFeedback, ISubmission } from "./assignment.interface";

export interface UserInfo {
    id?: string;
    name: string;
    email: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
    assignments?: IAssignment[];
    submissions?: ISubmission[];
    feedbackGiven?: IFeedback[];
}

// export interface IUser {
//     id: string;
//     name?: string | null;
//     email: string;
//     password?: string | null;
//     role: "STUDENT" | "INSTRUCTOR";
//     createdAt: string;
//     updatedAt: string;
//     assignments?: IAssignment[];
//     submissions?: ISubmission[];
//     feedbackGiven?: IFeedback[];
// }
