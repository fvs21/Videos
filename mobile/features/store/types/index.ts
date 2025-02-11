export type Store = {
    id: string;
    name: string;
    store_picture_url: string;
    owner_username: string;
    owner_full_name: string;
    owner_pfp_url: string;
    products: ProductDisplay[];
}

export type ProductDisplay = {
    id: string;
    name: string;
    price: number;
    images_urls: string[];
}

export type Product = {
    id: number;
    name: string;
    price: string;
    //category: string;
    images_urls: string[];
    description: string;
    store: number;
    //more specific product information
}

export type CreateStoreRequest = {
    name: string | null;
    image: File | null;
}