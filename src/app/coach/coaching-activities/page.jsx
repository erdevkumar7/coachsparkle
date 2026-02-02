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

    const getTotal = (data) => {
        return data?.pagination?.total ?? 0;
    };

    const requests = [
        {
            img: "/coachsparkle/assets/images/glance-img-one.png",
            title: "Coaching Requests",
            count: pendingRequest.request_count === 0
        ? 0
        : pendingRequest.request_count < 10
          ? `0${pendingRequest.request_count}`
          : pendingRequest.request_count,
      },
        {
            img: "/coachsparkle/assets/images/glance-img-three.png",
            title: "In progress",
            count: getTotal(coachingProgress) > 0 && getTotal(coachingProgress) < 10
                ? `0${getTotal(coachingProgress)}`
                : getTotal(coachingProgress),
        },
        {
            img: "/coachsparkle/assets/images/match-three.png",
            title: "Completed",
            count: getTotal(initialCompleted) > 0 && getTotal(initialCompleted) < 10
                ? `0${getTotal(initialCompleted)}`
                : getTotal(initialCompleted),
        },
        {
            img: "/coachsparkle/assets/images/match-four.png",
            title: "Canceled / Missed",
            count: getTotal(initialCanceled) > 0 && getTotal(initialCanceled) < 10
                ? `0${getTotal(initialCanceled)}`
                : getTotal(initialCanceled),
        },
    ];

    const normalize = (data) => ({
        data: Array.isArray(data?.data) ? data.data : [],
        pagination: {
            current_page: Number(data?.pagination?.current_page ?? 1),
            total: Number(data?.pagination?.total ?? 0),
            last_page: Number(data?.pagination?.last_page ?? 1),
        },
    });


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
                    initialRequest={normalize(pendingRequest)}
                    token={token}
                />


                <CoachingProgress
                    initialProgress={normalize(coachingProgress)}
                    token={token}
                />

                <CompletedCoaching
                    initialCompleted={normalize(initialCompleted)}
                    token={token}
                />

                <CanceledMissed
                    initialCanceled={normalize(initialCanceled)}
                    token={token}
                />
            </div>
        </div>
    );
}