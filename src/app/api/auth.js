import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const HandleRegister = async (reqData) => {
    try {
        const response = await axios.post(`${apiUrl}/register`, reqData, {
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

    const loginUrl = reqData.user_type === 2 
        ? `${apiUrl}/userlogin` 
        : `${apiUrl}/coachlogin`;

    try {
        const response = await axios({
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
            url: loginUrl,
            data: reqData,
        });
        return response;
    } catch (error) {
        return error;
    }
};