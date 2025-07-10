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
import CoachAvailability from "./CoachAvailability";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function CoachServicePackageForm() {
  const [mediaFile, setMediaFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [ageGroups, setAgeGroups] = useState([]);
  const [deliveryModes, setDeliveryModes] = useState([]);
  const [getFormats, setSessionFormats] = useState([]);
  const [getPriceModels, setPriceModels] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    short_description: "",
    coaching_category: "",
    description: "",
    focus: "",
    target_audience: "",
    delivery_mode: "",
    session_count: "",
    session_duration: "",
    session_format: "",
    price: "",
    currency: "USD",
    price_model: "",
    slot_availability: "",
    booking_slot: "",
    booking_window: "",
    session_validity: "",
    cancellation_policy: "",
    rescheduling_policy: "",
    booking_availability: "",
  });

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
        setDeliveryModes(delRes);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = Cookies.get("token");
      const form = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        form.append(key, value);
      });

      // Append media file if selected
      if (mediaFile) {
        form.append("media_file", mediaFile);
      }

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
        alert("✅ " + result.message);
      } else {
        alert("❌ " + result.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Error submitting package:", err);
      alert("❌ Network or server error.");
    }
  };

  return (
    <div className="profile-form-add">
      <form onSubmit={handleSubmit}>
        <div className="card">
          <h3 className="text-lg font-semibold">
            <AddCircleOutlineRoundedIcon /> Add New Service Package
          </h3>
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
                    placeholder="e.g., Confidence Jumpstart Session"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="short_description">
                    Short Desriptions{" "}
                    <small>Not more than 200 characters</small>
                  </label>
                  <textarea
                    id="short_description"
                    name="short_description"
                    rows="3"
                    placeholder="Snapshot descriptions"
                    onChange={handleChange}
                    value={formData.short_description}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="coaching_category">Coaching Category</label>
                  <select
                    id="coaching_category"
                    name="coaching_category"
                    value={formData.coaching_category}
                    onChange={handleChange}
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
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                      style={{ cursor: "pointer" }}
                    >
                      <InfoOutlinedIcon
                        sx={{ color: "#40C0E7", fontSize: 20 }}
                      />
                      {showTooltip && (
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
                          <p><strong>Guideline</strong></p>
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
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="target_audience"> Targeted Audience</label>
                  <select
                    id="target_audience"
                    name="target_audience"
                    value={formData.target_audience}
                    onChange={handleChange}
                    placeholder="e.g., Best for first-timers and those preparing for key life or career transitions."
                  >
                    <option value="">Select </option>
                    {ageGroups.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.group_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="delivery-row">
                  <label htmlFor="delivery_mode" className="form-label">
                    Delivery Mode
                  </label>

                  <div className="delivery-checkboxes">
                    <label className="delivery-option">
                      <input type="checkbox" /> Online
                    </label>
                    <label className="delivery-option">
                      <input type="checkbox" /> In-person
                    </label>
                    <label className="delivery-option">
                      <input type="checkbox" /> Hybrid
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    className="delivery-textarea"
                    rows={3}
                    placeholder="Enter details of delivery mode such as  Zoom, Google Meet or venue"
                  />
                </div>
                <div className="coach-session-count gap-4">
                  <div className="form-group col-md-4">
                    <label htmlFor="session_count">Number Of Session</label>
                    <select required onChange={handleChange}>
                      <option value="">Select</option>
                    </select>
                  </div>

                  <div className="form-group col-md-4">
                    <label htmlFor="session_duration">
                      {" "}
                      Duration per session
                    </label>
                    <select required onChange={handleChange}>
                      <option value="">Select</option>
                    </select>
                  </div>

                  <div className="form-group col-md-4">
                    <label htmlFor="session_format">
                      Session Format &nbsp;
                      <InfoOutlinedIcon
                        sx={{ color: "#40C0E7", fontSize: 20 }}
                      />
                    </label>
                    <input
                      required
                      placeholder="1-on-1 Coaching"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="coach-price-currency gap-4">
                  <div className="form-group col-md-4">
                    <label htmlFor="price">Total Price</label>
                    <input
                      required
                      type="text"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group col-md-4">
                    <label htmlFor="currency">Currency</label>
                    <select
                      id="currency"
                      name="currency"
                      value={formData.currency}
                      onChange={handleChange}
                    >
                      <option value="SGD">SGD</option>
                    </select>
                  </div>

                  <div className="form-group col-md-4">
                    <label htmlFor="price_model">
                      Pricing Model &nbsp;
                      <InfoOutlinedIcon
                        sx={{ color: "#40C0E7", fontSize: 20 }}
                      />
                    </label>
                    <select
                      id="price_model"
                      name="price_model"
                      value={formData.price_model}
                      onChange={handleChange}
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
                <div className="coach-slot-and-availability gap-4">
                  <div className="form-group col-md-4">
                    <label htmlFor="price">Slots available for Booking</label>
                    <input
                      required
                      type="text"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                    />
                  </div>

                  {/* <div className='form-group col-md-4'>
                                <label htmlFor='booking_slot'>Availablity</label>
                            </div> */}
                  <CoachAvailability
                    formData={formData}
                    setFormData={setFormData}
                  />

                  {/* <div className='form-group col-md-4'>
                                <label htmlFor='booking_window'>Booking Window</label>
                            </div> */}

                  <BookingWindowPicker
                    formData={formData}
                    setFormData={setFormData}
                  />
                </div>
                <div className="validity-cancel-resedule gap-4">
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
                    />
                  </div>

                  <div className="form-group col-md-4">
                    <label htmlFor="cancellation_policy">
                      Cancellation Policy
                    </label>
                    <input
                      type="text"
                      id="cancellation_policy"
                      name="cancellation_policy"
                      value={formData.cancellation_policy}
                      onChange={handleChange}
                      placeholder="Flexible – Full refund if canceled ≥24 hours before session "
                    />
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
                      onChange={(e) => {
                        const fileName =
                          e.target.files[0]?.name || "No file chosen";
                        document.querySelector(".file-name").textContent =
                          fileName;
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="card preview-section">
                <h4 className="quick-text">Preview</h4>
                <div className="session-card">
                  <img
                    src="/coachsparkle/images/service-package1.png"
                    alt="Team Image"
                    className="top-image"
                  />
                  <div className="session-content">
                    <h2>Confidence Jumpstart Session</h2>
                    <div className="icons-row">
                      <PersonalVideoIcon /> Online
                      <PersonOutlineOutlinedIcon /> 1-on-1 coaching
                      <CalendarMonthOutlinedIcon /> Jun - Aug 2025
                    </div>
                    <div className="icons-row">
                      <ForumOutlinedIcon /> 4 Sessions
                      <i
                        className="bi bi-clock-history"
                        style={{ transform: "scaleX(-1)" }}
                      ></i>{" "}
                      60 Min/Session
                    </div>
                    <div className="icons-row">
                      <GpsFixedIcon /> Confidence, Goal clarity, Custom action
                      plan
                    </div>
                    <p className="session-description">
                      A one-time deep-dive session to assess your confidence
                      blocks, set clear goals, and walk away with a custom
                      action plan.
                    </p>
                    <div className="price">$290 / Package</div>
                    <div className="d-flex justify-content-center">
                      <button className="cursor-pointer">
                        View Details and Book Now
                      </button>
                    </div>
                    <div className="d-flex justify-content-start gap-2 mt-4">
                      <i
                        className="bi bi-fire"
                        style={{ transform: "scaleX(-1)" }}
                      ></i>
                      Only 4 slots left!
                    </div>
                    <div className="mt-3">
                      Best for first timers and those preparing for key life or
                      career transition
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="action-button">
          <div className="save-btn gap-3 align-items-center">
            <span className="fw-bold">2/2</span>
            <button type="submit" className="save-btn-add">
              Save Draft <i className="bi bi-arrow-right"></i>
            </button>
            <button type="submit" className="save-btn-add">
              Add Service Package <i className="bi bi-arrow-right"></i>
            </button>
            <button type="submit" className="save-btn-add">
              Publish <i className="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
