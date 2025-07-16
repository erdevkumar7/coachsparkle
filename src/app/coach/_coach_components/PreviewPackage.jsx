import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";

export function PreviewPackage() {

    return (
        <div className="session-card">
            <img
                src="/coachsparkle/images/service-package1.png"
                alt="Team Image"
                className="top-image"
            />
            <div className="session-preview-content">
                <h2>Confidence Jumpstart Session</h2>
                <div className="icons-row">
                    <PersonalVideoIcon /> Online
                    <PersonOutlineOutlinedIcon /> 1-on-1 coaching
                    <CalendarMonthOutlinedIcon /> Jun - Aug 2025
                </div>
                <div className="icons-row">
                    <ForumOutlinedIcon /> 4 Sessions
                    <i
                        className="bi bi-clock-history"
                        style={{ transform: "scaleX(-1)" }}
                    ></i>{" "}
                    60 Min/Session
                </div>
                <div className="icons-row">
                    <GpsFixedIcon /> Confidence, Goal clarity, Custom action
                    plan
                </div>
                <p className="session-description">
                    A one-time deep-dive session to assess your confidence
                    blocks, set clear goals, and walk away with a custom
                    action plan.
                </p>
                <div className="price">$290 / Package</div>
                <div className="d-flex justify-content-center">
                    <button className="cursor-pointer">
                        View Details and Book Now
                    </button>
                </div>
                <div className="d-flex justify-content-start gap-2 mt-4">
                    <i
                        className="bi bi-fire"
                        style={{ transform: "scaleX(-1)" }}
                    ></i>
                    Only 4 slots left!
                </div>
                <div className="mt-3">
                    Best for first timers and those preparing for key life or
                    career transition
                </div>
            </div>
        </div>
    )
}