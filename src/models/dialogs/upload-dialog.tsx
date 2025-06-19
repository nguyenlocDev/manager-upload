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
import { Camera } from "lucide-react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useState } from "react";
import { getToken, submitReceiptApi, uploadFile } from "@/api/loyalty-api";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { data } from "react-router-dom";

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

  //upload
  const uploadInvoice = async (
    imageFile: File,
    token_captcha: string,
    token: string
  ) => {
    const formDataGCS = new FormData();
    formDataGCS.append("file", imageFile);
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

    try {
      const res = await uploadFile(formDataGCS);
      console.log(res);
      const params = {
        ocr_result: `{}`,
        ocr_endpoint:
          "http://ec2-13-250-133-136.ap-southeast-1.compute.amazonaws.com/api/ocr/scan?sm=auto&pb=spvb",
        gsutil_url: res?.gsutil_url,
        public_url: res?.public_url,
        ocr_method: "api_v2",
        request_id: uuid() + "-" + format(new Date(), "ddMMyyyyHHmmss"),
        receipt_datetime: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        recaptcha_token_response: token_captcha,
      };
      try {
        const res = await submitReceiptApi(params, token);

        if (
          res.meta.status_code === 404 ||
          res.meta.status_code === 403 ||
          res.meta.status_code === 200 ||
          res.meta.status_code === 400
        ) {
          toast({
            title: "Uploading Invoice",
            description: "Hóa đơn đã được tải lên thành công",
            variant: "success",
          });
        } else {
          throw new Error("Không tải được hóa đơn lên");
        }
      } catch (error) {
        toast({
          title: "Uploading Invoice",
          description:
            error instanceof Error
              ? error.message
              : "Đã xảy ra lỗi khi tải lên hóa đơn",
          variant: "destructive",
        });
        const token = await handleRecaptchaExecution("form_submit");
        const data = await getToken(account?.phone as string, token as string);
        if (data && data.data.token) {
          addOrUpdateUserByPhone({
            phone: account?.phone as string,
            token: data.data.token,
          });
        } else {
          throw new Error("Không lấy được token từ API");
        }
      }
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Lỗi không xác định"
      );
    }
  };
  const handleRecaptchaExecution = async (action: string) => {
    if (!executeRecaptcha) {
      console.error("Execute recaptcha is not yet available");
      return null;
    }
    return await executeRecaptcha(action);
  };
  function addOrUpdateUserByPhone(newUser: { phone: string; token: string }) {
    const usersData = localStorage.getItem("users");
    const users = usersData ? JSON.parse(usersData) : [];

    const index = users.findIndex((user: any) => user.phone === newUser.phone);

    if (index !== -1) {
      // Nếu tồn tại, cập nhật lại thông tin
      users[index] = { ...users[index], ...newUser };
      console.log("Đã cập nhật user với số điện thoại:", newUser.phone);
    } else {
      users.push(newUser);
      console.log("Đã thêm mới user với số điện thoại:", newUser.phone);
    }

    // Lưu lại vào localStorage
    localStorage.setItem("users", JSON.stringify(users));
  }

  function findUsersWithSamePhone(phone: string) {
    const userData = localStorage.getItem("users");
    const user = userData ? JSON.parse(userData) : null;
    if (!Array.isArray(user)) {
      console.error("Tham số đầu tiên phải là mảng JSON.");
      return [];
    }

    return user.filter((item) => item.phone === phone);
  }

  const handleSubmit = async () => {
    const token = await handleRecaptchaExecution("form_submit");
    if (token) {
      const dataUsers = findUsersWithSamePhone(account?.phone as string);
      console.log(dataUsers);
      try {
        if (dataUsers.length > 0) {
          console.log(">>> chay vao day");
          uploadInvoice(file as File, token, dataUsers[0].token);
        } else {
          const data = await getToken(
            account?.phone as string,
            token as string
          );
          if (data && data.data.token) {
            addOrUpdateUserByPhone({
              phone: account?.phone as string,
              token: data.data.token,
            });
          } else {
            throw new Error("Không lấy được token từ API");
          }
        }
      } catch (error) {
        toast({
          title: "Uploading Invoice",
          description:
            error instanceof Error
              ? error.message
              : "Đã xảy ra lỗi khi tải lên hóa đơn",
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
