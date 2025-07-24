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