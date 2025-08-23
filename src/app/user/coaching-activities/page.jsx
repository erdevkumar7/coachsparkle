import { cookies } from "next/headers";
import "../_styles/dashboard.css";
import "../_styles/coaching_activities.css";
import StatusItem from "../_user_components/coaching_activities/StatusItem";
import PendingRequest from "../_user_components/coaching_activities/PendingRequest";
import CoachingProgress from "../_user_components/coaching_activities/CoachingProgress";
import CompletedCoaching from "../_user_components/coaching_activities/CompletedCoaching";
import CanceledMissed from "../_user_components/coaching_activities/CanceledMissed";

export default async function Activities() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const [pendingRes, progressRes, completeRes] = await Promise.all([
    fetch(`${apiUrl}/getPendingCoaching`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      cache: 'no-store',
    }),

    fetch(`${apiUrl}/getCoachingPackages`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      cache: 'no-store',
    }),

    fetch(`${apiUrl}/getPackagesCompleted`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      cache: 'no-store',
    })
  ])
  const pendingRequest = await pendingRes.json();
  const coachingProgress = await progressRes.json();
  const initialCompleted = await completeRes.json();
  // console.log('initialCompleted', initialCompleted)

  const statusItems = [
    {
      icon: "/coachsparkle/assets/images/glance-img-one.png",
      title: "Pending Coaching",
      count: pendingRequest.pagination.total < 10 ? `0${pendingRequest.pagination.total}` : pendingRequest.pagination.total,
    },
    {
      icon: "/coachsparkle/assets/images/glance-img-three.png",
      title: "In progress",
      count: coachingProgress.pagination.total < 10 ? `0${coachingProgress.pagination.total}` : coachingProgress.pagination.total,
    },
    {
      icon: "/coachsparkle/assets/images/match-three.png",
      title: "Completed",
      count: initialCompleted.pagination.total < 10 ? `0${initialCompleted.pagination.total}` : initialCompleted.pagination.total,
    },
    // {
    //   icon: "/coachsparkle/assets/images/match-four.png",
    //   title: "Canceled / Missed",
    //   count: 2,
    // },
  ];




  return (
    <div className="main-panel">
      <div className="content-wrapper favourite-user-warp">
        <div className="d-flex justify-content-between gap-4">
          {statusItems.map((item, index) => (
            <StatusItem
              key={index}
              icon={item.icon}
              title={item.title}
              count={item.count}
            />
          ))}
        </div>

        <PendingRequest
          initialRequest={pendingRequest}
          token={token}
        />

        <CoachingProgress
          initialProgress={coachingProgress}
          token={token}
        />

        <CompletedCoaching
          initialCompleted={initialCompleted}
          token={token}
        />

        {/* <CanceledMissed
          title="Canceled / Missed"
          count={canceledMissed.length}
          canceledMissed={canceledMissed}
        /> */}
      </div>
    </div>
  );
}
