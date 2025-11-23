"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { verifyOtpApi } from "./api";
import { toast } from "sonner";
import { Response } from "@/interface/Error/CustomError";
import { SetStateAction } from "react";
import { LocalStorage } from "@/utility/localstorage";

export const UseVerifyOtp = (
  setValue: React.Dispatch<SetStateAction<string>>,
  setPhoneNumber?: (phone: string) => void
) => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: { phoneNumber: string; otp: string }) => {
      return await verifyOtpApi(data.phoneNumber, data.otp);
    },

    onSuccess: (
      data: Response,
      variables: { phoneNumber: string; otp: string }
    ) => {
      if (data.success) {
        setValue("");
        // Store phone number in context
        if (setPhoneNumber) {
          setPhoneNumber(variables.phoneNumber);
        }
        toast.success(data.message);
        if (data.access_token && data.refresh_token && data.login) {
          LocalStorage.setItem("accessToken", data.access_token);
          LocalStorage.setItem("refreshToken", data.refresh_token);
          router.push("/questionnaire/start");
        } else {
          router.push("/auth/profile");
        }
      } else {
        toast.error(data.message);
      }
    },
    onError: (error: Response) => {
      const errorData = error.message;
      toast.error(errorData);
    },
  });
};
