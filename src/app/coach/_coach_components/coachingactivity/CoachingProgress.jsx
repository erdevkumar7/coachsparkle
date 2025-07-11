export default function CoachingProgress({
  image,
  heading,
  sessions,
  status,
  name,
  time,
  app,
  buttonNote,
}) {
  return (
    <div className="col-md-4 coaching-progress p-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h4 className="mb-0">{heading}</h4>
        <span className="session">{sessions}</span>
      </div>

      <div className="mb-3 status-div">
        <button className="border px-3 py-1 rounded-pill">{status}</button>
      </div>

      <div className="d-flex align-items-start gap-3 mb-3 content">
        <div>
          <img src={image} alt="coachsparkle" className="rounded-circle" />
        </div>
        <div>
          <span className="fw-semibold d-block name">{name}</span>
          <span className="d-block time">{time}</span>
          <img src={app} alt="coachsparkle" />
        </div>
      </div>

      <div className="d-flex gap-3">
        <button className="btn btn-primary button-note">{buttonNote}</button>
        <button className="btn btn-outline-secondary button-msg">
          Message
        </button>
      </div>
    </div>
  );
}
