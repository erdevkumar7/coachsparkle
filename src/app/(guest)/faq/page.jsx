import '../_styles/about_us.css';
import '../_styles/faq.css';

export default function Faq() {
    return (

        <div className="about-us-page-add">
            <section className="hero">
                <div>
                    <h1>Frequently <strong>Asked Questions</strong></h1>
                    <div className="input-with-btn">
                        <input type="text" placeholder="Search FAQs (e.g., how to cancel session, edit profile)" />
                        <button type="button">Submit <i className="bi bi-arrow-right"></i></button>
                    </div>
                </div>
            </section>

            <div className='frequently-add'>
                <div className='container'>
                    <p className='looking-coach-text'>
                        Whether you're looking for a coach or growing your coaching practice, we are here to support you. Find quick answers to help you navigate Coach Sparkle with ease.
                    </p>

                    <div className="accordion" id="accordionExample">

                        <div className='accordion-text-top'>
                            <h4><img src="/coachsparkle/images/accordion-icon-one.png" alt="accordion-icon" /> For Users</h4>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingOne">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <p>Aenean quis aliquet lacus. Aliquam fermentum mauris sed suscipit viverra. Mauris nec tempus justo. Fusce cursus arcu non massa cursus, ac efficitur ligula scelerisque. Nunc eleifend turpis id ligula porttitor congue in id ipsum. In vitae quam in lacus cursus porttitor. Ut condimentum massa neque, et tristique libero interdum nec.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingFive">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </button>
                                </h2>
                                <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <p>Content for Users question 2.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='accordion-text-top'>
                            <h4><img src="/coachsparkle/images/accordion-icon-two.png" alt="accordion-icon" /> For Coaches</h4>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingTwo">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <p>Content for Coaches question 1.</p>
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
                                        <p>Content for Coaches question 2.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingSeven">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </button>
                                </h2>
                                <div id="collapseSeven" className="accordion-collapse collapse" aria-labelledby="headingSeven" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <p>Content for Coaches question 3.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='accordion-text-top'>
                            <h4><img src="/coachsparkle/images/accordion-icon-three.png" alt="accordion-icon" /> Billing and Subscriptions</h4>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingThree">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </button>
                                </h2>
                                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <p>Billing and Subscriptions question 1.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingEight">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </button>
                                </h2>
                                <div id="collapseEight" className="accordion-collapse collapse" aria-labelledby="headingEight" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <p>Billing and Subscriptions question 2.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingNine">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNine" aria-expanded="false" aria-controls="collapseNine">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </button>
                                </h2>
                                <div id="collapseNine" className="accordion-collapse collapse" aria-labelledby="headingNine" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <p>Billing and Subscriptions question 3.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='accordion-text-top'>
                            <h4><img src="/coachsparkle/images/accordion-icon-four.png" alt="accordion-icon" /> General Questions</h4>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingFour">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </button>
                                </h2>
                                <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <p>General question 1.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingTen">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTen" aria-expanded="false" aria-controls="collapseTen">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </button>
                                </h2>
                                <div id="collapseTen" className="accordion-collapse collapse" aria-labelledby="headingTen" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <p>General question 2.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingEleven">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEleven" aria-expanded="false" aria-controls="collapseEleven">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </button>
                                </h2>
                                <div id="collapseEleven" className="accordion-collapse collapse" aria-labelledby="headingEleven" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <p>General question 3.</p>
                                    </div>
                                </div>
                            </div>
                            <p className='still-below-text'>Still need help? Contact us <a href='#'>here.</a></p>
                        </div>

                    </div>
                </div>
            </div>


        </div>




    );
}