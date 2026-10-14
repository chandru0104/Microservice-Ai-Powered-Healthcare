import apiClient, { getErrorMessage } from "./apiClient";
import { IPaymentVerifyPayload } from "../models/paymentModel";

export * from "../models/paymentModel";

declare global {
    interface Window {
        Razorpay: any;
    }
}

const keyId = process.env.NEXT_PUBLIC_RAZORPAY_API_KEY;

const paymentPrefill = {
    name: process.env.NEXT_PUBLIC_PAYMENT_NAME,
    email: process.env.NEXT_PUBLIC_PAYMENT_EMAIL,
    contact: process.env.NEXT_PUBLIC_PAYMENT_CONTACT,
};

export const paymentAdd = async (orderId: string | number, amount?: number | string) => {
    try {
        const token = localStorage.getItem("userAccessToken");
        const add = await apiClient.post(`/api/v1/payment/add`, { orderId, amount }, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        const amountRec = add?.data?.data?.amount;
        const receipt = add?.data?.data?.receipt;
        const razorpayOrderId = add?.data?.data?.id;

        const options = {
            key: keyId,
            amount: amountRec,
            currency: "INR",
            name: 'Care Hub',
            description: 'Healthcare',
            order_id: razorpayOrderId,
            callback_url: '/user-appointment',
            handler: async (response: IPaymentVerifyPayload) => {
                try {
                    await paymentVerfiy({
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        receipt: receipt,
                    });
                    if (typeof window === "object") {
                        window.location.href = "/user-orders";
                    }
                } catch (error: unknown) {
                    throw new Error(getErrorMessage(error));
                }
            },
            prefill: paymentPrefill,
            theme: {
                color: '#004097'
            }
        };

        if (typeof window !== "undefined" && window.Razorpay) {
            const rzp = new window.Razorpay(options);
            rzp.open();
        } else {
            console.error("Razorpay SDK is not loaded on window.");
        }

        return add;
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error));
    }
};

export const paymentVerfiy = async (payload: IPaymentVerifyPayload) => {
    try {
        const token = localStorage.getItem("userAccessToken");
        const verify = await apiClient.post(`/api/v1/payment/verify`, payload, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        return verify;
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error));
    }
};

export const verifyBookTestPayment = async (payload: IPaymentVerifyPayload) => {
    try {
        const token = localStorage.getItem("userAccessToken");
        const verify = await apiClient.post(`/api/v1/payment/verify-book-test-payment`, payload, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        return verify;
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error));
    }
};

export const bookTestPayment = async (bookId: string | number, price?: number | string) => {
    try {
        const token = localStorage.getItem("userAccessToken");
        const add = await apiClient.post(`/api/v1/payment/book-test-payment`, { 
            bookId, 
            price: Number(price)
        }, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        const amountRec = add?.data?.data?.amount;
        const receipt = add?.data?.data?.receipt || bookId;
        const razorpayOrderId = add?.data?.data?.order_id || add?.data?.data?.id;

        const options = {
            key: keyId,
            amount: amountRec,
            currency: "INR",
            name: 'Care Hub',
            description: 'Lab Test Booking',
            order_id: razorpayOrderId,
            callback_url: '/user-appointment',
            handler: async (response: IPaymentVerifyPayload) => {
                try {
                    await verifyBookTestPayment({
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        receipt: receipt || bookId,
                        bookId: bookId,
                    });
                    if (typeof window === "object") {
                        window.location.href = "/user-book-test";
                    }
                } catch (error: unknown) {
                    throw new Error(getErrorMessage(error));
                }
            },
            prefill: paymentPrefill,
            theme: {
                color: '#004097'
            }
        };

        if (typeof window !== "undefined") {
            if (!window.Razorpay) {
                await new Promise((resolve) => {
                    const script = document.createElement("script");
                    script.src = "https://checkout.razorpay.com/v1/checkout.js";
                    script.onload = () => resolve(true);
                    script.onerror = () => resolve(false);
                    document.body.appendChild(script);
                });
            }
            if (window.Razorpay) {
                const rzp = new window.Razorpay(options);
                rzp.open();
            } else {
                console.error("Razorpay SDK is not loaded on window.");
            }
        }

        return add;
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error));
    }
};
