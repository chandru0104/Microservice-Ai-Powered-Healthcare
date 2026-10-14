import apiClient, { getErrorMessage } from "./apiClient";

export const OrderHistory = async () => {
    try {
        const adminAccessToken = localStorage.getItem("adminAccessToken");
        const list = await apiClient.get(`/api/v1/order/list`, {
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

export const userOrderList = async () => {
    try {
        const userAccessToken = localStorage.getItem("userAccessToken");
        const list = await apiClient.get(`/api/v1/order/user`, {
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
