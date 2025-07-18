import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import { formatBookingAvailability } from "@/lib/commonFunction";

export function PreviewPackage({ pkg, DeliveryMode, allDelveryMode, allPriceModel, allSessionFormat }) {
    // console.log('allSessionFormat', allSessionFormat)
    const getNameById = (list, id) => {
         if (!Array.isArray(list)) return "";

        const item = list.find((el) => el.id === parseInt(id));
        return item ? item.name || item.mode_name : "";
    };

    return (
        <div className="session-card">
            <img
                src={pkg?.media_file ? URL.createObjectURL(pkg?.media_file) : '/coachsparkle/images/service-package1.png'}
                alt="Package-Image"
                className="top-image"
            />
            <div className="session-preview-content">
                <h2>{pkg?.title || "Confidence Jumpstart Session"}</h2>
                <div className="icons-row">
                    <PersonalVideoIcon className="mui-icons"/> {getNameById(allDelveryMode, DeliveryMode) || "Online"}
                    <PersonOutlineOutlinedIcon className="mui-icons"/> {getNameById(allSessionFormat, pkg?.session_format) || "1-on-1 coaching"}
                    <CalendarMonthOutlinedIcon className="mui-icons"/> {formatBookingAvailability(pkg?.booking_availability) || 'Jun - Aug 2025'}
                </div>
                <div className="icons-row">
                    <ForumOutlinedIcon className="mui-icons"/> {pkg?.session_count ? `${pkg?.session_count} Sessions` : "1 Sessions"}
                    <i
                        className="bi bi-clock-history"
                        style={{ transform: "scaleX(-1)" }}
                    ></i>{" "}
                    {pkg?.session_duration ? `${pkg?.session_duration} Min/Session` : "60 Min/Session"}
                </div>
                <div className="icons-row">
                    <GpsFixedIcon className="mui-icons"/> {pkg?.focus ? pkg?.focus : "Confidence, Goal clarity, Custom action plan"}
                </div>
                <p className="session-description">
                    {pkg?.short_description ? pkg?.short_description : `A one-time deep-dive session to assess
                     your confidence blocks, set clear goals, and walk away with a custom
                    action plan.`}

                </p>
                <div className="price">${pkg?.price ? pkg?.price : '100'} / {getNameById(allPriceModel, pkg?.price_model) || "Package"}</div>
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
                    {pkg?.booking_slots ? `Only ${pkg?.booking_slots} slots left!` : 'Only 1 slots left!'}
                </div>
                <div className="mt-3">
                    Best for first timers and those preparing for key life or
                    career transition
                </div>
            </div>
        </div>
    )
}