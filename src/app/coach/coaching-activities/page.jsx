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

    const [pendingRes, progressRes, completeRes, cancelRes] = await Promise.all([
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
        }),

        fetch(`${apiUrl}/getPackagesCanceled`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
            cache: 'no-store',
        })
    ]);


    const [pendingRequest, coachingProgress, initialCompleted, initialCanceled] = await Promise.all([
        pendingRes.json(),
        progressRes.json(),
        completeRes.json(),
        cancelRes.json()
    ]);

    // console.log('pendingRequest', pendingRequest)

    const requests = [
        {
            img: "/coachsparkle/assets/images/glance-img-one.png",
            title: "Coaching Requests",
            count: pendingRequest.pagination.total > 0 && pendingRequest.pagination.total < 10 ? `0${pendingRequest.pagination.total}` : pendingRequest.pagination.total,
        },
        {
            img: "/coachsparkle/assets/images/glance-img-three.png",
            title: "In progress",
            count: coachingProgress.pagination.total > 0 && coachingProgress.pagination.total < 10 ? `0${coachingProgress.pagination.total}` : coachingProgress.pagination.total,
        },
        {
            img: "/coachsparkle/assets/images/match-three.png",
            title: "Completed",
            count: initialCompleted.pagination.total > 0 && initialCompleted.pagination.total < 10 ? `0${initialCompleted.pagination.total}` : initialCompleted.pagination.total,
        },
        {
            img: "/coachsparkle/assets/images/match-four.png",
            title: "Canceled / Missed",
            count: initialCanceled.pagination.total > 0 && initialCanceled.pagination.total < 10 ? `0${initialCanceled.pagination.total}` : initialCanceled.pagination.total,
        },
    ];

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

                <CanceledMissed
                    initialCanceled={initialCanceled}
                    token={token}
                />
            </div>
        </div>
    );
}