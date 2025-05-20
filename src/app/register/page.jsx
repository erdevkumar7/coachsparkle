'use client';
import { useEffect, useState } from 'react';
import { BACK_END_BASE_URL } from "@/config/url_config";
import { HandleRegister } from "@/app/api/auth";
import axios from "axios";

export default function Register() {
    const [countries, setCountries] = useState([]);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        // email_optin: false,
        // terms: false,
        country_id: '',  // will be set from select box
        user_type: 2,
         user_timezone:"asia/calcutta"
    });

    useEffect(() => {
        axios.post(`${BACK_END_BASE_URL}/getCountries`)
            .then(response => {
                setCountries(response.data);
            })
            .catch(error => {
                console.error("Error fetching countries", error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if (!formData.terms) {
        //     alert('Please accept the terms and conditions.');
        //     return;
        // }

        // try {
        //     // const response = await API.post('register', formData); // Now uses baseURL
        //     //  console.log('User registered:', formData);

        // } catch (error) {
        //     console.error('Registration failed:', error);
        //     alert('Registration failed. Please try again.');
        // }


        try {
            const res = await HandleRegister(formData);
            // console.log('reessssponse',res)
            if (res.status === 201) {
                setTimeout(() => {
                    router.push("/login");
                }, 4000);
                // setLoading(false);
            }
        } catch (error) {
            console.log('error', error)
            // setLoading(false);
        }

    };

    return (
        <div className="signup-page-add signup-user-add">
            <div className="container-fluid">
                <div className="row signup-page-top signup-user">
                    <div className="col-md-5 signup-left-side">
                        <a className="navbar-logo-add" href="#"><img src="/images/signup-logo.png" alt="Logo" /></a>
                    </div>
                    <div className="col-md-7 signup-right-side sign-user-content">
                        <h2>User Sign Up</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="social-buttons">
                                <button type="button" className="apple-btn"><img src="/images/apple.png" alt="apple" />Continue with Apple</button>
                                <button type="button" className="google-btn"><img src="/images/google.png" alt="google" />Log in with Google</button>
                            </div>

                            <div className="divider"><span>or</span></div>

                            <div className="signup-coach" style={{ display: 'flex', gap: '10px' }}>
                                <div style={{ flex: 1 }}>
                                    <label htmlFor="first-name">First Name</label>
                                    <input id="first-name" name="first_name" type="text" value={formData.first_name} onChange={handleChange} required />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label htmlFor="last-name">Last Name</label>
                                    <input id="last-name" name="last_name" type="text" value={formData.last_name} onChange={handleChange} required />
                                </div>
                            </div>

                            <div className="input-group">
                                <label htmlFor="email">Work email address</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                            </div>

                            <div className="input-group">
                                <label htmlFor="password">Password</label>
                                <div className="password-add">
                                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                                    <i className="fa fa-eye" id="togglePassword" style={{ cursor: 'pointer' }}></i>
                                </div>
                            </div>

                            <div className="input-group">
                                <label htmlFor="password_confirmation">Confirm Password</label>
                                <div className="password-add">
                                    <input type="password" id="password_confirmation" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} required />
                                    <i className="fa fa-eye" id="togglePassword" style={{ cursor: 'pointer' }}></i>
                                </div>
                            </div>

                            <label htmlFor="country">Country</label>
                            {/* <select name="country_id" value={formData.country} onChange={handleChange} required>
                                <option value="India">India</option>
                            </select> */}

                            <select
                                name="country_id"
                                value={formData.country_id}
                                onChange={(e) =>
                                    setFormData({ ...formData, country_id: e.target.value })
                                }
                                required
                            >
                                <option value="">Select Country</option>
                                {countries.map((country) => (
                                    <option key={country.country_id} value={country.country_id}>
                                        {country.country_name}
                                    </option>
                                ))}
                            </select>

                            <div className="checkbox-row">
                                <input type="checkbox" id="email-optin-1" name="email_optin" />
                                <label htmlFor="email-optin-1">Send me emails with tips on how to find talent that fits my needs.</label>
                            </div>

                            <div className="checkbox-row">
                                <input type="checkbox" id="terms" name="terms" />
                                <label htmlFor="terms">Yes, I have read and agree to the terms & conditions</label>
                            </div>

                            {/* Hidden field - included in formData */}
                            <input type="hidden" name="user_type" value="user" />

                            <button type="submit" className="create-btn-aad">Apply as a User</button>

                            <div className="login-link">Already have an account? <a href="#">Log in</a></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}