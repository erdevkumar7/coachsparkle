import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import BootstrapClient from "@/components/BootstrapClient";
import Footer from "@/components/Footer";
import { Inter, Roboto } from "next/font/google";

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
        {children}      
      </body>
    </html>
  );
}
