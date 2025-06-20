import "./user.main.css"
import UserHeader from './_user_components/UserHeader';
import { getUserProfileData } from "@/app/api/user";
import { redirect } from 'next/navigation';

export default async function UserLayout({ children }) {
  const { data: user, error, removeToken } = await getUserProfileData();

  if (!user) {
    return redirect('/login');
  }

  return (
    <>
      <UserHeader user={user} error={error} removeToken={removeToken} />
      {children}
    </>
  );
}