/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
export const URL_API_UPLOAD_GCS =
  "https://api.loyaltytool.site/mcupload" + "/apinode/upload";
export class apiNodeJS {
  static async postUploadToNode(url: string, data: any) {
    const config = {
      method: "POST",
      url: url,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };
    return await axios(config)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.error("Error uploading to Node.js API:", error);
      });
  }
}
