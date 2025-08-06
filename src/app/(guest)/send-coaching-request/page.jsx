"use client";
import {
  getCoachType,
  getAgeGroup,
  getDeliveryMode,
  getAllContries,
  getAllLanguages,
  getAllCoachingCategory,
  getcoachExperienceLevel,
  getMasterBudgetRange,
  getCommunicationChannels
} from "@/app/api/guest";
import { useRouter } from "next/navigation";
import "../_styles/coach_request_form.css";
import RequestForm from "../_components/send-coaching-request/RequestForm";
import Cookies from "js-cookie";
import { HandleValidateToken } from "@/app/api/auth";
import { useEffect, useState } from "react";

export default function SendCoachingRequest() {
   const router = useRouter();
  const [coachType, setCoachType] = useState([]);
  const [ageGroup, setAgeGroup] = useState([]);
  const [deliveryMode, setDeliveryMode] = useState([]);
  const [countries, setCountries] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [coachingCategory, setCoachingCategory] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState([]);
  const [budgetRange, setBudgetRange] = useState([]);
  const [communicationChannels, setCommunicationChannels] = useState([]);

  useEffect(() => {
    const token = Cookies.get("token");
if (!token) {
  router.push("/login?redirect=/send-coaching-request");
  return;
}

    const validateUser = async () => {
      const tokenData = await HandleValidateToken(token);
      if (!tokenData) {
        Cookies.remove("token");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
      }
    };

    const fetchData = async () => {
      try {
        const [coachTypeRes, ageGroupRes, deliveryModeRes, countriesRes, languagesRes, coachingCategoryRes, experienceLevelRes, budgetRangeRes, communicationChannelsRes] =
          await Promise.all([
            getCoachType(),
            getAgeGroup(),
            getDeliveryMode(),
            getAllContries(),
            getAllLanguages(),
            getAllCoachingCategory(),
            getcoachExperienceLevel(),
            getMasterBudgetRange(),
            getCommunicationChannels(),
          ]);
        setCoachType(coachTypeRes);
        setAgeGroup(ageGroupRes);
        setDeliveryMode(deliveryModeRes);
        setCountries(countriesRes);
        setLanguages(languagesRes);
        setCoachingCategory(coachingCategoryRes);
        setExperienceLevel(experienceLevelRes.data || []);
        setBudgetRange(budgetRangeRes.data || []);
        setCommunicationChannels(communicationChannelsRes.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    validateUser();
    fetchData();
  }, []);



  return (
    <>
      <RequestForm
      coachType={coachType}
      ageGroup={ageGroup}
      deliveryMode={deliveryMode}
      countries={countries}
      languages={languages}
      coachingCategory={coachingCategory}
      experienceLevel={experienceLevel}
      budgetRange={budgetRange}
      communicationChannels={communicationChannels}
      />
    </>
  );
}
