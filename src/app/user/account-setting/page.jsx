"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../_styles/dashboard.css";
import "../_styles/profile.css";
import "../_styles/account.css";
import Cookies from "js-cookie";
import { HandleValidateToken } from "@/app/api/auth";

export default function Accountsetting() {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            router.push('/login');
            return;
        }
        const fetchUser = async () => {
            const tokenData = await HandleValidateToken(token);
            if (!tokenData) {
                Cookies.remove('token');
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                router.push('/login');
                return;
            }

            setUser(tokenData.data)
        };

        fetchUser();
    }, []);

    return (
        <div className="main-panel account-section">
   <div className="account-setting">
    <h3 className="quick-text">Account Setting</h3>
    <div className="mt-4">
        <div className="upload-photo-add">
            <img src="/coachsparkle/images/coach-list-img-two.png" alt="profile" />
            <div className="user-upload-btn">
                <label for="upload-photo-input" style={{ cursor: 'pointer' }}><i className="bi bi-upload"></i> Upload photo</label><input type="file" id="upload-photo-input" style={{ display: 'none' }} accept="image/*" />
            </div>
        </div>
    </div>
    <form className="account-setting-form">
        <div className="account-form">
            <div className="account-form-row account-two-cols">
                <div className="account-form-group"><label>First Name</label><input required="" type="text" placeholder="Emma" name="first_name" /></div>
                <div className="account-form-group"><label>Last Name</label><input required="" type="text" placeholder="Rose" name="last_name" /></div>
            </div>
            <div className="account-form-row account-three-cols">
                <div className="account-form-group"><label>Email</label><input type="email" placeholder="Enter your email" name="email" /></div>
                <div className="account-form-group">
                    <label>Language Setting</label>
                    <select name="language">
                        <option>English</option>
                    </select>
                </div>
                <div className="account-form-group">
                    <label>Phone Number</label>
                    <div className="react-tel-input">
                        <input className="form-control" placeholder="1 (702) 123-4567" type="tel" value="+1" />
                        <div className="flag-dropdown">
                            <div className="selected-flag" title="United States: + 1" tabindex="0" role="button" aria-haspopup="listbox">
                                <div className="flag us"><div className="arrow"></div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="account-form-row account-two-cols">
                <div className="account-form-group"><label>Location</label><input type="text" placeholder="Enter your address" name="address" /></div>
                <div className="account-form-group"><label>Zip code</label><input required="" type="text" placeholder="Enter your zip code" name="last_name" /></div>
            </div>
            <div>
                <span className="d-block">Consent to Data Sharing and AI Matching</span>
                <div className="d-flex gap-2 pt-2"><input type="checkbox" /><label for="corporateCheck">I agree to let Coach Sparkle match my services to help users achieve their coaching goals.</label></div>
                <button className="save-changes-btn">Save Changes</button>
            </div>
        </div>
    </form>
    <div className="password-section mt-5">
        <h3 className="quick-text">Change Password</h3>
        <form className="account-setting-form mt-4">
            <div className="account-form">
                <div className="account-form-row account-three-cols">
                    <div className="account-form-group">
                        <div className="password-field">
                            <label className="form-label">Current Password</label>
                            <div className="input-wrapper">
                                <input type="password" placeholder="Password" className="form-control" name="current_password" /><button type="button" className="toggle-btn"><i className="bi bi-eye"></i></button>
                            </div>
                        </div>
                    </div>
                    <div className="account-form-group">
                        <div className="password-field">
                            <label className="form-label">New Password</label>
                            <div className="input-wrapper">
                                <input type="password" placeholder="Password" className="form-control" name="new_password" /><button type="button" className="toggle-btn"><i className="bi bi-eye"></i></button>
                            </div>
                        </div>
                    </div>
                    <div className="account-form-group">
                        <div className="password-field">
                            <label className="form-label">Confirm Password</label>
                            <div className="input-wrapper">
                                <input type="password" placeholder="Password" className="form-control" name="confirm_password" /><button type="button" className="toggle-btn"><i className="bi bi-eye"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div><button className="save-changes-btn">Save Changes</button></div>
            </div>
        </form>
        <div className="notification-section mt-5">
            <h3 className="quick-text">Notifications</h3>
            <div className="d-flex gap-2 flex-wrap mt-4">
                <div className="d-flex align-items-center gap-2 mb-3">
                    <span className="title">New Coach Match Alert</span>
                    <div className="toggle-switch active" role="button" style={{ userSelect: 'none' }}>
                        <div className="switch-knob"></div>
                        <span className="switch-label">ON</span>
                    </div>
                </div>
                <div className="d-flex align-items-center gap-2 mb-3">
                    <span className="title">Message Notifications</span>
                    <div className="toggle-switch active" role="button" style={{ userSelect: 'none' }}>
                        <div className="switch-knob"></div>
                        <span className="switch-label">ON</span>
                    </div>
                </div>
                <div className="d-flex align-items-center gap-2 mb-3">
                    <span className="title">Booking Reminders</span>
                    <div className="toggle-switch active" role="button" style={{ userSelect: 'none' }}>
                        <div className="switch-knob"></div>
                        <span className="switch-label">ON</span>
                    </div>
                </div>
                <div className="d-flex align-items-center gap-2 mb-3">
                    <span className="title">Coaching Request Status</span>
                    <div className="toggle-switch active" role="button" style={{ userSelect: 'none' }}>
                        <div className="switch-knob"></div>
                        <span className="switch-label">ON</span>
                    </div>
                </div>
                <div className="d-flex align-items-center gap-2 mb-3">
                    <span className="title">Platform Announcements</span>
                    <div className="toggle-switch active" role="button" style={{ userSelect: 'none' }}>
                        <div className="switch-knob"></div>
                        <span className="switch-label">ON</span>
                    </div>
                </div>
                <div className="d-flex align-items-center gap-2 mb-3">
                    <span className="title">Blog / Article Recommendations</span>
                    <div className="toggle-switch active" role="button" style={{ userSelect: 'none' }}>
                        <div className="switch-knob"></div>
                        <span className="switch-label">ON</span>
                    </div>
                </div>
                <div className="d-flex align-items-center gap-2 mb-3">
                    <span className="title">Billing Updates</span>
                    <div className="toggle-switch active" role="button" style={{ userSelect: 'none' }}>
                        <div className="switch-knob"></div>
                        <span className="switch-label">ON</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="privacy-section mt-5">
            <h3 className="quick-text">Data &amp; Privacy Control</h3>
            <div className="mt-4">
                <div className="d-flex gap-2 mb-2">
                    <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium mui-icons css-1umw9bq-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="PublicOffIcon">
                        <path
                            d="M11 8.17 6.49 3.66C8.07 2.61 9.96 2 12 2c5.52 0 10 4.48 10 10 0 2.04-.61 3.93-1.66 5.51l-1.46-1.46C19.59 14.87 20 13.48 20 12c0-3.35-2.07-6.22-5-7.41V5c0 1.1-.9 2-2 2h-2zm10.19 13.02-1.41 1.41-2.27-2.27C15.93 21.39 14.04 22 12 22 6.48 22 2 17.52 2 12c0-2.04.61-3.93 1.66-5.51L1.39 4.22 2.8 2.81zM11 18c-1.1 0-2-.9-2-2v-1l-4.79-4.79C4.08 10.79 4 11.38 4 12c0 4.08 3.05 7.44 7 7.93z"
                        ></path>
                    </svg>
                    <span className="title">Profile Visibility</span><input type="checkbox" /><label for="public">Public</label><input type="checkbox" /><label for="private">Private</label>
                </div>
                <div className="d-flex gap-2 mb-2">
                    <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium mui-icons css-1umw9bq-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="PodcastsIcon">
                        <path
                            d="M14 12c0 .74-.4 1.38-1 1.72V22h-2v-8.28c-.6-.35-1-.98-1-1.72 0-1.1.9-2 2-2s2 .9 2 2m-2-6c-3.31 0-6 2.69-6 6 0 1.74.75 3.31 1.94 4.4l1.42-1.42C8.53 14.25 8 13.19 8 12c0-2.21 1.79-4 4-4s4 1.79 4 4c0 1.19-.53 2.25-1.36 2.98l1.42 1.42C17.25 15.31 18 13.74 18 12c0-3.31-2.69-6-6-6m0-4C6.48 2 2 6.48 2 12c0 2.85 1.2 5.41 3.11 7.24l1.42-1.42C4.98 16.36 4 14.29 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 2.29-.98 4.36-2.53 5.82l1.42 1.42C20.8 17.41 22 14.85 22 12c0-5.52-4.48-10-10-10"
                        ></path>
                    </svg>
                    <span className="title">Communication Preference</span><input type="checkbox" /><label for="email">Email</label><input type="checkbox" /><label for="inapp">In-App</label><input type="checkbox" />
                    <label for="push-toggles">Push Toggles</label>
                </div>
                <div className="d-flex gap-2 mb-2"><i className="bi bi-openai mui-icons"></i><span className="title">Allow AI Matching</span><input type="checkbox" /><label for="agree">I agree to AI Personalization</label></div>
                <div className="d-flex gap-2 mb-2">
                    <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium mui-icons css-1umw9bq-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CookieIcon">
                        <path
                            d="M21.95 10.99c-1.79-.03-3.7-1.95-2.68-4.22-2.98 1-5.77-1.59-5.19-4.56C6.95.71 2 6.58 2 12c0 5.52 4.48 10 10 10 5.89 0 10.54-5.08 9.95-11.01M8.5 15c-.83 0-1.5-.67-1.5-1.5S7.67 12 8.5 12s1.5.67 1.5 1.5S9.33 15 8.5 15m2-5C9.67 10 9 9.33 9 8.5S9.67 7 10.5 7s1.5.67 1.5 1.5-.67 1.5-1.5 1.5m4.5 6c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1"
                        ></path>
                    </svg>
                    <span className="title">Manage Cookie Preferences</span>
                </div>
                <div className="d-flex gap-2">
                    <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium mui-icons css-1umw9bq-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="PersonSearchIcon">
                        <circle cx="10" cy="8" r="4"></circle>
                        <path
                            d="M10.35 14.01C7.62 13.91 2 15.27 2 18v2h9.54c-2.47-2.76-1.23-5.89-1.19-5.99m9.08 4.01c.36-.59.57-1.28.57-2.02 0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4c.74 0 1.43-.22 2.02-.57L20.59 22 22 20.59zM16 18c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2"
                        ></path>
                    </svg>
                    <span className="title">View Terms of Use &amp; Privacy Policy</span>
                </div>
            </div>
        </div>
        <div className="delete-account mt-5">
            <h3 className="quick-text">Delete Account</h3>
            <p>Are you sure you want to delete your account? This action is permanent and cannot be undone. All your data, messages, and coaching history will be permanently removed.</p>
            <div className="d-flex gap-2"><input type="checkbox" /><label for="delete">I understand and wish to proceed with account deletion.</label></div>
            <button className="delete-btn d-flex gap-2 align-items-center"><i className="bi bi-trash fs-5"></i>Delete Account</button>
        </div>
    </div>
</div>


      </div>

    );
}
