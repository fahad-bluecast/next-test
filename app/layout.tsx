import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};
export const metadata: Metadata = {
  title: {
    default: "My App | Learn & Practice",
    template: "%s | My App",
  },
  description:
    "A modern platform to learn, practice, and track your progress with seamless user experience.",
  keywords: [
    "online exam",
    "learning platform",
    "practice tests",
    "dashboard",
    "student portal",
  ],
  authors: [{ name: "Muhammed Fahad" }],
  creator: "Muhammed Fahad",
  openGraph: {
    title: "Exam – Learn & Practice",
    description:
      "A simple and user-friendly learning platform with exam, profile, and dashboard features.",
    url: "https://exam.techquest.co.in",
    siteName: "Exam",

    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Exam – Learn & Practice",
    description:
      "A simple and user-friendly learning platform with exam, profile, and dashboard features.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Providers>
          {children}
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}
