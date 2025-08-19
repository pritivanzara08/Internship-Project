export interface Product {
    name: any;
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    categoryId: string;
}

export interface ProductCategory {
    id: string;
    name: string;
    description: string;
    products: Product[];
}

