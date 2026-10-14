import axios from "axios";
import { getErrorMessage } from "../models/errorHandler";
import { UserUpdateData } from "../models/userModel";

export * from "../models/userModel";

const API_GATEWAY_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL;

export const userProfile = async () => {
    try {
        const token = localStorage.getItem("userAccessToken");
        const id = localStorage.getItem("userId");
        if (!id || id === "null" || id === "undefined") {
            return null;
        }
        const profile = await axios.get(`${API_GATEWAY_URL}/api/v1/user/profile/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return profile;
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error));
    }
};

export const userUpdate = async (id: string, data: UserUpdateData) => {
    try {
        const token = localStorage.getItem("userAccessToken");
        const update = await axios.put(`${API_GATEWAY_URL}/api/v1/user/update/${id}`, data, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        return update;
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error));
    }
};

export const deleteUser = async (id: string) => {
    try {
        const token = localStorage.getItem("userAccessToken");
        const response = await axios.delete(`${API_GATEWAY_URL}/api/v1/user/delete/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error));
    }
};