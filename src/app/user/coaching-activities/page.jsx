import "../_styles/dashboard.css";
import "../_styles/coaching_activities.css";
import CoachingActivities from "../_user_components/CoachingActivities";
import { cochingRequestsListsUserDashboard, getUserPendingCoaching } from '@/app/api/user';

export default async function Activities() {

  const coachingData = await cochingRequestsListsUserDashboard();
  const response = await getUserPendingCoaching();
  let pendingRequest;

  if (response.data.success) {
    pendingRequest = response.data
  }
  // console.log('ppppppppp', pendingRequest)
  return (
    <div className="main-panel">
      <CoachingActivities
        coachingData={coachingData}
        pendingRequest={pendingRequest}
      />
    </div>
  );
}
