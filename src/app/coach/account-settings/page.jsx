"use client";
import UserImageUploader from "@/app/user/_user_components/ImageUploader";
import "../_styles/coach_account_section.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import PasswordField from "@/components/PasswordField";
import ToggleSwitch from "@/components/ToggleSwitch";
import { useState } from "react";
import PublicOffIcon from "@mui/icons-material/PublicOff";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import CookieIcon from "@mui/icons-material/Cookie";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

export default function AccountSettings() {
  const [newCoachEnabled, setNewCoachEnabled] = useState(true);
  const [msgEnabled, setMsgEnabled] = useState(true);
  const [bookingEnabled, setBookingEnabled] = useState(true);
  const [requestEnabled, setRequestEnabled] = useState(true);
  const [announcementEnabled, setAnnouncementEnabled] = useState(true);
  const [blogEnabled, setBlogEnabled] = useState(true);
  const [billingEnabled, setBillingEnabled] = useState(true);

  return (
    <div className="main-panel account-section">
      <div className="account-setting">
        <h3 className="quick-text">Account Setting</h3>
        <div className="mt-4">
          <UserImageUploader
            image="/coachsparkle/images/coach-list-img-two.png"
            alt="coachsparkle"
          />
        </div>
        <form className="account-setting-form">
          <div className="account-form">
            <div className="account-form-row account-two-cols">
              <div className="account-form-group">
                <label>First Name*</label>
                <input
                  required
                  type="text"
                  name="first_name"
                  placeholder="Emma"
                />
              </div>
              <div className="account-form-group">
                <label>Last Name*</label>
                <input
                  required
                  type="text"
                  name="last_name"
                  placeholder="Rose"
                />
              </div>
            </div>

            <div className="account-form-row account-three-cols">
              <div className="account-form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                />
              </div>
              <div className="account-form-group">
                <label>Language Setting</label>
                <select name="language">
                  <option>English</option>
                </select>
              </div>
              <div className="account-form-group">
                <label>Phone Number</label>
                <PhoneInput country={"us"} />
              </div>
            </div>

            <div className="account-form-row account-two-cols">
              <div className="account-form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter your address"
                />
              </div>
              <div className="account-form-group">
                <label>Zip code</label>
                <input
                  required
                  type="text"
                  name="last_name"
                  placeholder="Enter your zip code"
                />
              </div>
            </div>
            <div>
              <span className="d-block">
                Consent to Data Sharing and AI Matching
              </span>
              <div className="d-flex gap-2 pt-2">
                <input type="checkbox" />
                <label htmlFor="corporateCheck">
                  I agree to let Coach Sparkle match my services to help users
                  achieve their coaching goals.
                </label>
              </div>
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
                  <PasswordField
                    label="Current Password"
                    name="current_password"
                  />
                </div>
                <div className="account-form-group">
                  <PasswordField label="New Password" name="new_password" />
                </div>
                <div className="account-form-group">
                  <PasswordField
                    label="Confirm Password"
                    name="confirm_password"
                  />
                </div>
              </div>
              <div>
                <button className="save-changes-btn">Save Changes</button>
              </div>
            </div>
          </form>

          <div className="notification-section mt-5">
            <h3 className="quick-text">Notifications</h3>
            <div className="d-flex gap-2 flex-wrap mt-4">
              <ToggleSwitch
                label="New Coach Match Alert"
                value={newCoachEnabled}
                onChange={setNewCoachEnabled}
                onLabel="ON"
                offLabel="OFF"
              />
              <ToggleSwitch
                label="Message Notifications"
                value={msgEnabled}
                onChange={setMsgEnabled}
                onLabel="ON"
                offLabel="OFF"
              />
              <ToggleSwitch
                label="Booking Reminders"
                value={bookingEnabled}
                onChange={setBookingEnabled}
                onLabel="ON"
                offLabel="OFF"
              />
              <ToggleSwitch
                label="Coaching Request Status"
                value={requestEnabled}
                onChange={setRequestEnabled}
                onLabel="ON"
                offLabel="OFF"
              />

              <ToggleSwitch
                label="Platform Announcements"
                value={announcementEnabled}
                onChange={setAnnouncementEnabled}
                onLabel="ON"
                offLabel="OFF"
              />
              <ToggleSwitch
                label="Blog / Article Recommendations"
                value={blogEnabled}
                onChange={setBlogEnabled}
                onLabel="ON"
                offLabel="OFF"
              />
              <ToggleSwitch
                label="Billing Updates"
                value={billingEnabled}
                onChange={setBillingEnabled}
                onLabel="ON"
                offLabel="OFF"
              />
            </div>
          </div>
          <div className="privacy-section mt-5">
            <h3 className="quick-text">Data & Privacy Control</h3>
            <div className="mt-4">
              <div className="d-flex gap-2 mb-2 pt-2">
                <PublicOffIcon className="mui-icons" />
                <span className="title">Profile Visibility</span>
                <input type="checkbox" />
                <label htmlFor="public">Public</label>
                <input type="checkbox" />
                <label htmlFor="private">Private</label>
              </div>
              <div className="d-flex gap-2 mb-2 pt-2">
                <PodcastsIcon className="mui-icons" />
                <span className="title">Communication Preference</span>
                <input type="checkbox" />
                <label htmlFor="email">Email</label>
                <input type="checkbox" />
                <label htmlFor="inapp">In-App</label>
                <input type="checkbox" />
                <label htmlFor="push-toggles">Push Toggles</label>
              </div>
              <div className="d-flex gap-2 mb-2 pt-2">
                <i className="bi bi-openai mui-icons"></i>
                <span className="title">Allow AI Matching</span>
                <input type="checkbox" />
                <label htmlFor="agree">I agree to AI Personalization</label>
              </div>
              <div className="d-flex gap-2 mb-2 pt-2">
                <CookieIcon className="mui-icons" />
                <span className="title">Manage Cookie Preferences</span>
              </div>
              <div className="d-flex gap-2 mb-2 pt-2">
                <PersonSearchIcon className="mui-icons" />
                <span className="title">
                  View Terms of Use & Privacy Policy
                </span>
              </div>
            </div>
          </div>
          <div className="delete-account mt-5">
            <h3 className="quick-text">Delete Account</h3>
            <p>
              Are you sure you want to delete your account? This action is
              permanent and cannot be undone. All your data, messages, and
              coaching history will be permanently removed.
            </p>
            <div className="d-flex gap-2">
              <input type="checkbox" />
              <label htmlFor="delete">
                I understand and wish to proceed with account deletion.
              </label>
            </div>
            <button className="delete-btn d-flex gap-2 align-items-center"><i className="bi bi-trash fs-5"></i>Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  );
}
