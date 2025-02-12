import axios, { AxiosInstance } from "axios";

export const baseURL = "http://192.168.68.103:8000/api";

export const apiGuest: AxiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true
});

export const api = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true
});

export const apiMultipart = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    withCredentials: true
});