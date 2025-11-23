import { useMutation } from "@tanstack/react-query";
import { SetStateAction } from "react";
import { toast } from "sonner";
import { UserLogin } from "./api";

export const UseLogin = (
  value: { phone: string; otp: string },
  setData: React.Dispatch<SetStateAction<{ phone: string; otp: string }>>,
  setIsSendOtp: React.Dispatch<SetStateAction<boolean>>,
  setValue: React.Dispatch<SetStateAction<string>>
) => {
  return useMutation({
    mutationFn: async (phoneNumber: string) => {
      return await UserLogin(phoneNumber);
    },

    onSuccess: (data, phoneNumber) => {
      setValue("");
      setIsSendOtp(true);
      setData({
        ...value,
        phone: phoneNumber,
      });
      toast.success(data.message);
    },
    onError: (error: string) => {
      const errorData: string = error;
      toast.error(errorData);
    },
  });
};
