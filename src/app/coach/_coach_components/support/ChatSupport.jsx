import '../../_styles/chat_support.css';
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function ChatSupport() {
  return(
    <div className="chat-support">
      <div className="chat-header d-flex">
      <div className="chat-container">

  <div className="chat-header">
    <img src="https://i.pravatar.cc/40" alt="Support" />
    <div>
      <div className="name">Support</div>
      <div className="status">online</div>
    </div>
    <div className='three-dotes-icons'>
      <MoreVertIcon className='mui-icons'/>
      </div>
  </div>

  <div className="chat-messages">
    <div className="message support">
      <div className="bubble">Hey! How’s it going? <div className="time">12:04 pm</div></div>
      
    </div>

    <div className="message user">
      <div className="bubble">Hi coach, I’m struggling to stay consistent with my workouts. Any tips? <div className="time">12:05 pm</div></div>
      
    </div>

    <div className="message support">
      <div className="bubble">
        Hi! Totally understand — it happens. Try scheduling workouts like appointments and start small,
        even 15–20 mins. Want me to send you a quick weekly plan? <div className="time">1:00 pm</div>
      </div>
      
    </div>

    <div className="message user">
      <div className="bubble">Yes, please. That would help! <div className="time">1:00 pm</div>
      </div>
    </div>

    <div className="message user">
      <div className="bubble">Thanks!! <div className="time">1:00 pm</div></div>
      
    </div>

    <div className="message support">
      <div className="bubble">
        Great! I’ll send a 3-day starter plan you can build on. Also, do you prefer morning or evening workouts? <div className="time">1:01 pm</div>
      </div>
      
    </div>

    <div className="message user">
      <div className="bubble">Yeah sure! <div className="time">1:01 pm</div></div>
      
    </div>
  </div>


  <div className="chat-footer">
    <input type="text" placeholder="Type Message..." />
    <button>
      <svg width="24" height="24" fill="currentColor">
        <path d="M3.4,20.3l17.2-8.6c.5-.3.5-1,0-1.3L3.4,1.8c-.5-.3-1.1.1-1.1.7v5.2c0,.3.2.6.5.7l10.1,4.6-10.1,4.6c-.3.1-.5.4-.5.7v5.2C2.3,20.2,2.9,20.6,3.4,20.3z" />
      </svg>
    </button>
  </div>
</div>
        {/* <div>
          <MoreVertIcon />
        </div> */}
      </div>
    </div>
  );
}
