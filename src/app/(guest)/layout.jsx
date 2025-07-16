'use client';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MuiClientProvider from "@/components/MuiClientProvider";
import '@/components/_styles/breadcrumb.css';


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