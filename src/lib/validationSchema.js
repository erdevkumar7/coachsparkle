import * as yup from "yup";

export const loginSchema = yup.object().shape({
    email: yup
        .string()
        .required('Email or username is required')
        .email('Please provide valid email'),
    password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password must be at most 20 characters'),
});


export const registerSchema = yup.object().shape({
    first_name: yup
        .string()
        .required('First name is required')
        .min(2, 'First name least two characters')
        .max(35, 'First name maximum 35 characters'),
    last_name: yup
        .string()
        .required('Last name is required')
        .min(2, 'Last name least two characters')
        .max(35, 'Last name maximum 35 characters'),
    email: yup
        .string()
        .required('Email is required')
        .email('Please provide valid email'),
    password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(25, 'Password must be at most 20 characters'),
    //   password_confirmation: yup
    //     .string()
    //     .oneOf([yup.ref('password')], 'Passwords must match')
    //     .required('Confirm your password'),
    country_id: yup.string().required('Please select your country'),
    terms: yup.bool().oneOf([true], 'You must agree to the terms'),
});

export const coachSchema = yup.object().shape({
    first_name: yup
        .string()
        .required('First name is required')
        .min(2, 'First name least two characters')
        .max(35, 'First name maximum 35 characters'),
    last_name: yup
        .string()
        .required('Last name is required')
        .min(2, 'Last name least two characters')
        .max(35, 'Last name maximum 35 characters'),
    email: yup
        .string()
        .email()
        .required('Email is required'),
    gender: yup
        .string()
        .required('Gender is required'),
    country_id: yup
        .string()
        .required('Country is required'),
    state_id: yup
        .string()
        .required('State is required'),
    city_id: yup
        .string()
        .required('City is required'),
    professional_title: yup
        .string()
        .required('Professional title is required')
        .min(2, 'Professional title least two characters')
        .max(150, 'Professional title maximum 150 characters'),
    company_name: yup
        .string()
        .required('Company name is required')
        .min(2, 'Company name least two characters')
        .max(150, 'Company name maximum 150 characters'),

    experience: yup
        .number()
        .typeError('Experience must be a number')
        .required('Experience is required')
        .min(1, 'Minimum experience is 1 year')
        .max(100, 'Maximum experience is 100 years'),

    delivery_mode: yup
        .string()
        .required('Delivery mode required'),

    price_range: yup
        .string()
        .required('Price range required'),

    age_group: yup
        .string()
        .required('Audience is required'),

    language_names: yup
        .array()
        .of(yup.string())
        .min(1, 'Please select at least one language')
        .required('Language is required'),

    free_trial_session: yup
        .string()
        .required('Free trial available is required'),

    is_pro_bono: yup
        .string()
        .required('Pro-bono coach is required'),

    price: yup
        .number()
        .typeError('price must be a number')
        .required('price is required')
        .min(1, 'Minimum price is 1')
        .max(1000000, 'Maximum price is 1000000'),

    detailed_bio: yup
        .string()
        .required('Introduction  is required')
        .min(50, 'Introduction  must be at least 50 characters')
        .max(1500, 'Introduction  cannot exceed 1500 characters'),

    exp_and_achievement: yup
        .string()
        .required('Coaching experiences, expertise  is required')
        .min(100, 'Coaching experiences, expertise  must be at least 100 characters')
        .max(2000, 'Coaching experiences, expertise  cannot exceed 2000 characters'),

    // service_keyword: yup
    //     .array()
    //     .of(yup.string())
    //     .min(1, 'Please select at least one service keyword')
    //     .required('service keyword is required'),

    service_keyword: yup
        .array()
        .min(1, 'Please select at least one service keyword')
        .test(
            'max-keywords-by-plan',
            'Only Pro Coaches can select more than 5 services',
            function (value) {
                const { options } = this; // use context
                const isProUser = options?.context?.isProUser;
                return isProUser || (value?.length <= 5);
            }
        )
        .required('Please select services'),

    linkdin_link: yup
        .string()
        .url("Enter a valid URL")
        .max(255, 'Linkdin URL must be at most 255 characters'),

    website_link: yup
        .string()
        .url("Enter a valid URL")
        .max(255, 'Website URL must be at most 255 characters'),

    youtube_link: yup
        .string()
        .url("Enter a valid URL")
        .max(255, 'Youtube URL must be at most 255 characters'),

    podcast_link: yup
        .string()
        .url("Enter a valid URL")
        .max(255, 'Podcast URL must be at most 255 characters'),


    blog_article: yup
        .string()
        .url("Enter a valid URL")
        .max(255, 'Blog URL must be at most 255 characters'),
});

export const sendMessageSchema = yup.object().shape({
    subject: yup
        .string()
        .required("Enter the subject")
        .min(2, 'Subject must be at least 2 characters')
        .max(255, "Subject must be at most 255 characters"),
    inquiry: yup
        .string()
        .required('Enter the message')
        .min(2, 'Message must be at least 2 characters')
        .max(255, "Message must be at most 255 characters")
})


export const requestSchema = yup.object().shape({
    looking_for: yup.string().required("Category is required"),
    coaching_category: yup.string().required("Subcategory is required"),
    preferred_mode_of_delivery: yup.string().required("Delivery mode is required"),
    location: yup.string().required("Location is required"),
    coaching_goal: yup.string().required("Coaching goal is required"),
    language_preference: yup.array().min(1, "At least one language is required"),
    preferred_communication_channel: yup.string().required("Communication channel is required"),
    learner_age_group: yup.string().required("Age group is required"),
    preferred_teaching_style: yup.string().required("Teaching style is required"),
    budget_range: yup.string().required("Budget is required"),
    preferred_schedule: yup.string().required("Schedule is required"),
    coach_gender: yup.string().required("Gender is required"),
    coach_experience_level: yup.string().required("Experience is required"),
    only_certified_coach: yup.string().required("Select if only certified"),
    preferred_start_date_urgency: yup.string().required("Start urgency is required"),
    special_requirements: yup.string().required("Special requirements are required"),
    share_with_coaches: yup
  .number()
  .required("Consent is required")
  .oneOf([1], "You must agree to share your request"),
});


export const userProfileSchema = yup.object().shape({
  first_Name: yup.string().required("First name is required"),
  last_Name: yup.string(),
  display_name: yup.string().required("Display name is required"),
  email: yup.string().email('Please provide valid email').required("Email is required"),
  country_id: yup.string().required("Please select your country"),
  professional_profile: yup.string(),
  professional_title: yup.string(),
  topics: yup.string(),
  ageGroup: yup.string(),
  goal1: yup.string(),
  goal2: yup.string(),
  goal3: yup.string(),
  language: yup.string(),
  mode: yup.string(),
  timings: yup.string(),
  bio: yup.string(),
  coachAgreement: yup.bool(),
});


export const userAccountSettingSchema = yup.object().shape({
    first_name: yup
        .string()
        .required("First name is required"),
    last_name: yup.string(),
    email: yup
        .string()
        .email('Please provide valid email')
        .required("Email is required"),
    language: yup
        .string()
        .required("Language is required"),
mobile: yup
    .string()
    .required("Mobile number is required")
    .matches(/^\+\d{10,15}$/, "Enter a valid mobile number with country code"),
    location: yup.string(),
    zip_code: yup.string(),
    consent: yup.string(),
})