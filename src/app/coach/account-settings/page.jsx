"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../_styles/coach_account_section.css";
import Cookies from "js-cookie";
import { HandleValidateToken } from "@/app/api/auth";
import UserImageUploader from "@/app/user/_user_components/ImageUploader";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import PasswordField from "@/components/PasswordField";
import ToggleSwitch from "@/components/ToggleSwitch";
import PublicOffIcon from "@mui/icons-material/PublicOff";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import CookieIcon from "@mui/icons-material/Cookie";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  userAccountSettingSchema,
  passwordSchema,
} from "@/lib/validationSchema";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { Controller } from "react-hook-form";

export default function Accountsetting() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [newCoachEnabled, setNewCoachEnabled] = useState(true);
  const [msgEnabled, setMsgEnabled] = useState(true);
  const [bookingEnabled, setBookingEnabled] = useState(true);
  const [requestEnabled, setRequestEnabled] = useState(true);
  const [announcementEnabled, setAnnouncementEnabled] = useState(true);
  const [blogEnabled, setBlogEnabled] = useState(true);
  const [billingEnabled, setBillingEnabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const accountForm = useForm({
    resolver: yupResolver(userAccountSettingSchema),
    mode: "onBlur",
  });

  const passwordForm = useForm({
    resolver: yupResolver(passwordSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
      return;
    }
    const fetchUser = async () => {
      const tokenData = await HandleValidateToken(token);
      if (!tokenData) {
        Cookies.remove("token");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
        return;
      }

      setUser(tokenData.data);
    };

    fetchUser();
  }, []);

  const onAccountSave = async (data) => {
    try {
      setLoading(true);

      console.log("Account settings submitted:", data);

      toast.success("Account settings updated!");

    } catch (error) {
      console.error("Account settings update failed:", error);
      toast.error("Failed to update settings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onPasswordSave = async (data) => {
    try {
      setLoading(true);

      const token = Cookies.get("token");
      if (!token) {
        toast.error("Session expired, Please login again.");
        router.push("/login");
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          current_password: data.current_password,
          new_password: data.new_password,
          new_password_confirmation: data.confirm_password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          Object.values(result.errors).forEach((msgs) => {
            msgs.forEach((msg) => toast.error(msg));
          });
        }
        else if (result.error) {
          toast.error(result.error);
        }
        else {
          toast.error(result.message || "Failed to update password");
        }
        return;
      }

      toast.success(result.message || "Password updated successfully!");
      passwordForm.reset();

    } catch (error) {
      console.error("Failed to update password", error);
      toast.error("Error updating password. Please try again.");
    } finally {
      setLoading(false);
    }
  };


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
        <form
          className="account-setting-form"
          onSubmit={accountForm.handleSubmit(onAccountSave)}
        >
          <div className="account-form">
            <div className="account-form-row account-two-cols">
              <div className="account-form-group">
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="Emma"
                  {...accountForm.register("first_name")}
                  disabled={loading}
                />
                {accountForm.formState.errors.first_name && (
                  <div className="invalid-feedback d-block">
                    {accountForm.formState.errors.first_name.message}
                  </div>
                )}
              </div>
              <div className="account-form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder="Rose"
                  {...accountForm.register("last_name")}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="account-form-row account-three-cols">
              <div className="account-form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...accountForm.register("email")}
                  disabled={loading}
                />
                {accountForm.formState.errors.email && (
                  <div className="invalid-feedback d-block">
                    {accountForm.formState.errors.email.message}
                  </div>
                )}
              </div>
              <div className="account-form-group">
                <label>Language Setting</label>
                <select
                  name="language"
                  {...accountForm.register("language")}
                  disabled={loading}
                >
                  <option>English</option>
                </select>
                {accountForm.formState.errors.language && (
                  <div className="invalid-feedback d-block">
                    {accountForm.formState.errors.language.message}
                  </div>
                )}
              </div>
              <div className="account-form-group phone-input-css">
                <label>Phone Number</label>
                <Controller
                  name="mobile"
                  control={accountForm.control}

                  rules={{ required: true }}
                  render={({ field }) => (
                    <PhoneInput
                      {...field}
                      country={"us"}
                      inputProps={{
                        name: "mobile",
                        disabled: loading,
                      }}
                      onChange={(value) => field.onChange("+" + value)}
                    />
                  )}
                />
                {accountForm.formState.errors.mobile && (
                  <div className="invalid-feedback d-block">
                    {accountForm.formState.errors.mobile.message}
                  </div>
                )}
              </div>
            </div>

            <div className="account-form-row account-two-cols">
              <div className="account-form-group">
                <label>Location</label>
                <input
                  type="text"
                  placeholder="Enter your address"
                  {...accountForm.register("location")}
                  disabled={loading}
                />
              </div>
              <div className="account-form-group">
                <label>Zip code</label>
                <input
                  type="text"
                  placeholder="Enter your zip code"
                  {...accountForm.register("zip_code")}
                  disabled={loading}
                />
              </div>
            </div>
            <div>
              <span className="d-block">
                Consent to Data Sharing and AI Matching
              </span>
              <div className="d-flex gap-2 pt-2">
                <input
                  type="checkbox"
                  {...accountForm.register("consent")}
                  disabled={loading}
                />
                <label htmlFor="corporateCheck">
                  I agree to let Coach Sparkle match my services to help users
                  achieve their coaching goals.
                </label>
              </div>
              <button className="save-changes-btn" disabled={loading}>
                {loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <>Save Changes</>
                )}
              </button>
            </div>
          </div>
        </form>

        <div className="password-section mt-5">
          <h3 className="quick-text">Change Password</h3>
          <form
            className="account-setting-form mt-4"
            onSubmit={passwordForm.handleSubmit(onPasswordSave)}
          >
            <div className="account-form">
              <div className="account-form-row account-three-cols">
                <div className="account-form-group">
                  <PasswordField
                    label="Current Password"
                    name="current_password"
                    register={passwordForm.register}
                    error={passwordForm.formState.errors.current_password}
                  />
                </div>
                <div className="account-form-group">
                  <PasswordField
                    label="New Password"
                    name="new_password"
                    register={passwordForm.register}
                    error={passwordForm.formState.errors.new_password}
                  />
                </div>
                <div className="account-form-group">
                  <PasswordField
                    label="Confirm Password"
                    name="confirm_password"
                    register={passwordForm.register}
                    error={passwordForm.formState.errors.confirm_password}
                  />
                </div>
              </div>
              <div>
                <button className="save-changes-btn" disabled={loading}>
                  {loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <>Save Changes</>
                  )}
                </button>
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
              <div className="d-flex gap-2 mb-2 pt-2 data-privacy-control">
                <PublicOffIcon className="mui-icons" />
                <span className="title">Profile Visibility</span>
                <input type="checkbox" />
                <label htmlFor="public">Public</label>
                <input type="checkbox" />
                <label htmlFor="private">Private</label>
              </div>
              <div className="d-flex gap-2 mb-2 pt-2 data-privacy-control">
                <PodcastsIcon className="mui-icons" />
                <span className="title">Communication Preference</span>
                <input type="checkbox" />
                <label htmlFor="email">Email</label>
                <input type="checkbox" />
                <label htmlFor="inapp">In-App</label>
                <input type="checkbox" />
                <label htmlFor="push-toggles">Push Toggles</label>
              </div>
              <div className="d-flex gap-2 mb-2 pt-2 data-privacy-control">
                <i className="bi bi-openai mui-icons"></i>
                <span className="title">Allow AI Matching</span>
                <input type="checkbox" />
                <label htmlFor="agree">I agree to AI Personalization</label>
              </div>
              <div className="d-flex gap-2 mb-2 pt-2 under-line-text">
                <CookieIcon className="mui-icons" />

                <span
                  className="title"
                  data-bs-toggle="modal"
                  data-bs-target="#cookieModal"
                  role="button"
                >
                  Manage Cookie Preferences
                </span>

                <div
                  className="modal fade"
                  id="cookieModal"
                  tabIndex="-1"
                  aria-labelledby="cookieModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content p-3">
                      <div className="modal-header border-0">
                        <h5
                          className="modal-title fw-bold"
                          id="cookieModalLabel"
                        >
                          Manage Cookies
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <p>
                          CoachSparkle uses cookies to enhance your experience,
                          personalize content, and analyze traffic. You can
                          manage your preferences anytime.
                        </p>

                        <div className="border rounded p-3 one">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <strong>Essential Cookies</strong>
                              <br />
                              <small>
                                Necessary for login, security and session
                                functionality
                              </small>
                            </div>
                            <div className="form-check form-switch m-0">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="essentialCookies"
                                checked
                                disabled
                              />
                            </div>
                          </div>
                        </div>

                        <div className="border rounded p-3 two">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <strong>Performance Cookies</strong>
                              <br />
                              <small>
                                Help us to improve the platform through usage
                                analytics.
                              </small>
                            </div>
                            <div className="form-check form-switch m-0">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="performanceCookies"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="border rounded p-3 three">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <strong>Functional Cookies</strong>
                              <br />
                              <small>
                                Remember preferences, such as language.
                              </small>
                            </div>
                            <div className="form-check form-switch m-0">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="functionalCookies"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="border rounded p-3 four">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <strong>Marketing Cookies</strong>
                              <br />
                              <small>Used to personalized advertising</small>
                            </div>
                            <div className="form-check form-switch m-0">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="marketingCookies"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer border-0 three-btn-add">
                        <button type="button" className="btn btn-primary">
                          Accept All Cookies
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                        >
                          Customize Settings
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                        >
                          Reject Cookies
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex gap-2 under-line-text">
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
            <button className="delete-btn d-flex gap-2 align-items-center">
              <i className="bi bi-trash fs-5"></i>Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
