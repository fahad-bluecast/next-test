import { useMutation } from "@tanstack/react-query";
import { UserLogout } from "./api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LocalStorage } from "@/utility/localstorage";

export const UseLogout = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async () => {
      return await UserLogout();
    },

    onSuccess: () => {
      LocalStorage.clear();
      router.push("/auth/login");
    },
    onError: (error: string) => {
      const errorData: string = error;
      toast.error(errorData);
    },
  });
};
