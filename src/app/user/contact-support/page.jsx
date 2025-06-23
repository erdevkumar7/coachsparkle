"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../_styles/dashboard.css";
import "../_styles/profile.css";
import "../_styles/account.css";
import "../_styles/contactsupport.css";

export default function Contactsupport() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");

        if (!token) {
            router.push("/login");
        }

        if (token && userData) {
            setIsLoggedIn(true);
            setUser(JSON.parse(userData));
        } else {
            setIsLoggedIn(false);
            setUser(null);
        }
    }, []);

    return (
        <div className="main-panel">
            <div className="content-wrapper">
                <div className="profile-form-add account-information contact-support-form">
                    <div className="card">
                        <h3 className="text-your-name">Contact Support</h3>
                        <div className="profile-form account-information-form contact-support-add-form">
                            <form>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="firstName">First Name</label>
                                        <input type="text" id="firstName" placeholder="Emma" name="firstName" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" id="email" placeholder="Enter your email" name="email" className="form-control" required />
                                    </div>


                                </div>


                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
