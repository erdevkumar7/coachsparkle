import "./user.main.css"
import UserHeader from './_user_components/UserHeader';
import { getUserProfileData } from "@/utiles/api/user";

export default async function UserLayout({ children }) {
  const { data: user, error } = await getUserProfileData();


  return (
    <>
      <UserHeader  user={user}/>
      {children}
    </>
  );
}