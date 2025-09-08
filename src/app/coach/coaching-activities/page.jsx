import { cookies } from "next/headers";
import CoachingRequests from "../_coach_components/coachingactivity/CoachingRequests";
import StatusBar from "../_coach_components/coachingactivity/StatusBar";
import "../_styles/coach_coaching_activities.css";
import CoachingProgress from "../_coach_components/coachingactivity/CoachingProgress";
import CompletedCoaching from "../_coach_components/coachingactivity/CompletedCoaching";
import CanceledMissed from "../_coach_components/coachingactivity/CanceledMissed";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

export default async function CoachingActivitiesPage() {
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

    // console.log('pendingRequest', pendingRequest)

    const requests = [
        {
            img: "/coachsparkle/assets/images/glance-img-one.png",
            title: "Coaching Requests",
            count: pendingRequest.pagination.total < 10 ? `0${pendingRequest.pagination.total}` : pendingRequest.pagination.total,
        },
        {
            img: "/coachsparkle/assets/images/glance-img-three.png",
            title: "In progress",
            count: coachingProgress.pagination.total < 10 ? `0${coachingProgress.pagination.total}` : coachingProgress.pagination.total,
        },
        {
            img: "/coachsparkle/assets/images/match-three.png",
            title: "Completed",
            count: initialCompleted.pagination.total < 10 ? `0${initialCompleted.pagination.total}` : initialCompleted.pagination.total,
        },
        // {
        //     img: "/coachsparkle/assets/images/match-four.png",
        //     title: "Canceled / Missed",
        //     count: "02",
        // },
    ];
 

    // const canceled = [
    //     {
    //         image: "/coachsparkle/assets/images/coaching-img.png",
    //         heading: "Session Canceled",
    //         sessions: "1 Session left",
    //         status: "Canceled",
    //         name: "Breakthrough Package With User Display Name",
    //         time: "Monday, July 7, 1:00 PM - 2:00 PM (GMT+8)",
    //         app: "/coachsparkle/images/zoom.png",
    //         buttonNote: "Reschedule Session",
    //     },
    //     {
    //         image: "/coachsparkle/assets/images/coaching-img.png",
    //         heading: "Session Missed",
    //         sessions: "1 Session left",
    //         status: "Missed",
    //         name: "Breakthrough Package With User Display Name",
    //         time: "Tuesday, July 9, 1:00 PM - 2:00 PM (GMT+8)",
    //         app: "/coachsparkle/images/zoom.png",
    //         buttonNote: "Manage Session",
    //     },
    // ];

    // console.log('initialCompletedData', initialCompletedData)
    return (
        <div className="main-panel">
            <div className="new-content-wrapper coach-wrap">
                <div className=" d-flex justify-content-between gap-4 coaching-activities-page">
                    {requests.map((request, index) => (
                        <StatusBar
                            key={index}
                            img={request.img}
                            title={request.title}
                            count={request.count}
                        />
                    ))}
                </div>

                <CoachingRequests
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
            

                {/* <div className="mt-5">
                    <div className="coaching-progress-status">
                        <div className="topbar d-flex justify-content-between align-items-center py-2 px-2">
                            <div>
                                <h3>Canceled / Missed (02)</h3>
                            </div>
                            <div className="sorting-data d-flex align-items-center gap-2">
                                <ExpandMoreOutlinedIcon />
                            </div>
                        </div>
                        <div className="d-flex justify-content-between flex-wrap py-4 px-4">
                            <div className="row gap-4">
                                {canceled.map((cancel, index) => (
                                    <CanceledMissed
                                        key={index}
                                        image={cancel.image}
                                        heading={cancel.heading}
                                        sessions={cancel.sessions}
                                        status={cancel.status}
                                        name={cancel.name}
                                        time={cancel.time}
                                        app={cancel.app}
                                        buttonNote={cancel.buttonNote}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
}