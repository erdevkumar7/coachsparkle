"use client";
import UserHeader from "@/components/coachdashboard/CoachHeader";
import UserMainContent from "@/components/coachdashboard/CoachMainContent";
import UserFooter from "@/components/coachdashboard/CoachFooter";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useEffect } from 'react';
import "./dashboard.css"

export default function DashboardLayout({children}){
      useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
    import('@fortawesome/fontawesome-free/css/all.min.css')
  }, []);
    return(
        <>
            {children}

        </>
    );
}