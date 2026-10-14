import apiClient, { getErrorMessage } from "./apiClient";
import { IOrderItem, IOrderPayload } from "../models/orderModel";

export * from "../models/orderModel";

export const orderAdd = async (id: string | number, qunt: number | string) => {

    try {
        const userAccessToken = localStorage.getItem("userAccessToken");
        const userId = localStorage.getItem("userId");

        let userAddress = "No address provided";
        if (userId) {
            try {
                const profileRes = await apiClient.get(`/api/v1/user/profile/${userId}`, {
                    headers: {
                        "Authorization": `Bearer ${userAccessToken}`
                    }
                });
                if (profileRes?.data?.data?.address) {
                    userAddress = profileRes.data.data.address;
                }
            } catch (err: any) {
                console.log(err.message);
            }
        }

        const payload: IOrderPayload = {
            user: userId,
            shippingAddress: userAddress,
            paymetStatus: "pending",
            items: [
                {
                    product: id,
                    productId: id,
                    quantity: Number(qunt) || 1
                }
            ]
        };

        const add = await apiClient.post(`/api/v1/order/add`, payload, {
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

export const orderAddMultiple = async (items: IOrderItem[]) => {
    try {
        const userAccessToken = localStorage.getItem("userAccessToken");
        const userId = localStorage.getItem("userId");

        let userAddress = "No address provided";
        if (userId) {
            try {
                const profileRes = await apiClient.get(`/api/v1/user/profile/${userId}`, {
                    headers: {
                        "Authorization": `Bearer ${userAccessToken}`
                    }
                });
                if (profileRes?.data?.data?.address) {
                    userAddress = profileRes.data.data.address;
                }
            } catch (err: any) {
                console.log(err.message);
            }
        }

        const formattedItems = items.map((item) => {
            const prodId = item.product || item.productId;
            return {
                product: prodId,
                productId: prodId,
                quantity: Number(item.quantity) || 1
            };
        });

        const payload: IOrderPayload = {
            user: userId,
            shippingAddress: userAddress,
            paymetStatus: "pending",
            items: formattedItems
        };

        const add = await apiClient.post(`/api/v1/order/add`, payload, {
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

export const orderListUser = async () => {
    try {
        const userAccessToken = localStorage.getItem("userAccessToken");
        const list = await apiClient.get(`/api/v1/order/user`, {
            headers: {
                "Authorization": `Bearer ${userAccessToken}`,
                "Content-Type": "application/json"
            }
        });
        return list;

    } catch (error: unknown) {
        throw new Error(getErrorMessage(error));
    }
};

export const orderListAdmin = async () => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken");
        const list = await apiClient.get(`/api/v1/order/list`, {
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