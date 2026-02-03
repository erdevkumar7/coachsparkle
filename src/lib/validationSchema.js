import * as yup from "yup";
import dayjs from "dayjs";

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
        .email("Please provide a valid email address.")
        .required("Email is required.")
        .min(5, "Email must be at least 5 characters long.")
        .max(100, "Email cannot exceed 100 characters."),

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
        .max(50, 'Company name must be at most 50 characters'),

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

    // custom_price_text: yup
    //     .string()
    //     .when('price_range', {
    //         is: '7', // When "Others" is selected
    //         then: (schema) => schema.required('Custom price range is required').max(100, 'Custom price range must be less than 100 characters'),
    //         otherwise: (schema) => schema.notRequired()
    //     }),

    custom_price_text: yup
        .string()
        .when('price_range', {
            is: '7',
            then: (schema) => schema
                .required('Custom price range is required')
                .max(100, 'Custom price range must be less than 100 characters')
                .test(
                    'non-numeric',
                    'Price range must like (e.g. $150-300)',
                    (value) => {
                        if (!value) return false;

                        // Remove common currency symbols and check if only numbers remain
                        const cleanedValue = value.replace(/[$€£¥,.\s]/g, '');
                        const onlyNumbers = /^\d+$/.test(cleanedValue);

                        // If it's only numbers, reject it
                        if (onlyNumbers) return false;

                        return true;
                    }
                ),
            otherwise: (schema) => schema.notRequired()
        }),


age_group: yup
  .array()
  .of(yup.string())
  .min(1, "Select at least one age group")
  .required("Target audience is required"),

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
        .max(2500, 'Introduction  cannot exceed 2500 characters'),

    exp_and_achievement: yup
        .string()
        .required('Coaching experiences, expertise  is required')
        .min(100, 'Coaching experiences, expertise  must be at least 100 characters')
        .max(2500, 'Coaching experiences, expertise  cannot exceed 2500 characters'),

    // service_keyword: yup
    //     .array()
    //     .of(yup.string())
    //     .min(1, 'Please select at least one service keyword')
    //     .required('service keyword is required'),

    service_names: yup
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
        // .url("Enter a valid URL")
        .max(255, 'Linkdin URL must be at most 255 characters'),

    website_link: yup
        .string()
        // .url("Enter a valid URL")
        .max(255, 'Website URL must be at most 255 characters'),

    youtube_link: yup
        .string()
        // .url("Enter a valid URL")
        .max(255, 'Youtube URL must be at most 255 characters'),

    podcast_link: yup
        .string()
        // .url("Enter a valid URL")
        .max(255, 'Podcast URL must be at most 255 characters'),


    blog_article: yup
        .string()
        // .url("Enter a valid URL")
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
    coach_type: yup.string().required("Category is required"),
    coach_subtype: yup.string().required("Subcategory is required"),
    // coach_subtype: yup.array().min(1, "Subcategory is required"),
    // preferred_mode_of_delivery: yup.string().required("Delivery mode is required"),
    // location: yup.string().required("Location is required"),
    // coaching_goal: yup.string().required("Coaching goal is required"),
    // language_preference: yup.array().min(1, "At least one language is required"),
    // preferred_communication_channel: yup.string().required("Communication channel is required"),
    // learner_age_group: yup.string().required("Age group is required"),
    // preferred_teaching_style: yup.string().required("Teaching style is required"),
    // budget_range: yup.string().required("Budget is required"),
    // coach_gender: yup.string().required("Gender is required"),
    // coach_experience_level: yup.string().required("Experience is required"),
    // only_certified_coach: yup.string().required("Select if only certified"),
    // preferred_start_date_urgency: yup.string().required("Start urgency is required"),
    // special_requirements: yup.string().required("Special requirements are required"),
    // share_with_coaches: yup
    //     .number()
    //     .required("Consent is required")
    //     .oneOf([1], "You must agree to share your request"),
});


