import React, { SetStateAction } from "react";
import { PhoneInputWithCountry } from "../ui/PhoneNumberInput";
import Link from "next/link";
interface LoginForm {
  phone: string;
  setPhone: React.Dispatch<SetStateAction<string>>;
  error: string;
  setError: React.Dispatch<SetStateAction<string>>;
}
const LoginForm = ({ phone, setPhone, error, setError }: LoginForm) => {
  const handlePhoneChange = (phoneNumber: string) => {
    setPhone(phoneNumber);
    if (error && phoneNumber) {
      setError("");
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl md:text-3xl font-semibold text-[#1C3141]">
        Enter your phone number
      </h2>
      <p className="text-base">
        We use your mobile number to identify your account
      </p>

      {/* Phone Input */}
      <div className="">
        <PhoneInputWithCountry
          label="Phone number"
          value={phone}
          onChange={handlePhoneChange}
          error={error}
        />
      </div>

      <p className="text-gray-400 text-xs ">
        By tapping Get started, you agree to the{" "}
        <Link href="#" className="text-gray-700 font-medium hover:underline">
          Terms & Conditions
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
