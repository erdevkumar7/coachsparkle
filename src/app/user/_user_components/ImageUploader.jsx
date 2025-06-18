'use client';

import { useState } from "react";
import Cookies from "js-cookie";

export default function UserImageUploader ({ image }) {
    const [preview, setPreview] = useState(image);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("profile_image", file);
        formData.append("user_type", 2);

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
                alert("Profile image updated successfully!");
                setPreview(result.profile_image); // update the preview without reloading
            } else {
                alert(result.message || "Failed to upload image.");
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Something went wrong.");
        }
    };

    return (

        <div className="upload-photo-add">
            <img src={preview} alt="profile" />
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