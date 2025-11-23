import { UseLogin } from "@/api/login/hook";
import { UseVerifyOtp } from "@/api/verify-otp/hook";
import { useState } from "react";
import LeftSideImage from "../common/LeftSideImage";
import { LoadingButton } from "../ui/LoadinButton";
import LoginForm from "./LoginForm";
import VerifyOtpForm from "./VerifyOtpForm";
import { usePhone } from "@/contexts/PhoneContext";

export default function Login() {
  const [isSendOtp, setIsSendOtp] = useState(false);
  const [data, setdata] = useState({
    phone: "",
    otp: "",
  });
  const [value, setvalue] = useState("");
  const [error, setError] = useState("");
  const { setPhoneNumber } = usePhone();
  const { mutate: VerifyOtp, isPending: OtpVerifyPending } = UseVerifyOtp(
    setvalue,
    setPhoneNumber
  );
  const { mutate: LoginUser, isPending: LoginPending } = UseLogin(
    data,
    setdata,
    setIsSendOtp,
    setvalue
  );

  const handleSubmit = (value: string, type: "phone" | "otp") => {
    if (type === "phone") {
      if (value) {
        setError("");
        LoginUser(value);
      } else {
        setError("Phone number is required");
      }
    } else if (type === "otp") {
      if (value) {
        setError("");
        VerifyOtp({ phoneNumber: data.phone, otp: value });
      } else {
        setError("OTP is required");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-3 sm:p-4 md:p-6">
      <div className="bg-slate-800 rounded-xl sm:rounded-2xl overflow-hidden flex flex-col md:flex-row w-full max-w-sm sm:max-w-md md:max-w-3xl lg:max-w-4xl shadow-2xl md:h-[500px] lg:h-[550px]">
        {/* Left Section - Image (Hidden on mobile) */}
        <div className="hidden md:block md:w-1/2 lg:w-[45%]">
          <LeftSideImage />
        </div>

        {/* Right Section - Form */}
        <div className="w-full md:w-1/2 lg:w-[55%] p-3 sm:p-4 md:p-3">
          <div className="bg-white h-full rounded-lg sm:rounded-xl px-4 sm:px-6 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10 flex flex-col justify-between">
            {/* Form Content */}
            <div className="flex-1 flex flex-col justify-center">
              {isSendOtp ? (
                <VerifyOtpForm
                  error={error}
                  otp={value}
                  setError={setError}
                  setOtp={setvalue}
                  Phone={data.phone}
                />
              ) : (
                <LoginForm
                  error={error}
                  phone={value}
                  setError={setError}
                  setPhone={setvalue}
                />
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-4 sm:mt-6">
              <LoadingButton
                loading={LoginPending || OtpVerifyPending}
                onClick={() => handleSubmit(value, isSendOtp ? "otp" : "phone")}
                className="w-full"
              >
                Get Started
              </LoadingButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
