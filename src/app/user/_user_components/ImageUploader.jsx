'use client';

import { useState } from "react";
import Cookies from "js-cookie";
import { FRONTEND_BASE_URL } from "@/utiles/config";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function UserImageUploader ({ image, user_type }) {
    const router = useRouter();
    const [preview, setPreview] = useState(image);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("profile_image", file);
        formData.append("user_type", user_type);

        try {
            const token = Cookies.get("token");
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/updateProfileImage`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const result = await response.json();
            if (result.success) {
                toast.success("Profile image updated successfully!");
                setPreview(result.profile_image); // update the preview without reloading
                router.refresh(); // ✅ forces server components to re-run
            } else {
                toast.error(result.message || "Failed to upload image.");
            }
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Something went wrong.");
        }
    };

    return (

        <div className="upload-photo-add user-upload-pic">
            <img
            src={preview || `${FRONTEND_BASE_URL}/images/default_profile.jpg`}
             alt="profile" />
            <div className="upload-btn">
                <label htmlFor="upload-photo-input" style={{ cursor: "pointer" }}>
                    <i className="bi bi-upload"></i> Upload photo
                </label>
                <input
                    type="file"
                    id="upload-photo-input"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleImageUpload}
                />
            </div>
        </div>

    );
}