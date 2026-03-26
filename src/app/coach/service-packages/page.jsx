"use client";
import { useEffect, useState } from "react";

import "../_styles/coach_packages.css";
import CoachServicePackageForm from "../_coach_components/CoachServicePackage";
import Cookies from "js-cookie";
import { CircularProgress } from "@mui/material";
import { allPackagesOfaCoach } from "@/app/api/coach";
import ViewServicePackage from "../_coach_components/ViewServicePackage";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function CoachServicePackages() {
  const router = useRouter();
  const { user } = useUser();
  let isProUser = user.subscription_plan.plan_status;
  const [packages, setPackages] = useState([]);
  const [packageCount, setPackageCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      Cookies.remove('token');
      localStorage.removeItem('user');
      router.push("/login");
    }
    const fetchPackages = async () => {
      try {
        const response = await allPackagesOfaCoach(token);

         if(response.status != false){
            setPackages(response?.data);
            setPackageCount(response?. packageCount);
         }

       
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [refreshKey]);

  const handlePackageAdded = () => {
    setRefreshKey(prev => prev + 1); // triggers useEffect to reload packages
  };

  const handleDeletePackage = (deletedId) => {
    setPackages((prev) => prev.filter((p) => p.id !== deletedId));
  };

    const handleClick = (pkg) => {
    router.push(`/coach/all-packages/${pkg.id}?coach_id=${pkg.coach_id}`);
    localStorage.setItem("allPackages", JSON.stringify(pkg.id));
  };

  return (
    <div className="main-panel">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <CircularProgress />
        </div>
      ) : (
        <div className="new-content-wrapper coach-wrap">
          {isProUser ? (
            <>
              <div className="card p-3">
                <div className="d-flex">
                <h3 className="quick-text">Service Packages ({packageCount})</h3>
                  {packages.length > 0 && (
                    <a href="#" className="text-decoration-none" onClick={() => handleClick(packages[0])}>
                      View All
                    </a>
                  )}
                </div>
                
                <div className="session-wrapper service-pack-add-card">
                  {packages &&
                    packages
                      .slice(0, 3)
                      .map((pkg, index) => (
                        <ViewServicePackage
                          key={index} pkg={pkg}
                          allPackageIds={packages.map((p) => p.id)}
                          onDelete={handleDeletePackage}
                        />

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
                <p className="mt-3 fs-5 w-100">
                  This feature is available in Pro Coach Plan. You can start selling your coaching packages here
                </p>
              </div>
            </>
          )}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CoachServicePackageForm
              isProUser={isProUser}
              onPackageAdded={handlePackageAdded}
            />
          </LocalizationProvider>
        </div>
      )}
    </div>
  );
}
