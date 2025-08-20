import { cookies } from "next/headers";
import "../_styles/dashboard.css";
import "../_styles/coaching_activities.css";
import { getUserPendingCoaching } from '@/app/api/user';
import StatusItem from "../_user_components/coaching_activities/StatusItem";
import PendingRequest from "../_user_components/coaching_activities/PendingRequest";
import CoachingProgress from "../_user_components/coaching_activities/CoachingProgress";
import CompletedCoaching from "../_user_components/coaching_activities/CompletedCoaching";
import CanceledMissed from "../_user_components/coaching_activities/CanceledMissed";

export default async function Activities() {
    const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  // const coachingData = await cochingRequestsListsUserDashboard();
  const response = await getUserPendingCoaching(1);
  const pendingRequest = response?.data || [];
  // console.log('ppppppppp', coachingData)

  const statusItems = [
    {
      icon: "/coachsparkle/assets/images/glance-img-one.png",
      title: "Pending Coaching",
      count: 67,
    },
    {
      icon: "/coachsparkle/assets/images/glance-img-three.png",
      title: "In progress",
      count: 2,
    },
    {
      icon: "/coachsparkle/assets/images/match-three.png",
      title: "Completed",
      count: 1,
    },
    {
      icon: "/coachsparkle/assets/images/match-four.png",
      title: "Canceled / Missed",
      count: 2,
    },
  ];

  const coachingProgress = [
    {
      title: "Session Booked",
      sessionLeft: "1 Session left",
      status: "Confirmed",
      userImage: "/coachsparkle/assets/images/coaching-img.png",
      packageTitle: "Breakthrough Package With User Display Name",
      time: "Tuesday, July 9, 1:00 PM - 2:00 PM (GMT+8)",
      platformIcon: "/coachsparkle/images/zoom.png",
      primaryAction: "View Session",
      secondaryAction: "Message",
    },
    {
      title: "Session Rescheduled",
      sessionLeft: "1 Session left",
      status: "In Progress",
      userImage: "/coachsparkle/assets/images/coaching-img.png",
      packageTitle: "Custom Package With User Display Name",
      time: "Tuesday, July 9, 3:00 PM - 4:00 PM (GMT+8)",
      platformIcon: "/coachsparkle/images/teams.png",
      primaryAction: "View Session",
      secondaryAction: "Message",
    },
    {
      title: "Session In Progress",
      sessionLeft: "2 Sessions left",
      status: "In Progress",
      userImage: "/coachsparkle/assets/images/coaching-img.png",
      packageTitle: "Confidence Jump Start PackageWith User Display Name",
      time: "Thursday, July 11, 10:00 AM - 11:00 AM (GMT+8)",
      platformIcon: "/coachsparkle/images/people.png",
      primaryAction: "Manage Session",
      secondaryAction: "Message",
    },
  ];

  const completed = [
    {
      userImage: "/coachsparkle/assets/images/coaching-img.png",
      packageTitle: "Meditation PackageWith Jenny Sim",
      time: "Completed Friday, July 9",
      primaryAction: "Leave a Review",
      secondaryAction: "Message",
    },
    {
      userImage: "/coachsparkle/assets/images/coaching-img.png",
      packageTitle: "Cross-fit PackageWith Bruce Toh",
      time: "Completed Friday, July 9",
      primaryAction: "Leave a Review",
      secondaryAction: "Message",
    },
    {
      userImage: "/coachsparkle/assets/images/coaching-img.png",
      packageTitle: "Meditation PackageWith Jenny Sim",
      time: "Completed Friday, July 9",
      primaryAction: "Leave a Review",
      secondaryAction: "Message",
    },
  ];

  const canceledMissed = [
    {
      sessionTitle: "Session canceled",
      sessionCount: "1 Session left",
      status: "Canceled",
      userImage: "/coachsparkle/assets/images/coaching-img.png",
      packageTitle: "Breakthrough PackageWith Adam Bell",
      time: "Tuesday, July 9, 1:00 PM - 2:00 PM (GMT+8)",
      platformIcon: "/coachsparkle/images/zoom.png",
      primaryAction: "Reschedule Session",
      secondaryAction: "Message",
    },
    {
      sessionTitle: "Session Rescheduled",
      sessionCount: "1 Session left",
      status: "Missed",
      userImage: "/coachsparkle/assets/images/coaching-img.png",
      packageTitle: "Custom Package With User Display Name",
      time: "Tuesday, July 9, 3:00 PM - 4:00 PM (GMT+8)",
      platformIcon: "/coachsparkle/images/teams.png",
      primaryAction: "View Session",
      secondaryAction: "Message",
    },
    {
      sessionTitle: "Session In Progress",
      sessionCount: "2 Sessions left",
      status: "In Progress",
      userImage: "/coachsparkle/assets/images/coaching-img.png",
      packageTitle: "Confidence Jump Start PackageWith User Display Name",
      time: "Thursday, July 11, 10:00 AM - 11:00 AM (GMT+8)",
      platformIcon: "/coachsparkle/images/people.png",
      primaryAction: "Manage Session",
      secondaryAction: "Message",
    },
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

        <PendingRequest initialRequest={pendingRequest} token={token}/>

        <CoachingProgress
          title="Coaching In Progress"
          count={coachingProgress.length}
          progress={coachingProgress}
        />

        <CompletedCoaching
          title="Completed Coaching"
          count={completed.length}
          completed={completed}
        />

        <CanceledMissed
          title="Canceled / Missed"
          count={canceledMissed.length}
          canceledMissed={canceledMissed}
        />
      </div>
    </div>
  );
}
