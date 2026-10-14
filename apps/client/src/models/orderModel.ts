export interface IOrderItem {
    product?: string | number;
    productId?: string | number;
    quantity: number | string;
}

export interface IOrderPayload {
    user: string | null;
    shippingAddress: string;
    paymetStatus: string;
    items: Array<{
        product: string | number | undefined;
        productId: string | number | undefined;
        quantity: number;
    }>;
}

export interface IOrderHistoryUser {
    _id?: string;
    name?: string;
    email?: string;
    phone?: string | number;
}

export interface IOrderHistoryItem {
    _id?: string;
    id?: number | string;
    user?: IOrderHistoryUser | string;
    shippingAddress?: string;
    paymetStatus?: string;
    totalAmount?: number;
    price?: number;
    items?: Array<{
        product?: any;
        productId?: any;
        quantity?: number;
    }>;
    createdAt?: string;
    updatedAt?: string;
    [key: string]: any;
}
