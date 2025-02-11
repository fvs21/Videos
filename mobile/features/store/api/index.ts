import { useMutation, useQuery } from "@tanstack/react-query"
import { CreateStoreRequest, Product, Store } from "../types"
import { api, apiMultipart } from "@/api"
import { useUser } from "@/store"

export const useGetUserStore = () => {
    const { data, isLoading, error } = useQuery({
        queryFn: async (): Promise<Store> => {
            const request = await api.get<Store>("/store/get");
            
            return request.data;
        },
        queryKey: ['user-store']
    });

    return {
        data,
        isLoading,
        error
    }
}

export const useCreateStore = () => {
    const [user, setUser] = useUser();

    const { mutateAsync: create, isPending, isError } = useMutation({
        mutationFn: async (body: CreateStoreRequest) => {
            const formData = new FormData();

            formData.append("name", body.name as any); //doesnt matter if its null
            formData.append("store_image", body.image as any);
            
            const request = await apiMultipart.post("/store/create", body);
            return request.data;
        },
        onSuccess: () => {
            setUser({
                ...user,
                is_seller: true
            });
        }
    });

    return {
        create,
        isPending,
        createStoreDisabled: isPending && !isError
    }
}

export const useGetProductInformation = (product_id: number) => {
    const { data, isLoading } = useQuery({
        queryKey: ['product-information', product_id],
        queryFn: async (): Promise<Product> => {
            const request = await api.get<Product>(`/store/product/${product_id}`);

            return request.data;
        }
    });

    return { data, isLoading };
}