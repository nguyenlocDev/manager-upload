/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "./configURL";
import { CheckAuthen } from "./loginService";

export const LeaderBoardServices = {
  LeaderBoard: (campaign_id: string, race_type: string, race_id: string) => {
    CheckAuthen();
    return axiosInstance.get(
      `/campaign/leaderboard?campaign_id=${campaign_id}&race_type=${race_type}&race_id=${race_id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
  LeaderBoardRevive: (
    campaign_id: string,
    race_type: string,
    race_id: string
  ) => {
    CheckAuthen();
    return axiosInstance.get(
      `/v1/campaign/revive/leaderboard?campaign_id=${campaign_id}&race_type=${race_type}&race_id=${race_id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
  LeaderBoardResult: (
    campaign_id: string,
    race_type: string,
    race_id: string
  ) => {
    CheckAuthen();
    return axiosInstance.get(
      `/campaign/leaderboard/result?campaign_id=${campaign_id}&race_type=${race_type}&race_id=${race_id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },

  ReviveGetListWin: (page: number, limit: number, campaign_id: string) => {
    CheckAuthen();
    return axiosInstance.get(
      `/v1/campaign/revive/leaderboard/winners?page=${page}&limit=${limit}&campaign_id=${campaign_id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
  ReviveGetListReward: (loyalty_id: string) => {
    CheckAuthen();
    return axiosInstance.get(
      `/v1/campaign/loyalty/rewards?loyalty_id=${loyalty_id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
  ReviveHistoryShop: () => {
    CheckAuthen();
    return axiosInstance.get(`/v1/campaign/revive/consumer/point`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  ReviveHistoryDetailsShop: (id: string) => {
    CheckAuthen();
    return axiosInstance.get(
      `/v1/campaign/revive/consumer/history/point/detail?history_id=${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
  ReviveDetailsAPI: (loyalty_id: string) => {
    CheckAuthen();
    return axiosInstance.get(
      `/v1/campaign/loyalty/info?loyalty_id=${loyalty_id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
  RevivePushStatusAPI: () => {
    CheckAuthen();
    return axiosInstance.post(
      `/v1/campaign/consumer/loyalty/point_status`,
      {
        params: {},
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
  ReviveSubmitAPI: (data: any) => {
    CheckAuthen();
    return axiosInstance.post(
      `/v1/campaign/revive/collection/submit`,
      { params: data },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
};
