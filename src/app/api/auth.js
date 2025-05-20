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
        console.log('request', request)
        // if (request.data) {
        //     toast.success("Registration Successfully")
        // }
        // return request;
    }).catch((error) => {
        if (error.response.status === 400) {
            console.log(error)
            // toast.error("Email already exists")
        } else if (error.response.status === 401) {
            console.log('LOGOUT USER')
            HandleLogout()
        } else {
            console.log(error)
            // toast.error("User added failed")
        }
        return error;
    })
}