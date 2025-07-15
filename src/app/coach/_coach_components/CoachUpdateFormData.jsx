"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import {
  getCitiesOfaState,
  getStatesOfaCountry,
  getSubCoachType,
} from "@/app/api/guest";
import UserImageUploader from "@/app/user/_user_components/ImageUploader";
import MultipleSelectChip from "@/components/MultipleSelectChip";
import MultipleSelectCheckmarks from "@/components/MultipleSelectCheckmarks";


export default function CoachUpdateForm({
  user,
  countries,
  allLanguages,
  coachTypes,
  deliveryMode,
  ageGroup,
  getAllServices
}) {
  const router = useRouter();
  const [getToken, setToken] = useState();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [coachSubTypes, setSubCoachTypes] = useState([]);
  let isProUser = user.subscription_plan.plan_name == 'Pro' ? true : false;

  const [certificates, setCertificates] = useState([]);

  const [formData, setFormData] = useState({
    user_type: user?.user_type || 3,
    first_name: user?.first_name || "",
    gender: user?.gender || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    country_id: user?.country_id || "",
    state_id: user?.state_id || "",
    city_id: user?.city_id || "",
    coach_type: user?.coach_type || "",
    coach_subtype: user?.coach_subtype || "",
    professional_title: user?.professional_title || "",
    company_name: user?.company_name || "",
    experience: user?.experience || "",
    delivery_mode: user?.delivery_mode || "",
    price: user?.price || "",
    price_range: user?.price_range || "",
    age_group: user?.age_group || "",
    language_names: user?.language_names?.map((lang) => lang.id) || [],
    service_keyword: user?.service_keyword?.map((servc) => servc.id) || [],

    service_names: user?.service_names || [],
    detailed_bio: user?.detailed_bio || "",
    exp_and_achievement: user?.exp_and_achievement || "",
    is_corporate: user?.is_corporate || 0,
    free_trial_session: user?.free_trial_session || 0,
    is_pro_bono: user?.is_pro_bono || 0,
    //SocialLink
    linkdin_link: user?.linkdin_link,
    website_link: user?.website_link,
    youtube_link: user?.youtube_link,
    podcast_link: user?.podcast_link,
    blog_article: user?.blog_article,
    video_link: user?.video_link,
  });

  // console.log('allLanguages', allLanguages)
  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      router.push("/login");
      return;
    }
    setToken(token);
  }, [])

  useEffect(() => {
    const loadDefaults = async () => {
      if (formData.country_id) {
        const stateRes = await getStatesOfaCountry(formData.country_id);
        setStates(stateRes || []);
      }
      if (formData.state_id) {
        const cityRes = await getCitiesOfaState(formData.state_id);
        setCities(cityRes || []);
      }
      if (formData.coach_type) {
        const coachSubtypeRes = await getSubCoachType(formData.coach_type);
        setSubCoachTypes(coachSubtypeRes || []);
      }
    };
    loadDefaults();
  }, [formData.country_id, formData.state_id]);

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "country_id") {
      setFormData((prev) => ({
        ...prev,
        state_id: "",
        city_id: "",
      }));

      const stateRes = await getStatesOfaCountry(value);
      setStates(stateRes || []);
      setCities([]); // reset cities
    }

    if (name === "state_id") {
      setFormData((prev) => ({
        ...prev,
        city_id: "",
      }));

      const cityRes = await getCitiesOfaState(value);
      setCities(cityRes || []);
    }

    if (name === "coach_type") {
      setFormData((prev) => ({
        ...prev,
        coach_subtype: "",
      }));
      const subTypeRes = await getSubCoachType(value);
      setSubCoachTypes(subTypeRes || []);
    }

  };

  const handleChangeCheckbox = (e) => {
    const { name, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    // ✅ Optional: validation
    if (name === "video_link") {
      if (file.type !== "video/mp4") {
        alert("Only MP4 files are allowed.");
        return;
      }
      if (file.size > 100 * 1024 * 1024) {
        alert("Video must be under 100MB.");
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  const handleMultipleFiles = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // ✅ Only allow JPG and max 5 files
    const validFiles = selectedFiles.filter(
      (file) => file.type === "image/jpeg" || file.type === "image/jpg"
    );

    if (validFiles.length > 5) {
      alert("You can upload a maximum of 5 certifications.");
      return;
    }
    console.log('validFiles', validFiles)
    setCertificates(validFiles);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const clickedButton = e.nativeEvent.submitter?.value || 'draft'; // fallback to 'draft'
    const profile_status = clickedButton === 'publish' ? 'complete' : 'draft';

    try {
      const form = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => form.append(`${key}[]`, v)); // For arrays like language_names[]
        } else if (typeof value === 'boolean') {
          form.append(key, value ? 1 : 0); // ✅ Convert true/false → 1/0
        } else {
          form.append(key, value); // Works for file and normal fields
        }
      });

      form.append('profile_status', profile_status);

      certificates.forEach((file, index) => {
        form.append(`upload_credentials[]`, file);
      });

      const res = await axios.post(`${apiUrl}/updateProfile`, form, {
        headers: {
          Authorization: `Bearer ${getToken}`,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });


      if (res.data.success) {
        if (clickedButton === 'add_package') {
          router.push('/coach/service-packages');
        } else {
          alert(profile_status === 'complete' ? '✅ Profile published!' : '✅ Draft saved!');
        }
      } else {
        alert('Update failed.');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating profile.');
    }
  };

  // console.log("service_names", getAllServices);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="card">
          <UserImageUploader
            image={user?.profile_image}
            user_type={user?.user_type || 3}
          />
          <div className="profile-form">
            <div className="form-row two-cols">
              <div className="form-group">
                <label>First Name*</label>
                <input
                  required
                  type="text"
                  name="first_name"
                  placeholder="Emma"
                  value={formData.first_name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Last Name*</label>
                <input
                  required
                  type="text"
                  name="last_name"
                  placeholder="Rose"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row two-cols">
              <div className="form-group">
                <label>Email*</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Country</label>
                <select
                  required
                  name="country_id"
                  value={formData.country_id}
                  onChange={handleChange}
                >
                  <option value="">Select Country</option>
                  {countries.map((c) => (
                    <option key={c.country_id} value={c.country_id}>
                      {c.country_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row two-cols">
              <div className="form-group">
                <label>State</label>
                <select
                  name="state_id"
                  value={formData.state_id}
                  onChange={handleChange}
                >
                  <option value="">Select State</option>
                  {states.map((s) => (
                    <option key={s.state_id} value={s.state_id}>
                      {s.state_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>City</label>
                <select
                  type="text"
                  name="city_id"
                  value={formData.city_id}
                  onChange={handleChange}
                >
                  <option>Select City</option>
                  {cities.map((c) => (
                    <option key={c.city_id} value={c.city_id}>
                      {c.city_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row three-cols">
              <div className="form-group">
                <label>Main Coaching Category</label>
                <select
                  required
                  name="coach_type"
                  value={formData.coach_type}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  {coachTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.type_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Sub Coaching Category</label>
                <select
                  required
                  name="coach_subtype"
                  value={formData.coach_subtype}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  {coachSubTypes.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.subtype_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Gender*</label>
                <select
                  required
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value={1}>Male</option>
                  <option value={2}>Female</option>
                  <option value={3}>Other</option>
                </select>
              </div>
            </div>

            <div className="form-row four-cols">
              <div className="form-group">
                <label>Professional Title</label>
                <input
                  required
                  type="text"
                  name="professional_title"
                  value={formData.professional_title}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Company Name</label>
                <input
                  required
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="experience">Years of Experience</label>
                <input
                  required
                  type="number"
                  min={0}
                  max={100}
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Delivery Mode</label>
                <select
                  required
                  name="delivery_mode"
                  value={formData.delivery_mode}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  {deliveryMode.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.mode_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row three-cols">
              <div className="form-group">
                <label>Price Range</label>
                <input
                  required
                  type="text"
                  name="price_range"
                  value={formData.price_range}
                  onChange={handleChange}
                  placeholder="ex. 100-500"
                />
              </div>
              <div className="form-group">
                <label>Target Audience / Age Group</label>
                <select
                  required
                  type="text"
                  name="age_group"
                  value={formData.age_group}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  {ageGroup.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.group_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group language-input-add">
                <label>Language</label>
                <MultipleSelectCheckmarks
                  value={formData.language_names}
                  onChange={(selectedIds) =>
                    setFormData((prev) => ({
                      ...prev,
                      language_names: selectedIds,
                    }))
                  }
                  options={allLanguages}
                />
              </div>


            </div>
            <div className="form-row three-cols">
              <div className="form-group">
                <label>Free Trial Available</label>
                <select
                  name="free_trial_session"
                  value={formData.free_trial_session}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              </div>
              <div className="form-group">
                <label>Is Pro Bono Coach</label>
                <select
                  name="is_pro_bono"
                  value={formData.is_pro_bono}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              </div>
              <div className="form-group">
                <label>Average Charge/Hour</label>
                <input
                  required
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group mb-4">
              <label className="form-label fw-semibold">
                Share a warm and confident introduction to help potential
                clients understand who you are and how you can help.
              </label>
              <textarea
                required
                className="bio-textarea"
                name="detailed_bio"
                rows="10"
                value={formData.detailed_bio}
                onChange={handleChange}
                placeholder={`Hi, I’m Alex — a certified mindset and performance coach with a passion for helping individuals break through self-doubt and reach their goals. I bring 8 years of experience coaching professionals across tech, education, and creative industries.

                              Suggested pointers to include:
                              • Your name and coaching niche
                              • Your mission or passion as a coach
                              • Certifications or notable background
                              • The types of clients you support`}
              />


            </div>

            <div className="form-group mb-4">
              <label className="form-label fw-semibold">
                Tell potential clients about your coaching experiences,
                expertise, and results you've helped others achieve.
              </label>
              <textarea
                required
                className="bio-textarea"
                name="exp_and_achievement"
                rows="10"
                value={formData.exp_and_achievement}
                onChange={handleChange}
                placeholder={`E.g., I have 5+ years of experience coaching professionals in career transitions, confidence building, and leadership communication. My clients include young executives, startup founders, and mid-career changers.

                  Highlight:
                 • Years of experience
                 • Coaching specialties
                 • Typical clients or industries served
                 • Key achievements or transformation stories`}
              />
            </div>

            <div className="form-checkbox">
              {isProUser ? (
                <>
                  <input
                    className="form-checkbox-input"
                    type="checkbox"
                    name="is_corporate"
                    id="corporateCheck"
                    checked={formData.is_corporate}
                    onChange={handleChangeCheckbox}
                  />
                  <label
                    className="form-checkbox-label"
                    htmlFor="corporateCheck"
                  >
                    Yes, I am available for corporate coaching or training
                    projects.
                  </label>
                </>
              ) : (
                <>
                  <input
                    className="form-checkbox-input"
                    type="checkbox"
                    disabled
                    id="corporateCheck"
                  />
                  <label
                    className="form-checkbox-label"
                    htmlFor="corporateCheck"
                  >
                    Yes, I am available for corporate coaching or training
                    projects.
                    <i className="bi bi-lock-fill text-warning ms-1 fs-4"></i>
                  </label>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="card service-section">
          {isProUser ? (
            <>
              <h3 className="quick-text">Services</h3>
              <span>
                Add your coaching services to get discovered faster. Clients are
                searching for Service Keywords. Show them what you offer.
              </span>
              <div className="keyword-wrapper mt-4">
                <label className="form-label fw-semibold">
                  Add service keywords
                </label>
                <div className="d-flex align-items-center gap-2 mb-3 keywords-input">
                  <MultipleSelectChip
                    value={formData.service_keyword}
                    onChange={(selectedIds) =>
                      setFormData((prev) => ({
                        ...prev,
                        service_keyword: selectedIds, // Store IDs in state
                      }))
                    }
                    options={getAllServices}
                  />
                </div>

                <div className="d-flex flex-wrap gap-2">
                  {user?.service_keyword && user.service_keyword.map((kw, idx) => (
                    <span className="keyword-chip" key={idx}>
                      {kw.service}
                    </span>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <h3 className="quick-text">
                Services
                <small>(limited to 5 keywords)</small>
              </h3>
              <span>
                Add your coaching services to get discovered faster. Clients are
                searching for Service Keywords. Show them what you offer.
              </span>
              <div className="keyword-limit-wrapper mt-4">
                <h6 className="fw-bold">5 Keywords Used</h6>
                <div className="d-flex flex-wrap gap-2 mb-3">
                  {user?.service_keyword && user.service_keyword.slice(0, 5).map((kw, idx) => (
                    <span className="keyword-chip" key={idx}>
                      {kw.service}
                    </span>
                  ))}

                </div>

                {user?.service_keyword && user.service_keyword.length >= 5 && <div className="limit-box d-flex justify-content-between align-items-center mb-3">
                  <p className="d-flex align-items-center gap-1">
                    <i className="bi bi-exclamation-triangle"></i>
                    Keyword limit reached.
                  </p>
                  <div className="btn upgrade-btn d-flex align-items-center gap-2">
                    <i className="bi bi-lock-fill"></i> Upgrade to Add More
                  </div>
                </div>}

                <div className="d-flex align-items-center gap-2 mb-3 keywords-input">
                  <MultipleSelectChip
                    value={formData.service_keyword}
                    onChange={(selectedIds) => {
                      if (!isProUser && selectedIds.length > 5) {
                        alert("Only Pro Coaches can select more than 5 services.");
                        return;
                      }
                      setFormData((prev) => ({
                        ...prev,
                        service_keyword: selectedIds,
                      }));
                    }}
                    options={getAllServices}
                  />
                </div>

                <div className="info-box">
                  <h6 className="fw-semibold mb-2">Unlock More Reach!</h6>
                  <p className="mb-0 small">
                    You've reached the limit of 5 service keywords on the free
                    plan.
                    <br />
                    Upgrade to the Pro Coach Plan to add unlimited keywords and
                    boost your discoverability.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="card social-links">
          <h3 className="quick-text">Social Links</h3>
          <div className="form-row three-cols">
            <div className="form-group">
              <label>LinkedIn</label>
              <input
                type="text"
                name="linkdin_link"
                placeholder="https://linkedin.com/"
                value={formData.linkdin_link}
                onChange={handleChange}
              />
            </div>        

            <div className={`form-group ${!isProUser ? 'disable-input' : ''}`}>
              <label>
                Website
                {!isProUser && <i className="bi bi-lock-fill text-warning ms-1 fs-4"></i>}
              </label>
              <input
                disabled={!isProUser}
                type="text"
                name="website_link"
                placeholder="https://www.websites.com/"
                value={isProUser ? formData.website_link : ''}
                onChange={handleChange}
              />
            </div>
            <div className={`form-group ${!isProUser ? 'disable-input' : ''}`}>
              <label>
                Youtube
                {!isProUser && <i className="bi bi-lock-fill text-warning ms-1 fs-4"></i>}
              </label>
              <input
                disabled={!isProUser}
                type="text"
                name="youtube_link"
                placeholder="https://www.youtube.com/"
                value={isProUser ? formData.youtube_link : ''}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="form-row three-cols">
            <div className={`form-group ${!isProUser ? 'disable-input' : ''}`}>
              <label>Podcast</label>
              {!isProUser && <i className="bi bi-lock-fill text-warning ms-1 fs-4"></i>}
              <input
                disabled={!isProUser}
                type="text"
                name="podcast_link"
                value={formData.podcast_link}
                onChange={handleChange}
              />
            </div>
            <div className={`form-group ${!isProUser ? 'disable-input' : ""}`}>
              <label>Blog/Published Articles</label>
              {!isProUser && <i className="bi bi-lock-fill text-warning ms-1 fs-4"></i>}
              <input
                disabled={!isProUser}
                type="text"
                name="blog_article"
                value={formData.blog_article}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="card media-section">
          <h3 className="quick-text">Media</h3>
          <div className="upload-section mt-4">

            <div className="mb-4">
              <label className="form-label fw-semibold d-block">
                Upload Your Coach Introduction Video
                <span className="ms-2 media-size">Max 2min, MP4, under 100 MB</span>
              </label>
              <small className="d-block mb-2 media-size">
                Showcase your personality, approach and services in a short video to build trust with potential clients
              </small>

              <div className="custom-file-input-wrapper">
                <input
                  className="custom-file-hidden"
                  type="file"
                  id="video-upload"
                  name="video_link"
                  accept="video/mp4"
                  onChange={handleFileChange}
                />
                <label htmlFor="video-upload" className="custom-file-btn">
                  Choose file
                </label>
                <span className="custom-file-placeholder">
                  {formData.video_link ? formData.video_link.name : "No file chosen"}
                </span>
              </div>
            </div>
            <div>
              <label className="form-label fw-semibold d-block">
                Upload Credentials / Certifications
                {!isProUser && <i className="bi bi-lock-fill text-warning ms-1 fs-6"></i>}
                <span className="text-muted ms-2 small media-size">
                  (Upload up to 5 Certifications JPG)
                </span>
              </label>

              <div className="custom-file-input-wrapper">

                <input
                  disabled={!isProUser}
                  name="upload_credentials"
                  type="file"
                  id="cert-upload"
                  accept=".jpg,.jpeg"
                  className="custom-file-hidden"
                  multiple                     // ✅ Allow multiple
                  onChange={handleMultipleFiles}
                />
                <label htmlFor="cert-upload" className="custom-file-btn">
                  Choose file
                </label>
                <span className="custom-file-placeholder"> {certificates.length > 0 ? `${certificates.length} files selected` : 'No file chosen'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="save-btn gap-3 align-items-center">
          <span className="fw-bold">1/2</span>
          <button
            type="submit"
            value="draft"
            name="action"
            className="save-btn-add"
          >
            Save Draft <i className="bi bi-arrow-right"></i>
          </button>
          <button
            type="submit"
            name="action"
            value="add_package"
            className="save-btn-add"
          >
            Add Service Package <i className="bi bi-arrow-right"></i>
          </button>
          <button
            type="submit"
            name="action"
            value="publish"
            className="save-btn-add"
          >
            Publish <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </form>
    </>
  );
}
