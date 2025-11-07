'use client';

import { useRouter } from 'next/navigation';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';

export default function SendMessageButton({ coachId, coachName }) {
  const router = useRouter();

  const handleClick = () => {
    localStorage.setItem('coach_id', coachId);
    localStorage.setItem('coach_name', coachName);
    router.push('/send-message');
  };

  return (
    <button onClick={handleClick} className="btn btn-primary">
      <i className="bi bi-chat-dots"></i>
      {/* <TextsmsOutlinedIcon /> */}
      Send Message
    </button>
  );
}
