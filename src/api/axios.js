import axios from "axios";
import { getStoredUser } from "../utils/auth";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

API.interceptors.request.use(
    (config) => {
        const user = getStoredUser();
        if (user?.access) {
            config.headers.Authorization = `Bearer ${user.access}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    });
    failedQueue = [];
};

API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const user = getStoredUser();

        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry &&
            user?.access
        ) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then((token) => {
                    originalRequest.headers["Authorization"] = `Bearer ${token}`;
                    return API(originalRequest);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const { data } = await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}/refresh`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${user.access}`,
                        },
                    }
                );

                user.access = data.token;
                localStorage.setItem("user", JSON.stringify(user));

                API.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
                processQueue(null, data.token);
                return API(originalRequest);
            } catch (err) {
                processQueue(err, null);
                localStorage.removeItem("user");
                window.location.href = "/login";
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default API;
