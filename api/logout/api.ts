import { axiosInstance } from "@/service/axios";
import { AxiosError } from "axios";

export const UserLogout = async () => {
  try {
    const response = await axiosInstance.post(`auth/logout`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data || error;
    }
    throw error;
  }
};
