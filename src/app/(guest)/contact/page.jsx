"use client";

import { useState } from "react";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import '../_styles/about_us.css';
import '../_styles/contact.css';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

export default function Contact() {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        subject: "General",
        message: "",
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let newErrors = {};
        if (!formData.first_name.trim()) newErrors.first_name = "First name is required";
        if (!formData.last_name.trim()) newErrors.last_name = "Last name is required";
        if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid email is required";
        if (!formData.phone) newErrors.phone = "Phone number is required";
        if (formData.message.trim().length < 10) newErrors.message = "Message must be at least 10 characters";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        try {
            await axios.post("/api/contact", formData);
            alert("Message sent successfully!");
            setFormData({ first_name: "", last_name: "", email: "", phone: "", subject: "General", message: "" });
        } catch (error) {
            alert("Failed to send message. Try again later.");
        }
    };

    return (
        <div className="about-us-page-add">
            <section className="hero">
                <div>
                    <h1>We’re <strong>Here to Help</strong></h1>
                    <p>Reach out to us with any questions, partnership inquiries, or support — we’ll get back within 1-2 business days.</p>
                </div>
            </section>

            <div className="contact-information">
                <div className="container contact-container">
                    <div className="row contact-info">
                        <h3>
                            <img src="/coachsparkle/images/contact-icon.png" alt="contact-icon" />
                            Contact Information
                        </h3>
                        <p>
                            <strong> <MailOutlineOutlinedIcon className='mui-icons' /> Email:</strong><br />
                            contact@coachsparkle.com
                        </p>
                        <p>
                            <strong> <MapOutlinedIcon className='mui-icons' /> Address:</strong><br />
                            61 Upper Paya Lebar Road<br />
                            Singapore 534816
                        </p>
                        <p>
                            <strong> <AccessTimeOutlinedIcon className='mui-icons' /> Business Hours:</strong><br />
                            Mon - Fri<br />
                            9:00 AM - 6:00 PM (GMT +8)
                        </p>

                        <h3 className="sena-msg-add">
                            <img src="/coachsparkle/images/send-icon.png" alt="send-img" />
                            Send Us A Message
                        </h3>

                        <form className="contact-form-add" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div>
                                    <label>First name:</label>
                                    <input
                                        type="text"
                                        value={formData.first_name}
                                        onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                                    />
                                    {errors.first_name && <span className="error-text">{errors.first_name}</span>}
                                </div>

                                <div>
                                    <label>Last name:</label>
                                    <input
                                        type="text"
                                        value={formData.last_name}
                                        onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                                    />
                                    {errors.last_name && <span className="error-text">{errors.last_name}</span>}
                                </div>
                            </div>

                            <div className="form-row">
                                <div>
                                    <label>Email:</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                    {errors.email && <span className="error-text">{errors.email}</span>}
                                </div>

                                <div>
                                    <label>Phone number:</label>
                                    <PhoneInput
                                        country={"in"}
                                        value={formData.phone}
                                        onChange={(phone) => setFormData({ ...formData, phone })}
                                    />
                                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                                </div>
                            </div>

                            <div className="form-row subject-input">
                                <div>
                                    <label>Subject:</label>
                                    <select
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    >
                                        <option value="General">General</option>
                                        <option value="Support">Support</option>
                                        <option value="Sales">Sales</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-row message-input">
                                <div>
                                    <label>Message:</label>
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    ></textarea>
                                    {errors.message && <span className="error-text">{errors.message}</span>}
                                </div>
                            </div>

                            <button type="submit" className="send-message-btn-add">Send Message</button>
                        </form>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .error-text {
                    color: red;
                    font-size: 0.85rem;
                    margin-top: 4px;
                    display: block;
                }
            `}</style>
        </div>
    );
}
