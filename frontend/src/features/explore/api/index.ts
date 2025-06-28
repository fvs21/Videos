import { api, apiMultiPart } from "@/api"
import type { Post } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query"

export const useFeed = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['feed'],
        queryFn: async () => {
            const response = await api.get('/explore/all');
            
            return response.data as Post[];
        },
        refetchOnWindowFocus: false,
    })
    return { data, isLoading }
}

export const useCreatePost = () => {
    const { mutateAsync: createPost, isPending } = useMutation({
        mutationFn: async ({ description, video }: { description: string, video: File }) => {
            const formData = new FormData();
            formData.append("data", JSON.stringify({ description }));
            formData.append("video", video);
            const res = await apiMultiPart.post("/post/create", formData);

            return res.data;
        }
    });

    return {
        createPost,
        isPending
    }
}