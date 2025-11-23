import { axiosInstance } from "@/service/axios";
import { AxiosError } from "axios";

export interface profilePayload {
  mobile: string;
  name: string;
  email: string;
  qualification: string;
  profile_image: File;
}

export const CreateProfile = async (data: profilePayload) => {
  try {
    const formData = new FormData();
    formData.append("mobile", data.mobile);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("qualification", data.qualification);
    formData.append("profile_image", data.profile_image);

    const response = await axiosInstance.post(`auth/create-profile`, formData, {
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
