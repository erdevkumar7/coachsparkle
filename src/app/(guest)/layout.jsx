import Footer from "@/components/Footer";
import Header from "@/components/Header";


export default function GuestLayout({ children }) {
    return (
        <div>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
}