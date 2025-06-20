/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Account } from "@/types/account";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import uuid from "react-uuid";
import { Camera, CloudHail } from "lucide-react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useState } from "react";
import { getToken, submitReceiptApi, uploadFile } from "@/api/loyalty-api";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { CheckAuthen, LoginServices } from "@/services/apiService/loginService";
import { setAuthorization } from "@/services/apiService/configURL";
import { apiNodeJS, URL_API_UPLOAD_GCS } from "@/services/api/apiNode";
import { homeServices } from "@/services/apiService/homeService";

interface UploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  account: Account | null;
}

export function UploadDialog({
  open,
  onOpenChange,
  account,
}: UploadDialogProps) {
  const { toast } = useToast();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [file, setFile] = useState<File | null>(null);

  //upload invoice
  const uploadInvoiceAndSubmit = async () => {
    try {
      const formDataGCS = new FormData();
      formDataGCS.append("file", file as Blob);
      const fileName =
        uuid() +
        "_" +
        format(new Date(), "dd-MM-yyyy-HH-mm-ss") +
        "_" +
        uuid() +
        ".jpg";
      formDataGCS.append("fileName", fileName);
      formDataGCS.append(
        "ocrBase",
        "http://ec2-13-250-133-136.ap-southeast-1.compute.amazonaws.com/api/ocr/scan?sm=auto&pb=spvb"
      );
      const dataUpload = await apiNodeJS.postUploadToNode(
        URL_API_UPLOAD_GCS,
        formDataGCS
      );
      console.log(">>> dataUpload", dataUpload);
      const tokenUpload = await handleRecaptchaExecution("form_submit");

      const params = {
        ocr_result: `{}`,
        ocr_endpoint:
          "http://ec2-13-250-133-136.ap-southeast-1.compute.amazonaws.com/api/ocr/scan?sm=auto&pb=spvb",
        gsutil_url: dataUpload?.gsutil_url,
        public_url: dataUpload?.public_url,
        ocr_method: "api_v2",
        request_id: uuid() + "-" + format(new Date(), "ddMMyyyyHHmmss"),
        receipt_datetime: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        recaptcha_token_response: tokenUpload,
      };

      const submitResponse = await homeServices.submitReceiptApi(params);
      console.log(submitResponse);
      toast({
        title: "Uploading Invoice",
        description: "Hóa đơn đã được tải lên thành công",
        variant: "success",
      });
    } catch (error) {
      throw new Error("Error uploading invoice: " + error);
    }
  };

  //exe capcaha
  const handleRecaptchaExecution = async (action: string) => {
    if (!executeRecaptcha) {
      console.error("Execute recaptcha is not yet available");
      return null;
    }
    return await executeRecaptcha(action);
  };

  function addOrUpdateUserByPhone(newData: any) {
    const key = "users"; // tên key trong localStorage
    let users = [];

    // Lấy và parse mảng từ localStorage
    const storedData = localStorage.getItem(key);
    if (storedData) {
      try {
        users = JSON.parse(storedData);
      } catch (e) {
        console.error("Lỗi JSON:", e);
        users = [];
      }
    }

    // Kiểm tra xem phone đã tồn tại chưa
    const index = users.findIndex((user: any) => user.phone === newData.phone);

    if (index !== -1) {
      // Nếu tồn tại: cập nhật user
      users[index] = newData;
    } else {
      // Nếu chưa tồn tại: thêm mới
      users.push(newData);
    }

    // Lưu lại vào localStorage
    localStorage.setItem(key, JSON.stringify(users));
  }

  function findPhoneInLocalStorage(phone: string) {
    // Lấy dữ liệu từ localStorage
    const data = localStorage.getItem("users");

    if (!data) {
      console.warn("Không có dữ liệu trong localStorage.");
      return null;
    }

    try {
      const users = JSON.parse(data);

      // Tìm user có số điện thoại khớp
      const found = users.find((user: any) => user.phone === phone);

      return found || null;
    } catch (e) {
      console.error("Lỗi khi phân tích JSON từ localStorage:", e);
      return null;
    }
  }

  const addAuthorization = async (token: string) => {
    try {
      const tokenUsers = await LoginServices.LoginApi({
        login: account?.phone as string,
        password: "Vn123456",
        recaptcha_token_response: token,
      });
      addOrUpdateUserByPhone({
        phone: account?.phone as string,
        token: tokenUsers.data.token,
      });
      setAuthorization(tokenUsers.data.token);
      toast({
        title: "login success",
        description: "Đăng nhập thành công tài khoản ",
        variant: "success",
      });
    } catch (error) {
      throw new Error("Khong dang nhap duoc tai khoan");
    }
  };

  const handleSubmit = async () => {
    //get token recaptcha
    const token = await handleRecaptchaExecution("form_submit");

    if (token) {
      const dataUsers = findPhoneInLocalStorage(account?.phone as string);
      if (!dataUsers) {
        //gettoken and add user
        await addAuthorization(token);
      }
      try {
        const dataUsers = findPhoneInLocalStorage(account?.phone as string);
        setAuthorization(dataUsers?.token || "");
        try {
          const ctk: any = await CheckAuthen();
          if (ctk.meta.status_code !== 200) {
            throw new Error();
          }
        } catch (error) {
          toast({
            title: "Check Authen",
            description: "Không thể xác thực tài khoản",
            variant: "destructive",
          });
          await addAuthorization(token);
        }
        await uploadInvoiceAndSubmit();
      } catch (error) {
        toast({
          title: "Uploading Invoice",
          description: error + "Đã xảy ra lỗi khi tải lên hóa đơn",
          variant: "destructive",
        });
      }
    } else {
      console.warn("Không lấy được reCAPTCHA token");
    }
  };
  const handleUploadInvoice = async () => {
    handleSubmit();
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Chụp hóa đơn</DialogTitle>
          <DialogDescription>
            {account ? `Tài khoản: ${account.name} (${account.phone})` : ""}
          </DialogDescription>
        </DialogHeader>
        <div className="border-2 border-dashed rounded-xl border-gray-200 flex flex-col items-center justify-center space-y-4 py-4 relative">
          <input
            type="file"
            accept="image/*"
            name="img"
            id="img"
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              if (target.files && target.files.length > 0) {
                setFile(target.files[0]);
              } else {
                setFile(null);
              }
            }}
            className="absolute w-[100px] h-[100px] z-10 opacity-0 cursor-pointer"
          />
          <Camera className="h-16 w-16 text-muted-foreground" />
          <p className="text-center text-sm text-muted-foreground">
            {file
              ? file.name + " --> đã được chọn"
              : "Nhấn vào đây để chụp hóa đơn hoặc tải lên từ thiết bị của bạn"}
          </p>
        </div>
        <Button onClick={handleUploadInvoice}>Chụp hóa đơn</Button>
      </DialogContent>
    </Dialog>
  );
}
