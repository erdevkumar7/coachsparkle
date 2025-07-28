"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userProfileSchema } from "@/lib/validationSchema";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

export default function UserUpdateFormData({ user, countries, deliveryMode }) {
  const router = useRouter();
  const [getToken, setToken] = useState();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userProfileSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    getUserData();

    if (user) {
      reset({
        first_Name: user.first_name || "",
        last_Name: user.last_name || "",
        display_name: user.display_name || "",
        email: user.email || "",
        professional_profile: user.professional_profile || "",
        professional_title: user.professional_title || "",
        country_id: user.country_id || "",
        topics: user.topics || "",
        ageGroup: user.ageGroup || "",
        goal1: user.goal1 || "",
        goal2: user.goal2 || "",
        goal3: user.goal3 || "",
        language: user.language || "",
        mode: user.mode || "",
        timings: user.timings || "",
        bio: user.bio || "",
        coachAgreement: user.coachAgreement || false,
      });
    }
  }, [user]);

  const getUserData = async () => {
    //    const token = localStorage.getItem("token");
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
      return;
    }
    setToken(token);
  };

const onSubmit = async (data) => {
  console.log("Submitting", data);

  const formData = {
    first_name: data.first_Name,
    last_name: data.last_Name,
    display_name: data.display_name,
    email: data.email,
    country_id: data.country_id,
    professional_profile: data.professional_profile,
    professional_title: data.professional_title,
    topics: data.topics,
    age_group: data.ageGroup,
    goal1: data.goal1,
    goal2: data.goal2,
    goal3: data.goal3,
    language: data.language,
    mode: data.mode,
    timings: data.timings,
    bio: data.bio,
    coach_agreement: data.coachAgreement,
  };

  try {
    setLoading(true);
    const response = await axios.post(`${apiUrl}/updateProfile`, formData, {
      headers: {
        Authorization: `Bearer ${getToken}`,
        "Content-Type": "application/json",
      },
    });

    toast.success("Profile updated successfully");
    router.push("/user/dashboard");
  } catch (error) {
    console.error(error);
    toast.error("An error occurred. Please try again later.");
  } finally {
    setLoading(false);
  }
};


  // console.log('user', user.country_id)
  return (
    <div className="profile-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name*</label>
            <input
              type="text"
              id="firstName"
              {...register("first_Name")}
              disabled={loading}
            />
            {errors.first_Name && (
              <div className="invalid-feedback d-block">
                {errors.first_Name.message}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              {...register("last_Name")}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="display_name">Display Name*</label>
            <input
              required
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
              disabled={loading}
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
            <label htmlFor="topics">Preferred Coaching Topics</label>
            <textarea
              id="topics"
              rows="3"
              {...register("topics")}
              disabled={loading}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="ageGroup">Age Group (Learner’s Demographic)</label>
            <select id="ageGroup" {...register("ageGroup")} disabled={loading}>
              <option value="">Select</option>
              <option value="children">Children</option>
              <option value="teens">Teens</option>
              <option value="adults">Adults</option>
              <option value="seniors">Seniors</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="professional_title">Your Profession</label>
            <input
              type="text"
              id="professional_title"
              {...register("professional_title")}
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
          <label htmlFor="goal1">Goal #1</label>
          <input type="text" {...register("goal1")} disabled={loading} />
        </div>

        <div className="form-group goal">
          <label htmlFor="goal1">Goal #2</label>
          <input type="text" {...register("goal2")} disabled={loading} />
        </div>

        <div className="form-group goal">
          <label htmlFor="goal1">Goal #3</label>
          <input type="text" {...register("goal3")} disabled={loading} />
        </div>

        <div className="form-row preference-input">
          <div className="form-group">
            <label htmlFor="language">Language Preference</label>
            <input
              type="text"
              id="language"
              placeholder="e.g., English, Hindi"
              {...register("language")}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="mode">Preferred Mode</label>
            <select id="mode" {...register("mode")} disabled={loading}>
              <option value="">Select Mode</option>
              <option value="online">Online</option>
              <option value="in-person">In-Person</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="timings">Preferred Coaching Timings</label>
          <select id="timings" {...register("timings")} disabled={loading}>
            <option value="">Select Timing</option>
            <option value="morning">Morning (8 AM - 12 PM)</option>
            <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
            <option value="evening">Evening (4 PM - 8 PM)</option>
            <option value="weekends">Weekends</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>

        <div className="form-group full-width">
          <label htmlFor="bio">Short Bio (Optional)</label>
          <textarea
            id="bio"
            rows="3"
            placeholder="Write a short bio..."
            {...register("bio")}
            disabled={loading}
          ></textarea>
        </div>

        <div className="form-group check-box">
          <input
            type="checkbox"
            id="coachAgreement"
            {...register("coachAgreement")}
            disabled={loading}
          />
          <label htmlFor="coachAgreement">
            I agree to let Coach Sparkle match me with relevant coaches
          </label>
        </div>

        <div className="save-btn">
          <button type="submit" className="save-btn-add" disabled={loading}>
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <>
                Save Changes <i className="bi bi-arrow-right"></i>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
