import SendMessagePanel from "@/app/(guest)/_components/SendMessagePanel";
import '../_styles/send_message.css';
import { HandleValidateTokenOnServer } from "@/app/api/user";

export default async function SendMessage(){
      const tokenData = await HandleValidateTokenOnServer();
      let user;
    
      if (tokenData) {
        user = tokenData?.data;
      }

    return(
        <SendMessagePanel userData={user} />
    );
}