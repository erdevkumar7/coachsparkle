import { redirect } from 'next/navigation';
import { getUserProfileData } from "@/app/api/user";
import "./dashboard.css"

export default async function CoachLayout({ children }) {
  const { data: user, error } = await getUserProfileData();

  if (!user) {
    return redirect('/login');
  }
  return (
    <>
      {children}
    </>
  );
}