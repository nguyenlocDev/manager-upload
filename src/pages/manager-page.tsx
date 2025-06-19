/* eslint-disable @typescript-eslint/no-explicit-any */
import { AccountTable } from "@/models/manager/account-table";
import { GameServices } from "@/services/apiService/gameService";
import { LoginServices } from "@/services/apiService/loginService";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const ManagerPage = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const Handlegetcapcha = async () => {
    const token = await handleRecaptchaExecution("form_submit");
    const data = {
      phone: "0355014946",
      recaptcha_token_response: token,
    };
    return LoginServices.ValidateOTPPassword(data);
  };
  const handleRecaptchaExecution = async (action: string) => {
    if (!executeRecaptcha) {
      console.error("Execute recaptcha is not yet available");
      return null;
    }
    return await executeRecaptcha(action);
  };
  return (
    <div>
      <div className="text-xl font-semibold mb-3">
        <button onClick={Handlegetcapcha}>get ssss</button>

        <button
          onClick={async () => {
            // const token = await handleRecaptchaExecution("form_submit");
            // const countDraw = async (
            //   sale_id: number,
            //   campaign_id: number,
            //   lineId: number
            // ) => {
            //   const data = {
            //     sale_id: sale_id,
            //     campaign_id: campaign_id.toString(),
            //     line_id: lineId,
            //   };
            //   GameServices.CountSummerDrawApi(data);
            // };
            const sendSms = async (sale_id: number, campaign_id: number) => {
              const data = {
                sale_id: sale_id,
                campaign_id: campaign_id.toString(),
              };
              GameServices.SendGiftApi(data)
                .then((res: any) => {
                  console.log(res);
                })
                .catch((err) => {
                  console.log(err);
                });
            };
            sendSms(176023, 29);
            // countDraw(176023,29,)
          }}
        >
          get aaa
        </button>
        <h1>Quản Lý Tài Khoản</h1>
      </div>
      <AccountTable></AccountTable>
    </div>
  );
};

export default ManagerPage;
