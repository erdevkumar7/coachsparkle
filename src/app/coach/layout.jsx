import { redirect } from 'next/navigation';
import { getUserProfileData } from "@/app/api/user";
import "./dashboard.css"
import CoachHeader from './_coach_components/CoachHeader';
import CoachSideBarComp from './_coach_components/coachSideBar';
import { UserProvider } from '@/context/UserContext';

export default async function CoachLayout({ children }) {
  const { data: user, error } = await getUserProfileData();

  if (!user) {
    return redirect('/login');
  } else if (user.user_type == 2) {
    return redirect('/user/dashboard');
  }

  return (
      <UserProvider initialUser={user}>
      <CoachHeader />
      <div className="container dashboard-wrapper">
        <CoachSideBarComp />
        {children}
      </div>
    </UserProvider>
  );
}