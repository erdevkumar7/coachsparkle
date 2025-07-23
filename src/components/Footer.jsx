import { FRONTEND_BASE_URL} from "@/utiles/config";



export default function Footer() {
    return (
        <>
            <footer className="coach-footer-section text-white py-5">
                <div className="container">
                    <div className="row coach-footer-inner">
                        <div className="col-md-3 coach-footer-one">
                            <img src={`${FRONTEND_BASE_URL}/images/signup-logo.png`} alt="Logo" style={{width:'50%',marginTop:'-25px' }} />
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                        </div>

                        <div className="col-md-2 coach-footer-two">
                            <h5>Informational Links</h5>
                            <ul className="list-unstyled">
                                <li><i className="fa fa-angle-right" aria-hidden="true"></i> <a href="#" className="text-decoration-none">About Us</a></li>
                                <li><i className="fa fa-angle-right" aria-hidden="true"></i> <a href="#" className="text-decoration-none">Contact Us</a></li>
                                <li><i className="fa fa-angle-right" aria-hidden="true"></i> <a href="#" className="text-decoration-none">FAQ</a></li>
                                <li><i className="fa fa-angle-right" aria-hidden="true"></i> <a href="#" className="text-decoration-none">Terms of Services</a></li>
                                <li><i className="fa fa-angle-right" aria-hidden="true"></i> <a href="#" className="text-decoration-none">Privacy Policy</a></li>
                                <li><i className="fa fa-angle-right" aria-hidden="true"></i> <a href="#" className="text-decoration-none">Cookie Policy</a></li>
                                <li><i className="fa fa-angle-right" aria-hidden="true"></i> <a href="#" className="text-decoration-none">Site Map</a></li>
                            </ul>
                        </div>

                        <div className="col-md-2 coach-footer-three">
                            <h5>Platform</h5>
                            <ul className="list-unstyled">
                                <li><i className="fa fa-angle-right" aria-hidden="true"></i> <a href="#" className="text-decoration-none">Browse Coaches</a></li>
                                <li><i className="fa fa-angle-right" aria-hidden="true"></i> <a href="/coachsparkle/send-coaching-request" className="text-decoration-none">Send Coaching Request</a></li>
                                <li><i className="fa fa-angle-right" aria-hidden="true"></i> <a href="#" className="text-decoration-none">Get Match</a></li>
                                <li><i className="fa fa-angle-right" aria-hidden="true"></i> <a href="#" className="text-decoration-none">List As Coach</a></li>
                                <li><i className="fa fa-angle-right" aria-hidden="true"></i> <a href="#" className="text-decoration-none">For Corporate</a></li>
                                <li><i className="fa fa-angle-right" aria-hidden="true"></i> <a href="#" className="text-decoration-none">Events</a></li>
                            </ul>
                        </div>

                        <div className="col-md-2 coach-footer-three">
                            <h5>Social Media</h5>
                            <ul className="list-unstyled">
                                <li><i className="fa fa-facebook" aria-hidden="true"></i> <a href="#" className="text-decoration-none">Facebook</a></li>
                                <li><i className="fa fa-instagram" aria-hidden="true"></i> <a href="#" className="text-decoration-none">Instagram</a></li>
                                <li><i className="fa fa-linkedin" aria-hidden="true"></i> <a href="#" className="text-decoration-none">LinkedIn</a></li>
                                <li><i className="bi bi-youtube"></i> <a href="#" className="text-decoration-none">YouTube</a></li>
                                <li><i className="fa-brands fa-x-twitter" aria-hidden="true"></i> <a href="#" className="text-decoration-none">Twitter</a></li>
                            </ul>
                        </div>

                        <div className="col-md-3 coach-footer-four">
                            <h5>Newsletter</h5>
                            <form className="">
                                <p>Sign up to receive the latest articles</p>
                                <div className="mb-2">
                                    <input type="email" className="form-control" placeholder="Your email address" />
                                </div>
                                <button type="submit" className="btn btn-primary btn-sm">Sign Up</button>

                                <label className="form-check-box">
                                    <input type="checkbox" name="terms" required />
                                    I have read and agree to the terms & conditions
                                </label>
                            </form>
                        </div>
                    </div>
                </div>
            </footer>

            <div className="rights-reserved">
                <p>© 2025 Coach Sparkle. All rights reserved.</p>
            </div>
        </>
    )
}