export const userProfileSchema = yup.object().shape({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    display_name: yup.string().required("Display name is required"),
    email: yup.string().email('Please provide valid email').required("Email is required"),
    country_id: yup.string().required("Please select your country"),
    professional_profile: yup.string(),
    your_profession: yup.string(),
    prefer_coaching_topic: yup.string(),
    age_group_user: yup.string().required("Age group is required"),
    coaching_goal_1: yup.string(),
    coaching_goal_2: yup.string(),
    coaching_goal_3: yup.string(),
    language_names: yup
        .array()
        .of(yup.number().required())
        .min(1, "At least one language must be selected")
        .required("Language is required"),
    prefer_mode: yup.string(),
    prefer_coaching_time: yup.string(),
    short_bio: yup.string(),
    coach_agreement: yup.bool(),
});


export const userAccountSettingSchema = yup.object().shape({
    first_name: yup
        .string()
        .required("First name is required")
        .min(2, 'First name least two characters')
        .max(35, 'First name maximum 35 characters'),

    last_name: yup
        .string()
        .required("First name is required")
        .min(2, 'Last name least two characters')
        .max(35, 'Last name maximum 35 characters'),

    email: yup
        .string()
        .email("Please provide a valid email address.")
        .required("Email is required.")
        .min(5, "Email must be at least 5 characters long.")
        .max(255, "Email cannot exceed 255 characters."),

    pref_lang: yup
        .string()
        .required("Language is required"),

    contact_number: yup
        .string()
        .required("Mobile number is required")
        .matches(/^\+\d{10,15}$/, "Enter a valid mobile number with country code"),

    address: yup
        .string()
        .required("Address is required.")
        .min(5, "Address must be at least 5 characters long.")
        .max(150, "Address cannot exceed 150 characters."),

    zip_code: yup
        .string()
        .required("Zip code is required.")
        .max(15, "Zip code cannot exceed 15 characters."),
})

export const passwordSchema = yup.object().shape({
    current_password: yup
        .string()
        .required("Current password is required"),

    new_password: yup
        .string()
        .required("New password is required"),

    confirm_password: yup
        .string()
        .required("Please confirm your password")
        .oneOf([yup.ref("new_password"), null], "Passwords must match"),

})


