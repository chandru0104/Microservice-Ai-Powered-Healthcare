export interface OrderItem {
    product: string;
    quantity: number;
    price: number;
}

export interface OrderInterface{
    user:string,
    paymetStatus:string,
    shippingAddress:string,
    items:OrderItem[],
    price:string
}