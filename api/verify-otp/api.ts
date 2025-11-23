import { axiosInstance } from "@/service/axios";
import { AxiosError } from "axios";

export const verifyOtpApi = async (phoneNumber: string, otp: string) => {
  try {
    const formData = new FormData();
    formData.append("mobile", phoneNumber);
    formData.append("otp", otp);

    const response = await axiosInstance.post(`auth/verify-otp`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data || error;
    }
    throw error;
  }
};
