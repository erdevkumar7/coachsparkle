import "./user.main.css"
import UserHeader from './_user_components/UserHeader';

export default function UserLayout({ children }) {
  return (
    <>
      <UserHeader />
      {children}
    </>
  );
}