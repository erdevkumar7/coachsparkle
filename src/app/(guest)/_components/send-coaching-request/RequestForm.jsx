"use client";
import { useEffect, useRef, useState } from "react";
import BreadCrumb from "@/components/BreadCrumb";
import { getSubCoachType } from "@/app/api/guest";
import Cookies from "js-cookie";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { requestSchema } from "@/lib/validationSchema";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "../../_styles/coach_request_form.css";
import Select from "react-select";
import BookingPreferCaledar from "./BookingPreferCalendar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

export default function RequestForm({
  userData,
  coachType,
  ageGroup,
  deliveryMode,
  countries,
  languages,
  coachingCategory,
  experienceLevel,
  budgetRange,
  communicationChannels
}) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [loading, setLoading] = useState(false);
  const [showMsg, setMsg] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      share_with_coaches: 0,
    },
    resolver: yupResolver(requestSchema),
    mode: "onBlur",
  });

  const breadcrumbItems = [
    { label: "Explore Coaches", href: "/coach-detail/list" },
    { label: "Send Coaching Request", href: "/send-coaching-request" },
  ];

  const [coachId, setCoachId] = useState();
  const [coachSubTypes, setSubCoachTypes] = useState([]);
  const dropdownRef = useRef(null);

  // remove this use effect if it causes problem in sendRequest
  useEffect(() => {
    if (!showMsg) return; // only run if message is visible

    const subscription = watch(() => {
      setMsg(false); // clear when any field changes
    });

    return () => subscription.unsubscribe();
  }, [showMsg, watch]);

  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;
    setValue(name, type === "checkbox" ? (checked ? 1 : 0) : value);

    if (name === "coach_type") {
      setCoachId(value);
      const subTypeRes = await getSubCoachType(value);
      setSubCoachTypes(subTypeRes || []);
    }
  };

  const toggleDropdown = () => {
    dropdownRef.current.classList.toggle("show");
  };

  const handleLanguageSelect = (id) => {
    const current = watch("language_preference") || [];
    if (!current.includes(id)) {
      setValue("language_preference", [...current, id]);
    }
  };

  const removeLanguage = (id) => {
    const current = watch("language_preference") || [];
    setValue(
      "language_preference",
      current.filter((l) => l !== id)
    );
  };

  const onSubmit = async (data) => {
    setLoading(true);
    if (userData.user_type == 3) {
      toast.error("You are not valid user");
      setLoading(false);
      return false;
    }

    try {
      const token = Cookies.get("token");
      console.log("Submitting form with data:", data);

      const response = await fetch(`${apiUrl}/cochingRequestSend`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Raw response:", result);

      // if (!response.ok || result.status === false) {
      //   setMsg(true);
      //   const messages = [];

      //   if (result?.errors) {
      //     for (const [field, errors] of Object.entries(result.errors)) {
      //       messages.push(...errors);
      //     }
      //   }

      //   if (messages.length > 0) {
      //     messages.forEach((msg) => toast.error(msg));
      //   } else {
      //     console.log(result.message)
      //     // toast.error(result.message || "Something went wrong");
      //   }

      //   return;
      // }

      if (result.status === false) {
        toast.error(result.message || "Something went wrong");
        return;
      }

      toast.success("Request submitted successfully");
      reset();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BreadCrumb items={breadcrumbItems} />
      <div className="container send-request py-5">
        <p className="text-center request-heading mb-4">
          Tell us what you need, set your preferences, and we’ll do the rest.
          Simply select your coaching category, describe your goal, and choose
          your preferred delivery mode, language, availability, and
          communication method. We’ll notify all qualified coaches who match
          your request, and they’ll reach out to you directly with offers or
          next steps.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="request-form mx-auto shadow-sm">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">I am looking for*</label>
                <select
                  className="form-selectbox"
                  {...register("coach_type")}
                  onChange={handleChange}
                  disabled={loading}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  {coachType.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.type_name}
                    </option>
                  ))}
                </select>
                {errors.coach_type && (
                  <p className="text-danger">{errors.coach_type.message}</p>
                )}
              </div>
              <div className="col-md-6">
                <label className="form-label">Coaching Category*</label>
                <select
                  className="form-selectbox"
                  {...register("coach_subtype")}
                  disabled={loading}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select sub category
                  </option>
                  {coachSubTypes.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.subtype_name}
                    </option>
                  ))}
                </select>

                {/* <Controller
                  name="coach_subtype"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isMulti
                      options={coachSubTypes.map(item => ({
                        value: item.id,
                        label: item.subtype_name
                      }))}
                      className="basic-multi-select form-selectbox"
                      classNamePrefix="select"
                      value={
                        coachSubTypes
                          .filter(item => field.value?.includes(item.id))
                          .map(item => ({
                            value: item.id,
                            label: item.subtype_name
                          }))
                      }
                      onChange={(selected) => field.onChange(selected.map(opt => opt.value))}
                    />
                  )}
                /> */}


                {errors.coach_subtype && (
                  <p className="text-danger">
                    {errors.coach_subtype.message}
                  </p>
                )}
              </div>
              <div className="col-md-6">
                <label className="form-label">
                  Preferred Mode of Delivery*
                </label>
                <select
                  className="form-selectbox"
                  {...register("preferred_mode_of_delivery")}
                  disabled={loading}
                >
                  <option value="">
                    Choose delivery mode
                  </option>
                  {deliveryMode.map((mode) => (
                    <option key={mode.id} value={mode?.id}>
                      {mode.mode_name}
                    </option>
                  ))}
                </select>
                {errors.preferred_mode_of_delivery && (
                  <p className="text-danger">
                    {errors.preferred_mode_of_delivery.message}
                  </p>
                )}
              </div>
              <div className="col-md-6">
                <label className="form-label">Location*</label>
                <select
                  className="form-selectbox"
                  {...register("location")}
                  disabled={loading}
                >
                  <option value="">
                    Select location
                  </option>
                  {countries.map((country) => (
                    <option key={country.country_id} value={country.country_id}>
                      {country.country_name}
                    </option>
                  ))}
                </select>
                {errors.location && (
                  <p className="text-danger">{errors.location.message}</p>
                )}
              </div>
              <div className="col-12">
                <label className="form-label">
                  Goal Or Objective Of Coaching/Learning*
                </label>
                <textarea
                  {...register("coaching_goal")}
                  className="form-textarea"
                  placeholder="e.g. Improve confidence, Career advancement..."
                  rows="5"
                  disabled={loading}
                ></textarea>
                {errors.coaching_goal && (
                  <p className="text-danger">{errors.coaching_goal.message}</p>
                )}
              </div>
              <div className="col-md-6">
                <div className="mb-3 position-relative">
                  <label className="form-label">Language Preference*</label>
                  <div className="form-select-multi" onClick={toggleDropdown}>
                    {languages.map((language) => (
                      <span key={language.id} value={language.id}></span>
                    ))}
                    {(watch("language_preference") || []).map((langId) => {
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
                          disabled={(
                            watch("language_preference") || []
                          ).includes(lang.id)}
                        >
                          {lang.language}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label">
                  Preferred Communication Channel*
                </label>
                <select
                  className="form-selectbox"
                  {...register("preferred_communication_channel")}
                  disabled={loading}
                >
                  <option value="">
                    Select communication channel
                  </option>
                  {communicationChannels.map((communication) => (
                    <option key={communication.id} value={communication.id}>
                      {communication.category_name}
                    </option>
                  ))}
                </select>
                {errors.preferred_communication_channel && (
                  <p className="text-danger">
                    {errors.preferred_communication_channel.message}
                  </p>
                )}
              </div>
            </div>

            <div className="sub-form-section p-4 mt-4">
              <h3 className="mb-3 quick-text">Additional Fields</h3>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">
                    Learner's Age Group Or Demographic
                  </label>
                  <select
                    className="form-selectbox"
                    {...register("learner_age_group")}
                    disabled={loading}
                  >
                    <option value="">
                      Select age
                    </option>
                    {ageGroup.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.group_name} {item.age_range ? `(${item.age_range})` : ""}
                      </option>
                    ))}
                  </select>
                  {errors.learner_age_group && (
                    <p className="text-danger">
                      {errors.learner_age_group.message}
                    </p>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="form-label">
                    Preferred Coaching/Teaching Style
                  </label>
                  <select
                    className="form-selectbox"
                    {...register("preferred_teaching_style")}
                    disabled={loading}
                  >
                    <option value="">
                      Select teaching style
                    </option>
                    {coachingCategory.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.category_name}
                      </option>
                    ))}
                  </select>
                  {errors.preferred_teaching_style && (
                    <p className="text-danger">
                      {errors.preferred_teaching_style.message}
                    </p>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="form-label">Budget Range</label>
                  <select
                    className="form-selectbox"
                    {...register("budget_range")}
                    disabled={loading}
                  >
                    <option value="">
                      Select budget range
                    </option>
                    {budgetRange.map((budget) => (
                      <option key={budget.id} value={budget.id}>
                        {budget.budget_range}
                      </option>
                    ))}

                  </select>
                  {errors.budget_range && (
                    <p className="text-danger">{errors.budget_range.message}</p>
                  )}
                </div>


                {/* <div className="col-md-6">
                  <label className="form-label">Preferred Schedule</label>

                  <Controller
                    name="preferred_schedule"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        selected={field.value ? new Date(field.value) : null}
                        onChange={(date) => {
                          field.onChange(date ? format(date, "yyyy-MM-dd") : "");
                        }}
                        dateFormat="yyyy-MM-dd"
                        minDate={new Date()}
                        className="form-input"
                        disabled={loading}
                      />
                    )}
                  />

                  {errors.preferred_schedule && (
                    <p className="text-danger">
                      {errors.preferred_schedule.message}
                    </p>
                  )}
                </div> */}

                <div className="col-md-6">
                  <label className="form-label">Coach Gender</label>
                  <select
                    className="form-selectbox"
                    {...register("coach_gender")}
                    disabled={loading}
                  >
                    <option value="">
                      Select gender
                    </option>
                    <option value={1}>Male</option>
                    <option value={2}>Female</option>
                    <option value={3}>No Preference</option>
                  </select>
                  {errors.coach_gender && (
                    <p className="text-danger">{errors.coach_gender.message}</p>
                  )}
                </div>

                <div className="col-md-4">
                  <label className="form-label">Coach Experience Level*</label>
                  <select
                    className="form-selectbox"
                    {...register("coach_experience_level")}
                    disabled={loading}
                  >
                    <option value="">
                      Select experience level
                    </option>
                    {experienceLevel.map((exp) => (
                      <option key={exp.id} value={exp.id}>
                        {exp.experience_level}
                      </option>
                    ))}
                  </select>
                  {errors.coach_experience_level && (
                    <p className="text-danger">
                      {errors.coach_experience_level.message}
                    </p>
                  )}
                  {/* <select
                                   className="form-selectbox"
                                   name="coach_experience_level"
                                    value={formData.coach_experience_level}
                                            onChange={handleChange}
                                            required
                                          >
                                            <option value="" disabled>Select experience</option>
                                            <option value={1}>Highly Experienced</option>
                                            <option value={2}>Mediun</option>
                                            <option value={3}>Beginner</option>
                                          </select> */}
                </div>
                <div className="col-md-4">
                  <label className="form-label">Only Certified Coach</label>
                  <select
                    className="form-selectbox"
                    {...register("only_certified_coach")}
                    disabled={loading}
                  >
                    <option value="">
                      Select
                    </option>
                    <option value={1}>Yes</option>
                    <option value={0}>No</option>
                  </select>
                  {errors.only_certified_coach && (
                    <p className="text-danger">
                      {errors.only_certified_coach.message}
                    </p>
                  )}
                </div>
                <div className="col-md-4">
                  <label className="form-label">
                    Urgency/Preferred Start Date
                  </label>
                  <select
                    className="form-selectbox"
                    {...register("preferred_start_date_urgency")}
                    disabled={loading}
                  >
                    <option value="" >
                      Select
                    </option>
                    <option value={1}>Immediately</option>
                    <option value={2}>Within a week</option>
                    <option value={4}>Flexible</option>
                  </select>
                  {errors.preferred_start_date_urgency && (
                    <p className="text-danger">
                      {errors.preferred_start_date_urgency.message}
                    </p>
                  )}
                </div>
                {/* <div className="col-12">
                  <label className="form-label">
                    Special Requirements Or Notes
                  </label>
                  <textarea
                    className="form-input"
                    rows="2"
                    {...register("special_requirements")}
                    disabled={loading}
                  ></textarea>
                  {errors.special_requirements && (
                    <p className="text-danger">
                      {errors.special_requirements.message}
                    </p>
                  )}
                </div> */}
              </div>
            </div>

            <Controller
              name="share_with_coaches"
              control={control}
              render={({ field }) => (
                <div className="form-check mt-4 d-flex align-items-center">
                  <input
                    type="checkbox"
                    id="consentCheckbox"
                    className="form-checkbox"
                    checked={field.value === 1}
                    disabled={loading}
                    onChange={(e) => field.onChange(e.target.checked ? 1 : 0)}
                  />
                  <label
                    className="form-check-label ms-2"
                    htmlFor="consentCheckbox"
                  >
                    Yes, please share my request with suitable coaches who can
                    help me reach my goals.
                  </label>
                </div>
              )}
            />
            {errors.share_with_coaches && (
              <div className="text-danger">
                {errors.share_with_coaches.message}
              </div>
            )}
            <div className="text-center mt-4">
              {showMsg ? <p className="mt-2 text-danger">No matching coaches found.</p> : ""}
              <button
                type="submit"
                className="btn submit-btn"
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={20} />
                ) : (
                  <>
                    Submit <i className="bi bi-arrow-right ms-2" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}
