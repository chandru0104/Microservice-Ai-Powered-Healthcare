export interface OrderItem {

    product: string;
    quantity: number;
}

export interface OrderInterface {
    user: string,
    paymetStatus: "success" | "pening",
    shippingAddress: string,
    items: OrderItem[],
}