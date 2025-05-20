import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "@/components/Header";
import BootstrapClient from "@/components/BootstrapClient";
// Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css';
import Footer from "@/components/Footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CoachSparkle",
  description: "Coach app",
  // icons: {
  //   icon: [
  //     { url: "/favicon.ico", sizes: "any" },
  //     { url: "/favicon.svg", type: "image/svg+xml" },
  //   ],
  // }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <BootstrapClient />
        <Header />
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
