/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckAuthen } from "./loginService";
import { axiosInstance } from "./configURL";

export const ListReceiptServices = {
  ReceiptCustomerGift: (campaign_id: string) => {
    return axiosInstance.get(`/campaign/gift?campaign_id=${campaign_id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  GetListTicket: (campaign_id: string) => {
    return axiosInstance.get(
      `/v1/campaign/e_ticket/list?campaign_id=${campaign_id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
  GetPeriodicGift: (periodic_id: string) => {
    CheckAuthen();
    return axiosInstance.get(
      `/campaign/periodic/gift?periodic_id=${periodic_id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
  GetPeriodicWin: (periodic_id: string) => {
    CheckAuthen();
    return axiosInstance.get(
      `/campaign/periodic/winning?periodic_id=${periodic_id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
  ReceiptCustomerPrize: (prize: number, campaign_id: string, limit: number) => {
    return axiosInstance.get(
      `/campaign/winning?campaign_id=${campaign_id}&page=${prize}&limit=${limit}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
  GetListExchangeGift: (
    reward_type: string,
    page: number,
    limit: number,
    order_by: string,
    level_id: number
  ) => {
    return axiosInstance.get(
      `/exchange/gift?reward_type=${reward_type}&page=${page}&limit=${limit}&order_by=${order_by}&level_id=${level_id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
  GetDetailsExchangeGift: (id: string) => {
    return axiosInstance.get(`/exchange/gift/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  GetDetailsExchangeSweat: (id: string) => {
    return axiosInstance.get(`/v1/campaign/revive/exchange/gift/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  PostExchangeSweat: (data: string, token_captcha: string) => {
    return axiosInstance.post(
      `/v1/campaign/revive/exchange/gift`,
      {
        params: {
          reward_id: data,
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
  PostExchangeGift: (data: string, token_captcha: string) => {
    return axiosInstance.post(
      `/exchange/gift`,
      {
        params: {
          reward_id: data,
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
  GetListHistory: (data: any) => {
    CheckAuthen();
    return axiosInstance.get(
      `/campaign/consumer/history?page=${data.page}&limit=${data.limit}&start_date=${data.start_date}&end_date=${data.end_date}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
  GetPepcoinHistory: (data: any) => {
    return axiosInstance.get(
      `/campaign/consumer/point?page=${data.page}&limit=${data.limit}&start_date=${data.start_date}&end_date=${data.end_date}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
  GetDetailPepcoinHistory: (id: number) => {
    return axiosInstance.get(`/campaign/consumer/point/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  GetDetailHistory: (id: number) => {
    return axiosInstance.get(`/campaign/consumer/history/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  GetCodes: (data: any) => {
    return axiosInstance.get(
      `/campaign/consumer/code?page=${data.page}&limit=${data.limit}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
  UpdateStatusGift: () => {
    return axiosInstance.post(`/campaign/consumer/gift_status`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  GetListMyGift: (data: any) => {
    CheckAuthen();
    return axiosInstance.get(
      `/campaign/consumer/prize?page=${data.page}&limit=${data.limit}&reward_type=${data.reward_type}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
  GetDetailsGift: (data: any) => {
    return axiosInstance.get(
      `/campaign/consumer/prize/detail?${data.type_id}=${data.id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
  GetCampaignChanelGift: (id: number | string) => {
    return axiosInstance.get(`/campaign/channel?channel_id=${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  GetCampaignBrandGift: (id: number | string) => {
    return axiosInstance.get(`/campaign/brand?category_id=${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
