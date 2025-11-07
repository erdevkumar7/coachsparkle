"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  getCitiesOfaState,
  getStatesOfaCountry,
  getSubCoachType,
} from "@/app/api/guest";
import UserImageUploader from "@/app/user/_user_components/ImageUploader";
import MultipleSelectChip from "@/components/MultipleSelectChip";
import MultipleSelectCheckmarks from "@/components/MultipleSelectCheckmarks";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { coachSchema } from "@/lib/validationSchema";
import { toast } from "react-toastify";
import { updateCoachData } from "@/app/api/coach";
import {
  FormControl,
  Select,
  MenuItem,
  Chip,
  Box,
  Autocomplete,
  TextField,
} from "@mui/material";
import EastIcon from '@mui/icons-material/East';


export default function CoachUpdateForm({
  user,
  countries,
  allLanguages,
  coachTypes,
  deliveryMode,
  ageGroup,
  getAllServices,
  price_range,
  experience
}) {
  const router = useRouter();
  let isProUser = user.subscription_plan.plan_status;

  const [getToken, setToken] = useState();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [coachSubTypes, setSubCoachTypes] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [selectedCertificates, setSelectedCertificates] = useState([]);
  // console.log('user', experience)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    getValues,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      user_type: user?.user_type || 3,
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      email: user?.email || '',
      gender: user?.gender || '',
      country_id: user?.country_id || '',
      state_id: user?.state_id || '',
      city_id: user?.city_id || '',
      coach_type: user?.coach_type || "",
      coach_subtype: user?.coach_subtype?.map((sub) => sub.id) || [],
      professional_title: user?.professional_title || "",
      company_name: user?.company_name || "",
      experience: user?.experience || "",
      delivery_mode: user?.delivery_mode || "",
      price: user?.price || "",
      // price_range: user?.price_range || "",
      // Fix for price_range - handle both cases
      price_range: (() => {
        if (!user?.price_range) return "";

        // Check if price_range is a number (ID) or custom text
        const pr = user.price_range;
        const isNumeric = !isNaN(pr) && !isNaN(parseFloat(pr));

        if (isNumeric) {
          return pr.toString(); // It's an ID (1-6)
        } else {
          return "7"; // It's custom text, so set dropdown to "Others"
        }
      })(),

      // Add custom_price_text field
      custom_price_text: (() => {
        if (!user?.price_range) return "";

        const pr = user.price_range;
        const isNumeric = !isNaN(pr) && !isNaN(parseFloat(pr));

        // If it's not numeric, it means we stored custom text in price_range
        return isNumeric ? "" : pr;
      })(),
      age_group: user?.age_group || "",
      language_names: user?.language_names?.map((lang) => lang.id) || [],
      service_keyword: user?.service_keyword?.map((servc) => servc.id) || [],

      service_names: user?.service_names || [],
      detailed_bio: user?.detailed_bio || "",
      exp_and_achievement: user?.exp_and_achievement || "",
      is_corporate: user?.is_corporate || false,
      free_trial_session: user?.free_trial_session || 0,
      is_pro_bono: user?.is_pro_bono || 0,
      //SocialLink
      linkdin_link: user?.linkdin_link,
      website_link: user?.website_link,
      youtube_link: user?.youtube_link,
      podcast_link: user?.podcast_link,
      blog_article: user?.blog_article,
      video_link: user?.video_link,
    },
    resolver: yupResolver(coachSchema),
    context: { isProUser }, // pass here
  });

  // console.log('user', user)
  useEffect(() => {
    const authToken = Cookies.get('token');
    if (!authToken) {
      router.push('/login');
      return;
    }
    setToken(authToken);
  }, [])


  const selectedCountry = watch("country_id");
  const selectedState = watch("state_id");
  const selectedCoachType = watch("coach_type");


  useEffect(() => {
    if (!selectedCountry) return;

    getStatesOfaCountry(selectedCountry).then((res) => {
      setStates(res);

      if (user?.state_id) {
        const match = res.find((s) => s.state_id === user.state_id);
        if (match) {
          reset({
            ...getValues(),
            state_id: match.state_id,
          });
        }
      }
    });
  }, [selectedCountry]);


  useEffect(() => {
    if (!selectedState) return;

    getCitiesOfaState(selectedState).then((res) => {
      setCities(res);

      if (user?.city_id) {
        const match = res.find((c) => c.city_id === user.city_id);
        // console.log('city_id_match', user)
        if (match) {
          reset({
            ...getValues(),
            city_id: match.city_id,
          });
        }
      }
    });
  }, [selectedState]);



  useEffect(() => {
    if (!selectedCoachType) {
      setSubCoachTypes([]); // reset subtypes if no coach type
      reset({
        ...getValues(),
        coach_subtype: [], // clear selected subtypes
      });
      return;
    }

    getSubCoachType(selectedCoachType).then((res) => {
      setSubCoachTypes(res);

      // If user has subtypes (editing case), check if they belong to this coach type
      if (Array.isArray(user?.coach_subtype)) {
        const userSubtypeIds = user.coach_subtype.map((sub) => sub.id);

        // Keep only subtypes that are valid for this coach_type
        const matchedIds = res
          .filter((s) => userSubtypeIds.includes(s.id))
          .map((s) => s.id);

        reset({
          ...getValues(),
          coach_subtype: matchedIds, // update with valid ones
        });
      } else {
        // reset if not editing or no valid match
        reset({
          ...getValues(),
          coach_subtype: [],
        });
      }
    });
  }, [selectedCoachType]);


  const onCertificatesChange = (e) => {
    const selected = Array.from(e.target.files).filter(
      file => file.type === 'image/jpeg' || file.type === 'image/jpg'
    );
    if (selected.length > 5) return alert('Max 5 files');
    setCertificates(selected);
  };

  const handleCertificateChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 5) {
      toast.error('You can upload a maximum of 5 certificates');
      e.target.value = '';
      return;
    }

    const validFiles = files.filter(file =>
      file.type === 'image/jpeg' || file.type === 'image/jpg'
    );

    if (validFiles.length !== files.length) {
      toast.error('Only JPG/JPEG files are allowed');
    }

    setSelectedCertificates(validFiles);
  };

  const removeCertificate = (index) => {
    setSelectedCertificates(prev => prev.filter((_, i) => i !== index));
  };


  const onSubmit = async (data, e) => {
    const clickedButton = e.nativeEvent.submitter?.value || 'draft';
    const profile_status = clickedButton === 'publish' ? 'complete' : 'draft';

    const finalData = {
      ...data,
      price_range: data.price_range === "7" && data.custom_price_text
        ? data.custom_price_text
        : data.price_range
    };

    console.log('finalData', finalData);

    const form = new FormData();
    Object.entries(finalData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => form.append(`${key}[]`, v));
      } else {
        form.append(key, typeof value === 'boolean' ? (value ? 1 : 0) : value);
      }
    });

    form.append('profile_status', profile_status);

    // form.append('video_link', data.video_link);

    // Append certificates ONLY from state
    if (selectedCertificates.length > 0) {
      selectedCertificates.forEach((file) => {
        form.append("upload_credentials[]", file);
      });
    }

    try {
      const res = await updateCoachData(form, getToken)

      if (res.data.success) {
        toast.success(profile_status === 'complete' ? 'Profile published!' : 'Draft saved!');
        setSelectedCertificates([]);
        router.refresh();
      } else {
        toast.error('Update failed.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong!');
    }
  };

  // console.log("coachSubTypes", coachSubTypes);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                  {...register('first_name')}
                  placeholder="Emma"
                />
                {errors.first_name && <p className="text-red-600 regist-err-msg" style={{ color: 'red' }}>{errors.first_name.message}</p>}
              </div>
              <div className="form-group">
                <label>Last Name*</label>
                <input
                  {...register('last_name')}
                  placeholder="Rose"
                />
                {errors.last_name && <p className="text-red-600 regist-err-msg" style={{ color: 'red' }}>{errors.last_name.message}</p>}
              </div>
            </div>

            <div className="form-row two-cols">
              <div className="form-group">
                <label>Email*</label>
                <input {...register('email')} />
                {errors.email && <p className="text-red-600 regist-err-msg" style={{ color: 'red' }}>{errors.email.message}</p>}
              </div>

              <div className="form-group">
                <label>Country</label>
                <select {...register('country_id')} >
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
                <select {...register('state_id')}>
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
                <select {...register('city_id')}>
                  <option value="">Select City</option>
                  {cities.map((c) => (
                    <option key={c.city_id} value={c.city_id}>
                      {c.city_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row four-cols">
              <div className="form-group">
                <label>Gender*</label>
                <select {...register('gender')}>
                  <option value="">Select</option>
                  <option value={1}>Male</option>
                  <option value={2}>Female</option>
                  <option value={3}>Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Professional Title</label>
                <input {...register('professional_title')} />
                {errors.professional_title && <p className="text-red-600 regist-err-msg" style={{ color: 'red' }}>{errors.professional_title.message}</p>}
              </div>
              <div className="form-group">
                <label>Company Name</label>
                <input {...register('company_name')} />
                {errors.company_name && <p className="text-red-600 regist-err-msg" style={{ color: 'red' }}>{errors.company_name.message}</p>}
              </div>
            </div>

            <div className="form-row three-cols">
              <div className="form-group main-coach-cate-add">
                <label>Main Coaching Category</label>
                <select {...register('coach_type')} >
                  <option value="">Select</option>
                  {coachTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.type_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group sub-coaching-category">
                <label>Sub Coaching Category</label>
                {/* <select {...register('coach_subtype')}>
                  <option value="">Select</option>
                  {coachSubTypes.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.subtype_name}
                    </option>
                  ))}
                </select> */}

                {/* <Controller
                  name="coach_subtype"
                  control={control}
                  render={({ field }) => (
                    <select
                      multiple
                      value={field.value || []} // ensure it's always an array
                      onChange={(e) => {
                        const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
                        field.onChange(selectedValues);
                      }}
                    >
                      {coachSubTypes.map((sub) => (
                        <option key={sub.id} value={sub.id}>
                          {sub.subtype_name}
                        </option>
                      ))}
                    </select>
                  )}
                /> */}

                {/* <Controller
                  name="coach_subtype"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <Select
                        {...field}
                        multiple
                        value={field.value || []} // ensure array
                        onChange={(e) => {
                          field.onChange(e.target.value); // array of ids
                        }}
                        displayEmpty
                        renderValue={(selected) => {
                          if (!selected || selected.length === 0) {
                            return <em>Select coach subtype</em>; // fallback text
                          }
                          return (
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                              {selected.map((id) => {
                                const subtype = coachSubTypes.find((s) => s.id === id);
                                return subtype ? (
                                  <Chip key={id} label={subtype.subtype_name} />
                                ) : null;
                              })}
                            </Box>
                          );
                        }}
                      >
                        {coachSubTypes.map((sub) => (
                          <MenuItem key={sub.id} value={sub.id}>
                            {sub.subtype_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                /> */}

                <Controller
                  name="coach_subtype"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <Select className="sub-coaching-category-input"
                        {...field}
                        multiple
                        value={field.value || []}
                        onChange={(e) => field.onChange(e.target.value)}
                        displayEmpty
                        renderValue={(selected) => {
                          if (!selected || selected.length === 0) {
                            return <em>Select coach subtype</em>;
                          }
                          return (
                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                              {selected.map((id) => {
                                const subtype = coachSubTypes.find((s) => s.id === id);
                                return subtype ? (
                                  <Chip key={id} label={subtype.subtype_name} />
                                ) : null;
                              })}
                            </Box>
                          );
                        }}
                      >
                        {coachSubTypes.length > 0 ? (
                          coachSubTypes.map((sub) => (
                            <MenuItem key={sub.id} value={sub.id}>
                              {sub.subtype_name}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem disabled>No subtypes available</MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  )}
                />




              </div>
            </div>

            <div className="form-row four-cols">

              <div className="form-group">
                <label htmlFor="experience">Years of Experience</label>
                {/* <input {...register('experience')} /> */}
                <select {...register('experience')} >
                  <option value="">Select</option>
                  {experience.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.experience_level}
                    </option>
                  ))}
                </select>
                {errors.experience && <p className="text-red-600 regist-err-msg" style={{ color: 'red' }}>{errors.experience.message}</p>}
              </div>
              <div className="form-group">
                <label>Delivery Mode</label>
                <select {...register('delivery_mode')} >
                  <option value="">Select</option>
                  {deliveryMode.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.mode_name}
                    </option>
                  ))}
                </select>
                {errors.delivery_mode && <p className="text-red-600 regist-err-msg" style={{ color: 'red' }}>{errors.delivery_mode.message}</p>}
              </div>

              <div className="form-group">
                <label>Price Range</label>
                {/* <input {...register('price_range')} /> */}
                <select {...register('price_range')} >
                  <option value="">Select</option>
                  {price_range.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.budget_range}
                    </option>
                  ))}
                </select>
                {errors.price_range && <p className="text-red-600 regist-err-msg" style={{ color: 'red' }}>{errors.price_range.message}</p>}
              </div>

              {/* Conditional free text input */}
              {watch("price_range") === "7" && (
                <div className="form-group">
                  <label>Specify Price Range*</label>
                  <input
                    {...register('custom_price_text')}
                  />
                  <small style={{ color: '#666', fontSize: '12px', display: 'block', marginTop: '5px' }}>
                    (e.g., $150-300/session, $500/package)
                  </small>
                  {errors.custom_price_text && (
                    <p className="text-red-600 regist-err-msg" style={{ color: 'red' }}>
                      {errors.custom_price_text.message}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="form-row three-cols">

              <div className="form-group target-input">
                <label>Target Audience / Age Group</label>
                <select {...register('age_group')}
                >
                  <option value="">Select</option>
                  {ageGroup.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.group_name}
                    </option>
                  ))}
                </select>
                {errors.age_group && <p className="text-red-600 regist-err-msg" style={{ color: 'red' }}>{errors.age_group.message}</p>}
              </div>
              <div className="form-group language-input-add">
                <label>Language</label>
                <Controller
                  name="language_names"
                  control={control}
                  render={({ field }) => (
                    <MultipleSelectCheckmarks
                      value={field.value}
                      onChange={field.onChange}
                      options={allLanguages}
                    />
                  )}
                />
                {errors.language_names && <p className="text-red-600 regist-err-msg" style={{ color: 'red' }}>{errors.language_names.message}</p>}
              </div>

              {/* <div className="form-group language-input-add">
                <label>Language*</label>
                <Controller
                  name="language_names"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      multiple
                      options={allLanguages}
                      getOptionLabel={(option) =>
                        typeof option === 'string' ? option : option.language_name || option.name
                      }
                      value={field.value || []}
                      onChange={(event, newValue) => {
                        field.onChange(newValue);
                      }}
                      filterSelectedOptions
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Type to search languages..."
                          error={!!errors.language_names}
                          helperText={errors.language_names?.message}
                        />
                      )}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => {
                          const label = typeof option === 'string' ? option : option.language_name || option.name;
                          return (
                            <Chip
                              label={label}
                              {...getTagProps({ index })}
                              key={index}
                            />
                          );
                        })
                      }
                    />
                  )}
                />
              </div> */}


            </div>
            <div className="form-row three-cols">
              <div className="form-group">
                <label>Free Trial Available</label>
                <select
                  {...register('free_trial_session')}
                >
                  <option value="">Select</option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
                {errors.free_trial_session && <p className="text-red-600 regist-err-msg" style={{ color: 'red' }}>{errors.free_trial_session.message}</p>}
              </div>
              <div className="form-group">
                <label>Is Pro Bono Coach</label>
                <select
                  {...register('is_pro_bono')}
                >
                  <option value="">Select</option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
                {errors.is_pro_bono && <p className="text-red-600 regist-err-msg" style={{ color: 'red' }}>{errors.is_pro_bono.message}</p>}
              </div>
              <div className="form-group">
                <label>Average Charge/Hour</label>
                <input className="price-range-add-input"
                  {...register('price')}
                />
                {errors.price && <p className="text-red-600 regist-err-msg" style={{ color: 'red' }}>{errors.price.message}</p>}
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
                {...register('detailed_bio')}
                rows="10"
                placeholder={`Hi, I’m Alex — a certified mindset and performance coach with a passion for helping individuals break through self-doubt and reach their goals. I bring 8 years of experience coaching professionals across tech, education, and creative industries.

                              Suggested pointers to include:
                              • Your name and coaching niche
                              • Your mission or passion as a coach
                              • Certifications or notable background
                              • The types of clients you support`}
              />
              {errors.detailed_bio && <p className="text-red-600 regist-err-msg" style={{ color: 'red' }}>{errors.detailed_bio.message}</p>}

            </div>

            <div className="form-group mb-4">
              <label className="form-label fw-semibold">
                Tell potential clients about your coaching experiences,
                expertise, and results you've helped others achieve.
              </label>
              <textarea
                required
                className="bio-textarea"
                {...register('exp_and_achievement')}
                rows="10"
                placeholder={`E.g., I have 5+ years of experience coaching professionals in career transitions, confidence building, and leadership communication. My clients include young executives, startup founders, and mid-career changers.

                  Highlight:
                 • Years of experience
                 • Coaching specialties
                 • Typical clients or industries served
                 • Key achievements or transformation stories`}
              />
            </div>
            {errors.exp_and_achievement && <p className="text-red-600 regist-err-msg" style={{ color: 'red' }}>{errors.exp_and_achievement.message}</p>}
            <div className="form-checkbox">
              {isProUser ? (
                <>
                  <input
                    className="form-checkbox-input"
                    type="checkbox"
                    id="corporateCheck"
                    {...register("is_corporate")}
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
                  <Controller
                    name="service_keyword"
                    control={control}
                    render={({ field }) => (
                      <MultipleSelectChip
                        value={field.value}
                        onChange={field.onChange}
                        options={getAllServices}
                      />
                    )}
                  />
                  {errors.service_keyword && <p className="text-red-600 regist-err-msg" style={{ color: 'red' }}>{errors.service_keyword.message}</p>}
                </div>

                {/* <div className="d-flex flex-wrap gap-2">
                  {user?.service_keyword && user.service_keyword.map((kw, idx) => (
                    <span className="keyword-chip" key={idx}>
                      {kw.service}
                    </span>
                  ))}
                </div> */}
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
                  <Controller
                    name="service_keyword"
                    control={control}
                    render={({ field }) => (
                      <MultipleSelectChip
                        value={field.value}
                        // onChange={(selectedIds) => {
                        //   if (!isProUser && selectedIds.length > 5) {
                        //     alert("Only Pro Coaches can select more than 5 services.");
                        //     return;
                        //   }
                        //   field.onChange(selectedIds);
                        // }}
                        onChange={(selectedIds) => {
                          if (!isProUser && selectedIds.length > 5) return;
                          field.onChange(selectedIds);
                        }}
                        options={getAllServices}
                      />
                    )}
                  />
                  {errors.service_keyword && <p className="text-red-600 regist-err-msg" style={{ color: 'red' }}>{errors.service_keyword.message}</p>}
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
                placeholder="https://linkedin.com/"
                {...register("linkdin_link")}
              />
              {errors.linkdin_link && <p className="text-red-600 regist-err-msg" style={{ color: 'red' }}>{errors.linkdin_link.message}</p>}
            </div>


            <div className={`form-group ${!isProUser ? 'disable-input' : ''}`}>
              <label>
                Website
                {!isProUser && <i className="bi bi-lock-fill text-warning ms-1 fs-4"></i>}
              </label>
              <input
                type="text"
                placeholder="https://www.websites.com/"
                disabled={!isProUser}
                {...register("website_link")}
              />
              {errors.website_link && <p className="text-red-600 regist-err-msg" style={{ color: 'red' }}>{errors.website_link.message}</p>}

            </div>
            <div className={`form-group ${!isProUser ? 'disable-input' : ''}`}>
              <label>
                Youtube
                {!isProUser && <i className="bi bi-lock-fill text-warning ms-1 fs-4"></i>}
              </label>
              <input
                type="text"
                placeholder="https://www.youtube.com/"
                disabled={!isProUser}
                {...register("youtube_link")}
              />
              {errors.youtube_link && <p className="text-red-600 regist-err-msg" style={{ color: 'red' }}>{errors.youtube_link.message}</p>}
            </div>

          </div>

          <div className="form-row three-cols">
            <div className={`form-group ${!isProUser ? 'disable-input' : ''}`}>
              <label>Podcast

                {!isProUser && <i className="bi bi-lock-fill text-warning ms-1 fs-4"></i>}

              </label>
              <input
                type="text"
                disabled={!isProUser}
                {...register("podcast_link")}
              />
              {errors.podcast_link && <p className="text-red-600 regist-err-msg" style={{ color: 'red' }}>{errors.podcast_link.message}</p>}
            </div>
            <div className={`form-group ${!isProUser ? 'disable-input' : ""}`}>
              <label>Blog/Published Articles
                {!isProUser && <i className="bi bi-lock-fill text-warning ms-1 fs-4"></i>}
              </label>
              <input
                type="text"
                disabled={!isProUser}
                {...register("blog_article")}
              />
              {errors.blog_article && <p className="text-red-600 regist-err-msg" style={{ color: 'red' }}>{errors.blog_article.message}</p>}
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

              <Controller
                name="video_link"
                control={control}
                rules={{
                  validate: (file) => {
                    if (!file) return true; // optional
                    if (file.type !== "video/mp4") return "Only MP4 files are allowed.";
                    if (file.size > 100 * 1024 * 1024) return "Video must be under 100MB.";
                    return true;
                  },
                }}
                render={({ field }) => (
                  <div className="custom-file-input-wrapper">
                    <input
                      className="custom-file-hidden"
                      type="file"
                      id="video-upload"
                      accept="video/mp4"
                      onChange={(e) => field.onChange(e.target.files[0])}
                    />
                    <label htmlFor="video-upload" className="custom-file-btn">
                      Choose file
                    </label>
                    <span className="custom-file-placeholder">
                      {field.value?.name || "No file chosen"}
                    </span>
                  </div>
                )}
              />
              {errors.video_link && (
                <p className="text-danger">{errors.video_link.message}</p>
              )}
            </div>

            {/* <div>
              <label className="form-label fw-semibold d-block">
                Upload Credentials / Certifications
                {!isProUser && (
                  <i className="bi bi-lock-fill text-warning ms-1 fs-6"></i>
                )}
                <span className="text-muted ms-2 small media-size">
                  (Upload up to 5 Certifications JPG)
                </span>
              </label>

              <Controller
                name="upload_credentials"
                control={control}
                rules={{
                  validate: (files) => {
                    if (!files) return true;
                    if (files.length > 5) return "You can upload a maximum of 5 files.";
                    const invalid = Array.from(files).some(
                      (file) => !["image/jpeg", "image/jpg"].includes(file.type)
                    );
                    return invalid ? "Only JPG/JPEG files are allowed." : true;
                  },
                }}
                render={({ field }) => (
                  <div className="custom-file-input-wrapper">
                    <input
                      type="file"
                      id="cert-upload"
                      className="custom-file-hidden"
                      multiple
                      disabled={!isProUser}
                      accept=".jpg,.jpeg"
                      onChange={(e) => {
                        const files = Array.from(e.target.files);
                        if (files.length > 5) {
                          toast.error('Maximum 5 files allowed');
                          return;
                        }
                        field.onChange(files);
                      }}
                    />
                    <label htmlFor="cert-upload" className="custom-file-btn">
                      Choose file
                    </label>
                    <span className="custom-file-placeholder">
                      {field.value?.length > 0
                        ? `${field.value.length} files selected`
                        : "No file chosen"}
                    </span>
                  </div>
                )}
              />
              {errors.upload_credentials && (
                <p className="text-danger">{errors.upload_credentials.message}</p>
              )}
            </div> */}

            <div>
              <label className="form-label fw-semibold d-block">
                Upload Credentials / Certifications
                {!isProUser && (
                  <i className="bi bi-lock-fill text-warning ms-1 fs-6"></i>
                )}
                <span className="text-muted ms-2 small media-size">
                  (Upload up to 5 Certifications JPG)
                </span>
              </label>

              <div className="custom-file-input-wrapper">
                <input
                  type="file"
                  id="cert-upload"
                  className="custom-file-hidden"
                  multiple
                  disabled={!isProUser}
                  accept=".jpg,.jpeg"
                  onChange={handleCertificateChange}
                />
                <label htmlFor="cert-upload" className="custom-file-btn">
                  Choose file
                </label>
                <span className="custom-file-placeholder">
                  {selectedCertificates.length > 0
                    ? `${selectedCertificates.length} files selected`
                    : "No file chosen"}
                </span>
              </div>

              {/* Show selected files */}
              {selectedCertificates.length > 0 && (
                <div className="mt-3">
                  <h6 className="mb-2">Selected Certificates:</h6>
                  <div className="selected-files-list">
                    {selectedCertificates.map((file, index) => (
                      <div key={index} className="selected-file-item d-flex align-items-center justify-content-between mb-2 p-2 border rounded">
                        <span className="file-name">
                          <i className="bi bi-file-earmark-image text-primary me-2"></i>
                          {file.name}
                        </span>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => removeCertificate(index)}
                        >
                          <i className="bi bi-x"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        <div className="save-btn gap-3 align-items-center">
          {/* <span className="fw-bold second-list-show"><span className="number-color">1</span>/2</span> */}
          <button
            type="submit"
            value="draft"
            name="action"
            className="save-btn-add"
          >
            Save Draft
            <EastIcon className="mui-icons" />
          </button>
          {/* <button
            type="submit"
            name="action"
            value="add_package"
            className="save-btn-add"
          >
            Add Service Package
            <EastIcon className="mui-icons" />
          </button> */}
          <button
            type="submit"
            name="action"
            value="publish"
            className="save-btn-add"
          >
            Publish
            {/* <i className="bi bi-arrow-right"></i> */}
            <EastIcon className="mui-icons" />
          </button>
        </div>
      </form>
    </>
  );
}
