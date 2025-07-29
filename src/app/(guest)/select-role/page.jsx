'use client';
import { HandleValidateToken } from '@/app/api/auth';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SelectRole() {
    const router = useRouter();
    const [role, setRole] = useState(null);

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            const fetchUser = async () => {
                const tokenData = await HandleValidateToken(token);
                if (tokenData) {
                    if (tokenData.data.user_type == 2) {
                        router.push('/user/dashboard');
                    } else if (tokenData.data.user_type == 3) {
                        router.push('/coach/dashboard');
                    }
                }
            };

            fetchUser();
        }
    }, []);


    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    const handleCreateAccount = () => {
        if (role) {
            sessionStorage.setItem('role', role);
            router.push('/register');
        } else {
            alert('Please select a role.');
        }
    };
    return (
        <>
            <div className="signup-page-add">
                <div className="container-fluid">
                    <div className="row signup-page-top">
                        <div className="col-md-12 signup-right-side">
                            <h4>Sign up as a User or Coach</h4>

                            <div className="card-container">
                                <label className="card">
                                    <input type="radio" name="role" value="2" onChange={handleRoleChange} />
                                    <img src="./images/user.png" alt="user" />
                                    <label>
                                        I'm User,<br />
                                        looking for Coach
                                    </label>
                                </label>

                                <label className="card">
                                    <input type="radio" name="role" value="3" onChange={handleRoleChange} />
                                    <img src="./images/coach.png" alt="coach" />
                                    <label>
                                        I'm a Coach,<br />
                                        ready to offer my services
                                    </label>
                                </label>
                            </div>


                            <button
                                className="btn-create"
                                onClick={handleCreateAccount}
                                style={{
                                    backgroundColor: '#009bfa',
                                    border: 'none',
                                    color: '#fff',
                                    height: '60px',
                                    textAlign: 'center',
                                    display: 'flex',
                                    alignItems: 'center',
                                    margin: 'auto',
                                    marginTop: '45px',
                                    borderRadius: '12px',
                                    width: '188px',
                                    justifyContent: 'center',
                                    fontWeight: 600,
                                    fontFamily: 'Inter',
                                    textDecoration: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                {role == 2 ? "Sign up as a User" : role == 3 ? "Sign up as a Coach" : "Create Account"}
                            </button>


                            <div className="login-link">Already have an account? <Link href="/login">Log in</Link></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}