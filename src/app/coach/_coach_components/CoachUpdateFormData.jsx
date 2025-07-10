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

export default function CoachUpdateForm({
  user,
  countries,
  allLanguages,
  coachTypes,
  deliveryMode,
  ageGroup,
}) {
  const router = useRouter();
  const [getToken, setToken] = useState();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [coachSubTypes, setSubCoachTypes] = useState([]);
  let isProUser = user.subscription_plan.plan_name == 'Pro' ? true : false;
  const [servicekeyword, setServiceKeyword] = useState("");
  const [servicekeywords, setServiceKeywords] = useState([
    "Software",
    "Research",
    "Survey",
    "UX Strategy",
    "C#",
  ]);

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
    age_group: user?.age_group || "",
    language_names: user?.language_names?.map((lang) => lang.id) || [],
    service_names: user?.service_names || []
  });

  // console.log('coachSubTypes', coachSubTypes)
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("formData", formData);
    // try {
    //     const res = await axios.post(`${apiUrl}/updateProfile`, formData, {
    //         headers: {
    //             Authorization: `Bearer ${getToken}`,
    //             Accept: 'application/json'
    //         },
    //     });

    //     if (res.data.success) {
    //         alert('Profile updated successfully!');
    //     } else {
    //         alert('Update failed.');
    //     }
    // } catch (err) {
    //     console.error(err);
    //     alert('Error updating profile.');
    // }
  };

  console.log("user", user.service_names);
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
                  type="text"
                  name="first_name"
                  placeholder="Emma"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name*</label>
                <input
                  type="text"
                  name="last_name"
                  placeholder="Rose"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row three-cols">
              <div className="form-group">
                <label>Email*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Country</label>
                <select
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
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row three-cols">
              <div className="form-group">
                <label>Main Coaching Category</label>
                <select
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
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
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
                  type="text"
                  name="professional_title"
                  value={formData.professional_title}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Company Name</label>
                <input
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Years of Experience</label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                </select>
              </div>
              <div className="form-group">
                <label>Delivery Mode</label>
                <select
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
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Target Audience / Age Group</label>
                <select
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
              <div className="form-group">
                <label>Language</label>
                <select
                  name="language_names"
                  value={formData.language_names[0] || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      language_names: [parseInt(e.target.value)],
                    })
                  }
                >
                  <option value="">Select</option>
                  {allLanguages.map((lang) => (
                    <option key={lang.id} value={lang.id}>
                      {lang.language}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-row three-cols">
              <div className="form-group">
                <label>Free Trial Available</label>
                <select
                  name="trial"
                  value={formData.trial}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                </select>
              </div>
              <div className="form-group">
                <label>Is Pro Bono Coach</label>
                <select
                  name="pro_bono_coach"
                  value={formData.pro_bono_coach}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                </select>
              </div>
              <div className="form-group">
                <label>Average Charge/Hour</label>
                <input
                  type="text"
                  name="average_charge_hour"
                  value={formData.average_charge_hour}
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
                className="bio-textarea"
                rows="10"
                placeholder={`Hi, I’m Alex — a certified mindset and performance coach with a passion for helping individuals break through self-doubt and reach their goals. I bring 8 years of experience coaching professionals across tech, education, and creative industries.

Suggested pointers to include:
• Your name and coaching niche
• Your mission or passion as a coach
• Certifications or notable background
• The types of clients you support`}
              ></textarea>
            </div>

            <div className="form-group mb-4">
              <label className="form-label fw-semibold">
                Tell potential clients about your coaching experiences,
                expertise, and results you've helped others achieve.
              </label>
              <textarea
                className="bio-textarea"
                rows="10"
                placeholder={`E.g., I have 5+ years of experience coaching professionals in career transitions, confidence building, and leadership communication. My clients include young executives, startup founders, and mid-career changers.

Highlight:
• Years of experience
• Coaching specialties
• Typical clients or industries served
• Key achievements or transformation stories`}
              ></textarea>
            </div>

            <div className="form-checkbox">
              {isProUser ? (
                <>
                  <input
                    className="form-checkbox-input"
                    type="checkbox"
                    id="corporateCheck"
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
                <div className="d-flex align-items-center gap-2 mb-3">
                  <input
                    type="text"
                    className="form-control keyword-input"
                    placeholder="Enter keyword"
                    value={servicekeyword}
                    onChange={(e) => setServiceKeyword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter"}
                  />
                  <button type="button" className="btn add-btn-outline">
                    Add
                  </button>
                </div>

                <div className="d-flex flex-wrap gap-2">
                  {user.service_names.map((kw, idx) => (
                    <span className="keyword-chip" key={idx}>
                      {kw}
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
                  <span className="keyword-chip">Software</span>
                  <span className="keyword-chip">Research</span>
                  <span className="keyword-chip">Survey</span>
                  <span className="keyword-chip">UX Strategy</span>
                  <span className="keyword-chip">C#</span>
                </div>

                <div className="limit-box d-flex justify-content-between align-items-center mb-3">
                  <p className="d-flex align-items-center gap-1">
                    <i className="bi bi-exclamation-triangle"></i>
                    Keyword limit reached.
                  </p>
                  <button className="btn upgrade-btn d-flex align-items-center gap-2">
                    <i className="bi bi-lock-fill"></i> Upgrade to Add More
                  </button>
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
                name="linkedin"
                placeholder="https://linkedin.com/"
                value={formData.linkedin}
                onChange={handleChange}
              />
            </div>
            {isProUser ? (
              <>
                <div className="form-group">
                  <label>Website</label>
                  <input
                    type="text"
                    name="website"
                    placeholder="https://www.websites.com/"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Youtube</label>
                  <input
                    type="text"
                    name="youtube"
                    placeholder="https://www.youtube.com/"
                    value={formData.youtube}
                    onChange={handleChange}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="form-group disable-input">
                  <label>
                    Website
                    <i className="bi bi-lock-fill text-warning ms-1 fs-4"></i>
                  </label>
                  <input
                    type="text"
                    name="website"
                    disabled
                    placeholder="https://www.websites.com/"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group disable-input">
                  <label>
                    Youtube
                    <i className="bi bi-lock-fill text-warning ms-1 fs-4"></i>
                  </label>
                  <input
                    type="text"
                    name="youtube"
                    disabled
                    placeholder="https://www.youtube.com/"
                    value={formData.youtube}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
          </div>

          <div className="form-row three-cols">
            {isProUser ? (
              <>
                <div className="form-group">
                  <label>Podcast</label>
                  <input
                    type="text"
                    name="podcast"
                    value={formData.podcast}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Blog/Published Articles</label>
                  <input
                    type="text"
                    name="article"
                    value={formData.article}
                    onChange={handleChange}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="form-group disable-input">
                  <label>
                    Podcast
                    <i className="bi bi-lock-fill text-warning ms-1 fs-4"></i>
                  </label>
                  <input
                    type="text"
                    name="podcast"
                    disabled
                    value={formData.podcast}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group disable-input">
                  <label>
                    Blog/Published Articles
                    <i className="bi bi-lock-fill text-warning ms-1 fs-4"></i>
                  </label>
                  <input
                    type="text"
                    name="article"
                    disabled
                    value={formData.article}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="card media-section">
          <h3 className="quick-text">Media</h3>
          <div className="upload-section mt-4">
            {isProUser ? (
              <>
                <div className="mb-4">
                  <label className="form-label fw-semibold d-block">
                    Upload Your Coach Introduction Video
                    <span className="ms-2 media-size">
                      Max 2min, MP4, under 100 MB
                    </span>
                  </label>
                  <small className="d-block mb-2 media-size">
                    Showcase your personality, approach and services in a short
                    video to build trust with potential clients
                  </small>

                  <div className="custom-file-input-wrapper">
                    <input
                      type="file"
                      className="custom-file-hidden"
                      id="video-upload"
                    />
                    <label htmlFor="video-upload" className="custom-file-btn">
                      Choose file
                    </label>
                    <span className="custom-file-placeholder">No file chosen</span>
                  </div>
                </div>

                <div>
                  <label className="form-label fw-semibold d-block">
                    Upload Credentials / Certifications
                    <span className="text-muted ms-2 small media-size">
                      (Upload up to 5 Certifications JPG)
                    </span>
                  </label>

                  <div className="custom-file-input-wrapper">
                    <input
                      type="file"
                      id="cert-upload"
                      className="custom-file-hidden"
                    />
                    <label htmlFor="cert-upload" className="custom-file-btn">
                      Choose file
                    </label>
                    <span className="custom-file-placeholder">No file chosen</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="mb-4">
                  <label className="form-label fw-semibold d-block">
                    Upload Your Coach Introduction Video
                    <span className="ms-2 media-size">
                      Max 2min, MP4, under 100 MB
                    </span>
                  </label>
                  <small className="d-block mb-2 media-size">
                    Showcase your personality, approach and services in a short
                    video to build trust with potential clients
                  </small>

                  <div className="custom-file-input-wrapper">
                    <input
                      type="file"
                      className="custom-file-hidden"
                      id="video-upload"
                    />
                    <label htmlFor="video-upload" className="custom-file-btn">
                      Choose file
                    </label>
                    <span className="custom-file-placeholder">No file chosen</span>
                  </div>
                </div>

                <div>
                  <label className="form-label fw-semibold d-block">
                    Upload Credentials / Certifications
                    <i className="bi bi-lock-fill text-warning ms-1 fs-6"></i>
                    <span className="text-muted ms-2 small media-size">
                      (Upload up to 5 Certifications JPG)
                    </span>
                  </label>

                  <div className="custom-file-input-wrapper disable-input">
                    <input
                      type="file"
                      id="cert-upload"
                      className="custom-file-hidden"
                      disabled
                    />
                    <label htmlFor="cert-upload" className="custom-file-btn">
                      Choose file
                    </label>
                    <span className="custom-file-placeholder">No file chosen</span>
                  </div>
                </div>
              </>
            )}

          </div>
        </div>

        <div className="save-btn gap-3 align-items-center">
          <span className="fw-bold">1/2</span>
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
      </form>
    </>
  );
}
