"use client";
import { LocalStorage } from "@/utility/localstorage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const token = LocalStorage.getItem("accessToken");
  const router = useRouter();
  useEffect(() => {
    if (token) {
      router.push("/questionnaire/start");
    } else {
      router.push("/auth/login");
    }
  }, [token]);
  return <></>;
}
