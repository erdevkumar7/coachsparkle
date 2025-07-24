import SendMessagePanel from "@/app/(guest)/_components/SendMessagePanel";
import '../_styles/send_message.css';
import { coachSendMessage } from '@/app/api/user';

export default async function SendMessage(){
    const sendMessage = await coachSendMessage();

    return(
        <SendMessagePanel sendMessage={sendMessage}/>
    );
}