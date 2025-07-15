import '../_styles/about_us.css';

export default function AboutUs() {
    return (
        <div className='about-us-page-add'>
            <section className="hero">
                <div>
                    <h1>About <strong>Coach Sparkle</strong></h1>
                    <p>Your Growth. Driven by Purpose.</p>
                </div>
            </section>

            <div className="container about-content-section">
                <div className='row align-items-center'>

                    <div className="col-6 images-column-left">
                        <img src="/coachsparkle/images/human-img.png" alt="Image 1" className="img-fluid" />
                    </div>

                    <div className="col-6 text-column-right">
                        <h2>
                            Smarter matching.<br />Human Connections.<br />Better Outcomes.
                        </h2>
                        <p>
                            At Coach Sparkle, we deliver the best personal growth, learning,
                            and transformation through human inspiration. These happen
                            through real relationships - through real human connections.
                        </p>
                        <p>
                            We're here to make those connections easier, smarter, and more meaningful.
                            Whether you're looking for a life coach, a career mentor, or a personal guide to your future,
                            Coach Sparkle helps you take the right steps to guide your journey.
                            It's not just someone who sparks - but someone who truly fits your goals, personality, and vision.
                        </p>
                    </div>

                </div>


                <div className='coach-sparkle’s-focus'>
                    <div className="content-section">

                        <h2 className="section-title">Coach Sparkle's Focus</h2>

                        <div className="row focus-section">
                            <div className="col-6 focus-item">
                                <h4>🤝 Human-Centered Matching</h4>
                                <p className='our-para-text'>Our AI doesn't replace human — it empowers it.</p>
                                <p>We use intelligent algorithms to shortlist coaches based on your preferences, goals, and learning style — but you always have the final say. You choose who feels right for you, because connection matters more than clicks.</p>
                            </div>

                            <div className="col-6 focus-item">
                                <h4>🧰 Smart Tools for Coaches</h4>
                                <p className='our-para-text'>No paywalls, no pressure.</p>

                                <p>From session scheduling and smart calendar sync to bundled packages, messaging, and client insights — we give coaches everything they need to manage their practice from one clean dashboard.</p>
                            </div>

                            <div class="col-6 focus-item">
                                <h4>🆓 Freemium Access for All</h4>
                                <p className='our-para-text'>We make it easy to coach — so you can focus on impact.</p>

                                <p>Everyone deserves access to quality coaching — whether you are testing the waters with a discovery call or building a long-term partnership. It’s always free for all users. As a coach, you can always start with a free basic profile or free session, and upgrade only when you're ready to grow.</p>
                            </div>

                            <div className="col-6 focus-item">
                                <h4>✅ Quality Over Quantity</h4>
                                <p className='our-para-text'>We are not a directory — we are a trusted ecosystem.</p>


                                <p>All coaches on Coach Sparkle go through a vetting process to ensure authenticity and alignment with our values. We also encourage users to define their coaching goals upfront, so both sides enter with clarity and purpose.</p>
                            </div>
                        </div>

                        <h2 className="section-title">Our Values</h2>

                        <div className="row values-section">
                            <div className="col-6">
                                <img src="/coachsparkle/images/our-img.png" alt="Our Values Image" class="values-img" />
                            </div>

                            <div className="col-6 values-text">
                                <h4>💡 Empathy Before Algorithms</h4>
                                <p className='behind-text'>Behind every goal is a person. Our tech enhances experience — it doesn’t replace the empathy, intuition, and human wisdom that real growth requires.</p>

                                <h4>🌍 Access for All</h4>
                                <p className='behind-text'>We are building a radically open system that’s inclusive by design. Every student, coach, seeker is welcome. Through accessibility, we support coaches and learners across many backgrounds and life journeys.</p>

                                <h4>🔍 Transparency & Trust</h4>
                                <p className='behind-text'>No gimmicks. No smoke and mirrors. Our interface is fully transparent — including clear coach profiles, session details, and reviews — so you always know what you’re signing up for.</p>

                                <h4>📚 Lifelong Learning</h4>
                                <p className='behind-text'>We believe growth doesn’t stop after a milestone reset. Mastering a skill you believe shouldn’t be a lifelong compulsion — and Coach Sparkle is there for every chapter.</p>
                            </div>
                        </div>

                    </div>


                </div>




            </div>

        </div>

    );
}