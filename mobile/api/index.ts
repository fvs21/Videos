import axios, { AxiosInstance } from "axios";

const baseURL = "http://localhost:3000/api";

export const apiGuest: AxiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    }
});