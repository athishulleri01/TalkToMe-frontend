import axiosInstance from "../axiosInstance";
import axios from "axios";
import { AUTH_URL } from "../axiosConfig";

const verifyToken = (accessToken) => {
    axios
        .post(`${AUTH_URL}/api/token/verify/`, {
            token: accessToken,
        })
        .then((response) => {
            console.log("Token verification successful:", response.data);
        })
        .catch((error) => {
            console.error("Token verification failed:", error.response.data);
            if (error.response.status === 401) {
                localStorage.removeItem("user_data");
            }
        });
};

export default verifyToken;
