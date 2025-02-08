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
    id: string;
    name: string;
    price: number;
    category: string;
    images: string[];
    //more specific product information
}

export type CreateStoreRequest = {
    name: string | null;
    image: File | null;
}