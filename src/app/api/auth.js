import axios from "axios";
import { BACK_END_BASE_URL } from "@/config/url_config";

export const HandleRegister = async (reqData) => {
    try {
        const response = await axios.post(`${BACK_END_BASE_URL}/register`, reqData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return { success: true, data: response.data };
    } catch (error) {    
        // Laravel validation errors typically come in error.response.data.errors
        return {
            success: false,
            errors: error.response?.data || {},
            message: error.response?.data?.message || "Something went wrong",
        };
    }
};

export const HandleLogin = async (reqData) => {
    return await axios({
        headers: {
            'Content-Type': 'application/json',
        },
        method: "POST",
        url: `${BACK_END_BASE_URL}/login`,
        data: reqData,
    }).then((request) => {
        return request;
    }).catch((error) => {
        return error;
    })
}