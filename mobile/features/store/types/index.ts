export type Store = {
    id: string;
    name: string;
    store_image: string;
    owner_username: string;
    owner_name: string;
    owner_pfp_url: string;
}

export type ProductDisplay = {
    id: string;
    name: string;
    price: number;
    product_image: string;
}

export type Product = {
    id: string;
    name: string;
    price: number;
    category: string;
    images: string[];
    //more specific product information
}