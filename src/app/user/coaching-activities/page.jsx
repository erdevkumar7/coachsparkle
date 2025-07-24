import "../_styles/dashboard.css";
import "../_styles/coaching_activities.css";
import CoachingActivities from "../_user_components/CoachingActivities";
import { cochingRequestsListsUserDashboard } from '@/app/api/user';

export default async function Activities() {

  const coachingData = await cochingRequestsListsUserDashboard();
  return (
    <div className="main-panel">
      <CoachingActivities coachingData={coachingData}/>
    </div>
  );
}
