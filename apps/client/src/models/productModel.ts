export interface IProductPayload {
    name: string;
    description: string;
    price: number | string;
    returnPolicy: string;
    benefit: string;
    expiryDate?: string;
    brandId: string;
    categoryId: string;
    subcategoryId?: string;
    childCategoryId?: string;
    originId: string;
    ageGroupId: string;
    variant?: string;
    stock?: number | string;
    file?: File | Blob | string;
    files?: File[] | Blob[];
}

export interface IProductUpdatePayload extends Partial<IProductPayload> {}

export interface ICartAdd {
    productId: string | number;
    quantity: number | string;
}

export interface ICartUpdate {
    quantity: number | string;
}

export interface ICategoryItem {
    id?: string;
    _id?: string;
    name: string;
}

export interface IBrandItem {
    id?: string;
    _id?: string;
    name: string;
}

export interface IOriginItem {
    id?: string;
    _id?: string;
    name: string;
}

export interface IAgeGroupItem {
    id?: string;
    _id?: string;
    name: string;
}
