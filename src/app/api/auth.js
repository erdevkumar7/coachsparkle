import axios from "axios";
import { BACK_END_BASE_URL } from "@/config/url_config";

export const HandleRegister = async (reqData) => {
    return await axios({
        headers: {
            'Content-Type': 'application/json',
        },
        method: "POST",
        url: `${BACK_END_BASE_URL}/register`,
        data: reqData,
    }).then((request) => {
        return request;
    }).catch((error) => {
        return error;
    })
}

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