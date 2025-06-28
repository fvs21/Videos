import { api } from "@/api"
import type { Post } from "@/types";
import { useQuery } from "@tanstack/react-query"

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