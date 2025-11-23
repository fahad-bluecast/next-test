import { useRouter } from "next/navigation";
import { CreateProfile, profilePayload } from "./api";
import { useMutation } from "@tanstack/react-query";
import { Response } from "@/interface/Error/CustomError";
import { toast } from "sonner";
import { LocalStorage } from "@/utility/localstorage";

export const useAddProfileData = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: profilePayload) => {
      return await CreateProfile(data);
    },
    onSuccess: (data: Response) => {
      if (data.success) {
        toast.success(data.message);
        if (data.access_token && data.refresh_token) {
          LocalStorage.setItem("accessToken", data.access_token);
          LocalStorage.setItem("refreshToken", data.refresh_token);
        }
        router.push("/questionnaire/start");
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
