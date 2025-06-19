/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "./configURL";

export const LoginServices = {
  LoginApi: (data: { phone: string; password: string; token: string }) => {
    return axiosInstance.post("/consumer/login", {
      params: data,
    });
  },
  ValidateOTPPassword: (data: any) => {
    return axiosInstance.post("/consumer/forgot_password/otp", {
      params: data,
    });
  },
  ValidateOTPRegister: (data: any) => {
    return axiosInstance.post("/v1/consumer/register/validate_otp", {
      params: data,
    });
  },
  ValidateAPI: (data: any) => {
    return axiosInstance.post("v1/consumer/register/validate_phone", {
      params: data,
    });
  },
  CheckAuthenExpired: () => {
    return axiosInstance.post("/campaign/check_authen", {
      params: {},
    });
  },
};

export const CheckAuthen = () => {
  LoginServices.CheckAuthenExpired()
    .then((res) => {
      console.log("CheckAuthen", res.data);
    })
    .catch((err) => {
      console.log("CheckAuthen", err);
    });
};
