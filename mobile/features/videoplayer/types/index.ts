import { User } from "@/types/globals";

export type Post = {
    id: number;
    video_url: string;
    video_id: number;
    description: string;
    creator: User;
    likes: number;
    comment_count: number;
}

export type Video = {
    url: string;
    description?: string;
    creator?: User;
    likes?: number;
    comment_count?: number;
}