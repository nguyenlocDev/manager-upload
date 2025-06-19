/* eslint-disable @typescript-eslint/no-explicit-any */
//get-token
import axios from "axios";

export const getToken = async (
  phone: string,
  recaptcha_token_response: string
) => {
  try {
    const res = await axios.post("https://qtlytps.mvctech.vn/consumer/login", {
      params: {
        password: "Vn123456",
        recaptcha_token_response,
        login: phone,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

//upload
export const uploadFile = async (formDataGCS: any) => {
  const config = {
    method: "POST",
    url: "https://mrcupload.mvctech.vn/apinode/upload",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formDataGCS,
  };
  return await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const submitReceiptApi = async (data: any, token: string) => {
  try {
    const response = await axios.post(
      "https://api.loyaltytool.site/qtlytps/campaign/submit_receipt",
      {
        params: data,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to submit receipt: " + error);
  }
};

//get list invoice

//list of prizes

//push
