import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MuiClientProvider from "@/components/MuiClientProvider";
import '@/components/_styles/breadcrumb.css';
import { HandleValidateTokenOnServer } from "../api/user";
import { redirect } from "next/navigation";


export default async function GuestLayout({ children }) {
    const tokenData = await HandleValidateTokenOnServer();
    let user;
    if (tokenData) {
        user = tokenData?.data;
        // if (user.user_type == 3) {
        //     return redirect('/coach/dashboard');
        // }
    }
    return (
        <div>
            {/* hide MuiClientProvider for hydration error we can add if we have isssue on MUI Components */}
            {/* <MuiClientProvider> */}
            <Header user={user} />
            <main>{children}</main>
            <Footer />
            {/* </MuiClientProvider> */}
        </div>
    );
}