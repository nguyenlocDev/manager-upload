/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import FormData from "form-data";

export const uploadImageInvoice = async (file: any) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "loyalty");

  const config = {
    method: "POST",
    url: "https://api.cloudinary.com/v1_1/dvtaewzyd/image/upload",
    data: data,
  };

  axios
    .request(config)
    .then((response) => console.log(response.data.secure_url))
    .catch((error) => console.log("error", error));
};
