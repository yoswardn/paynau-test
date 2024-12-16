import axios from "axios";

function getCookie(name) {
    const cookie = document.cookie
        .split("; ")
        .find((item) => item.startsWith(`${name}=`));

    if (!cookie) {
        return null;
    }

    return decodeURIComponent(cookie.split("=")[1]);
}

const connection = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
});

connection.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('token');
        const csrfToken = getCookie('XSRF-TOKEN');

        config.headers["Accept"] = "application/json"; 
        config.headers["X-Requested-With"] = "XMLHttpRequest";
        
        if (csrfToken) {
            config.headers["X-XSRF-TOKEN"] = csrfToken; 
        }

        if (token) {
            config.headers["Authorization"] = 'Bearer ' + token;
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);


connection.interceptors.response.use(
    (response) => response,
    (error) => {
        const handleError = connection._handleError || (() => {});

        if (!error.response) {
            handleError({
                severity: "error",
                summary: "Network Error",
                detail: "Unable to connect to the server. Please check your network.",
                life: 3000,
            });
            return Promise.reject({
                variant: "error",
                data: "Network Error",
            });
        }

        const { status, data } = error.response;

        const errorMessages = {
            400: "Bad Request. Please check your input.",
            401: "Unauthorized. Redirecting to login...",
            403: "Forbidden. You do not have access to this resource.",
            404: "Resource not found.",
            422: "Validation errors occurred.",
            429: "Too many requests. Please wait a moment and try again.",
            500: "Internal Server Error. Please try again later.",
            502: "Bad Gateway. Server is unavailable.",
            419: "Session expired. Please log in again.",
        };

        if (status === 401) {
            localStorage.clear();
            window.location.replace("/");
        }

        if (status === 422) {
            const errorDetails = Object.values(data.errors || {}).flat().join("\n");
            handleError({
                severity: "error",
                summary: "Validation Error",
                detail: errorDetails,
                life: 5000,
            });
            return Promise.reject({
                variant: "error",
                data: errorDetails,
            });
        }

        if (errorMessages[status]) {
            handleError({
                severity: "error",
                summary: "Error",
                detail: errorMessages[status],
                life: 3000,
            });
            return Promise.reject({
                variant: "error",
                data: errorMessages[status],
            });
        }

        handleError({
            severity: "error",
            summary: "Unexpected Error",
            detail: "An unexpected error occurred. Please try again.",
            life: 3000,
        });

        return Promise.reject(error);
    }
);

connection.setErrorHandler = (callback) => {
    connection._handleError = callback;
};

export default connection;
