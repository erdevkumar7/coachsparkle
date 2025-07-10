"use client";
import { useEffect, useState } from "react";

import "../_styles/coach_packages.css";
import CoachServicePackageForm from "../_coach_components/CoachServicePackage";

import Cookies from "js-cookie";
import { CircularProgress } from "@mui/material";
import { allPackagesOfaCoach } from "@/app/api/coach";
import ViewServicePackage from "../_coach_components/ViewServicePackage";

export default function CoachServicePackages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isProUser, setIsProUser] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
    }
    const fetchPackages = async () => {
      try {
        const response = await allPackagesOfaCoach(token);
        setPackages(response?.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  return (
    <div className="main-panel">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <CircularProgress />
        </div>
      ) : (
        <div className="content-wrapper">
          {isProUser ? (
            <>
              <div className="card p-3">
                <h3 className="quick-text">Service Packages</h3>
                <div className="session-wrapper">
                  {packages &&
                    packages
                      .slice(0, 3)
                      .map((pkg, index) => (
                        <ViewServicePackage key={index} pkg={pkg} />
                      ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mt-5">
                <h3>
                  <strong>Create Custom Coaching Packages Like A Pro</strong>
                </h3>
                <p className="mt-3 fs-5 w-50">
                  This powerful tool is available with Pro Coach Plan - preview
                  below what you could unlock.
                </p>
              </div>
            </>
          )}

          <CoachServicePackageForm isProUser={isProUser} />
        </div>
      )}
    </div>
  );
}
