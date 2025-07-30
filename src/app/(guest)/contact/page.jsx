import '../_styles/about_us.css';
import '../_styles/contact.css';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';


export default function Contact() {
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
                            <strong> <MailOutlineOutlinedIcon className='mui-icons'/> Email:</strong><br />
                            contact@coachsparkle.com
                        </p>
                        <p>
                            <strong> <MapOutlinedIcon className='mui-icons'/> Address:</strong><br />
                            61 Upper Paya Lebar Road<br />
                            Singapore 534816
                        </p>
                        <p>
                            <strong> <AccessTimeOutlinedIcon className='mui-icons'/> Business Hours:</strong><br />
                            Mon - Fri<br />
                            9:00 AM - 6:00 PM (GMT +8)
                        </p>

                        <h3 className="sena-msg-add">
                            <img src="/coachsparkle/images/send-icon.png" alt="send-img" />
                            Send Us A Message
                        </h3>

                        <form className="contact-form-add">
                            <div className="form-row">
                                <div>
                                    <label>First name:</label>
                                    <input type="text" placeholder="Enter your first name" required />
                                </div>

                                <div>
                                    <label>Last name:</label>
                                    <input type="text" placeholder="Enter your last name" required />
                                </div>
                            </div>

                            <div className="form-row">
                                <div>
                                    <label>Email:</label>
                                    <input type="email" placeholder="Enter your email" required />
                                </div>

                                <div>
                                    <label>Phone number:</label>
                                    <div className="phone-input-group">
                                        <select required>
                                            <option value="+91">IN +91</option>
                                            <option value="+1">US +1</option>
                                            <option value="+44">GB +44</option>
                                            <option value="+61">AU +61</option>
                                        </select>

                                    </div>
                                </div>
                            </div>

                            <div className="form-row subject-input">
                                <div>
                                    <label>Subject:</label>
                                    <select required>
                                        <option value="General">General</option>
                                        <option value="Support">Support</option>
                                        <option value="Sales">Sales</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-row message-input">
                                <div>
                                    <label>Message:</label>
                                    <textarea placeholder="Enter your message here" required></textarea>
                                </div>
                            </div>

                            <button type="submit" className="send-message-btn-add">Send Message</button>
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