import axios from "axios";
import { jwtDecode } from 'jwt-decode'
import verifyToken from "./services/verify";
import Cookies from 'js-cookie';
import { AUTH_URL } from "./axiosConfig";
// import day



const axiosInstance = axios.create({
    baseURL: `${AUTH_URL}`,
    withCredentials: true,
});


axiosInstance.interceptors.request.use(
    (config) => {
        console.log("intercepting request");
        if (localStorage.getItem("user_data")) {
            const token = JSON.parse(localStorage.getItem("user_data") ?? "");
            // console.log(token.refresh)
            const accessToken = token.jwt;
            // console.log(accessToken, "==========aceesss");


            if (accessToken) {
                config.headers["Authorization"] = `Bearer ${accessToken}`;
                config.headers["Auth"] = `Bearer ${token.access}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);




axiosInstance.interceptors.response.use(
    async (response) => {
        console.log("response interceptor");
        console.log(response)
        // console.log(response.data.access)

        if (response.status === 200 && response.data) {
          const token = JSON.parse(localStorage.getItem("user_data") ?? "");
          const accessToken = token.access;
            await verifyToken(accessToken);
        }

        return response;
    },
    async (error) => {
        console.log("response error interceptor", error);

        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const newAccessToken = await refreshAccessToken();
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
            }
        }

        return Promise.reject(error);
    }
);




const refreshAccessToken = async () => {
    console.log("refresh token");
    const token = JSON.parse(localStorage.getItem("user_data") ?? "");
    const refreshResponse = await axios.post(`${AUTH_URL}/api/token/refresh/`, {
        refresh: token.refresh,
    });

    if (refreshResponse.data.access) {
        localStorage.setItem(
            "user_data",
            JSON.stringify({
                ...token,
                access: refreshResponse.data.access,
            })
        );
    }

    return refreshResponse.data.access;
};


// const refreshAccessToken = async () => {
//     console.log("refresh token");
//     const token = JSON.parse(localStorage.getItem("user_data") ?? "");
//     const refreshResponse = await axiosInstance.post("/auth/token/refresh/", {
//         refresh: token.refresh,
//     });
//     console.log(refreshResponse)

//     if (refreshResponse.data.access) {
//         localStorage.setItem(
//             "user_data",
//             JSON.stringify({
//                 ...token,
//                     access: refreshResponse.data.access,
                
//             })
//         );
//     }

//     return refreshResponse.data.access;
// };

export default axiosInstance;
