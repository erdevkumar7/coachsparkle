import { redirect } from 'next/navigation';
import { getUserProfileData } from "@/app/api/user";
import "./dashboard.css"
import CoachHeader from './_coach_components/CoachHeader';

export default async function CoachLayout({ children }) {
  const { data: user, error } = await getUserProfileData();

  if (!user) {
    return redirect('/login');
  }
  return (
    <>
      <CoachHeader user={user} />
      {children}
    </>
  );
}