import apiClient, { getErrorMessage } from "./apiClient";
import { generateFcmToken } from "../utils/generateFcmToken";
import { IAppointmentPayload, IAppointmentVerifyPayload, IFcmTokenPayload } from "../models/appointmentModel";

export * from "../models/appointmentModel";

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

export const addOppointment = async (payload: IAppointmentPayload) => {
    try {
        const userAccessToken = localStorage.getItem("userAccessToken");
        const add = await apiClient.post(`/api/v1/appointment/add`, payload, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userAccessToken}`
            }
        });
        return add;
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error));
    }
};

export const getAllAppoinmentLits = async () => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken");
        const list = await apiClient.get(`/api/v1/appointment/list`, {
            headers: {
                "Authorization": `Bearer ${adminAccessToken}`,
                "Content-Type": "application/json"
            }
        });
        return list;
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error));
    }
};

export const getUserAppointmentList = async (id: string | number) => {
    try {
        const userAccessToken = localStorage.getItem("userAccessToken");
        const list = await apiClient.get(`/api/v1/appointment/user/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userAccessToken}`
            }
        });
        return list;
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error));
    }
};

export const getDoctorAppointmentList = async (id: string | number) => {
    try {
        const doctorAccessToken = localStorage.getItem("doctorAccessToken");
        const list = await apiClient.get(`/api/v1/appointment/doctor/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${doctorAccessToken}`
            }
        });
        return list;
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error));
    }
};

export const appointmentPaymentAdd = async (id: string | number, doctorId?: string | number) => {
    try {
        const userAccessToken = localStorage.getItem("userAccessToken");

        const payment = await apiClient.post(`/api/v1/appointment/payment/${id}`, {}, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userAccessToken}`
            }
        });
        const amount = payment?.data?.data?.amount;
        const razorpayOrderId = payment?.data?.data?.id;
        const receipt = payment?.data?.data?.receipt;

        const options = {
            key: keyId,
            amount: amount * 100,
            currency: "INR",
            name: 'Care Hub',
            description: 'Healthcare',
            order_id: razorpayOrderId,
            callback_url: '/user-appointment',
            handler: async (response: IAppointmentVerifyPayload) => {
                try {
                    await verifyPayment({
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        receipt: receipt,
                    });

                    try {
                        console.log("Starting FCM token generation for doctorId:", doctorId);
                        const token = await generateFcmToken();
                        console.log("FCM token generated result:", token);
                        if (token && doctorId) {
                            const fcmRes = await fcmTokens({
                                user: doctorId,
                                token: token
                            });
                            console.log("FCM token saved to doctor record successfully:", fcmRes?.data);
                        } else {
                            console.warn("FCM token was not saved: token or doctorId is missing.", { token, doctorId });
                        }
                    } catch (fcmErr: any) {
                        console.warn("FCM registration error after payment verification:", fcmErr?.message);
                    }

                    if (typeof window === "object") {
                        window.location.href = "/user-appointment";
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
        return payment;
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error));
    }
};

export const verifyPayment = async (payload: IAppointmentVerifyPayload) => {
    try {
        const userAccessToken = localStorage.getItem("userAccessToken");
        const verify = await apiClient.post(`/api/v1/appointment/payment/verify`, payload, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userAccessToken}`
            }
        });
        return verify;
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error));
    }
};

export const paymentAllLsit = async () => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken");
        const list = await apiClient.get(`/api/v1/appointment/payment/history`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${adminAccessToken}`
            }
        });
        return list;
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error));
    }
};

export const paymentUserList = async (id: string | number) => {
    try {
        const userAccessToken = localStorage.getItem("userAccessToken");
        const list = await apiClient.get(`/api/v1/appointment/payment/history/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userAccessToken}`
            }
        });
        return list;
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error));
    }
};

export const paymentDoctorList = async (id: string | number) => {
    try {
        const doctorAccessToken = localStorage.getItem("doctorAccessToken");
        const list = await apiClient.get(`/api/v1/appointment/payment/history/doctor/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${doctorAccessToken}`
            }
        });
        return list;
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error));
    }
};

export const fcmTokens = async (details: IFcmTokenPayload) => {
    try {
        const userAccessToken = localStorage.getItem("userAccessToken");
        const tokens = await apiClient.put(`/api/v1/appointment/save-fcm-token`, details, {
            headers: {
                "Authorization": `Bearer ${userAccessToken}`,
                "Content-Type": "application/json"
            }
        });
        return tokens;
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error));
    }
};

export const videoCall = async (id: string | number) => {
    try {
        const appointmentId = { appointmentId: id };
        const token = (typeof window !== "undefined" ? (localStorage.getItem("doctorAccessToken") || localStorage.getItem("userAccessToken")) : null);
        const call = await apiClient.post(`/api/v1/appointment/video-call`, appointmentId, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        return call;
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error));
    }
};