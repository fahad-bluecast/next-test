"use client";
import Navbar from "@/components/common/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-8 bg-blue-50 h-full">
      <Navbar />
      <div className="p-3 mt-22">{children}</div>
    </div>
  );
}
