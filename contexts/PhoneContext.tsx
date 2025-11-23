"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface PhoneContextType {
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
}

const PhoneContext = createContext<PhoneContextType | undefined>(undefined);

export function PhoneProvider({ children }: { children: ReactNode }) {
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  return (
    <PhoneContext.Provider value={{ phoneNumber, setPhoneNumber }}>
      {children}
    </PhoneContext.Provider>
  );
}

export function usePhone() {
  const context = useContext(PhoneContext);
  if (context === undefined) {
    throw new Error("usePhone must be used within a PhoneProvider");
  }
  return context;
}
