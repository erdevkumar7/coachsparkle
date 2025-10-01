"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userProfileSchema } from "@/lib/validationSchema";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

export default function UserUpdateFormData({
  user,
  countries,
  deliveryMode,
  ageGroup,
  languages,
  allCoachSubtype,
}) {
  const router = useRouter();
  const [getToken, setToken] = useState();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userProfileSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    getUserData();

    if (user) {
      reset({
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
        display_name: user?.display_name || "",
        email: user?.email || "",
        professional_profile: user?.professional_profile || "",
        your_profession: user?.professional_title || "",
        country_id: user?.country_id || "",
        prefer_coaching_topic: user?.coaching_topics || "",
        age_group_user: user?.age_group_user || "",
        coaching_goal_1: user?.coaching_goal_1 || "",
        coaching_goal_2: user?.coaching_goal_2 || "",
        coaching_goal_3: user?.coaching_goal_3 || "",
        language_names: user?.language_names?.map((lang) => lang.id) || [],
        prefer_mode: user?.prefer_mode || "",
        prefer_coaching_time: user?.prefer_coaching_timing || "",
        short_bio: user?.short_bio || "",
        coach_agreement: user?.coach_agreement,
      });
    }
  }, [user]);
  console.log("user:", user);

  const getUserData = async () => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
      return;
    }
    setToken(token);
  };

  const toggleDropdown = () => {
    dropdownRef.current.classList.toggle("show");
  };

  const handleLanguageSelect = (id) => {
    const current = watch("language_names") || [];
    if (!current.includes(id)) {
      setValue("language_names", [...current, id], { shouldValidate: true });
    }
  };

  const removeLanguage = (id) => {
    const current = watch("language_names") || [];
    setValue(
      "language_names",
      current.filter((l) => l !== id),
      { shouldValidate: true }
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        dropdownRef.current.classList.remove("show");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onSubmit = async (data) => {
    console.log("Submitting", data);

    try {
      setLoading(true);
      const response = await axios.post(`${apiUrl}/updateUserProfile`, data, {
        headers: {
          Authorization: `Bearer ${getToken}`,
          "Content-Type": "application/json",
        },
      });
      toast.success("Profile updated successfully");
      router.refresh();
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name*</label>
            <input
              type="text"
              id="first_name"
              {...register("first_name")}
              disabled={loading}
            />
            {errors.first_name && (
              <div className="invalid-feedback d-block">
                {errors.first_name.message}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="last_name"
              {...register("last_name")}
              disabled={loading}
            />
            {errors.last_name && (
              <div className="invalid-feedback d-block">
                {errors.last_name.message}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="display_name">Display Name*</label>
            <input
              type="text"
              id="display_name"
              {...register("display_name")}
              disabled={loading}
            />
            {errors.display_name && (
              <div className="invalid-feedback d-block">
                {errors.display_name.message}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="professional_profile">Professional Profile</label>
            <input
              type="text"
              id="professional_profile"
              {...register("professional_profile")}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              {...register("email")}
              disabled
            />
            {errors.email && (
              <div className="invalid-feedback d-block">
                {errors.email.message}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="country_id">Country</label>
            <select
              id="country_id"
              {...register("country_id")}
              disabled={loading}
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.country_id} value={country.country_id}>
                  {country.country_name}
                </option>
              ))}
            </select>
            {errors.country_id && (
              <div className="invalid-feedback d-block">
                {errors.country_id.message}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="prefer_coaching_topic">
              Preferred Coaching Topics
            </label>
            <textarea
              id="prefer_coaching_topic"
              rows="3"
              {...register("prefer_coaching_topic")}
              disabled={loading}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="age_group_user">Age Group (Learner’s Demographic)</label>
            <select {...register('age_group_user')} disabled={loading}
            >
              <option value="">Select Age Group</option>
              {ageGroup.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.group_name} {g.age_range ? `(${g.age_range})` : ""}
                </option>
              ))}
            </select>
            {errors.age_group_user && (
              <div className="invalid-feedback d-block">
                {errors.age_group_user.message}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="yourProfession">Your Profession</label>
            <input
              type="text"
              id="your_profession"
              {...register("your_profession")}
              disabled={loading}
            />
          </div>
        </div>

        <p className="set-text-one">Set up to 3 coaching Goals</p>
        <p className="set-text">
          Briefly state your coaching goals (e.g., improve leadership presence,
          transition careers, manage stress better). This helps us match yu with
          the the most suitable coaches and allow you to track your own coaching
          progress.{" "}
        </p>

        <div className="form-group goal">
          <label htmlFor="coaching_goal_1">Goal #1</label>
          {/* <textarea
            id="coaching_goal_1"
            rows="3"
            {...register("coaching_goal_1")}
            disabled={loading}
          ></textarea> */}

          {/* <select
            id="coaching_goal_1"
            {...register("coaching_goal_1")}
            disabled={loading}
          >
            <option value="">Select First Goal</option>
            {allCoachSubtype.map((subtype) => (
              <option key={subtype.id} value={subtype.id}>
                {`${subtype.subtype_name}ing`}
              </option>
            ))}
          </select> */}
          <select
            id="coaching_goal_1"
            {...register("coaching_goal_1")}
            disabled={loading}
          >
            <option value="">-- Select Your First Goal --</option>
            {allCoachSubtype.map((subtype) => {
              const words = subtype.subtype_name.split(" ");
              const lastWord = words[words.length - 1].toLowerCase();

              let displayName = subtype.subtype_name;
              if (lastWord === "coach") {
                // Replace "coach" with "coaching"
                words[words.length - 1] = "coaching";
                displayName = words.join(" ");
              }

              return (
                <option key={subtype.id} value={subtype.id}>
                  {displayName}
                </option>
              );
            })}
          </select>

        </div>

        <div className="form-group goal">
          <label htmlFor="coaching_goal_2">Goal #2</label>
          <textarea
            id="coaching_goal_2"
            rows="3"
            {...register("coaching_goal_2")}
            disabled={loading}
          ></textarea>
        </div>

        <div className="form-group goal">
          <label htmlFor="coaching_goal_3">Goal #3</label>
          <textarea
            id="coaching_goal_3"
            {...register("coaching_goal_3")}
            disabled={loading}
          ></textarea>
        </div>

        <div className="form-row preference-input">
          <div className="form-group position-relative">
            <label htmlFor="language_names">Language Preference</label>
            <div className="form-select-multi" onClick={toggleDropdown}>
              {languages.map((language) => (
                <span key={language.id} value={language.id}></span>
              ))}
              {(watch("language_names") || []).map((langId) => {
                const language = languages.find((l) => l.id === langId);
                return (
                  <span className="pill-tag" key={langId}>
                    {language?.language || "Unknown"}
                    <button
                      type="button"
                      onClick={() => removeLanguage(langId)}
                    >
                      &times;
                    </button>
                  </span>
                );
              })}
              <span className="dropdown-icon">&#9662;</span>
            </div>

            <ul className="dropdown-menu w-100" ref={dropdownRef}>
              {languages.map((lang) => (
                <li key={lang.id}>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={() => handleLanguageSelect(lang.id)}
                    disabled={(watch("language_names") || []).includes(lang.id)}
                  >
                    {lang.language}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {errors.language_names && (
            <div className="invalid-feedback d-block">
              {errors.language_names.message}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="mode">Preferred Mode</label>
            <select
              id="prefer_mode"
              {...register("prefer_mode")}
              disabled={loading}
            >
              <option value="">Select Mode</option>
              {deliveryMode.map((mode) => (
                <option key={mode.id} value={mode.id}>
                  {mode.mode_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="prefer_coaching_time">
            Preferred Coaching Timings
          </label>
          <select
            id="prefer_coaching_time"
            {...register("prefer_coaching_time")}
            disabled={loading}
          >
            <option value="">Select Timing</option>
            <option value="morning">Morning (8 AM - 12 PM)</option>
            <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
            <option value="evening">Evening (4 PM - 8 PM)</option>
            <option value="weekends">Weekends</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>

        <div className="form-group full-width">
          <label htmlFor="short_bio">Short Bio (Optional)</label>
          <textarea
            id="short_bio"
            rows="3"
            placeholder="Write a short bio..."
            {...register("short_bio")}
            disabled={loading}
          ></textarea>
        </div>

        <div className="form-group check-box">
          <input
            type="checkbox"
            id="coach_agreement"
            {...register("coach_agreement")}
            disabled={loading}
          />
          <label htmlFor="coach_agreement">
            I agree to let Coach Sparkle match me with relevant coaches
          </label>
        </div>

        <div className="save-btn">
          <button type="submit" className="save-btn-add" disabled={loading}>
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <>
                Save Changes
                <i className="bi bi-arrow-right"></i>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
