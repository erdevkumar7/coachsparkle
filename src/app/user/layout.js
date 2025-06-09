"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useEffect } from 'react';
import "./dashboard.css"
import UserHeader from './_user_components/UserHeader';

export default function UserLayout({ children }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
    import('@fortawesome/fontawesome-free/css/all.min.css')
  }, []);
  return (
    <>
      <UserHeader />
      {children}
    </>
  );
}