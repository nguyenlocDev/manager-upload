/* eslint-disable @typescript-eslint/no-explicit-any */
import { type AxiosResponse } from "axios";
import { axiosInstance } from "./configURL";
import { CheckAuthen } from "./loginService";
interface CampaignData {
  points: number; // adjust this based on your actual data
  // other properties
}
export const homeServices = {
  homeApi: (): Promise<AxiosResponse<CampaignData>> => {
    return axiosInstance.get<CampaignData>("/campaign/home");
  },
  ocrEndPointApi: (data: any) => {
    CheckAuthen();
    return axiosInstance.get(`/campaign/ocr_method?campaign_id=${data}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  submitReceiptApi: (data: any) => {
    CheckAuthen();
    return axiosInstance.post(
      "/campaign/submit_receipt",
      { params: data },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
  RecallSubmitReceiptApi: (
    sale_id: string,
    lastCall: boolean,
    token_captcha: string
  ) => {
    CheckAuthen();
    return axiosInstance.post(
      "/campaign/submit_receipt/recall",
      {
        params: {
          sale_id: sale_id,
          last_call: lastCall,
          recaptcha_token_response: token_captcha,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
  PushReviewReceiptApi: (sale_id: string, recaptcha_token_response: string) => {
    CheckAuthen();
    return axiosInstance.post(
      "/campaign/submit_receipt/push_approve",
      {
        params: {
          sale_id: sale_id,
          recaptcha_token_response: recaptcha_token_response,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
  customerConfirmApi: (data: any) => {
    CheckAuthen();
    return axiosInstance.post(
      "/campaign/consumer_confirm",
      { params: data },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
  GetNews: () => {
    return axiosInstance.get(`/campaign/news`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  GetNewsDetails: (id: string) => {
    return axiosInstance.get(`/campaign/news/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  GetProfile: () => {
    CheckAuthen();
    return axiosInstance.get(`/consumer/profile`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  customerConfirmInformationApi: (data: any) => {
    CheckAuthen();
    return axiosInstance.post(
      "/v1/campaign/confirm/gift/submit",
      { params: data },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },

  verifyOTPWaterRun: (data: any) => {
    CheckAuthen();
    return axiosInstance.post(
      "/v1/campaign/otp/verify",
      { params: data },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
  resendOTPWaterRun: (data: any) => {
    CheckAuthen();
    return axiosInstance.post(
      "/v1/campaign/otp/resend",
      { params: data },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
};
