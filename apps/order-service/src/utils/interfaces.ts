export interface OrderItem {

    product: string;
    quantity: number;
}

export interface OrderInterface {
    user: string,
    paymetStatus: "success" | "pending",
    shippingAddress: string,
    items: OrderItem[],
}