export const servicePackageSchema = yup.object().shape({
    title: yup.string()
        .required("Service title is required")
        .min(5, "Title must be minimum 5 characters")
        .max(100, "Title must be less than 100 characters"),
    short_description: yup
        .string()
        .required("Short description is required")
        .min(50, "Short description minimum 50 characters")
        .max(200, "Short description must be less than 200 characters"),
    coaching_category: yup.string().required("Coaching category is required"),
    description: yup.string()
        .required("Detailed description is required")
        .min(100, "Detailed description minimun 100 characters")
        .max(1000, "Detailed description must be less than 1000 characters"),

    focus: yup.string().
        required("Service focus is required")
        .min(5, "Service must be minimum 5 characters")
        .max(500, "Service must be less than 500 characters"),
    age_group: yup
  .array()
  .of(yup.string())
  .min(1, "Select at least one age group")
  .required("Target audience is required"),

    delivery_mode_detail: yup
        .string()
        .required("Delivery mode details are required"),
    // delivery_mode: yup
    //     .string()
    //     .required("Delivery mode is required"),
    session_count: yup
        .number()
        .typeError("Session count must be a number")
        .required("Number of sessions is required")
        .min(1, "Must have at least 1 session")
        .positive("Must be a positive number"),
    session_duration: yup.string().required("Session duration is required"),
    session_format: yup.string().required("Session format is required"),
    price: yup
        .number()
        .typeError("Price must be a number")
        .required("Price is required")
        .min(0, "Price cannot be negative"),
    currency: yup.string().required("Currency is required"),
    price_model: yup.string().required("Pricing model is required"),
    // booking_slots: yup
    //     .number()
    //     .typeError("Booking slots must be a number")
    //     .required("Booking slots are required")
    //     .min(1, "Must have at least 1 slot")
    //     .positive("Must be a positive number"),
    booking_slots: yup
        .number()
        .typeError("Booking seats must be a number")
        .required("Booking seats are required")
        .min(1, "At least 1 booking seat is required")
        .max(1000, "Maximum 1000 booking seats allowed")
        .test(
            'slots-within-daily-limit',
            function (value) {
                const { session_duration } = this.parent;

                if (!session_duration || !value) return true;

                const durationMinutes = parseInt(session_duration);
                const maxSlotsPerDay = Math.floor(24 * 60 / durationMinutes);

                if (value > maxSlotsPerDay) {
                    return this.createError({
                        message: `Maximum ${maxSlotsPerDay} slots allowed for ${durationMinutes}-minute sessions per day`
                    });
                }

                return true;
            }
        ),
    session_validity: yup.string().required("Validity is required"),
    cancellation_policy: yup.string().required("Cancellation policy is required"),
    rescheduling_policy: yup
        .string()
        .required("Rescheduling policy is required"),

    // booking_availability_start: yup
    //     .string()
    //     .required("Start date is required")
    //     .test('is-valid-date', 'Invalid start date', (value) => {
    //         return value && dayjs(value).isValid();
    //     }),
    // booking_availability_end: yup
    //     .string()
    //     .required("End date is required")
    //     .test('is-valid-date', 'Invalid end date', (value) => {
    //         return value && dayjs(value).isValid();
    //     })
        // .test('is-after-start', 'End date must be after start date', function (value) {
        //     const { booking_availability_start } = this.parent;
        //     if (!booking_availability_start || !value) return true;
        //     return dayjs(value).isAfter(dayjs(booking_availability_start));
        // }),

    // booking_time: yup
    //     .string()
    //     .required("Booking time is required"),

    // booking_window_start: yup
    //     .string()
    //     .required("Booking window start date is required")
    //     .test('is-valid-date', 'Invalid start date', (value) => {
    //         return value && dayjs(value).isValid();
    //     }),
    // booking_window_end: yup
    //     .string()
    //     .required("Booking window end date is required")
    //     .test('is-valid-date', 'Invalid end date', (value) => {
    //         return value && dayjs(value).isValid();
    //     })
    //     .test('is-after-start', 'End date must be after start date', function (value) {
    //         const { booking_window_start } = this.parent;
    //         if (!booking_window_start || !value) return true;
    //         return dayjs(value).isAfter(dayjs(booking_window_start));
    //     }),

    // booking_window_start: yup
    //     .string()
    //     .required("Booking window start date is required")
    //     .test('is-valid-date', 'Invalid start date', (value) => {
    //         return value && dayjs(value).isValid();
    //     }),
    // booking_window_end: yup
    //     .string()
    //     .required("Booking window end date is required")
    //     .test('is-valid-date', 'Invalid end date', (value) => {
    //         return value && dayjs(value).isValid();
    //     })
    //     .test('is-after-start', 'End date must be after start date', function (value) {
    //         const { booking_window_start } = this.parent;
    //         if (!booking_window_start || !value) return true;
    //         return dayjs(value).isAfter(dayjs(booking_window_start));
    //     })
    //     .test('is-before-or-equal-availability-end', 'Booking window must end on or before availability end date', function (value) {
    //         const { booking_availability_end } = this.parent;
    //         if (!booking_availability_end || !value) return true;
    //         return dayjs(value).isBefore(dayjs(booking_availability_end)) || dayjs(value).isSame(dayjs(booking_availability_end));
    //     }),

    media_file: yup
        .mixed()
        .test("fileSize", "File size is too large", (value) => {
            if (!value) return true; // Optional field
            return value.size <= 5000000; // 5MB limit
        })
        .test("fileType", "Unsupported file format", (value) => {
            if (!value) return true; // Optional field
            return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
        }),
});
