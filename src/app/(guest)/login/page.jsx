import LoginForm from '../_components/LoginForm';
import { HandleValidateTokenOnServer } from '@/app/api/user';
import { redirect } from 'next/navigation';

export default async function Page() {
  const tokenData = await HandleValidateTokenOnServer();
  let user;

  if (tokenData) {
    user = tokenData?.data

    if (user.user_type == 2) {
      return redirect('/user/dashboard');
    }
    if (user.user_type == 3) {
      return redirect('/coach/dashboard');
    }
  }
  return (
      <LoginForm />
  );
}
