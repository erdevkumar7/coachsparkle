'use client';

import { useRouter } from 'next/navigation';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';

export default function SendMessageButton({ coachId }) {
  const router = useRouter();

  const handleClick = () => {
    localStorage.setItem('coach_id', coachId);
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
