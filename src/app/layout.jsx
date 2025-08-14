import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import BootstrapClient from "@/components/BootstrapClient";
import { Inter, Roboto } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "react-phone-input-2/lib/style.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});
export const metadata = {
  title: "CoachSparkle",
  description: "Coach app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${roboto.variable}`}>
        <BootstrapClient />
        <ToastContainer position="bottom-right" autoClose={3000} />
        {children}
      </body>
    </html>
  );
}
