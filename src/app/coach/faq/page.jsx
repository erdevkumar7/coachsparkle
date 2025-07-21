import "../_styles/faq_support.css";

export default function Faq() {
    return (
        <div className="main-panel">

            <div className="new-content-wrapper coach-wrap">
                <div className="faq-support-add">

                    <h4>Contact Support</h4>
                    <form>
                        <div className="row mb-3 ">
                            <div className="col-md-6">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" id="name" className="form-control" placeholder="Your name" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" id="email" className="form-control" placeholder="you@example.com" />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="userType" className="form-label">I am a...</label>
                                <select id="userType" className="form-select">
                                    <option>User</option>
                                    <option>Coach</option>
                                    <option>Admin</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="reason" className="form-label">Reason for Contact</label>
                                <select id="reason" className="form-select">
                                    <option>Technical Issue</option>
                                    <option>Billing Inquiry</option>
                                    <option>General Question</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="subject" className="form-label">Subject</label>
                            <input type="text" id="subject" className="form-control" placeholder="Enter subject" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description of The Issue</label>
                            <textarea id="description" className="form-control" rows="3" placeholder="Describe your issue"></textarea>
                        </div>


                        <div className="attach-screenshot">
                            <p>Attach a Screenshot</p>
                            <div className="custom-file-input-wrapper">

                                <input type="file" id="cert-upload" accept=".jpg,.jpeg" className="custom-file-hidden" multiple="" name="upload_credentials" />
                                <label htmlFor="cert-upload" className="custom-file-btn">Choose file</label>
                                <span className="custom-file-placeholder">No file chosen</span>
                            </div>
                        </div>



                        <div className="form-checkbox">
                            <input className="form-checkbox-input" id="corporateCheck" type="checkbox" name="is_corporate" />
                            <label className="form-checkbox-label" htmlFor="corporateCheck">
                                I agree to be contacted via email.</label>
                        </div>


                        <button type="submit" className="btn btn-primary">
                            Submit <i className="bi bi-arrow-right"></i>
                        </button>
                    </form>

                </div>


                <div className="faq-support-add faqs-coaches">
                    <h4>FAQs for Coaches</h4>


                    <div className="accordion" id="accordionExample">

                        <div className='accordion-text-top'>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingOne">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        What is Coach Sparkle?
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <p>Coach Sparkle is a smart directory and matching platform that connects coaches, tutors, trainers, and educators with clients looking for personalized guidance. It uses AI-assisted matching while keeping the human element central to the coaching experiences.</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className='accordion-text-top'>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingTwo">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <p>Coach Sparkle is a smart directory and matching platform that connects coaches, tutors, trainers, and educators with clients looking for personalized guidance. It uses AI-assisted matching while keeping the human element central to the coaching experiences.</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className='accordion-text-top'>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingThree">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </button>
                                </h2>
                                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <p>Coach Sparkle is a smart directory and matching platform that connects coaches, tutors, trainers, and educators with clients looking for personalized guidance. It uses AI-assisted matching while keeping the human element central to the coaching experiences.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='accordion-text-top'>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingFour">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </button>
                                </h2>
                                <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <p>Coach Sparkle is a smart directory and matching platform that connects coaches, tutors, trainers, and educators with clients looking for personalized guidance. It uses AI-assisted matching while keeping the human element central to the coaching experiences.</p>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className='accordion-text-top'>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingFive">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </button>
                                </h2>
                                <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <p>Coach Sparkle is a smart directory and matching platform that connects coaches, tutors, trainers, and educators with clients looking for personalized guidance. It uses AI-assisted matching while keeping the human element central to the coaching experiences.</p>
                                    </div>
                                </div>
                            </div>





                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingSix">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </button>
                                </h2>
                                <div id="collapseSix" className="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <p>Coach Sparkle is a smart directory and matching platform that connects coaches, tutors, trainers, and educators with clients looking for personalized guidance. It uses AI-assisted matching while keeping the human element central to the coaching experiences.</p>
                                    </div>
                                </div>
                            </div>







                        </div>







                    </div>



                </div>


            </div>

        </div>
    );
}