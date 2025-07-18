import "./user.main.css"
import UserHeader from './_user_components/UserHeader';
import { getUserProfileData } from "@/app/api/user";
import { redirect } from 'next/navigation';
import UserSideBarComp from "./_user_components/UserSideBar";

export default async function UserLayout({ children }) {
  const { data: user, error, removeToken } = await getUserProfileData();
  if (!user) {
    return redirect('/login');
  } else if (user.user_type == 3) {
    return redirect('/coach/dashboard');
  }


  return (
    <>
      <UserHeader user={user} error={error} removeToken={removeToken} />

      <div className="container user-wrapper user-page-add">
        <UserSideBarComp user={user} />
        {children}
      </div>
    </>
  );
}