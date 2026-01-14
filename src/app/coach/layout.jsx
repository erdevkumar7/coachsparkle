import { redirect } from 'next/navigation';
import { getUserProfileData } from "@/app/api/user";
import "./dashboard.css"
import CoachHeader from './_coach_components/CoachHeader';
import CoachSideBarComp from './_coach_components/coachSideBar';
import { UserProvider } from '@/context/UserContext';
import ChatSupportWrapper from './_coach_components/support/ChatSupportWrapper';
import { ChatProvider } from '@/context/ChatContext';
import { PusherDebugCoach } from '@/components/PusherDebugCoach';
import { CoachChatProvider } from '@/context/CoachChatContext';
import { PusherDebug } from '@/components/PusherDebug';
import Header from '@/components/Header';

export default async function CoachLayout({ children }) {
  const { data: user, error, token } = await getUserProfileData();

  if (!user) {
    return redirect('/login');
  } else if (user.user_type == 2) {
    return redirect('/user/dashboard');
  }
 
console.log(user);
  return (
    <UserProvider initialUser={user}>
      <ChatProvider user={user}>
          <Header user={user} token={token} />
        {/* <CoachHeader user={user}/> */}
        <div className="container dashboard-wrapper">
          <CoachSideBarComp user={user}/>
          {children}
          <ChatSupportWrapper user={user}/>
        </div>
        {/* <PusherDebugCoach /> */}
        {/* <PusherDebug />  */}
      </ChatProvider>
    </UserProvider>
  );
}