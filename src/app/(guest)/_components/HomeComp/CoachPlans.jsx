export default function CoachPlans() {


    return (
        <div className="choose-plan-you">
            <div className="container">
                <h1 className="text-center">
                    Free for Everyone <br />
                    Premium for Coaches Who Want More
                </h1>
                <p className="text-center">Whether you’re searching for your next coach or listing your expertise,
                    Coach Sparkle is always free to use.</p>
                <p className="text-center span-txt">Users: Browse, match, and message coaches - 100% free<br />
                    Coaches: Join free, list your profile, and get discovered. Ready to stand out? Upgrade to Pro Coach Plan for advance tools and top placement</p>
                <div className="row">
                    <div className="toggle-container">
                        <div className="switch-toggle">
                            <input type="radio" name="plan" id="monthly" ></input>
                            <input type="radio" name="plan" id="yearly"></input>
                            <label htmlFor="monthly">Monthly</label>
                            <label htmlFor="yearly">Yearly</label>
                            <div className="slider"></div>
                        </div>
                    </div>
                    <div className="pricing">
                        <div className="col-md-4">
                            <div className="card">
                                <h3>Basic Plan</h3>
                                <p>Get started with a basic profile to explore the platform and connect with your first few clients.</p>
                                <h2>$<span className="number-add">0</span></h2>
                                <div className="user-list-plan">
                                    <ul>
                                        <li><i className="bi bi-check"></i>Basic Listing In 1 Category</li>
                                        <li><i className="bi bi-check"></i>500 Character Bio + Photo</li>
                                        <li><i className="bi bi-check"></i> Standard AI Matching</li>
                                        <li><i className="bi bi-check"></i>Up to  5 Notifications / Month</li>
                                        <li><i className="bi bi-check"></i>Manual Booking Only</li>
                                        <li><i className="bi bi-check"></i>Fixed Pricing</li>
                                        <li><i className="bi bi-check"></i>Text Message Only</li>
                                        <li><i className="bi bi-check"></i>Standard Support, Limited Analytics</li>
                                    </ul>
                                    <button>Sign up</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card featured">
                                <h3>Pro Coach Plan</h3>
                                <p>Maximize your reach and revenue with advanced tools, full visibility and priority matching</p>
                                <h2>$<span className="number-add">190</span></h2>
                                {/* <span className="save">Save <span> $50 </span> a year</span> */}
                                <div className="user-list-plan pro-coach-plan-add">
                                    <ul>
                                        <li><i className="bi bi-check"></i>Featured Listing In Unlimited Categories With Priority</li>
                                        <li><i className="bi bi-check"></i>3000 Character, Intro Video & Media Gallery</li>
                                        <li><i className="bi bi-check"></i>Real Time Alerts + Priority AI Matching</li>
                                        <li><i className="bi bi-check"></i>Unlimited Coaching Request Notifications</li>
                                        <li><i className="bi bi-check"></i>Smart Calendar Sync + Auto Booking Capabilities</li>
                                        <li><i className="bi bi-check"></i>Custom Pricing, Bundled Packages, and Flexible Offers</li>
                                        <li><i className="bi bi-check"></i>Email, Video Call and Client Interest Insights</li>
                                        <li><i className="bi bi-check"></i>24 Hours Priority Support + Full Analytics Dashboard</li>
                                    </ul>
                                    <button>Start Free! First 3 months on us!</button>
                                </div>
                            </div>
                        </div>

                        {/* <div className="col-md-4">
                <div className="card">
                  <h3>Premium</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur</p>
                  <h2>$<span className="number-add">16</span></h2>
                  <div className="user-list-plan">
                    <ul>
                      <li><i className="bi bi-check"></i>Features</li>
                      <li><i className="bi bi-check"></i>Features</li>
                      <li><i className="bi bi-check"></i> Features</li>
                      <li><i className="bi bi-check"></i>Features</li>
                      <li><i className="bi bi-check"></i>Features</li>
                    </ul>
                    <button>Signup</button>
                  </div>
                </div>
              </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}