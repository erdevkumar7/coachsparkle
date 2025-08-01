"use client";
import { useEffect, useState } from "react";

import {
  getAgeGroup,
  getAllCoachingCategory,
  getAllPriceModels,
  getDeliveryMode,
  sessionFormats,
} from "@/app/api/guest";
import Cookies from "js-cookie";
import BookingWindowPicker from "./BookingWindow";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import BookingAvailabilityPicker from "./BookingAvailability";
import { PreviewPackage } from "./PreviewPackage";
import EastIcon from "@mui/icons-material/East";
import { toast } from "react-toastify";

export default function CoachServicePackageForm({ isProUser, onPackageAdded }) {
  const [categories, setCategories] = useState([]);
  const [ageGroups, setAgeGroups] = useState([]);
  //all deleveryModes
  const [deliveryModes, setDeliveryModes] = useState([]);
  const [getFormats, setSessionFormats] = useState([]);
  const [getPriceModels, setPriceModels] = useState([]);
  const [showDetailDescription, setShowDetailDescription] = useState(false);
  const [showSessionFormat, setShowSessionFormat] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  //checked DeleviryMode
  const [selectedDeliveryMode, setSelectedDeliveryMode] = useState(null);

  const initialFormData = {
    title: "",
    short_description: "",
    coaching_category: "",
    description: "",
    focus: "",
    age_group: "",
    session_count: "",
    session_duration: "",
    session_format: "",
    price: "",
    currency: "USD",
    price_model: "",
    booking_slots: "",
    booking_window: "",
    session_validity: "",
    cancellation_policy: "",
    rescheduling_policy: "",
    booking_availability: "",
    media_file: null,
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const resCat = await getAllCoachingCategory();
      if (resCat) {
        setCategories(resCat);
      }
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }

    try {
      const resAge = await getAgeGroup();
      if (resAge) {
        setAgeGroups(resAge);
      }
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }

    try {
      const delRes = await getDeliveryMode();
      if (delRes) {
        // ✅ Ensure deliveryModes is an array
        setDeliveryModes(Array.isArray(delRes) ? delRes : []);
        // setDeliveryModes(delRes);
      }
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }

    try {
      const formateRes = await sessionFormats();
      if (formateRes) {
        setSessionFormats(formateRes);
      }
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }

    try {
      const priceRes = await getAllPriceModels();
      if (priceRes?.data) setPriceModels(priceRes.data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, media_file: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const clickedButton = e.nativeEvent.submitter?.value || "draft";
    const package_status = clickedButton === "publish" ? 1 : 2;

    try {
      const token = Cookies.get("token");
      const form = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        form.append(key, value);
      });

      form.append("delivery_mode", selectedDeliveryMode);
      form.append("package_status", package_status);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/adduserservicepackage`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: form,
        }
      );

      const result = await response.json();

      if (result.status) {
        if (clickedButton === "add_package") {
          toast.success("Package Added!");
        } else {
          toast.success(
            package_status === 1 ? "Package published!" : "Draft saved!"
          );
        }

        onPackageAdded?.();
        setFormData(initialFormData);
        setSelectedDeliveryMode("");
      } else {
        toast.error("❌ " + result.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Error submitting package:", err);
      toast.error("❌ Network or server error.");
    }
  };
  // console.log("deliveryModes", deliveryModes)
  return (
    <div className="profile-form-add">
      <form onSubmit={handleSubmit}>
        <div className="card">
          {isProUser ? (
            <>
              <h3 className="text-lg font-semibold">
                <AddCircleOutlineRoundedIcon /> Add New Service Package
              </h3>
            </>
          ) : (
            <>
              <h3>
                <i className="bi bi-lock-fill text-warning ms-1 fs-4"></i>
                &nbsp;Locked Custom Service Package Builder
              </h3>
              <p>Pro Feature - Unlock to edit</p>
            </>
          )}
          <div>
            <div className="profile-form">
              <div className="form-section">
                <div className="form-group">
                  <label htmlFor="title">Service Title</label>
                  <input
                    required
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Confidence Jumpstart Session"
                    value={formData.title}
                    onChange={handleChange}
                    disabled={!isProUser}
                    className={`form-control ${
                      !isProUser ? "disabled-bg" : ""
                    }`}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="short_description">
                    Short Descriptions{" "}
                    <small>Not more than 200 characters</small>
                  </label>
                  <textarea
                    id="short_description"
                    name="short_description"
                    rows="3"
                    placeholder="Snapshot descriptions"
                    onChange={handleChange}
                    value={formData.short_description}
                    disabled={!isProUser}
                    className={`form-control ${
                      !isProUser ? "disabled-bg" : ""
                    }`}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="coaching_category">Coaching Category</label>
                  <select
                    id="coaching_category"
                    name="coaching_category"
                    value={formData.coaching_category}
                    onChange={handleChange}
                    disabled={!isProUser}
                    className={`form-control ${
                      !isProUser ? "disabled-bg" : ""
                    }`}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.category_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="description">
                    Detail Desriptions &nbsp;
                    <span
                      className="position-relative d-inline-block"
                      onMouseEnter={() => setShowDetailDescription(true)}
                      onMouseLeave={() => setShowDetailDescription(false)}
                      style={{ cursor: "pointer" }}
                    >
                      <InfoOutlinedIcon
                        sx={{ color: "#40C0E7", fontSize: 20 }}
                      />
                      {showDetailDescription && (
                        <div
                          className="position-absolute bg-light text-dark border small rounded shadow badge bg-light text-dark px-2 py-3 text-start"
                          style={{
                            top: "80%",
                            left: "900%",
                            transform: "translateX(-50%)",
                            zIndex: 10,
                            width: "320px",
                            whiteSpace: "normal",
                          }}
                        >
                          <InfoOutlinedIcon
                            sx={{ color: "#40C0E7", fontSize: 20 }}
                          />
                          <p>
                            <strong>Guideline</strong>
                          </p>
                          <ol>
                            <li>This program is design for what purpose</li>
                            <li>What the package helps client to achieve?</li>
                            <li>Package format</li>
                            <li>What’s included?</li>
                            <li>Who should book this?</li>
                            <li>Things to note before client book</li>
                          </ol>
                        </div>
                      )}
                    </span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="3"
                    onChange={handleChange}
                    value={formData.description}
                    disabled={!isProUser}
                    className={`form-control ${
                      !isProUser ? "disabled-bg" : ""
                    }`}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="focus"> Service Focus</label>
                  <input
                    required
                    type="text"
                    id="focus"
                    name="focus"
                    value={formData.focus}
                    onChange={handleChange}
                    placeholder="e.g., Confidence, Goal clarity, Custom action plan"
                    disabled={!isProUser}
                    className={`form-control ${
                      !isProUser ? "disabled-bg" : ""
                    }`}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="age_group"> Targeted Audience</label>
                  <select
                    id="age_group"
                    name="age_group"
                    value={formData.age_group}
                    onChange={handleChange}
                    disabled={!isProUser}
                    className={`form-control ${
                      !isProUser ? "disabled-bg" : ""
                    }`}
                    placeholder="e.g., Best for first-timers and those preparing for key life or career transitions."
                  >
                    <option value="">Select </option>
                    {Array.isArray(ageGroups) &&
                      ageGroups.map((group) => (
                        <option key={group.id} value={group.id}>
                          {group.group_name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="delivery-row">
                  <label htmlFor="delivery_mode" className="form-label">
                    {" "}
                    Delivery Mode
                  </label>
                  <div className="delivery-checkboxes">
                    {Array.isArray(deliveryModes) &&
                      deliveryModes.map((mode) => (
                        <label key={mode.id} className="delivery-option">
                          <input
                            type="checkbox"
                            disabled={!isProUser}
                            checked={selectedDeliveryMode === mode.id}
                            onChange={() => setSelectedDeliveryMode(mode.id)}
                            className={!isProUser ? "disabled-bg" : ""}
                          />
                          {mode.mode_name}
                        </label>
                      ))}
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    rows={3}
                    placeholder="Enter details of delivery mode such as  Zoom, Google Meet or venue"
                    disabled={!isProUser}
                    className={`delivery-textarea form-control ${
                      !isProUser ? "disabled-bg" : ""
                    }`}
                  />
                </div>
                <div className="coach-session-count gap-2">
                  <div className="form-group col-md-4 number-of-session-input">
                    <label htmlFor="session_count">Number Of Session</label>
                    <input
                      required
                      type="number"
                      min={1}
                      name="session_count"
                      placeholder="4"
                      onChange={handleChange}
                      disabled={!isProUser}
                      className={`form-control ${
                        !isProUser ? "disabled-bg" : ""
                      }`}
                    />
                  </div>

                  <div className="form-group col-md-4  duration-per-session-input">
                    <label htmlFor="session_duration">
                      {" "}
                      Duration per session
                    </label>
                    {/* <select
                      required
                      disabled={!isProUser}
                      id="session_duration"
                      name="session_duration"
                      value={formData.session_duration}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option value="05">05 Min</option>
                      <option value="10">10 Min</option>
                      <option value="15">15 Min</option>
                      <option value="20">20 Min</option>
                      <option value="25">25 Min</option>
                      <option value="30">30 Min</option>
                      <option value="35">35 Min</option>
                      <option value="40">40 Min</option>
                      <option value="45">45 Min</option>
                      <option value="50">50 Min</option>
                      <option value="55">55 Min</option>
                      <option value="60">60 Min</option>
                      </select> */}
                      <input
                        required
                        type="time"
                        name="session_duration"
                        onChange={handleChange}
                        disabled={!isProUser}
                        className={`form-control ${
                          !isProUser ? "disabled-bg" : ""
                        }`}
                    />
                  </div>

                  <div className="form-group col-md-4">
                    <label htmlFor="session_format">
                      Session Format &nbsp;
                      <span
                        className="position-relative d-inline-block"
                        onMouseEnter={() => setShowSessionFormat(true)}
                        onMouseLeave={() => setShowSessionFormat(false)}
                        style={{ cursor: "pointer" }}
                      >
                        <InfoOutlinedIcon
                          sx={{ color: "#40C0E7", fontSize: 20 }}
                        />
                        {showSessionFormat && (
                          <div
                            className="position-absolute bg-light text-dark border small rounded shadow badge bg-light text-dark px-2 py-3 text-start"
                            style={{
                              top: "80%",
                              left: "900%",
                              transform: "translateX(-50%)",
                              zIndex: 10,
                              width: "320px",
                              whiteSpace: "normal",
                            }}
                          >
                            <InfoOutlinedIcon
                              sx={{ color: "#40C0E7", fontSize: 20 }}
                            />
                            <ol style={{ marginTop: "20px" }}>
                              <li>
                                <strong>1-on-1 Coaching</strong>
                                <p>
                                  A personalized, individual coaching session
                                  tailored to the client’s goals.
                                </p>
                              </li>
                              <li>
                                <strong>Group Session</strong>
                                <p>
                                  Small group format (e.g., 3–10 participants)
                                  ideal for peer learning and discussions.
                                </p>
                              </li>
                              <li>
                                <strong>Workshop / Masterclass</strong>
                                <p>
                                  One-time, topic-focused session typically
                                  longer in duration (.g., 90 mins – 3 hours).
                                </p>
                              </li>
                              <li>
                                <strong>Coaching Program / Package</strong>
                                <p>
                                  A structured series of sessions (e.g., 4-week
                                  program) offered as a bundle.
                                </p>
                              </li>
                              <li>
                                <strong>Self-paced Learning</strong>
                                <p>
                                  Pre-recorded or guided material that clients
                                  can consume on their own time.
                                </p>
                              </li>
                              <li>
                                <strong>Webinar / Live Talk</strong>
                                <p>
                                  Larger, live session often for awareness,
                                  education, or engagement purposes.
                                </p>
                              </li>
                              <li>
                                <strong>Drop-in / On-demand Session</strong>
                                <p>
                                  Flexible sessions that clients can join
                                  spontaneously when available.
                                </p>
                              </li>
                              <li>
                                <strong>Corporate/Team Training</strong>
                                <p>
                                  Tailored sessions for companies or teams,
                                  often goal-driven and strategic.
                                </p>
                              </li>
                              <li>
                                <strong>Accountability / Check-in Calls</strong>
                                <p>
                                  Great for user to trial first before
                                  committing to a long term programme.
                                </p>
                              </li>
                              <li>
                                <strong>Trial / Discovery Session</strong>
                                <p>
                                  Introductory session offered for free or at a
                                  reduced rate to assess fit.
                                </p>
                              </li>
                              <li>
                                <strong>Free / Pro Bono</strong>
                                <p>
                                  if you'd like to offer this service at no cost
                                  — either to support the community, as part of
                                  a trial, or for personal contribution
                                </p>
                              </li>
                            </ol>
                          </div>
                        )}
                      </span>
                    </label>
                    {/* <input
                      required
                      placeholder="1-on-1 Coaching"
                      onChange={handleChange}
                      disabled={!isProUser}
                      className={`form-control ${
                        !isProUser ? "disabled-bg" : ""
                      }`}
                    /> */}
                    <select
                      required
                      disabled={!isProUser}
                      id="session_format"
                      name="session_format"
                      value={formData.session_format}
                      onChange={handleChange}
                    >
                      <option value="">Select </option>
                      {Array.isArray(getFormats) &&
                        getFormats.map((fmt) => (
                          <option key={fmt.id} value={fmt.id}>
                            {fmt.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="coach-price-currency gap-2">
                  <div className="form-group col-md-4">
                    <label htmlFor="price">Total Price</label>
                    <input
                      required
                      type="number"
                      min={1}
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      disabled={!isProUser}
                      className={`form-control ${
                        !isProUser ? "disabled-bg" : ""
                      }`}
                    />
                  </div>

                  <div className="form-group col-md-4 currency-input">
                    <label htmlFor="currency">Currency</label>
                    <select
                      id="currency"
                      name="currency"
                      value={formData.currency}
                      onChange={handleChange}
                      disabled={!isProUser}
                      className={`form-control ${
                        !isProUser ? "disabled-bg" : ""
                      }`}
                    >
                      <option value="SGD">USD</option>
                    </select>
                  </div>

                  <div className="form-group col-md-4 pricing-model-input">
                    <label htmlFor="price_model">
                      Pricing Model &nbsp;
                      <span
                        className="position-relative d-inline-block"
                        onMouseEnter={() => setShowPricingModal(true)}
                        onMouseLeave={() => setShowPricingModal(false)}
                        style={{ cursor: "pointer" }}
                      >
                        <InfoOutlinedIcon
                          sx={{ color: "#40C0E7", fontSize: 20 }}
                        />
                        {showPricingModal && (
                          <div
                            className="position-absolute bg-light text-dark border small rounded shadow badge bg-light text-dark px-2 py-3 text-start"
                            style={{
                              top: "80%",
                              left: "900%",
                              transform: "translateX(-50%)",
                              zIndex: 10,
                              width: "320px",
                              whiteSpace: "normal",
                            }}
                          >
                            <InfoOutlinedIcon
                              sx={{ color: "#40C0E7", fontSize: 20 }}
                            />
                            <ol style={{ marginTop: "20px" }}>
                              <li>
                                <strong>Package-Based Pricing</strong>
                                <p>
                                  Bundle of multiple sessions at a fixed rate
                                  (e.g., “4 sessions for $300”). Great for
                                  building long-term commitment.
                                </p>
                              </li>
                              <li>
                                <strong>Program-Based Pricing</strong>
                                <p>
                                  Structured learning over weeks/months (e.g.,
                                  “8-week transformation program”). Includes
                                  resources, milestones, and assignments.
                                </p>
                              </li>
                              <li>
                                <strong>Subscription-Based Pricing</strong>
                                <p>
                                  Ongoing monthly access to the coach (e.g.,
                                  “$150/month for 2 sessions + email support”).
                                  seful for corporate clients or long-term
                                  coaching.
                                </p>
                              </li>
                              <li>
                                <strong>Performance-Based Pricing</strong>
                                <p>
                                  Payment tied to achieving specific outcomes
                                  (e.g., % of salary increase after career
                                  coaching). Best for experienced coaches with
                                  measurable goals.
                                </p>
                              </li>
                              <li>
                                <strong>Pay-As-You-Go</strong>
                                <p>
                                  No commitment; user pays per session when
                                  booked. Low barrier for new users.
                                </p>
                              </li>
                              <li>
                                <strong>Sliding Scale Pricing</strong>
                                <p>
                                  Variable rate based on client’s income or
                                  situation. Common in life coaching or
                                  non-profit engagements.
                                </p>
                              </li>
                              <li>
                                <strong>
                                  Ask for Quote: Custom-Based pricing
                                </strong>
                                <p>
                                  Custom pricing for organizations booking in
                                  bulk or group formats. Enables monetization
                                  through B2B opportunities.
                                </p>
                              </li>
                              <li>
                                <strong>Trial / Discovery</strong>
                                <p>
                                  Great for user to trial first before
                                  committing to a long term programme.
                                </p>
                              </li>
                              <li>
                                <strong>Free / Pro Bono</strong>
                                <p>
                                  if you'd like to offer this service at no cost
                                  — either to support the community, as part of
                                  a trial, or for personal contribution
                                </p>
                              </li>
                            </ol>
                          </div>
                        )}
                      </span>
                    </label>
                    <select
                      id="price_model"
                      name="price_model"
                      value={formData.price_model}
                      onChange={handleChange}
                      disabled={!isProUser}
                      className={`form-control ${
                        !isProUser ? "disabled-bg" : ""
                      }`}
                    >
                      <option value="">Select </option>
                      {getPriceModels.map((mdl) => (
                        <option key={mdl.id} value={mdl.id}>
                          {mdl.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="coach-slot-and-availability gap-2">
                  <div className="form-group col-md-4 slots-available-input">
                    <label htmlFor="booking_slots">
                      Slots available for Booking
                    </label>
                    <input
                      required
                      type="number"
                      min={1}
                      max={1000}
                      id="booking_slots"
                      name="booking_slots"
                      value={formData.booking_slots}
                      onChange={handleChange}
                      disabled={!isProUser}
                      className={`form-control ${
                        !isProUser ? "disabled-bg" : ""
                      }`}
                    />
                  </div>

                  <div className="form-group col-md-12">
                    <label htmlFor="booking_availability">Availablity</label>
                    <BookingAvailabilityPicker
                      formData={formData}
                      setFormData={setFormData}
                      isProUser={isProUser}
                    />
                  </div>

                  <div className="form-group col-md-4">
                    <label htmlFor="booking_window">
                      Booking Window &nbsp;
                      <InfoOutlinedIcon
                        sx={{ color: "#40C0E7", fontSize: 20 }}
                      />
                    </label>
                    <BookingWindowPicker
                      formData={formData}
                      setFormData={setFormData}
                      isProUser={isProUser}
                    />
                  </div>
                </div>
                <div className="validity-cancel-resedule gap-2">
                  <div className="form-group col-md-4">
                    <label htmlFor="session_validity">Validity</label>
                    <input
                      required
                      type="text"
                      id="session_validity"
                      name="session_validity"
                      value={formData.session_validity}
                      onChange={handleChange}
                      placeholder="Use within 6 weeks from first session "
                      disabled={!isProUser}
                      className={`form-control ${
                        !isProUser ? "disabled-bg" : ""
                      }`}
                    />
                  </div>

                  <div className="form-group col-md-4 cancellation-policy-input">
                    <label htmlFor="cancellation_policy">
                      Cancellation Policy
                    </label>
                    <select
                      id="cancellation_policy"
                      name="cancellation_policy"
                      value={formData.cancellation_policy}
                      onChange={handleChange}
                      disabled={!isProUser}
                      className={`form-control ${
                        !isProUser ? "disabled-bg" : ""
                      }`}
                    >
                      <option>
                        Flexible – Full refund if canceled ≥24 hours before
                        session
                      </option>
                      <option>
                        Moderate – 50% refund if canceled ≥24 hours before
                        session
                      </option>
                      <option>{`Strict – No refund if canceled <48 hours before session`}</option>
                      <option>
                        Rescheduling Only – No refund, but reschedule allowed
                        with 24-hour notice
                      </option>
                      <option>
                        Non-refundable – All bookings are final and
                        non-refundable
                      </option>
                      <option>Custom Policy (show text box below)</option>
                    </select>
                  </div>

                  <div className="form-group col-md-4">
                    <label htmlFor="rescheduling_policy">
                      Rescheduling Policy
                    </label>
                    <input
                      type="text"
                      id="rescheduling_policy"
                      name="rescheduling_policy"
                      value={formData.rescheduling_policy}
                      onChange={handleChange}
                      placeholder="One free reschedule allowed per session"
                      disabled={!isProUser}
                      className={`form-control ${
                        !isProUser ? "disabled-bg" : ""
                      }`}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="media_file" className="form-label">
                    Media Upload
                  </label>

                  <div className="custom-file-upload">
                    <label htmlFor="media_file" className="upload-btn">
                      Choose file
                    </label>
                    <span className="file-name">No file chosen</span>
                    <input
                      type="file"
                      id="media_file"
                      name="media_file"
                      accept="image/*"
                      onChange={handleFileChange}
                      disabled={!isProUser}
                      className={`form-control ${
                        !isProUser ? "disabled-bg" : ""
                      }`}
                    />
                  </div>
                </div>
              </div>
              <div className="card preview-section">
                <h4 className="quick-text">Preview</h4>
                <PreviewPackage
                  pkg={formData}
                  DeliveryMode={selectedDeliveryMode}
                  allDelveryMode={deliveryModes}
                  allPriceModel={getPriceModels}
                  allSessionFormat={getFormats}
                />
              </div>
            </div>
            {!isProUser ? (
              <div className="upgrade-banner d-flex align-items-center justify-content-center gap-3 mt-5 p-3 bg-white">
              <div className="d-flex align-items-center">
                <span className="upgrade-banner-text">
                  🚀 Ready to Stand out? <strong>Upgrade now</strong>
                </span>
              </div>
              <button type="submit" className="btn upgrade-btn px-4 py-2" >
                Unlock Pro Features
              </button>
            </div>
            ) : null }
          </div>
        </div>

        <div className="action-button">
          <div className="save-btn gap-0">
            <div className="two-number-add-list">
              <span className="fw-bold second-list-show"><span className="number-color">2</span>/2</span>
            </div>
            {isProUser ? (
              <div className="d-flex gap-1 add-draft-service">
                <button
                  type="submit"
                  className="save-btn-add"
                  value="draft"
                  disabled={!isProUser}
                >
                  Save Draft <EastIcon className="mui-icons" />
                </button>

                <button
                  type="submit"
                  className="save-btn-add"
                  value="add_package"
                  disabled={!isProUser}
                >
                  Add Service Package <EastIcon className="mui-icons" />
                </button>
                <button
                  type="submit"
                  className="save-btn-add"
                  value="publish"
                  disabled={!isProUser}
                >
                  Publish <EastIcon className="mui-icons" />
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </form>
    </div>
  );
}
