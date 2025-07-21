import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";

export default function CoachingRequests({
  image,
  heading,
  status,
  name,
  location,
  time,
  note,
  buttonNote,
  onClick
}) {
  const getStatusClass = (status) => {
    switch (status) {
      case "New Coaching Request":
        return {
          className: "border px-3 py-1 rounded-pill",
          style: {
            backgroundColor: "#FFA500",
            color: "#FFFFFF",
            borderColor: "#FFA500",
          },
        };
      case "Accepted":
        return {
          className: "border px-3 py-1 rounded-pill",
          style: {
            backgroundColor: "#007BFF",
            color: "#FFFFFF",
            borderColor: "#007BFF",
          },
        };
      case "AI Matched":
        return {
          className: "border px-3 py-1 rounded-pill",
          style: {
            backgroundColor: "#FF00E5",
            color: "#FFFFFF",
            borderColor: "#FF00E5",
          },
        };
      default:
        return {
          className: "border px-3 py-1 rounded-pill",
          style: {
            backgroundColor: "#007BFF",
            color: "#FFFFFF",
            borderColor: "#007BFF",
          },
        };
    }
  };
  const { className, style } = getStatusClass(status);
  return (
  <div className="col-md-4 coaching-content p-3">
    <div className="d-flex justify-content-between align-items-center mb-2">
      <h4 className="mb-0">{heading}</h4>
      <MoreHorizOutlinedIcon sx={{color: '#A9A9A9'}}/>
    </div>

    <div className="mb-3 status-div">
      <button className={className} style={style}>
        {status}
      </button>
    </div>

    <div className="d-flex align-items-start gap-3 mb-3">
      <div>
        <img src={image} alt="coachsparkle" className="rounded-circle" />
      </div>
      <div>
        <span className="fw-semibold d-block name">{name}</span>
        <span className="d-block location">{location}</span>
        <span className="d-block time">{time}</span>
        <p className="mt-2 mb-0 note">{note}</p>
      </div>
    </div>

    <div className="d-flex gap-3">
      <button className="btn btn-primary button-note" onClick={onClick}>{buttonNote}</button>
      <button className="btn btn-outline-secondary button-msg">Message</button>
    </div>
  </div>
  );
}
