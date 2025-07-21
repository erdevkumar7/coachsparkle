import '@/components/_styles/chat_support.css';
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function ChatSupport() {
  reutrn(
    <div className="chat-support">
      <div className="chat-header d-flex">
        <div className="d-flex gap-2">
          <div>
            <img
              src="/coachsparkle/images/ellipse-two.png"
              alt="coachsparkle"
            />
          </div>
          <div>
            <p>Support</p>
            <p>Online</p>
          </div>
        </div>
        <div>
          <MoreVertIcon />
        </div>
      </div>
    </div>
  );
}
