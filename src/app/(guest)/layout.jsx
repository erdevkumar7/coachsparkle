'use client';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MuiClientProvider from "@/components/MuiClientProvider";


export default function GuestLayout({ children }) {
    return (
        <div>
            <MuiClientProvider>
                <Header />
                <main>{children}</main>
                <Footer />
            </MuiClientProvider>
        </div>
    );
}