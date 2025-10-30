export default function ContactUsForm() {


    return (
        <>
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
        </>
    )
}