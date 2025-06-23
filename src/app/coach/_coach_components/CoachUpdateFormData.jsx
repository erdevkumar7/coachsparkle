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
        professional_title: '',
        company_name: '',
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



                    <div className="row ">
                        <div className="col-md-4">
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
                        </div>

                        <div className="col-md-4">
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
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="city_id">City</label>
                                <select
                                    id="city_id"
                                    name="city_id"
                                    value={formData.city_id}
                                    onChange={handleChange}

                                >
                                    <option value=""></option>
                                    {/* {cities.map((city) => (
                                        <option key={city.city_id} value={city.city_id}>
                                            {city.city_name}
                                        </option>
                                    ))} */}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row ">
                       <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="city_id">Main Coaching Category</label>
                                <select
                                    id="city_id"
                                    name="city_id"
                                    value={formData.city_id}
                                    onChange={handleChange}

                                >
                                    <option value="">Select Coaching</option>
                                  
                                </select>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="country_id">Sub Coaching Category</label>
                                <select
                                    id="country_id"
                                    name="country_id"
                                    value={formData.country_id}
                                    onChange={handleChange}

                                >
                                    <option value="">Select Sub category</option>
                                 
                                </select>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="city_id">Gender*</label>
                                <select
                                    id="city_id"
                                    name="city_id"
                                    value={formData.city_id}
                                    onChange={handleChange}

                                >
                                    <option value="">Select </option>
                                  
                                </select>
                            </div>
                        </div>
                    </div>


                    <div className="form-group">
                        <label htmlFor="professional_title">Professional Title</label>
                        <input
                            type="text"
                            id="professional_title"
                            name="professional_title"
                            required
                            value={formData.professional_title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="company_name">Company name</label>
                        <input
                            type="text"
                            id="company_name"
                            name="company_name"
                            required
                            value={formData.company_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="city_id">City</label>
                        <select
                            id="city_id"
                            name="city_id"
                            value={formData.city_id}
                            onChange={handleChange}

                        >
                            <option value=""></option>

                        </select>
                    </div>

                </div>



                <div className="save-btn">
                    <button type="submit" className="save-btn-add">Save Changes <i className="bi bi-arrow-right"></i></button>
                </div>
            </form>
        </div>
    );
};