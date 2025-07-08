'use client';
import { useEffect, useState } from 'react';

import '../_styles/coach_packages.css';
import CoachServicePackageForm from '../_coach_components/CoachServicePackage';

import Cookies from 'js-cookie';
import { CircularProgress } from '@mui/material';
import { allPackagesOfaCoach } from '@/app/api/coach';

export default function CoachServicePackages() {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            router.push('/login');
        }
        const fetchPackages = async () => {
            try {
                const response = await allPackagesOfaCoach(token);
                setPackages(response?.data); // or data.packages if wrapped
            } catch (error) {
                console.error('Error fetching packages:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, []);

    return (
        <div className="main-panel">
            {loading ? (
                <div className="d-flex justify-content-center align-items-center min-vh-100"><CircularProgress /></div>
            ) : (<div className="content-wrapper">
                <div className="session-wrapper">
                    {packages && packages.slice(0,3).map((pkg, index) => (
                        <div className="session-card" key={index}>
                            <img
                                src={pkg?.media_file ? pkg?.media_file : `/coachsparkle/images/package1.png`}
                                alt="Team Image" className="top-image" />
                            <div className="session-content">
                                <h2>{pkg?.title}</h2>
                                <div className="icons-row">
                                    📍 {pkg?.delivery_mode?.mode_name} &nbsp; | &nbsp;
                                    👤 {pkg?.session_format?.name} &nbsp; | &nbsp;
                                    📅 Jun - Aug 2025
                                </div>
                                <div className="icons-row">
                                    🗓️ {pkg?.session_count} Sessions &nbsp; | &nbsp;
                                    ⏱️ {pkg?.session_duration} Min/Session
                                </div>
                                <div className="icons-row">
                                    🧠 {pkg?.focus}
                                </div>
                                <p className="session-description">
                                    {pkg?.short_description}
                                </p>
                                <div className="price">{pkg?.price} / {pkg?.price_model?.name}</div>
                                <a href="#" className="book-btn">View Details</a>
                            </div>
                        </div>
                    ))}
                </div>
                <CoachServicePackageForm />
            </div>)}
        </div>
    )
}