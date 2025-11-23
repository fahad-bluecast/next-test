import { axiosInstance } from "@/service/axios";
import { AxiosError } from "axios";

export const UserLogin = async (phoneNumber: string) => {
  try {
    const formData = new FormData();
    formData.append("mobile", phoneNumber);

    const response = await axiosInstance.post(`auth/send-otp`, formData, {
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
