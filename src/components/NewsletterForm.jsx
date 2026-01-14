// components/NewsletterForm.jsx
'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// Define validation schema with yup
const newsletterSchema = yup.object({
    email: yup
        .string()
        .email("Please provide a valid email address.")
        .required("Email is required.")
        .min(5, "Email must be at least 5 characters long.")
        .max(100, "Email cannot exceed 100 characters."),
    terms: yup
        .boolean()
        .oneOf([true], 'You must agree to the terms and privacy policy')
        .required('You must agree to the terms and privacy policy')
});

export default function NewsletterForm() {
    const [submitError, setSubmitError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch
    } = useForm({
        resolver: yupResolver(newsletterSchema)
    });

    // Watch the email field to clear messages when user starts typing
    const watchedEmail = watch('email');

    // Clear messages when user starts typing again
    useEffect(() => {
        if (watchedEmail && (submitError || submitSuccess)) {
            setSubmitError('');
            setSubmitSuccess('');
        }
    }, [watchedEmail, submitError, submitSuccess]);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setSubmitError('');
        setSubmitSuccess('');

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/addnewsletter`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: data.email
                }),
            });

            const result = await response.json();

            if (result.success) {
                setSubmitSuccess('Thank you for subscribing to our newsletter!');
                reset(); // Reset form on successful submission               
            } else {
                setSubmitError('This email is already subscribed to our newsletter.');
                reset();
            }
        } catch (error) {
            setSubmitError('An error occurred. Please try again.');
            console.error('Newsletter subscription error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="col-md-3 coach-footer-four">
            <h5>Newsletter</h5>
            <form onSubmit={handleSubmit(onSubmit)} className="newsletter-form">
                <p>Sign up to receive the latest articles</p>

                <div className="mb-2">
                    <input
                        type="text"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        placeholder="Your email address"
                        {...register('email')}
                    />
                    {errors.email && (
                        <div className="invalid-feedback d-block">
                            {errors.email.message}
                        </div>
                    )}
                </div>

                {/* General Error Message */}
                {submitError && (
                    <div className="alert alert-danger mt-2" role="alert">
                        {submitError}
                    </div>
                )}

                {/* Success Message */}
                {submitSuccess && (
                    <div className="alert alert-success mt-2" role="alert">
                        {submitSuccess}
                    </div>
                )}

                <button
                    type="submit"
                    className="btn btn-primary btn-sm"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                </button>

                <label className="form-check-box privacy mt-2 d-block">
                    <input
                        type="checkbox"
                        {...register('terms')}
                    />
                    <span className="ms-2">
                        I have read and agree to the <Link href="/term-conditions" target='_blank' className="text-decoration-none">Terms of Use</Link> & <Link href="/privacy-policy" target='_blank' className="text-decoration-none">Privacy Policy</Link>
                        {errors.terms && (
                            <span className="text-danger d-block mt-1 small">
                                {errors.terms.message}
                            </span>
                        )}
                    </span>
                </label>
            </form>
        </div>
    );
}