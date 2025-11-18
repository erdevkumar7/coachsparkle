"use client";

import { useState } from "react";

export default function GoogleAuthButton({ role, text = "Continue with Google", className = "" }) {
    const [loading, setLoading] = useState(false);

    const handleGoogleLogin = () => {
        setLoading(true);

        const userType = role === 3 ? "coach" : "user";
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google/redirect?user_type=${userType}`;
    };

    return (
        <button
            type="button"
            className={className}
            onClick={handleGoogleLogin}
            disabled={loading}
        >
            <img src="./images/google.png" alt="google" />
            {loading ? "Redirecting..." : text}
        </button>
    );
}
