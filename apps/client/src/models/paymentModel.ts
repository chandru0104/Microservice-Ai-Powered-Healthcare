export interface IPaymentVerifyPayload {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    receipt?: string;
    bookId?: string | number;
}
