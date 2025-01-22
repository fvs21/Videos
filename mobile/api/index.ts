import axios, { AxiosInstance } from "axios";

const baseURL = "http://192.168.68.101:8000/api";

export const apiGuest: AxiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true
});