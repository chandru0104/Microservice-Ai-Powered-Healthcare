import apiClient, { getErrorMessage } from "./apiClient";
import { SymptomsCheckData } from "../models/aiModel";

export * from "../models/aiModel";

export const aiSymptomsCheck = async (data: SymptomsCheckData) => {
    try {
        const userAccessToken = localStorage.getItem("userAccessToken");
        const post = await apiClient.post(`/api/v1/ai/symptoms`, { data }, {
            headers: {
                "Authorization": `Bearer ${userAccessToken}`,
                "Content-Type": "application/json"
            }
        });
        return post;
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error));
    }
};

export const medicalReportAnalyzer = async (data: File) => {
    try {
        const userAccessToken = localStorage.getItem("userAccessToken");
        const formData = new FormData();
        formData.append("file", data);
        const post = await apiClient.post(`/api/v1/ai/report`, formData, {
            headers: {
                "Authorization": `Bearer ${userAccessToken}`,
                "Content-Type": "multipart/form-data"
            }
        });
        return post;
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error));
    }
};

export const aiMedicine = async (data: File) => {
    try {
        const userAccessToken = localStorage.getItem("userAccessToken");
        const formData = new FormData();
        formData.append("file", data);
        const post = await apiClient.post(`/api/v1/ai/medicine`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${userAccessToken}`
            }
        });
        return post;
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error));
    }
};