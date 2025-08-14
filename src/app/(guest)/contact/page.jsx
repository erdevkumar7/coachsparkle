"use client";
import Cookies from "js-cookie";
import { useState } from "react";
import axios from "axios";
import '../_styles/about_us.css';
import '../_styles/contact.css';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

export default function Contact() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const token = Cookies.get("token");
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        country_code: "+91",
        phone_number: "",
        subject: "General",
        message: ""
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.first_name.trim()) {
            newErrors.first_name = "First name is required";
        }
        if (!formData.last_name.trim()) {
            newErrors.last_name = "Last name is required";
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Valid email is required";
        }
        if (formData.phone_number && !/^\d{7,15}$/.test(formData.phone_number)) {
            newErrors.phone_number = "Phone number must be 7-15 digits";
        }
        if (!formData.subject) {
            newErrors.subject = "Subject is required";
        }
        if (formData.message.trim().length < 10) {
            newErrors.message = "Message should be at least 10 characters";
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage("");
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setLoading(true);
        try {
            //const res = await axios.post("http://your-domain.com/api/contact-message", formData);
            const res = await axios.post(`${apiUrl}/contact-message`, formData);
            setSuccessMessage(res.data.message || "Message sent successfully!");
            setFormData({
                first_name: "",
                last_name: "",
                email: "",
                country_code: "+91",
                phone_number: "",
                subject: "General",
                message: ""
            });
            setErrors({});
        } catch (err) {
            setSuccessMessage("");
            setErrors({ form: "Failed to send message. Please try again later." });
        } finally {
            setLoading(false);
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
                            <img src="/coachsparkle/images/contact-icon.png" alt="contact-icon" /> Contact Information
                        </h3>
                        <p><strong><MailOutlineOutlinedIcon className='mui-icons'/> Email:</strong><br /> contact@coachsparkle.com</p>
                        <p><strong><MapOutlinedIcon className='mui-icons'/> Address:</strong><br /> 61 Upper Paya Lebar Road<br /> Singapore 534816</p>
                        <p><strong><AccessTimeOutlinedIcon className='mui-icons'/> Business Hours:</strong><br /> Mon - Fri<br /> 9:00 AM - 6:00 PM (GMT +8)</p>

                        <h3 className="sena-msg-add">
                            <img src="/coachsparkle/images/send-icon.png" alt="send-img" /> Send Us A Message
                        </h3>

                        {successMessage && <p className="success-message">{successMessage}</p>}
                        {errors.form && <p className="error-message">{errors.form}</p>}

                        <form className="contact-form-add" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div>
                                    <label>First name:</label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        className={errors.first_name ? "input-error" : ""}
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        placeholder="Enter your first name"
                                    />
                                    {errors.first_name && <span className="error-text">{errors.first_name}</span>}
                                </div>
                                <div>
                                    <label>Last name:</label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        className={errors.last_name ? "input-error" : ""}
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        placeholder="Enter your last name"
                                    />
                                    {errors.last_name && <span className="error-text">{errors.last_name}</span>}
                                </div>
                            </div>

                            <div className="form-row">
                                <div>
                                    <label>Email:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className={errors.email ? "input-error" : ""}
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                    />
                                    {errors.email && <span className="error-text">{errors.email}</span>}
                                </div>
                                <div>
                                    <label>Phone number:</label>
                                    <div className="phone-input-group">
                                        <select name="country_code" value={formData.country_code} onChange={handleChange}>
                                            <option value="+91">IN +91</option>
                                            <option value="+1">US +1</option>
                                            <option value="+44">GB +44</option>
                                            <option value="+61">AU +61</option>
                                        </select>
                                        <input
                                            type="text"
                                            name="phone_number"
                                            className={errors.phone_number ? "input-error" : ""}
                                            value={formData.phone_number}
                                            onChange={handleChange}
                                            placeholder="Phone number"
                                        />
                                    </div>
                                    {errors.phone_number && <span className="error-text">{errors.phone_number}</span>}
                                </div>
                            </div>

                            <div className="form-row subject-input">
                                <div>
                                    <label>Subject:</label>
                                    <select
                                        name="subject"
                                        className={errors.subject ? "input-error" : ""}
                                        value={formData.subject}
                                        onChange={handleChange}
                                    >
                                        <option value="General">General</option>
                                        <option value="Support">Support</option>
                                        <option value="Sales">Sales</option>
                                    </select>
                                    {errors.subject && <span className="error-text">{errors.subject}</span>}
                                </div>
                            </div>

                            <div className="form-row message-input">
                                <div>
                                    <label>Message:</label>
                                    <textarea
                                        name="message"
                                        className={errors.message ? "input-error" : ""}
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Enter your message here"
                                    ></textarea>
                                    {errors.message && <span className="error-text">{errors.message}</span>}
                                </div>
                            </div>

                            <button type="submit" className="send-message-btn-add" disabled={loading}>
                                {loading ? "Sending..." : "Send Message"}
                            </button>
                        </form>
                    </div>

                    <div className="contact-map">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19898.641312903014!2d-0.134348!3d51.507268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x1234567890abcdef!2sLondon%20Eye!5e0!3m2!1sen!2suk!4v1662123456789"
                            width="100%"
                            height="850"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            title="Location Map"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}
