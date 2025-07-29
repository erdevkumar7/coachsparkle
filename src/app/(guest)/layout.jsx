import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MuiClientProvider from "@/components/MuiClientProvider";
import '@/components/_styles/breadcrumb.css';
import { HandleValidateTokenOnServer } from "../api/user";


export default async function GuestLayout({ children }) {
    const tokenData = await HandleValidateTokenOnServer();
    let user;
    if (tokenData) {
        user = tokenData?.data
    }
    return (
        <div>
            <MuiClientProvider>
                <Header user={user}/>
                <main>{children}</main>
                <Footer />
            </MuiClientProvider>
        </div>
    );
}