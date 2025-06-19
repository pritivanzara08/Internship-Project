export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    categoryId: string;
}

export interface Category {
    id: string;
    name: string;
    description: string;
    products: Product[];
}