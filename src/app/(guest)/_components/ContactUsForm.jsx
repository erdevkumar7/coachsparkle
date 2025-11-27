"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ContactUsForm() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        subject: "General",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [successMsg, setSuccessMsg] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        setSuccessMsg("");

        try {
            const response = await axios.post(
                `${apiUrl}/contact-message`,
                formData
            );

            if (response.data.status) {
                toast.success("Message sent successfully!");
                setFormData({
                    first_name: "",
                    last_name: "",
                    email: "",
                    phone_number: "",
                    subject: "General",
                    message: "",
                });
            }
         } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors);
                // toast.error("Please fix the highlighted errors.");
            } else {
                toast.error("Something went wrong!");
            }
        }

        setLoading(false);
    };

    return (
        <>
            <h3 className="sena-msg-add">
                <img src="/coachsparkle/images/send-icon.png" alt="send-img" />
                Send Us A Message
            </h3>

            {successMsg && <p className="success-message">{successMsg}</p>}

            <form className="contact-form-add" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div>
                        <label>First name:</label>
                        <input
                            type="text"
                            name="first_name"
                            placeholder="Enter your first name"
                            value={formData.first_name}
                            onChange={handleChange}
                        />
                        {errors.first_name && <p style={{ color: "red", fontSize: "14px" }}>{errors.first_name[0]}</p>}
                    </div>

                    <div>
                        <label>Last name:</label>
                        <input
                            type="text"
                            name="last_name"
                            placeholder="Enter your last name"
                            value={formData.last_name}
                            onChange={handleChange}
                        />
                        {errors.last_name && <p style={{ color: "red", fontSize: "14px" }}>{errors.last_name[0]}</p>}
                    </div>
                </div>

                <div className="form-row">
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p style={{ color: "red", fontSize: "14px" }}>{errors.email[0]}</p>}
                    </div>

<div>
    <label>Phone number:</label>
    <div className="phone-input-group">
        <input
            type="tel"
            name="phone_number"
            placeholder="Enter your number"
            value={formData.phone_number}
            onChange={handleChange}
            className="phone-input"
        />
    </div>
    {errors.phone_number && (
        <p style={{ color: "red", fontSize: "14px" }}>{errors.phone_number[0]}</p>
    )}
</div>



                </div>

                <div className="form-row subject-input">
                    <div>
                        <label>Subject:</label>
                        <select
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                        >
                            <option value="General">General</option>
                            <option value="Support">Support</option>
                            <option value="Sales">Sales</option>
                        </select>
                        {errors.subject && <p style={{ color: "red", fontSize: "14px" }}>{errors.subject[0]}</p>}
                    </div>
                </div>

                <div className="form-row message-input">
                    <div>
                        <label>Message:</label>
                        <textarea
                            name="message"
                            placeholder="Enter your message here"
                            value={formData.message}
                            onChange={handleChange}
                        ></textarea>
                        {errors.message && (
    <p style={{ color: "red", fontSize: "14px" }}>{errors.message[0]}</p>
)}

                    </div>
                </div>

                <button type="submit" className="send-message-btn-add" disabled={loading}>
                    {loading ? "Sending..." : "Send Message"}
                </button>
            </form>
        </>
    );
}
