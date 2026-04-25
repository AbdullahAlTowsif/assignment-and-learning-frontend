import { UserInfo } from "./user.interface";

export enum Level {
    BEGINNER = "BEGINNER",
    INTERMEDIATE = "INTERMEDIATE",
    ADVANCED = "ADVANCED",
}

export enum Status {
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    NEEDS_IMPROVEMENT = "NEEDS_IMPROVEMENT",
}

export interface IFeedback {
    id: string;
    content: string;
    createdAt: string;
    submissionId: string;
    instructorId: string;
    submission?: ISubmission;
    instructor?: UserInfo;
}

export interface ISubmission {
    id: string;
    studentUrl: string;
    studentNote: string;
    status: Status;
    submittedAt: string;
    studentId: string;
    assignmentId: string;
    student?: UserInfo;
    assignment?: IAssignment;
    feedback?: IFeedback;
}

export interface IAssignment {
    id: string;
    title: string;
    description: string;
    deadline: string;
    difficulty: Level;
    createdAt: string;
    updatedAt: string;
    instructorId: string;
    instructor?: UserInfo;
    submissions?: ISubmission[];
}

