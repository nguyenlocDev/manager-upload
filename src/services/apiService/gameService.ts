/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckAuthen } from "./loginService";
import { axiosInstance } from "./configURL";

export const GameServices = {
  GameDetailsApi: (campaign_id: string, token: string) => {
    return axiosInstance.get(`/campaign/info?campaign_id=${campaign_id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  },
  ListRotation: (status: string, page: number, limit: number) => {
    CheckAuthen();
    return axiosInstance.get(
      `/campaign/lucky_draw/list?status=${status}&page=${page}&limit=${limit}`
    );
  },
  validateTime: () => {
    return axiosInstance.get(`/campaign/validate_time`);
  },
  postJigSaw: (data: any) => {
    CheckAuthen();
    return axiosInstance.post(
      `/campaign/jigsaw/merge`,
      {
        params: {
          periodic_id: data,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
  getAllSaleIdSummer: (data: any) => {
    return axiosInstance.get(
      `/campaign/lucky_draw/count_remaining_draw_orders?campaign_id=${data}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
  CalculatorWheelApi: (data: any) => {
    CheckAuthen();
    return axiosInstance.post(
      `/campaign/lucky_draw/calculate`,
      {
        params: data,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
  CountDrawApi: (data: any) => {
    CheckAuthen();
    return axiosInstance.post(
      `/campaign/lucky_draw/count`,
      {
        params: data,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
  CountSummerDrawApi: (data: any) => {
    CheckAuthen();
    return axiosInstance.post(
      `/campaign/lucky_draw/summer/count`,
      {
        params: data,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
  SendSMSSummer: (data: any) => {
    CheckAuthen();
    return axiosInstance.post(
      `/campaign/lucky_draw/summer/send_sms`,
      {
        params: data,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
  SendSMSGameCampaign: (data: any) => {
    CheckAuthen();
    return axiosInstance.post(
      `/campaign/lucky_draw/send_sms`,
      {
        params: data,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
  SendGiftApi: (data: any) => {
    CheckAuthen();
    return axiosInstance.post(
      `/campaign/lucky_draw/send`,
      {
        params: data,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
  GetGamePlantTree: (id: string) => {
    return axiosInstance.get(`/campaign/periodic/info?periodic_id=${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  GetJoinGamePlantTree: (id: string) => {
    CheckAuthen();
    return axiosInstance.post(
      `/campaign/periodic/join`,
      {
        params: {
          periodic_id: id,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
  PostPlayGameDragon: (id: string) => {
    CheckAuthen();
    return axiosInstance.post(
      `/campaign/tower_periodic/play`,
      {
        params: {
          periodic_id: id,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },

  UpdateContinuePlayGameDragon: (id: string, status: boolean) => {
    CheckAuthen();
    return axiosInstance.post(
      `/campaign/tower_periodic/validate`,
      {
        params: {
          periodic_id: id,
          continue_play: status,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
  UpdateUseWater: (id: string) => {
    CheckAuthen();
    return axiosInstance.post(
      `/campaign/periodic/use_exp`,
      {
        params: {
          periodic_id: id,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
  ListQuest: (id: string) => {
    CheckAuthen();
    return axiosInstance.get(`/campaign/periodic/quest?periodic_id=${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  UpdateQuest: (id: string, quest_id: string) => {
    CheckAuthen();
    return axiosInstance.post(
      `/campaign/periodic/doing_quest`,
      {
        params: {
          periodic_id: id,
          quest_id: quest_id,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
  GetLeaderBoard: (id: string, top: string, race_id?: string) => {
    return axiosInstance.get(
      `/campaign/periodic/leaderboard?periodic_id=${id}&top=${top}${
        race_id ? `&race_id=${race_id}` : ``
      } `,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
  GetDataCollection: (id: string) => {
    CheckAuthen();
    return axiosInstance.get(`/campaign/collection/info?collection_id=${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  GetInforAddressUser: (campaign_id: string, sale_id: string) => {
    CheckAuthen();
    return axiosInstance.post(
      `/v1/consumer/shipping/info`,
      {
        params: {
          campaign_id: campaign_id,
          sale_id: sale_id,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
};
