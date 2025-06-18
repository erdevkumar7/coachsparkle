"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";

export default function UserUpdateFormData({ user, countries, deliveryMode }) {    
    const router = useRouter();
    const [getToken, setToken] = useState();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const [formData, setFormData] = useState({
        user_type: user.user_type || 2,
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        country_id: user.country_id || '',
        display_name: user.display_name || '',
        professional_profile: user.professional_profile || '',
        professional_title: user.professional_title || '',
    });


    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        //    const token = localStorage.getItem("token");
        const token = Cookies.get('token');
        if (!token) {
            router.push("/login");
            return;
        }
        setToken(token);
    };



    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${apiUrl}/updateProfile`, formData, {
                headers: {
                    Authorization: `Bearer ${getToken}`,
                    Accept: 'application/json'
                },
            });

            if (res.data.success) {
                alert('Profile updated successfully!');
            } else {
                alert('Update failed.');
            }
        } catch (err) {
            console.error(err);
            alert('Error updating profile.');
        }
    };



    // console.log('user', user.country_id)
    return (
        <div className="profile-form">
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="firstName">First Name*</label>
                        <input
                            type="text"
                            id="firstName"
                            name="first_name"
                            required
                            value={formData.first_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="last_name"
                            required
                            value={formData.last_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="display_name">Display Name*</label>
                        <input
                            required
                            type="text"
                            id="display_name"
                            name="display_name"
                            value={formData.display_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="professional_profile">Professional Profile</label>
                        <input
                            type="text"
                            id="professional_profile"
                            name="professional_profile"
                            value={formData.professional_profile}
                            onChange={handleChange}
                        />
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
                        <label htmlFor="country_id">Country</label>
                        <select
                            id="country_id"
                            name="country_id"
                            value={formData.country_id}
                            onChange={handleChange}

                        >
                            <option value="">Select Country</option>
                            {countries.map((country) => (
                                <option key={country.country_id} value={country.country_id}>
                                    {country.country_name}
                                </option>
                            ))}
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
                        <label htmlFor="professional_title">Your Profession</label>
                        <input
                            type="text"
                            id="professional_title"
                            name="professional_title"
                            value={formData.professional_title}
                            onChange={handleChange}
                        />
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
    );
};