import { redirect } from 'next/navigation';
import { getUserProfileData } from "@/app/api/user";
import "./dashboard.css"
import CoachHeader from './_coach_components/CoachHeader';
import CoachSideBarComp from './_coach_components/coachSideBar';

export default async function CoachLayout({ children }) {
  const { data: user, error } = await getUserProfileData();

  if (!user) {
    return redirect('/login');
  } else if (user.user_type == 2) {
    return redirect('/user/dashboard');
  }

  return (
    <>
      <CoachHeader user={user} />

      <div className="container page-body-wrapper">
        <CoachSideBarComp user={user} />
        {children}
      </div>
    </>
  );
}