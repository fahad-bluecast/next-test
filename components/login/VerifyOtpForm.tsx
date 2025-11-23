import { UseVerifyOtp } from "@/api/verify-otp/hook";
import { SetStateAction, useState } from "react";
import { FloatingLabelInput } from "../ui/FloatingInput";
interface LoginForm {
  otp: string;
  setOtp: React.Dispatch<SetStateAction<string>>;
  error: string;
  setError: React.Dispatch<SetStateAction<string>>;
  Phone: string;
}
const VerifyOtpForm = ({ error, otp, setError, setOtp, Phone }: LoginForm) => {
  const handleOtpChange = (value: string) => {
    setOtp(value);

    if (value.length > 0 && value.length < 6) {
      setError("OTP must be 6 digits");
    } else {
      setError("");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl md:text-3xl font-semibold text-[#1C3141]">
        Enter the code we texted you
      </h2>
      <p className="text-base">We’ve sent an SMS to {Phone}</p>

      {/* Phone Input */}
      <div className="">
        <FloatingLabelInput
          id="otp"
          label="Enter OTP"
          error={error}
          onChange={handleOtpChange}
          value={otp}
        />
      </div>

      <p className="text-gray-400 text-xs ">
        Your 6 digit code is on its way. This can sometimes take a few moments
        to arrive.
      </p>
      <p className="text-sm hover:underline font-semibold">Resend Code</p>
    </div>
  );
};

export default VerifyOtpForm;
