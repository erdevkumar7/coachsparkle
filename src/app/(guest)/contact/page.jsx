import '../_styles/about_us.css';
import '../_styles/contact.css';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import ContactUsForm from '../_components/ContactUsForm';

// ✅ Fetch contact page data from backend (server-side)
async function getContactData() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/showcontactpage`, {
        method: "POST",
        cache: "no-store", // ensures fresh data on each request
    });

    if (!res.ok) {
        throw new Error("Failed to fetch contact page data");
    }

    const data = await res.json();
    return data?.data?.[0] || null;
}

export default async function Contact() {
    const contactData = await getContactData();
    console.log('contactData', contactData)
    if (!contactData) {
        return <div className="error-text">Failed to load contact information.</div>;
    }

    return (

        <div className="about-us-page-add">
            <section className="hero">
                <div>
                    <h1>We’re <strong>Here to Help</strong></h1>
                    {/* <h1>
                        {contactData?.title
                            ? contactData?.title
                            : <>We’re <strong>Here to Help</strong></>}
                    </h1> */}
                    <p>{contactData?.subtitle || `Reach out to us with any questions, partnership inquiries, or support — we’ll get back within 1-2 business days.`}</p>
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
                            {contactData?.email || "contact@coachsparkle.com"}
                        </p>
                        <p>
                            <strong><MapOutlinedIcon className='mui-icons' /> Address:</strong><br />
                            <span
                                dangerouslySetInnerHTML={{ __html: contactData.address }}
                            />
                        </p>
                        <p>
                            <strong> <AccessTimeOutlinedIcon className='mui-icons' /> Business Hours:</strong><br />
                            {contactData?.business_hourse || <>
                                Mon - Fri<br />
                                9:00 AM - 6:00 PM (GMT +8)
                            </>}

                        </p>

                        <ContactUsForm />
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