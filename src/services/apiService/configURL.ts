import axios, { AxiosError, type AxiosRequestConfig } from "axios";

const headers: AxiosRequestConfig["headers"] = {
  "Content-Type": "application/json",
};
export const axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_ENDPOINT,
  baseURL: "https://api.loyaltytool.site/qtlytps",
  headers,
});

export const setAuthorization = (token: string) => {
  axiosInstance.defaults.headers.Authorization = "Bearer " + token;
};
export const setAuthorizationSessionToken = (token: string) => {
  axiosInstance.defaults.headers["X-Session-Token"] = token;
};
axiosInstance.interceptors.response.use(
  function (response) {
    if (response.data?.meta?.status) {
      return response.data;
    } else {
      //logic
      return Promise.reject(response.data?.meta?.message);
    }
  },
  function (error: AxiosError) {
    console.log(error);
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      case 404:
        message = "Sorry! the data you are looking for could not be found";
        break;
      case 400:
        message = "Access token invalid";
        break;
      default:
        message = error.message || error;
    }
    return Promise.reject(message);
  }
);
