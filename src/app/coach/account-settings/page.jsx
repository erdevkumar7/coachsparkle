"use client";
import UserImageUploader from "@/app/user/_user_components/ImageUploader";
import "../_styles/coach_account_section.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import PasswordField from "@/components/PasswordField";
import ToggleSwitch from "@/components/ToggleSwitch";
import { useState } from "react";

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
        <UserImageUploader
          image="/coachsparkle/images/coach-list-img-two.png"
          alt="coachsparkle"
        />
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
              <div className="d-flex gap-2">
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
          <form className="account-setting-form mt-5">
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
            <h3 className="quick-text mt-2">Notifications</h3>
            <div className="d-flex gap-2 flex-wrap">
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
        </div>
      </div>
    </div>
  );
}
