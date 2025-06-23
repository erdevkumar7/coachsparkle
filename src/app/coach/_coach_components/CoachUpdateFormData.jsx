"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";

export default function CoachUpdateForm({ user, countries, deliveryMode }) {    
    const router = useRouter();
    const [getToken, setToken] = useState();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const [formData, setFormData] = useState({
        user_type: user?.user_type || 3,
        first_name: user?.first_name || '',
        last_name: user?.last_name || '',
        email: user?.email || '',
        country_id: user?.country_id || '',
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
          


                <div className="save-btn">
                    <button type="submit" className="save-btn-add">Save Changes <i className="bi bi-arrow-right"></i></button>
                </div>
            </form>
        </div>
    );
};