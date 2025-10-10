"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async () => {
        if (!password || !confirmPassword) {
            toast.error("Please fill all fields");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/reset-password`,
                {
                    token,
                    password,
                    password_confirmation: confirmPassword,
                }
            );

            if (res.data.status) {
                toast.success("Password reset successful! You can now log in.");
                window.location.href = "/login";
            } else {
                toast.error(res.data.message || "Failed to reset password");
            }
        } catch (err) {
            if (err.response?.data?.errors) {
                const errors = err.response.data.errors;
                toast.error(errors.password ? errors.password[0] : "Validation error");
            } else {
                toast.error(err.response?.data?.message || "Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-page-add login-page-form">
            <div className="container-fluid">
                <div className="row signup-page-top login-content-add">
                    <div className="col-md-12 signup-right-side login-right-side">
                        {/* <div className="login-container"> */}
                            <div className="reset-password-container">
                                <h2>Reset Password</h2>
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />

                                <button onClick={handleResetPassword} disabled={loading}>
                                    {loading ? "Resetting..." : "Reset Password"}
                                </button>
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
