"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getAllMasters } from "@/app/api/guest";
import Cookies from "js-cookie";
import BookingWindowPicker from "./BookingWindow";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { PreviewPackage } from "./PreviewPackage";
import { Controller } from "react-hook-form";
import EastIcon from "@mui/icons-material/East";
import { toast } from "react-toastify";
import { servicePackageSchema } from "@/lib/validationSchema";
import dayjs from "dayjs";
import BookingAvailabilityPicker from "./BookingAvailability";
import {
  FormControl,
  Select,
  MenuItem,
  Chip,
  Box,
  Autocomplete,
  TextField,
} from "@mui/material";

export default function CoachServicePackageFormChild({
  isProUser,
  onPackageAdded,
  packageData = null,
  ageGroups,
  getCommunChannel,
  getPriceModels,
  categories,
  getCancelPolicies,
  getFormats,
  deliveryModes,
}) {
  const [showDetailDescription, setShowDetailDescription] = useState(false);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [showSessionFormat, setShowSessionFormat] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  // Initialize with packageData.delivery_mode from database
  const [selectedDeliveryMode, setSelectedDeliveryMode] = useState(
    packageData?.delivery_mode ? parseInt(packageData.delivery_mode) : 1,
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    control,
    trigger,
  } = useForm({
    resolver: yupResolver(servicePackageSchema),
    defaultValues: {
      title: packageData?.title || "",
      short_description: packageData?.short_description || "",
      coaching_category: packageData?.coaching_category || "",
      description: packageData?.description || "",
      focus: packageData?.focus || "",
      delivery_mode_detail: packageData?.delivery_mode_detail || "",
      age_group: (() => {
  const v = packageData?.age_group;

  if (Array.isArray(v)) return v.map(String);

  if (typeof v === "string") {
    try {
      const parsed = JSON.parse(v);
      if (Array.isArray(parsed)) return parsed.map(String);
    } catch {
      // "3,5,7" fallback
      return v
        .split(",")
        .map(x => x.replace(/["[\]\s]/g, ""))
        .filter(Boolean);
    }
  }

  return [];
})(),

      session_count: packageData?.session_count || "",
      session_duration: packageData?.session_duration || "",
      session_format: packageData?.session_format || "",
      price: packageData?.price || "",
      currency: packageData?.currency || "USD",
      price_model: packageData?.price_model || "",
      booking_slots: packageData?.booking_slots || "",
      session_validity: packageData?.session_validity || "",
      cancellation_policy: packageData?.cancellation_policy || "",
      rescheduling_policy: packageData?.rescheduling_policy || "",
      media_file: null,
      media_url: packageData?.media_url || null,
      booking_availability_start: packageData?.booking_availability_start
        ? packageData.booking_availability_start.split(" ")[0] // Extract date part
        : "",
      booking_availability_end: packageData?.booking_availability_end || "",
      booking_time: packageData?.booking_time || "",
      booking_window_start: packageData?.booking_window_start || "",
      booking_window_end: packageData?.booking_window_end || "",
      communication_channel: packageData?.communication_channel || "",
    },
  });
useEffect(() => {
  if (packageData?.media_url) setMediaPreview(packageData.media_url);
}, [packageData]);

  // Watch form values for preview
  const formData = watch();

const handleFileChange = (e) => {
  const file = e.target.files?.[0];

  if (file) {
    
    setValue("media_file", file); // react-hook-form
    setMediaPreview(URL.createObjectURL(file)); // ✅ preview
  }
};


  const onSubmit = async (data, e) => {
    const clickedButton = e.nativeEvent.submitter?.value || "draft";
    const package_status = clickedButton === "publish" ? 1 : 2;

    try {
      const token = Cookies.get("token");
      const form = new FormData();

// 1️⃣ Normal fields (except media)
// 1️⃣ Normal fields (skip file only)
Object.entries(data).forEach(([key, value]) => {
  if (value !== null && value !== undefined && key !== "media_file") {
    form.append(key, value);
  }
});

// 2️⃣ Handle media_file / media_url
if (data.media_file instanceof File) {
  // New image selected → send file
  form.append("media_file", data.media_file);
} else if (data.media_url) {
  // No new image, keep existing → send media_url
  form.append("media_url", data.media_url);
} else {
  // No image at all → null
  form.append("media_url", null);
}

// 3️⃣ Extra fixed fields
form.append("delivery_mode", selectedDeliveryMode);
form.append("package_status", package_status);
form.append("package_id", packageData.id);



      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/update-service-package`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: form,
        },
      );

      const result = await response.json();

      if (result.status) {
        toast.success("Package updated successfully!");
        onPackageAdded?.();
      } else {
        toast.error(result.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Error submitting package:", err);
      toast.error("Network or server error.");
    }
  };

  return (
    <div className="profile-form-add update_service_pack add_service_update_list">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card">
          {isProUser ? (
            <>
              <h3 className="text-lg font-semibold">
                <AddCircleOutlineRoundedIcon /> Update Service Package
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
            <div className="profile-form service-profile-add">
              <div className="form-section">
                <div className="form-group">
                  <label htmlFor="title">Service Title</label>
                  <input
                    type="text"
                    id="title"
                    placeholder="Confidence Jumpstart Session"
                    disabled={!isProUser}
                    className={`form-control ${!isProUser ? "disabled-bg" : ""} ${
                      errors.title ? "is-invalid" : ""
                    }`}
                    {...register("title")}
                  />
                  {errors.title && (
                    <div className="invalid-feedback">
                      {errors.title.message}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="short_description">
                    Short Descriptions{" "}
                    <small>Not more than 200 characters</small>
                  </label>
                  <textarea
                    id="short_description"
                    rows="3"
                    placeholder="Snapshot descriptions"
                    disabled={!isProUser}
                    className={`form-control ${!isProUser ? "disabled-bg" : ""} ${
                      errors.short_description ? "is-invalid" : ""
                    }`}
                    {...register("short_description")}
                  ></textarea>
                  {errors.short_description && (
                    <div className="invalid-feedback">
                      {errors.short_description.message}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="coaching_category">Coaching Type</label>
                  <select
                    id="coaching_category"
                    disabled={!isProUser}
                    className={`form-control ${!isProUser ? "disabled-bg" : ""} ${
                      errors.coaching_category ? "is-invalid" : ""
                    }`}
                    {...register("coaching_category")}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.category_name}
                      </option>
                    ))}
                  </select>
                  {errors.coaching_category && (
                    <div className="invalid-feedback">
                      {errors.coaching_category.message}
                    </div>
                  )}
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
                            <li>What's included?</li>
                            <li>Who should book this?</li>
                            <li>Things to note before client book</li>
                          </ol>
                        </div>
                      )}
                    </span>
                  </label>
                  <textarea
                    id="description"
                    rows="3"
                    disabled={!isProUser}
                    className={`form-control ${!isProUser ? "disabled-bg" : ""} ${
                      errors.description ? "is-invalid" : ""
                    }`}
                    {...register("description")}
                  ></textarea>
                  {errors.description && (
                    <div className="invalid-feedback">
                      {errors.description.message}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="focus"> Service Focus</label>
                  <input
                    type="text"
                    id="focus"
                    placeholder="e.g., Confidence, Goal clarity, Custom action plan"
                    disabled={!isProUser}
                    className={`form-control ${!isProUser ? "disabled-bg" : ""} ${
                      errors.focus ? "is-invalid" : ""
                    }`}
                    {...register("focus")}
                  />
                  {errors.focus && (
                    <div className="invalid-feedback">
                      {errors.focus.message}
                    </div>
                  )}
                </div>

                <div className="d-flex gap-2">
                  <div className="form-group col-md-6">
                    <label htmlFor="age_group"> Targeted Audience</label>
                    <Controller
                      name="age_group"
                      control={control}
                      render={({ field }) => (
                        <FormControl fullWidth error={!!errors.age_group}>
                          <Select
                            multiple
                            displayEmpty
                            value={field.value || []}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value.map(String), // 👈 force string
                              )
                            }
                            renderValue={(selected) => {
                              if (!selected.length) {
                                return <em>Select Age Group</em>;
                              }

                              return (
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 0.5,
                                  }}
                                >
                                  {selected.map((id) => {
                                    const item = ageGroups.find(
                                      (g) => String(g.id) === id,
                                    );
                                    return item ? (
                                      <Chip key={id} label={item.group_name} />
                                    ) : null;
                                  })}
                                </Box>
                              );
                            }}
                          >
                            {ageGroups.map((age) => (
                              <MenuItem key={age.id} value={String(age.id)}>
                                {age.group_name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    />

                    {errors.age_group && (
                      <div className="invalid-feedback">
                        {errors.age_group.message}
                      </div>
                    )}
                  </div>

                  <div className="form-group col-md-6">
                    <label htmlFor="communication_channel">
                      {" "}
                      Communication Channel
                    </label>
                    <select
                      id="communication_channel"
                      disabled={!isProUser}
                      className={`form-control ${!isProUser ? "disabled-bg" : ""} ${
                        errors.communication_channel ? "is-invalid" : ""
                      }`}
                      {...register("communication_channel")}
                    >
                      <option value="">Select </option>
                      {Array.isArray(getCommunChannel) &&
                        getCommunChannel.map((chanel) => (
                          <option key={chanel.id} value={chanel.id}>
                            {chanel.category_name}
                          </option>
                        ))}
                    </select>
                    {errors.communication_channel && (
                      <div className="invalid-feedback">
                        {errors.communication_channel.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className="delivery-row">
                  <label htmlFor="delivery_mode" className="form-label">
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
                  {errors.delivery_mode && (
                    <div className="invalid-feedback">
                      {errors.delivery_mode.message}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <textarea
                    rows={3}
                    placeholder="Enter details of delivery mode such as Zoom, Google Meet or venue"
                    disabled={!isProUser}
                    className={`delivery-textarea form-control ${
                      !isProUser ? "disabled-bg" : ""
                    } ${errors.delivery_mode_detail ? "is-invalid" : ""}`}
                    {...register("delivery_mode_detail")}
                  />
                  {errors.delivery_mode_detail && (
                    <div className="invalid-feedback">
                      {errors.delivery_mode_detail.message}
                    </div>
                  )}
                </div>

                <div className="coach-session-count gap-2">
                  <div className="form-group col-md-4 number-of-session-input">
                    <label htmlFor="session_count">Number Of Session</label>
                    <input
                      type="number"
                      min={1}
                      placeholder="1"
                      disabled={!isProUser}
                      className={`form-control ${!isProUser ? "disabled-bg" : ""} ${
                        errors.session_count ? "is-invalid" : ""
                      }`}
                      {...register("session_count", {
                        valueAsNumber: true,
                      })}
                    />
                    {errors.session_count && (
                      <div className="invalid-feedback">
                        {errors.session_count.message}
                      </div>
                    )}
                  </div>

                  <div className="form-group col-md-4 duration-per-session-input">
                    <label htmlFor="session_duration">
                      Duration per session
                    </label>
                    <input
                      type="time"
                      disabled={!isProUser}
                      id="session_duration"
                      className={`form-control ${!isProUser ? "disabled-bg" : ""} ${
                        errors.session_duration ? "is-invalid" : ""
                      }`}
                      {...register("session_duration")}
                    />

                    {errors.session_duration && (
                      <div className="invalid-feedback">
                        {errors.session_duration.message}
                      </div>
                    )}
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
                              </li>
                              <li>
                                <strong>Group Session</strong>
                              </li>
                              <li>
                                <strong>Workshop / Masterclass</strong>
                              </li>
                              <li>
                                <strong>Coaching Program / Package</strong>
                              </li>
                              <li>
                                <strong>Self-paced Learning</strong>
                              </li>
                              <li>
                                <strong>Webinar / Live Talk</strong>
                              </li>
                              <li>
                                <strong>Drop-in / On-demand Session</strong>
                              </li>
                              <li>
                                <strong>Corporate/Team Training</strong>
                              </li>
                              <li>
                                <strong>Accountability / Check-in Calls</strong>
                              </li>
                              <li>
                                <strong>Trial / Discovery Session</strong>
                              </li>
                              <li>
                                <strong>Free / Pro Bono</strong>
                              </li>
                            </ol>
                          </div>
                        )}
                      </span>
                    </label>
                    <select
                      disabled={!isProUser}
                      id="session_format"
                      className={`form-control ${!isProUser ? "disabled-bg" : ""} ${
                        errors.session_format ? "is-invalid" : ""
                      }`}
                      {...register("session_format")}
                    >
                      <option value="">Select </option>
                      {Array.isArray(getFormats) &&
                        getFormats.map((fmt) => (
                          <option key={fmt.id} value={fmt.id}>
                            {fmt.name}
                          </option>
                        ))}
                    </select>
                    {errors.session_format && (
                      <div className="invalid-feedback">
                        {errors.session_format.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className="coach-price-currency gap-2">
                  <div className="form-group col-md-4">
                    <label htmlFor="price">Total Price</label>
                    <input
                      type="number"
                      min={0}
                      id="price"
                      disabled={!isProUser}
                      className={`form-control ${!isProUser ? "disabled-bg" : ""} ${
                        errors.price ? "is-invalid" : ""
                      }`}
                      {...register("price", {
                        valueAsNumber: true,
                      })}
                    />
                    {errors.price && (
                      <div className="invalid-feedback">
                        {errors.price.message}
                      </div>
                    )}
                  </div>

                  <div className="form-group col-md-4 currency-input">
                    <label htmlFor="currency">Currency</label>
                    <select
                      id="currency"
                      disabled={!isProUser}
                      className={`form-control ${!isProUser ? "disabled-bg" : ""} ${
                        errors.currency ? "is-invalid" : ""
                      }`}
                      {...register("currency")}
                    >
                      <option value="USD">USD</option>
                      <option value="SGD">SGD</option>
                    </select>
                    {errors.currency && (
                      <div className="invalid-feedback">
                        {errors.currency.message}
                      </div>
                    )}
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
                              </li>
                              <li>
                                <strong>Program-Based Pricing</strong>
                              </li>
                              <li>
                                <strong>Subscription-Based Pricing</strong>
                              </li>
                              <li>
                                <strong>Performance-Based Pricing</strong>
                              </li>
                              <li>
                                <strong>Pay-As-You-Go</strong>
                              </li>
                              <li>
                                <strong>Sliding Scale Pricing</strong>
                              </li>
                              <li>
                                <strong>
                                  Ask for Quote: Custom-Based pricing
                                </strong>
                              </li>
                              <li>
                                <strong>Trial / Discovery</strong>
                              </li>
                              <li>
                                <strong>Free / Pro Bono</strong>
                              </li>
                            </ol>
                          </div>
                        )}
                      </span>
                    </label>
                    <select
                      id="price_model"
                      disabled={!isProUser}
                      className={`form-control ${!isProUser ? "disabled-bg" : ""} ${
                        errors.price_model ? "is-invalid" : ""
                      }`}
                      {...register("price_model")}
                    >
                      <option value="">Select </option>
                      {getPriceModels.map((mdl) => (
                        <option key={mdl.id} value={mdl.id}>
                          {mdl.name}
                        </option>
                      ))}
                    </select>
                    {errors.price_model && (
                      <div className="invalid-feedback">
                        {errors.price_model.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <div className="form-group col-md-4 slots-available-input">
                    <label htmlFor="booking_slots">
                      Seats available for Booking
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={1000}
                      id="booking_slots"
                      disabled={!isProUser}
                      className={`form-control ${!isProUser ? "disabled-bg" : ""} ${
                        errors.booking_slots ? "is-invalid" : ""
                      }`}
                      {...register("booking_slots", {
                        valueAsNumber: true,
                      })}
                    />
                    {errors.booking_slots && (
                      <div className="invalid-feedback">
                        {errors.booking_slots.message}
                      </div>
                    )}
                  </div>

                  <div className="form-group col-md-6 availablity-list-input">
                    <label htmlFor="booking_availability">Availability</label>
                    <BookingAvailabilityPicker
                      formData={formData}
                      setFormData={(data) => {
                        setValue(
                          "booking_availability_start",
                          data.booking_availability_start,
                        );
                        setValue(
                          "booking_availability_end",
                          data.booking_availability_end,
                        );
                        setValue(
                          "booking_time",
                          JSON.stringify(data.booking_availability),
                        );
                        trigger([
                          "booking_availability_start",
                          "booking_availability_end",
                        ]);
                      }}
                      sessionDuration={formData.session_duration || 60}
                      bookingSlots={formData.booking_slots || 1}
                      isProUser={isProUser}
                    />
                  </div>

                  {/* <div className="form-group col-md-4">
                    <label htmlFor="booking_time">Availability Time</label>
                    <input
                      type="time"
                      id="booking_time"
                      disabled={!isProUser}
                      className={`form-control ${!isProUser ? "disabled-bg" : ""} ${errors.booking_time ? "is-invalid" : ""
                        }`}
                      {...register("booking_time")}
                    />
                    {errors.booking_time && (
                      <div className="invalid-feedback">
                        {errors.booking_time.message}
                      </div>
                    )}
                  </div> */}
                </div>

                <div className="d-flex gap-2">
                  {/* <div className="form-group col-md-4">
                    <label>
                      Booking Window &nbsp;
                      <InfoOutlinedIcon sx={{ color: "#40C0E7", fontSize: 20 }} />
                    </label>
                    <BookingWindowPicker
                      formData={formData}
                      setFormData={(data) => {
                        // Update both fields in react-hook-form
                        setValue("booking_window_start", data.booking_window_start);
                        setValue("booking_window_end", data.booking_window_end);

                        // Trigger validation for both fields
                        trigger(["booking_window_start", "booking_window_end"]);
                      }}
                      isProUser={isProUser}
                      error={errors.booking_window_start || errors.booking_window_end}
                    />
                  </div> */}

                  <div className="form-group col-md-4">
                    <label htmlFor="session_validity">Validity</label>
                    <input
                      type="text"
                      id="session_validity"
                      placeholder="Use within 6 weeks from first session"
                      disabled={!isProUser}
                      className={`form-control ${!isProUser ? "disabled-bg" : ""} ${
                        errors.session_validity ? "is-invalid" : ""
                      }`}
                      {...register("session_validity")}
                    />
                    {errors.session_validity && (
                      <div className="invalid-feedback">
                        {errors.session_validity.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className="validity-cancel-resedule gap-2">
                  <div className="form-group col-md-4 cancellation-policy-input">
                    <label htmlFor="cancellation_policy">
                      Cancellation Policy
                    </label>
                    <select
                      id="cancellation_policy"
                      disabled={!isProUser}
                      className={`form-control ${!isProUser ? "disabled-bg" : ""} ${
                        errors.cancellation_policy ? "is-invalid" : ""
                      }`}
                      {...register("cancellation_policy")}
                    >
                      <option value="">Select Cancellation Policy </option>
                      {Array.isArray(getCancelPolicies) &&
                        getCancelPolicies.map((concelPolicy) => (
                          <option key={concelPolicy.id} value={concelPolicy.id}>
                            {concelPolicy.name}
                          </option>
                        ))}

                      {/* <option value="custom">Custom Policy</option> */}
                    </select>
                    {errors.cancellation_policy && (
                      <div className="invalid-feedback">
                        {errors.cancellation_policy.message}
                      </div>
                    )}
                  </div>

                  <div className="form-group col-md-4">
                    <label htmlFor="rescheduling_policy">
                      Rescheduling Policy
                    </label>
                    <input
                      type="text"
                      id="rescheduling_policy"
                      placeholder="One free reschedule allowed per session"
                      disabled={!isProUser}
                      className={`form-control ${!isProUser ? "disabled-bg" : ""} ${
                        errors.rescheduling_policy ? "is-invalid" : ""
                      }`}
                      {...register("rescheduling_policy")}
                    />
                    {errors.rescheduling_policy && (
                      <div className="invalid-feedback">
                        {errors.rescheduling_policy.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="media_file" className="form-label">
                    Media Upload
                  </label>
<div className="custom-file-upload">
  <label htmlFor="media_file" className="upload-btn">
    {formData.media_file
      ? formData.media_file.name // newly selected file
      : packageData?.media_file
      ? packageData.media_file // existing file name
      : "Choose file"}
  </label>

  <input
    type="file"
    id="media_file"
    accept="image/*"
    onChange={handleFileChange}
    disabled={!isProUser}
    className={`form-control ${!isProUser ? "disabled-bg" : ""} ${
      errors.media_file ? "is-invalid" : ""
    }`}
    style={{ display: "none" }} // hide the actual file input
  />
</div>

                  {errors.media_file && (
                    <p style={{ color: "#dc3545" }}>
                      {errors.media_file.message}
                    </p>
                  )}
                </div>

              {mediaPreview && (
  <div className="preview-image">
    <img
      src={mediaPreview}
      alt="Preview"
      style={{
        maxWidth: "100%",
        maxHeight: "200px",
        objectFit: "cover",
        borderRadius: "6px",
        border: "1px solid #ddd",
      }}
    />
  </div>
)}
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
                <button type="button" className="btn upgrade-btn px-4 py-2">
                  Unlock Pro Features
                </button>
              </div>
            ) : null}
          </div>
        </div>

        <div className="action-button">
          <div className="save-btn gap-0">
            <div className="two-number-add-list">
              {/* <span className="fw-bold second-list-show"><span className="number-color">2</span>/2</span> */}
            </div>
            {isProUser ? (
              <div className="d-flex gap-3 add-draft-service">
                <button
                  type="submit"
                  className="save-btn-add"
                  value="draft"
                  disabled={!isProUser || isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save Draft"}{" "}
                  <EastIcon className="mui-icons" />
                </button>
                <button
                  type="submit"
                  className="save-btn-add"
                  value="publish"
                  disabled={!isProUser || isSubmitting}
                >
                  {isSubmitting ? "Publishing..." : "Publish"}{" "}
                  <EastIcon className="mui-icons" />
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </form>
    </div>
  );
}
