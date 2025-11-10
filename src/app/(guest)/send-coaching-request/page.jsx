import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import RequestForm from "../_components/send-coaching-request/RequestForm";
import {
  getAllCoachingCategory,
  getcoachExperienceLevel,
  getMasterBudgetRange,
  getCommunicationChannels,
  getAllMasters
} from "@/app/api/guest";
import { HandleValidateTokenOnServer } from "@/app/api/user";


export default async function SendCoachingRequestPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const tokenData = await HandleValidateTokenOnServer();
  let user;

  if (tokenData) {
    user = tokenData?.data;
    // if (user.user_type == 3) {
    //   console.log('Not valid user')
    // }
  }

  // If no token → redirect instantly without API call
  if (!token) {
    redirect("/login?redirect=/send-coaching-request&role=2");
  }

  // Fetch all data in parallel (server-side)
  const [
    coachingCategory,
    experienceLevelRes,
    budgetRangeRes,
    communicationChannelsRes
  ] = await Promise.all([
    getAllCoachingCategory(),
    getcoachExperienceLevel(),
    getMasterBudgetRange(),
    getCommunicationChannels(),
  ]);

  const allMasters = await getAllMasters();
  let countries;
  let deliveryMode;
  let coachType;
  let ageGroup;
  let languages;
  let getAllServices;

  if (allMasters) {
    countries = allMasters.countries;
    deliveryMode = allMasters.delivery_mode;
    coachType = allMasters.coach_type;
    ageGroup = allMasters.age_group;
    languages = allMasters.languages;
    getAllServices = allMasters.services
  }


  return (
    <RequestForm
      userData={user} 
      coachType={coachType}
      ageGroup={ageGroup}
      deliveryMode={deliveryMode}
      countries={countries}
      languages={languages}
      coachingCategory={coachingCategory}
      experienceLevel={experienceLevelRes.data || []}
      budgetRange={budgetRangeRes.data || []}
      communicationChannels={communicationChannelsRes.data || []}
    />
  );
}
