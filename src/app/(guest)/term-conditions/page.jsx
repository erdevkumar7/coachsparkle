
"use client";
import { CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import '../_styles/privacy_term.css';

export default function TermConditions() {
    const [termsData, setTermsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTerms = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-terms-conditions`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch terms and conditions');
                }

                const data = await response.json();

                if (data.success) {
                    setTermsData(data.data[0]); // Get the first item from data array
                } else {
                    throw new Error(data.message || 'Failed to fetch terms and conditions');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTerms();
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-red-500 text-lg">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl term-condition-page-add">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="px-6 py-8">
                    {termsData?.policy_content ? (
                        <div
                            className="prose prose-lg max-w-none term-condition-page-add-inner"
                            dangerouslySetInnerHTML={{ __html: termsData.policy_content }}
                        />
                    ) : (
                        <p className="text-gray-500">No terms and conditions content available.</p>
                    )}
                </div>

                {termsData?.updated_at && (
                    <div className="bg-gray-50 px-6 py-4 border-t">
                        <p className="text-sm text-gray-500">
                            Last updated: {new Date(termsData.updated_at).toLocaleDateString()}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

