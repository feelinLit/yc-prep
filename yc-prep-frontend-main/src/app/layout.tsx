import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {AuthProvider} from "@/utils/auth/authProvider";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "YC Prep",
  description:
    "YC Prep helps founders prepare and pass the Y Combinator interview.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient-to-r from-gray-800 to-gray-900 text-white`}
      >
      <AuthProvider>
        {children}
      </AuthProvider>
      </body>
    </html>
  );
}
