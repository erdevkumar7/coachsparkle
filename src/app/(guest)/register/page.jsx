'use client';
import Link from "next/link";
// import "./globals.css";
import { useEffect, useState, Suspense } from 'react';
import { HandleRegister } from "@/app/api/auth";
import axios from "axios";
import { useRouter } from 'next/navigation';


export default function Register() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();
    const [userType, setUserType] = useState(null);
    const [countries, setCountries] = useState([]);
    const [errors, setErrors] = useState({}); // for field-specific errors
    const [generalError, setGeneralError] = useState("");
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        country_id: 199,
        user_type: '',
        user_timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'asia/calcutta'
    });

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.post(`${apiUrl}/getCountries`);
                setCountries(response.data);
            } catch (error) {
                console.error('Error fetching countries', error);
            }
        };

        fetchCountries();
    }, []);

    // Get user role from URL query
    useEffect(() => {
        const storedRole = sessionStorage.getItem('role');
        if (!storedRole) {
            router.replace("/select-role");
        } else {
            const parsedRole = parseInt(storedRole, 10);
            setUserType(parsedRole);
            setFormData((prev) => ({ ...prev, user_type: parsedRole }));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];

                return newErrors;
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setGeneralError("");

        const res = await HandleRegister(formData);

        if (res.success) {
            router.push("/login");
        } else {
            setErrors(res.errors);
            setGeneralError(res.message);
        }
    };


    return (
        <>
            <div className="signup-page-add signup-user-add">
                <div className="container-fluid">
                    <div className="row signup-page-top signup-user">
                        <div className="col-md-12 signup-right-side sign-user-content">
                            <h2>
                                {userType === 2
                                    ? 'User Sign Up'
                                    : userType === 3
                                        ? 'Coach Sign Up'
                                        : 'Sign Up'}
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <div className="social-buttons">
                                    <button type="button" className="apple-btn"><img src="./images/apple.png" alt="apple" />Continue with Apple</button>
                                    <button type="button" className="google-btn"><img src="./images/google.png" alt="google" />Log in with Google</button>
                                </div>

                                <div className="divider"><span>or</span></div>

                                <div className="signup-coach" style={{ display: 'flex', gap: '10px' }}>
                                    <div style={{ flex: 1 }}>
                                        <label htmlFor="first-name">First Name</label>
                                        <input id="first-name" name="first_name" type="text" value={formData.first_name} onChange={handleChange} required />
                                        {errors.first_name && <p className="text-red-600 regist-err-msg" style={{ color: 'red' }}>{errors.first_name[0]}</p>}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label htmlFor="last-name">Last Name</label>
                                        <input id="last-name" name="last_name" type="text" value={formData.last_name} onChange={handleChange} required />
                                        {errors.last_name && <p className="text-red-600 regist-err-msg" style={{ color: 'red' }}>{errors.last_name[0]}</p>}
                                    </div>
                                </div>

                                <div className="input-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                                    {errors.email && <p className="text-red-600 regist-err-msg" style={{ color: 'red' }}>{errors.email[0]}</p>}
                                </div>

                                <div className="input-group">
                                    <label htmlFor="password">Password</label>
                                    <div className="password-add">
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Password (8 or more characters)"
                                            required
                                        />
                                        <i className="fa fa-eye" id="togglePassword" style={{ cursor: 'pointer' }}></i>
                                    </div>
                                    {errors.password && <p className="text-red-600 regist-err-msg" style={{ color: 'red' }}>{errors.password[0]}</p>}
                                </div>

                                {/* <div className="input-group">
                                    <label htmlFor="password_confirmation">Confirm Password</label>
                                    <div className="password-add">
                                        <input
                                            type="password"
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            value={formData.password_confirmation}
                                            onChange={handleChange}
                                            required />
                                        <i className="fa fa-eye" id="togglePassword" style={{ cursor: 'pointer' }}></i>
                                    </div>
                                    {errors.password_confirmation && (
                                        <p className="text-red-600 regist-err-msg" style={{ color: 'red' }}>{errors.password_confirmation[0]}</p>
                                    )}
                                </div> */}


                                <label htmlFor="country">Country</label>
                                <select
                                    name="country_id"
                                    value={formData.country_id}
                                    onChange={(e) =>
                                        setFormData({ ...formData, country_id: e.target.value })
                                    }
                                    required
                                >
                                    <option value="199">Singapore</option>
                                    {countries.map((country) => (
                                        <option key={country.country_id} value={country.country_id}>
                                            {country.country_name}
                                        </option>
                                    ))}
                                </select>


                                <div className="checkbox-row">
                                    <input type="checkbox" id="email-optin-1" name="email_optin" />
                                    <label htmlFor="email-optin-1">Yes, I'd like to receive updates, tips and news from Coach Sparkle about coaching insights,
                                        featured coaches and new features.</label>
                                </div>

                                <div className="checkbox-row">
                                    <input type="checkbox" id="terms" name="terms" />
                                    <label htmlFor="terms">Yes, I have read and agree to the Terms of Use and Privacy Policy</label>
                                </div>

                                {/* Hidden field - included in formData */}
                                <input type="hidden" name="user_type" value="user" />

                                <button type="submit" className="create-btn-aad">{userType === 2
                                    ? 'Sign up as a User'
                                    : userType === 3
                                        ? 'Sign up as a Coach'
                                        : 'Sign Up'}</button>

                                <div className="login-link">Already have an account? <Link href="/login">Log in</Link></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


