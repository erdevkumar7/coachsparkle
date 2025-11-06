import { FRONTEND_BASE_URL } from "@/utiles/config";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import Link from "next/link";
import NewsletterForm from "./NewsletterForm";


export default async function Footer() {
    // Home Page contents
    const [homePageContentResponse] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/getHomePageSection`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store"
        }),
    ]);

    const [homePageContentData] = await Promise.all([
        homePageContentResponse.json(),
    ]);

    const home_page_content = homePageContentData?.success ? homePageContentData.data : [];

    // Extract specific sections 
    const footerOneSection = home_page_content.find(item => item.section_name === "footer_one");
    const footerTwoSection = home_page_content.find(item => item.section_name === "footer_two");
    const socialMediaSection = home_page_content.find(item => item.section_name === "social_media");

    // console.log("Home Page Data:", socialMediaSection);
    return (
        <>
            <footer className="coach-footer-section text-white py-5">
                <div className="container">
                    <div className="row coach-footer-inner">
                        <div className="col-md-3 coach-footer-one">
                            <img src={`${FRONTEND_BASE_URL}/images/signup-logo.png`} alt="Logo" style={{ width: '50%', marginTop: '-25px' }} />
                            <p>{footerOneSection?.description || `Coach Sparkle connects learners worldwide with trusted coaches, tutors, 
                            and trainers through AI-powered matching — sparking real growth through authentic human connections.`}</p>
                        </div>

                        <div className="col-md-2 coach-footer-two">
                            <h5>Information</h5>
                            <ul className="list-unstyled">
                                <li><ArrowForwardIosIcon className="mui-icons" /><Link href={`/about-us`} className="text-decoration-none">About Us</Link></li>
                                <li><ArrowForwardIosIcon className="mui-icons" /><Link href={`/contact`} className="text-decoration-none">Contact Us</Link></li>
                                <li><ArrowForwardIosIcon className="mui-icons" /><Link href={`/faq`} className="text-decoration-none">FAQ</Link></li>
                                <li><ArrowForwardIosIcon className="mui-icons" /><Link href={`/term-conditions`} className="text-decoration-none">Terms of Use</Link></li>
                                <li><ArrowForwardIosIcon className="mui-icons" /><Link href={`/privacy-policy`} className="text-decoration-none">Privacy Policy</Link></li>
                                {/* <li><ArrowForwardIosIcon className="mui-icons"/><a href="#" className="text-decoration-none">Cookie Policy</a></li> */}
                                <li><ArrowForwardIosIcon className="mui-icons" /><a href="#" className="text-decoration-none">Site Map</a></li>
                            </ul>
                        </div>

                        <div className="col-md-2 coach-footer-three new-add-footer">
                            <h5>Platform</h5>
                            <ul className="list-unstyled">
                                <li><ArrowForwardIosIcon className="mui-icons" /><Link href={`/coach-detail/list`} className="text-decoration-none">Explore Coaches</Link></li>
                                <li><ArrowForwardIosIcon className="mui-icons" /><Link href={`/send-coaching-request`} className="text-decoration-none">Send Coaching Request</Link></li>
                                <li><ArrowForwardIosIcon className="mui-icons" /><a href="#" className="text-decoration-none">AI Match</a></li>
                                <li><ArrowForwardIosIcon className="mui-icons" /><a href="#" className="text-decoration-none">List As Coach</a></li>
                                <li><ArrowForwardIosIcon className="mui-icons" /><Link href="/coach-detail/list?isCorporate=1" className="text-decoration-none">For Corporate</Link></li>
                                <li><ArrowForwardIosIcon className="mui-icons" /><a href="#" className="text-decoration-none">Events</a></li>
                            </ul>
                        </div>

                        <div className="col-md-2 coach-footer-four">
                            <h5>Social Media</h5>
                            <ul className="list-unstyled">
                                {socialMediaSection && socialMediaSection.facebook && <li><FacebookIcon className="mui-icons" /> <Link href={socialMediaSection.facebook} target="_blank" className="text-decoration-none">Facebook</Link></li>}
                                {socialMediaSection && socialMediaSection.instagram && <li><InstagramIcon className="mui-icons" /> <Link href={socialMediaSection.instagram} target="_blank" className="text-decoration-none">Instagram</Link></li>}
                                {socialMediaSection && socialMediaSection.linkedin && <li><LinkedInIcon className="mui-icons" /> <Link href={socialMediaSection.linkedin} target="_blank" className="text-decoration-none">LinkedIn</Link></li>}
                                {socialMediaSection && socialMediaSection.youtube && <li><YouTubeIcon className="mui-icons" /><Link href={socialMediaSection.youtube} target="_blank" className="text-decoration-none">YouTube</Link></li>}
                                {socialMediaSection && socialMediaSection.twitter && <li><XIcon className="mui-icons" /> <Link href={socialMediaSection.twitter} target="_blank" className="text-decoration-none">Twitter</Link></li>}
                            </ul>
                        </div>

                        <NewsletterForm />

                        {/* <div className="col-md-3 coach-footer-four">
                            <h5>Newsletter</h5>
                            <form className="">
                                <p>Sign up to receive the latest articles</p>
                                <div className="mb-2">
                                    <input type="text" className="form-control" placeholder="Your email address" />
                                    {errors.email && (
                                        <p style={{ color: 'red' }}>{errors.email.message}</p>
                                    )}
                                </div>
                                <button type="submit" className="btn btn-primary btn-sm">Sign Up</button>

                                <label className="form-check-box privacy">
                                    <input type="checkbox" name="terms" />
                                    <div>I have read and agree to the <a href="#">Terms of Use</a> & <a href="#">Privacy Policy</a>
                                    {errors.terms && <p className="text-red-600 regist-err-msg" style={{ color: 'red' }}>{errors.terms.message}</p>}
                                    </div> .
                                </label>
                            </form>
                        </div> */}
                    </div>
                </div>
            </footer>

            <div className="rights-reserved">
                <p>{footerTwoSection?.title || `© 2025 Coach Sparkle. All rights reserved.`}</p>
            </div>
        </>
    )
}
