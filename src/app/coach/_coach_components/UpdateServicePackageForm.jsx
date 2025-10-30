// app/coach/_coach_components/UpdateServicePackageForm.js
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";
import { CircularProgress } from "@mui/material";
import { useUser } from "@/context/UserContext";
import CoachServicePackageFormChild from "./UpdateServicePackageFormChild";
import { toast } from "react-toastify";


export default function UpdateServicePackageForm({ allMasters }) {
    const params = useParams();
    const package_id = params.package_id;
    const { user } = useUser();
    let isProUser = user.subscription_plan.plan_status;

    const [packageData, setPackageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Safely extract data from allMasters with fallbacks
    const getCommunChannel = allMasters?.communication_channel || [];
    const ageGroups = allMasters?.age_group || [];
    const getPriceModels = allMasters?.priceModels || [];
    const categories = allMasters?.coaching_cat || [];
    const getCancelPolicies = allMasters?.cancellation_policies || [];
    const getFormats = allMasters?.formates || [];
    const deliveryModes = allMasters?.delivery_mode || [];

    useEffect(() => {
        const fetchPackageData = async () => {
            try {
                const token = Cookies.get("token");
                if (!token) {
                    throw new Error("No authentication token found");
                }

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/getServicePackageByIDForUpdate`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            package_id: parseInt(package_id)
                        }),
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();

                if (result.status && result.data) {
                    setPackageData(result.data);
                } else {
                    throw new Error(result.message || "Failed to fetch package data");
                }
            } catch (err) {
                console.error("Error fetching package:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (package_id) {
            fetchPackageData();
        }
    }, [package_id]);

    const handlePackageAdded = () => {
        console.log("Package updated successfully");
        // Optional: Redirect to packages list
        // router.push("/coach/service-packages");
    };

    if (loading) {
        return (
            <div className="main-panel">
                <div className="d-flex justify-content-center align-items-center min-vh-100">
                    <CircularProgress />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="main-panel">
                <div className="d-flex justify-content-center align-items-center min-vh-100">
                    <div className="alert alert-danger">
                        Error loading package: {error}
                    </div>
                </div>
            </div>
        );
    }

    if (!packageData) {
        return (
            <div className="main-panel">
                <div className="d-flex justify-content-center align-items-center min-vh-100">
                    <div className="alert alert-warning">
                        Package not found
                    </div>
                </div>
            </div>
        );
    }
console.log('packageDataaaa', packageData)
    return (
        <div className="main-panel">
            <div className="new-content-wrapper coach-wrap">
                <CoachServicePackageFormChild
                    isProUser={isProUser}
                    onPackageAdded={handlePackageAdded}
                    packageData={packageData}
                    ageGroups={ageGroups}
                    getCommunChannel={getCommunChannel}
                    getPriceModels={getPriceModels}
                    categories={categories}
                    getCancelPolicies={getCancelPolicies}
                    getFormats={getFormats}
                    deliveryModes={deliveryModes}
                />
            </div>
        </div>
    );
}