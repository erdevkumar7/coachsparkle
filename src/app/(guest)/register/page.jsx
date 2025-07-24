'use client';
import Link from "next/link";
import { useEffect, useState, Suspense } from 'react';
import { HandleRegister } from "@/app/api/auth";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from "@/lib/validationSchema";
import { toast } from 'react-toastify';

export default function Register() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();
    const [userType, setUserType] = useState(null);
    const [countries, setCountries] = useState([]);
    const [generalError, setGeneralError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword((prev) => !prev);
    };


    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        setError,
        clearErrors,
    } = useForm({
        resolver: yupResolver(registerSchema),
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

            setValue('user_type', parsedRole);
        }
    }, []);


    const onSubmit = async (data) => {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Calcutta';

        const finalData = {
            ...data,
            user_timezone: timezone,
        };
        const res = await HandleRegister(finalData);

        if (res.success) {
            // toast.success("Registration successful!");
            // router.push('/login');
            router.push('/login?registered=1');
        } else {
            setGeneralError(res.message);
            if (res.errors) {
                Object.entries(res.errors).forEach(([field, msgs]) => {
                    setError(field, { message: msgs[0] });
                });
            }
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
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="social-buttons">
                                    <button type="button" className="apple-btn"><img src="./images/apple.png" alt="apple" />Continue with Apple</button>
                                    <button type="button" className="google-btn"><img src="./images/google.png" alt="google" />Log in with Google</button>
                                </div>

                                <div className="divider"><span>or</span></div>

                                <div className="signup-coach" style={{ display: 'flex', gap: '10px' }}>
                                    <div style={{ flex: 1 }}>
                                        <label htmlFor="first-name">First Name</label>
                                        <input {...register("first_name")} />
                                        {errors.first_name && <p className="text-red-600 regist-err-msg" style={{ color: 'red' }}>{errors.first_name.message}</p>}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label htmlFor="last-name">Last Name</label>
                                        <input {...register("last_name")} />
                                        {errors.last_name && <p className="text-red-600 regist-err-msg" style={{ color: 'red' }}>{errors.last_name.message}</p>}
                                    </div>
                                </div>

                                <div className="input-group">
                                    <label htmlFor="email">Email</label>
                                    <input {...register("email")} />
                                    {errors.email && <p className="text-red-600 regist-err-msg" style={{ color: 'red' }}>{errors.email.message}</p>}
                                </div>

                                <div className="input-group">
                                    <label htmlFor="password">Password</label>
                                    <div className="password-add">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            {...register("password")}
                                        />
                                        <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                                            onClick={togglePassword} id="togglePassword" style={{ cursor: 'pointer' }}></i>
                                    </div>
                                    {errors.password && <p className="text-red-600 regist-err-msg" style={{ color: 'red' }}>{errors.password.message}</p>}
                                </div>


                                <label htmlFor="country">Country</label>
                                <select {...register('country_id')}>
                                    <option value="199">Singapore</option>
                                    {countries?.map((country) => (
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
                                    <input type="checkbox" id="terms" {...register('terms')} />
                                    <label htmlFor="terms">Yes, I have read and agree to the Terms of Use and Privacy Policy</label>
                                </div>
                                {errors.terms && <p className="text-red-600 regist-err-msg" style={{ color: 'red' }}>{errors.terms.message}</p>}
                                {/* Hidden field - included in formData */}
                                {/* <input type="hidden" name="user_type" value="user" /> */}

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


