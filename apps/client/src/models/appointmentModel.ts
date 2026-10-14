export interface IAppointmentPayload {
    doctor: string;
    date: string;
    time: string;
    phone: number;
    user: string;
    fees: number;
    [key: string]: any;
}

export interface IAppointmentVerifyPayload {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    receipt?: string;
}

export interface IFcmTokenPayload {
    user: string | number;
    token: string;
}
