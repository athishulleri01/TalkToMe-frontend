import axios from "axios";
import { useSelector } from "react-redux";
import { userURL } from "./Constants";

// here wedifine axios instance and add a request interceptor
// wchich add access tocken to the header just befor the api send


// we have to create 4 axios instances for each microservices
export const useraxiosInstance = axios.create({
    baseURL:userURL
})



// defining interceptors for adding authentication tocken to the header
//users
useraxiosInstance.interceptors.request.use(
    (config) => {
        // modify request configuraion here
        
        // fetching access tocken from the redux
        const accessToken = localStorage.getItem('accessToken')
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)


// defining interceptors for adding authentication tocken to the header
// cadastre
cadastreaxiosInstance.interceptors.request.use(
    (config) => {
        // modify request configuraion here
        
        // fetching access tocken from the redux
        const accessToken = localStorage.getItem('accessToken')
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config; 
    },
    (error) => {
        return Promise.reject(error);
    }
)

