"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../_styles/dashboard.css";
import "../_styles/profile.css";
import axios from "axios";
import UserSideBarComp from "../_user_components/UserSideBar";
import { FRONTEND_BASE_URL } from "@/utiles/config";


export default function Profile() {
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        contactNumber: '',
        countryId: '',

        professionalTitle: '',
        detailedBio: '',
        shortBio: '',
        userTimezone: '',
        gender: '',
        stateId: '',
        cityId: '',

        coachingCategory: '',
        deliveryMode: '',
        freeTrialSession: '',
        isVolunteeredCoach: '',
        volunteerCoaching: '',
        videoLink: '',
        experience: '',
        price: '',
        websiteLink: '',
        facebookLink: '',
        instaLink: '',
        linkdinLink: '',
        bookingLink: '',
        objective: '',
        coachType: '',
        coachSubtype: '',
        profileImage: '',
        serviceNames: [],
        languageNames: [],
    });


    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setUser(null);
            router.push("/login");
            return;
        }

        try {
            const response = await axios({
                url: `${apiUrl}/getuserprofile`,
                headers: {
                    "accept": "application/json",
                    "authorization": `Bearer ${token}`,
                },
                method: 'POST',
            })

            if (response.data.success) {
                const data = response.data.data;
                setUser(data);

                setFormData({
                    firstName: data.first_name || '',
                    lastName: data.last_name || '',
                    email: data.email || '',
                    contactNumber: data.contact_number || '',
                    countryId: data.country_id || '',

                    professionalTitle: data.professional_title || '',
                    detailedBio: data.detailed_bio || '',
                    shortBio: data.short_bio || '',
                    userTimezone: data.user_timezone || '',
                    gender: data.gender || '',
                    stateId: data.state_id || '',
                    cityId: data.city_id || '',

                    coachingCategory: data.coaching_category || '',
                    deliveryMode: data.delivery_mode || '',
                    freeTrialSession: data.free_trial_session || '',
                    isVolunteeredCoach: data.is_volunteered_coach || '',
                    volunteerCoaching: data.volunteer_coaching || '',
                    videoLink: data.video_link || '',
                    experience: data.experience || '',
                    price: data.price || '',
                    websiteLink: data.website_link || '',
                    facebookLink: data.facebook_link || '',
                    instaLink: data.insta_link || '',
                    linkdinLink: data.linkdin_link || '',
                    bookingLink: data.booking_link || '',
                    objective: data.objective || '',
                    coachType: data.coach_type || '',
                    coachSubtype: data.coach_subtype || '',
                    profileImage: data.profile_image || '',
                    serviceNames: data.service_names || [],
                    languageNames: data.language_names || [],
                });
            } else {
                handleLogout();
            }
        } catch (error) {
            console.error("Authentication failed:", error);
            handleLogout();
        }
    };

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        router.push("/login");
    };

    // console.log(user, 'user')
  
    return (
        <>
            <div className="container-fluid page-body-wrapper">
                <UserSideBarComp />        

                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="row">
                            <div className="col-md-12 grid-margin">
                                <div className="row">
                                    <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                                        <h3 className="font-weight-bold quick-text-add my-changes">
                                            Hi {user?.first_name}, <br />
                                            Ready to level up?
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="profile-form-add">
                            <div className="card">
                                <h3 className="text-your-name">Your Profile</h3>
                                <div className="upload-photo-add">
                                    <img src={`${FRONTEND_BASE_URL}/assets/images/faces/face-img.png`} alt="profile"  />
                                    <div className="upload-btn">
                                        <a href="#"><i className="bi bi-upload"></i> Upload photo</a>

                                    </div>
                                </div>

                                <div className="profile-form">
                                    <form>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label htmlFor="firstName">First Name*</label>
                                                <input
                                                    type="text"
                                                    id="firstName"
                                                    name="firstName"
                                                    required
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="lastName">Last Name</label>
                                                <input
                                                    type="text"
                                                    id="lastName"
                                                    name="lastName"
                                                    required
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="displayName">Display Name*</label>
                                                <input type="text" id="displayName" name="displayName" required />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="profile">Professional Profile</label>
                                                <input type="text" id="profile" name="profile" />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="email">Email*</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="location">Location</label>
                                                <select id="location" name="location">
                                                    <option value="">Select Location</option>
                                                    <option value="new-york">New York</option>
                                                </select>
                                            </div>


                                            <div className="form-group">
                                                <label htmlFor="topics">Preferred Coaching Topics</label>
                                                <textarea id="topics" name="topics" rows="3"></textarea>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="ageGroup">Age Group (Learner’s Demographic)</label>
                                                <select id="ageGroup" name="ageGroup">
                                                    <option value="">Select</option>
                                                    <option value="children">Children</option>
                                                    <option value="teens">Teens</option>
                                                    <option value="adults">Adults</option>
                                                    <option value="seniors">Seniors</option>
                                                </select>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="profession">Your Profession</label>
                                                <input type="text" id="profession" name="profession" />
                                            </div>


                                        </div>

                                        <p className="set-text-one">Set up to 3 coaching Goals</p>
                                        <p className="set-text">Briefly state your coaching goals (e.g., improve leadership presence, transition careers, manage stress better).
                                            This helps us match yu with the the most suitable coaches and allow you to track your own coaching progress. </p>

                                        <div className="form-group goal">
                                            <label htmlFor="goal1">Goal #1</label>
                                            <input type="text" name="goal1" />
                                        </div>

                                        <div className="form-group goal">
                                            <label htmlFor="goal1">Goal #2</label>
                                            <input type="text" name="goal2" />
                                        </div>


                                        <div className="form-group goal">
                                            <label htmlFor="goal1">Goal #3</label>
                                            <input type="text" name="goal3" />
                                        </div>



                                        <div className="form-row preference-input">
                                            <div className="form-group">
                                                <label htmlFor="language">Language Preference</label>
                                                <input type="text" id="language" name="language" placeholder="e.g., English, Hindi" />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="mode">Preferred Mode</label>
                                                <select id="mode" name="mode">
                                                    <option value="">Select Mode</option>
                                                    <option value="online">Online</option>
                                                    <option value="in-person">In-Person</option>
                                                    <option value="hybrid">Hybrid</option>
                                                </select>
                                            </div>
                                        </div>


                                        <div className="form-group">
                                            <label htmlFor="timings">Preferred Coaching Timings</label>
                                            <select id="timings" name="timings">
                                                <option value="">Select Timing</option>
                                                <option value="morning">Morning (8 AM - 12 PM)</option>
                                                <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                                                <option value="evening">Evening (4 PM - 8 PM)</option>
                                                <option value="weekends">Weekends</option>
                                                <option value="flexible">Flexible</option>
                                            </select>
                                        </div>


                                        <div className="form-group full-width">
                                            <label htmlFor="bio">Short Bio (Optional)</label>
                                            <textarea
                                                id="bio" name="bio" rows="3" placeholder="Write a short bio..."
                                                onChange={handleChange}
                                                value={formData.shortBio}></textarea>
                                        </div>

                                        <div className="form-group check-box">
                                            <input type="checkbox" id="coachAgreement" name="coachAgreement" />
                                            <label htmlFor="coachAgreement">I agree to let Coach Sparkle match me with relevant coaches</label>
                                        </div>


                                        <div className="save-btn">
                                            <button type="submit" className="save-btn-add">Save Changes <i className="bi bi-arrow-right"></i></button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
