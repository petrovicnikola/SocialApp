import { Comment } from "./Comment";

export interface Status {
    _id: string;
    username: string;
    text: string;
    createdAt: string;
    likedBy: string[];
    comments: Comment[];
}