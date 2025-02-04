import { useMutation } from "@tanstack/react-query"
import { CreateStoreRequest } from "../types"
import { apiMultipart } from "@/api"

export const useGetStore = () => {
    
}

export const useCreateStore = () => {
    const { mutateAsync: create, isPending, isError } = useMutation({
        mutationFn: async (body: CreateStoreRequest) => {
            const request = await apiMultipart.post("/store/create", body);
            return request.data;
        }
    });

    return {
        create,
        isPending,
        createStoreDisabled: isPending && !isError
    }
}