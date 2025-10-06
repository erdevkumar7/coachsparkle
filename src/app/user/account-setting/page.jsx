"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../_styles/dashboard.css";
import "../_styles/account.css";
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
import { useUser } from "@/context/UserContext";


export default function Accountsetting() {
  const { user } = useUser();
  const router = useRouter();
  // const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passwordApiErrors, setPasswordApiErrors] = useState([]);
  // const [settingsLoading, setSettingsLoading] = useState();
  const [newCoachEnabled, setNewCoachEnabled] = useState();
  const [msgEnabled, setMsgEnabled] = useState();
  const [bookingEnabled, setBookingEnabled] = useState();
  const [requestEnabled, setRequestEnabled] = useState();
  const [announcementEnabled, setAnnouncementEnabled] = useState();
  const [blogEnabled, setBlogEnabled] = useState();
  const [billingEnabled, setBillingEnabled] = useState();
  const [profileVisibility, setProfileVisibility] = useState("");
  const [communicationPreference, setCommunicationPreference] = useState([]);
  const [allowAiMatching, setAllowAiMatching] = useState();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [preferences, setPreferences] = useState({
    performance: false,
    functional: false,
    marketing: false,
  });
  const [languages, setLanguages] = useState([]);

  const accountForm = useForm({
    resolver: yupResolver(userAccountSettingSchema),
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      pref_lang: user?.pref_lang,
      contact_number: user?.contact_number,
      address: user?.address,
      zip_code: user?.zip_code,
      is_avail_for_relavant: user?.is_avail_for_relavant,
    },
    mode: "onBlur",
  });

  const passwordForm = useForm({
    resolver: yupResolver(passwordSchema),
    mode: "onBlur",
  });


  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) return;

        // Fetch languages and settings in parallel
        const [mastersRes, settingsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/getallmastercategories`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/getsetting`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);

        if (mastersRes.ok) {
          const mastersData = await mastersRes.json();
          if (mastersData && mastersData.languages) {
            setLanguages(mastersData.languages);
          }
        }

        if (settingsRes.ok) {
          const data = await settingsRes.json();
          const s = data.settings;

          setPreferences({
            performance: s.is_performance_cookies,
            functional: s.is_functional_cookies,
            marketing: s.is_marketing_cookies,
          });

          const commPref = s.communication_preference
            ? Array.isArray(s.communication_preference)
              ? s.communication_preference
              : JSON.parse(s.communication_preference)
            : [];

          setCommunicationPreference(commPref);
          setNewCoachEnabled(!!s.new_coach_match_alert);
          setMsgEnabled(!!s.message_notifications);
          setBookingEnabled(!!s.booking_reminders);
          setRequestEnabled(!!s.coaching_request_status);
          setAnnouncementEnabled(!!s.platform_announcements);
          setBlogEnabled(!!s.blog_article_recommendations);
          setBillingEnabled(!!s.billing_updates);

          setProfileVisibility(s.profile_visibility || "public");
          setAllowAiMatching(!!s.allow_ai_matching);
        }
      } catch (err) {
        console.error("Failed to fetch initial data:", err);
      }
    };

    fetchInitialData();
  }, []);

  // ✅ Ensure form resets only after languages are loaded
  useEffect(() => {
    if (user && languages.length > 0) {
      accountForm.reset({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        pref_lang: String(user.pref_lang), // ensure string match
        contact_number: user.contact_number,
        address: user.address,
        zip_code: user.zip_code,
        is_avail_for_relavant:user.is_avail_for_relavant,
      });
    }
  }, [user, languages]);


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
      setPasswordApiErrors([]);

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
        let errors = [];

        if (result.errors) {
          errors = Object.values(result.errors).flat();
        } else if (result.error) {
          errors = [result.error];
        } else if (result.message) {
          errors = [result.message];
        }

        setPasswordApiErrors(errors);
        toast.error("Failed to update password");
        return;
      }

      toast.success(result.message || "Password updated successfully!");
      passwordForm.reset();

    } catch (error) {
      console.error("Failed to update password", error);
      toast.error("Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  const handleCommunicationChange = (option) => {
    const updated = communicationPreference.includes(option)
      ? communicationPreference.filter((item) => item !== option)
      : [...communicationPreference, option];

    setCommunicationPreference(updated);
    updateSetting("communication_preference", updated);
  };


  // const updateSetting = async (key, value, showToast = true) => {
  //   try {
  //     const token = Cookies.get("token");
  //     if (!token) {
  //       toast.error("Session expired, Please login again.");
  //       router.push("/login");
  //       return;
  //     }

  //     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/setting`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({ [key]: value }),
  //     });

  //     const result = await res.json();

  //     if (!res.ok) {
  //       if (showToast) toast.error(result.message || "Failed to update setting");
  //       return;
  //     }

  //     if (showToast) toast.success(result.message || "Setting updated!");
  //   } catch (err) {
  //     console.error("Failed to update setting:", err);
  //     if (showToast) toast.error("Failed to update setting");
  //   }
  // };



  const updateSetting = async (key, value, showToast = true) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        if (showToast) toast.error("Session expired, Please login again.");
        router.push("/login");
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/setting`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ [key]: value }),
      });

      const result = await res.json();

      if (!res.ok) {
        if (showToast) toast.error(result.message || "Failed to update setting");
        return;
      }

      // const cookieKeys = [
      //   "is_performance_cookies",
      //   "is_functional_cookies",
      //   "is_marketing_cookies",
      // ];

      // if (cookieKeys.includes(key)) {
      //   const userKey = `${key}_user_${user?.id}`; // tie preference to user email
      //   Cookies.set(userKey, value, { expires: 365 }); // 1 year
      // }

      // ✅ Only manage cookie preferences
      const cookieKeys = [
        "is_performance_cookies",
        "is_functional_cookies",
        "is_marketing_cookies",
      ];

      if (cookieKeys.includes(key)) {
        const prefCookieName = `user_prefs_${user?.user_id}`;
        let currentPrefs = {};

        // read existing cookie for this user
        const existing = Cookies.get(prefCookieName);
        if (existing) {
          try {
            currentPrefs = JSON.parse(existing);
          } catch {
            currentPrefs = {};
          }
        }

        // update only the modified key
        currentPrefs[key] = value;

        // store back as JSON string
        Cookies.set(prefCookieName, JSON.stringify(currentPrefs), { expires: 365 });
      }

      if (showToast) toast.success(result.message || "Setting updated!");
    } catch (err) {
      console.error("Failed to update setting:", err);
      if (showToast) toast.error("Failed to update setting");
    }
  };


  const handleDeleteAccount = async () => {
    if (!confirmDelete) {
      setDeleteError("Please confirm before deleting your account.");
      return;
    }
    setDeleteError("");

    try {
      setDeleting(true);
      const token = Cookies.get("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/delete-account`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (!res.ok) {
        setDeleteError(result.error || "Failed to delete account.");
        return;
      }

      Cookies.remove("token");
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      router.push("/login");
    } catch (err) {
      setDeleteError("Something went wrong while deleting your account.");
    } finally {
      setDeleting(false);
    }
  };

  console.log('userr', user)
  return (
    <div className="main-panel account-section">
      <div className="account-setting">
        <h3 className="quick-text">Account Setting</h3>
        <div className="mt-4">
          <UserImageUploader
            image={user.profile_image}
            user_type={user?.user_type || 2}
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
                  placeholder="Your registered email to create an account"
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
                  id="pref_lang"
                  {...accountForm.register("pref_lang")}
                  disabled={loading}
                >
                  <option value="">Select Language</option>
                  {languages.map((lang) => (
                    <option key={lang.id} value={lang.id}>
                      {lang.language}
                    </option>
                  ))}
                </select>
                {accountForm.formState.errors.pref_lang && (
                  <div className="invalid-feedback d-block">
                    {accountForm.formState.errors.pref_lang.message}
                  </div>
                )}
              </div>
              <div className="account-form-group phone-input-css">
                <label>Phone Number</label>
                <Controller
                  name="contact_number"
                  control={accountForm.control}

                  rules={{ required: true }}
                  render={({ field }) => (
                    <PhoneInput
                      {...field}
                      country={"sg"}
                      inputProps={{
                        name: "contact_number",
                        disabled: loading,
                      }}
                      onChange={(value) => field.onChange("+" + value)}
                    />
                  )}
                />
                {accountForm.formState.errors.contact_number && (
                  <div className="invalid-feedback d-block">
                    {accountForm.formState.errors.contact_number.message}
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
                  {...accountForm.register("address")}
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
                  {...accountForm.register("is_avail_for_relavant")}
                  disabled={loading}
                />
                <label htmlFor="corporateCheck">
                  I agree to let Coach Sparkle match me with relevant coaches
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
              {passwordApiErrors.length > 0 && (
                <div className="invalid-feedback d-block mt-0">
                  {passwordApiErrors.map((err, idx) => (
                    <div key={idx}>{err}</div>
                  ))}
                </div>
              )}
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
                onChange={(checked) => {
                  setNewCoachEnabled(checked);
                  updateSetting("new_coach_match_alert", checked);
                }}
                onLabel="ON"
                offLabel="OFF"
              />

              <ToggleSwitch
                label="Message Notifications"
                value={msgEnabled}
                onChange={(checked) => {
                  setMsgEnabled(checked);
                  updateSetting("message_notifications", checked);
                }}
                onLabel="ON"
                offLabel="OFF"
              />
              <ToggleSwitch
                label="Booking Reminders"
                value={bookingEnabled}
                onChange={(checked) => {
                  setBookingEnabled(checked);
                  updateSetting("booking_reminders", checked);
                }}
                onLabel="ON"
                offLabel="OFF"
              />
              <ToggleSwitch
                label="Coaching Request Status"
                value={requestEnabled}
                onChange={(checked) => {
                  setRequestEnabled(checked);
                  updateSetting("coaching_request_status", checked);
                }}
                onLabel="ON"
                offLabel="OFF"
              />

              <ToggleSwitch
                label="Platform Announcements"
                value={announcementEnabled}
                onChange={(checked) => {
                  setAnnouncementEnabled(checked);
                  updateSetting("platform_announcements", checked);
                }}
                onLabel="ON"
                offLabel="OFF"
              />
              <ToggleSwitch
                label="Blog / Article Recommendations"
                value={blogEnabled}
                onChange={(checked) => {
                  setBlogEnabled(checked);
                  updateSetting("blog_article_recommendations", checked);
                }}
                onLabel="ON"
                offLabel="OFF"
              />
              <ToggleSwitch
                label="Billing Updates"
                value={billingEnabled}
                onChange={(checked) => {
                  setBillingEnabled(checked);
                  updateSetting("billing_updates", checked);
                }}
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
                <input
                  type="radio"
                  name="profileVisibility"
                  checked={profileVisibility === "public"}
                  onChange={() => {
                    setProfileVisibility("public");
                    updateSetting("profile_visibility", "public");
                  }}
                />
                <label>Public</label>

                <input
                  type="radio"
                  name="profileVisibility"
                  checked={profileVisibility === "private"}
                  onChange={() => {
                    setProfileVisibility("private");
                    updateSetting("profile_visibility", "private");
                  }}
                />
                <label>Private</label>

              </div>
              <div className="d-flex gap-2 mb-2 pt-2">
                <PodcastsIcon className="mui-icons" />
                <span className="title">Communication Preference</span>
                <input
                  type="checkbox"
                  checked={communicationPreference.includes("email")}
                  onChange={() => handleCommunicationChange("email")}
                />
                <label>Email</label>

                <input
                  type="checkbox"
                  checked={communicationPreference.includes("app")}
                  onChange={() => handleCommunicationChange("app")}
                />
                <label>In-App</label>

                <input
                  type="checkbox"
                  checked={communicationPreference.includes("push")}
                  onChange={() => handleCommunicationChange("push")}
                />
                <label>Push Toggles</label>


              </div>
              <div className="d-flex gap-2 mb-2 pt-2">
                <i className="bi bi-openai mui-icons"></i>
                <span className="title">Allow AI Matching</span>
                <input
                  type="checkbox"
                  checked={allowAiMatching}
                  onChange={(e) => {
                    setAllowAiMatching(e.target.checked);
                    updateSetting("allow_ai_matching", e.target.checked);
                  }}
                />
                <label>I agree to AI Personalization</label>
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
                  className="modal fade cookie-modal"
                  id="cookieModal"
                  tabIndex="-1"
                  aria-labelledby="cookieModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content p-0">
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

                        <div className="border rounded p-2 one">
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

                        <div className="border rounded p-2 two">
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
                                checked={preferences.performance}
                                onChange={(e) => {
                                  const updated = { ...preferences, performance: e.target.checked };
                                  setPreferences(updated);
                                  updateSetting("is_performance_cookies", e.target.checked);
                                }}
                              />

                            </div>
                          </div>
                        </div>

                        <div className="border rounded p-2 three">
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
                                checked={preferences.functional}
                                onChange={(e) => {
                                  const updated = { ...preferences, functional: e.target.checked };
                                  setPreferences(updated);
                                  updateSetting("is_functional_cookies", e.target.checked);
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="border rounded p-2 four">
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
                                checked={preferences.marketing}
                                onChange={(e) => {
                                  const updated = { ...preferences, marketing: e.target.checked };
                                  setPreferences(updated);
                                  updateSetting("is_marketing_cookies", e.target.checked);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer border-0 three-btn-add">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={async () => {
                            setPreferences({ performance: true, functional: true, marketing: true });

                            await updateSetting("is_performance_cookies", true, false);
                            await updateSetting("is_functional_cookies", true, false);
                            await updateSetting("is_marketing_cookies", true, false);

                            toast.success("All cookies accepted!"); // ✅ single toast
                          }}
                        >
                          Accept All Cookies
                        </button>


                        {/* <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={() => {
                            updateSetting("is_performance_cookies", preferences.performance);
                            updateSetting("is_functional_cookies", preferences.functional);
                            updateSetting("is_marketing_cookies", preferences.marketing);
                            toast.success("Custom cookie preferences updated!");
                          }}
                        >
                          Customize Settings
                        </button> */}
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={async () => {
                            setPreferences({ performance: false, functional: false, marketing: false });

                            await updateSetting("is_performance_cookies", false, false);
                            await updateSetting("is_functional_cookies", false, false);
                            await updateSetting("is_marketing_cookies", false, false);

                            toast.success("All cookies rejected!"); // ✅ single toast
                          }}
                        >
                          Reject Cookies
                        </button>

                        {/* <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={() => {
                            const allFalse = { performance: false, functional: false, marketing: false };
                            setPreferences(allFalse);

                            updateSetting("is_performance_cookies", false);
                            updateSetting("is_functional_cookies", false);
                            updateSetting("is_marketing_cookies", false);
                          }}
                        >
                          Reject Cookies
                        </button> */}

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
              <input
                type="checkbox"
                checked={confirmDelete}
                onChange={(e) => setConfirmDelete(e.target.checked)}
              />
              <label htmlFor="delete">
                I understand and wish to proceed with account deletion.
              </label>
            </div>
            {deleteError && (
              <div className="invalid-feedback d-block mt-1">{deleteError}</div>
            )}
            <button className="delete-btn d-flex gap-2 align-items-center"
              disabled={deleting}
              onClick={handleDeleteAccount}
            >
              {deleting ? (
                <>Deleting...</>
              ) : (
                <>
                  <i className="bi bi-trash fs-5"></i>Delete Account
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
