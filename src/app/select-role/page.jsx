'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
// import "./globals.css";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SelectRole() {
    const router = useRouter();
    const [role, setRole] = useState(null);


    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    const handleCreateAccount = () => {
        if (role) {
            router.push(`/register?role=${role}`);
        } else {
            alert('Please select a role.');
        }
    };
    return (
        <>
            <Header />
            <div className="signup-page-add">
                <div className="container-fluid">
                    <div className="row signup-page-top">
                        <div className="col-md-5 signup-left-side">
                            <a className="navbar-logo-add" href="#"><img src="./images/signup-logo.png" alt="Logo" /></a>
                        </div>
                        <div className="col-md-7 signup-right-side">
                            <h4>Join as a user or coach</h4>

                            <div className="card-container">
                                <label className="card">
                                    <input type="radio" name="role" value="2" onChange={handleRoleChange} />
                                    <img src="./images/user.png" alt="user" />
                                    <label>
                                        I'm user,<br />
                                        hiring a work
                                    </label>
                                </label>

                                <label className="card">
                                    <input type="radio" name="role" value="3" onChange={handleRoleChange} />
                                    <img src="./images/coach.png" alt="coach" />
                                    <label>
                                        I'm a coach,<br />
                                        looking for work
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
                                CREATE ACCOUNT
                            </button>


                            <div className="login-link">Already have an account? <a href="#">Log in</a></div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}