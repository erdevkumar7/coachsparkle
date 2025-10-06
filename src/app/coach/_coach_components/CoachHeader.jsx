"use client";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/navigation";
import { FRONTEND_BASE_URL } from "@/utiles/config";
import Cookies from "js-cookie";
import { HandleValidateToken } from "@/app/api/auth";
import { useUser } from "@/context/UserContext";
import Image from 'next/image';
import AppsIcon from '@mui/icons-material/Apps';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import { toast } from "react-toastify";
import Link from "next/link";



export default function CoachHeader({ user }) {
  // const { user } = useUser();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);


  const toggleSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    if (sidebar) {
      sidebar.classList.toggle("collapsed");
    }
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    Cookies.remove('token');
    localStorage.removeItem('user');
    window.location.href = `${FRONTEND_BASE_URL}/login`;
    // router.push('/login');
    toast.success("Logout Successful!");
    sessionStorage.setItem('role', 3);
  };

  return (
    <>
      <div className="top-dashboard-header">
        <div className="container">
          <nav className="navbar col-lg-12 col-12 p-0 d-flex flex-row">
            <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
              <a className="navbar-brand" href="#">
                <img
                  src={`${FRONTEND_BASE_URL}/images/favicon.png`}
                  alt="favicon logo"
                  className="navbar-brand-img d-lg-none"
                />
                <div className="d-none d-lg-block">
                  {collapsed ? (
                    <Image src={`${FRONTEND_BASE_URL}/images/favicon.png`} alt="Logo" className="img-fluid" width={1000} height={226} />

                  ) : (

                    <Image src={`${FRONTEND_BASE_URL}/images/logo.png`} alt="full logo"
                      className="navbar-brand-img" width={1000} height={226} />

                  )}
                </div>
              </a>


            </div>

            <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
              <button
                className="navbar-toggler navbar-toggler align-self-center"
                type="button"
                data-toggle="minimize"
              >
                <span className="icon-menu"></span>
              </button>
              <ul className="navbar-nav navbar-nav-right">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link count-indicator dropdown-toggle"
                    id="notificationDropdown"
                    href="#"
                    data-bs-toggle="dropdown"
                  >
                    <NotificationsNoneOutlinedIcon />
                    <span className="count"></span>
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                    aria-labelledby="notificationDropdown"
                  >
                    <p className="mb-0 font-weight-normal float-left dropdown-header">
                      Notifications
                    </p>
                    {/* <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-success">
                      <i className="bi bi-info-circle mx-0"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <h6 className="preview-subject font-weight-normal">
                      Application Error
                    </h6>
                    <p className="font-weight-light small-text mb-0 text-muted">
                      {" "}
                      Just now{" "}
                    </p>
                  </div>
                </a> */}
                    {/* <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-warning">
                    <SettingsOutlinedIcon/>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <h6 className="preview-subject font-weight-normal">
                      Settings
                    </h6>
                    <p className="font-weight-light small-text mb-0 text-muted">
                      {" "}
                      Private message{" "}
                    </p>
                  </div>
                </a> */}
                    <a className="dropdown-item preview-item">
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-info">
                          <i className="bi bi-person mx-0"></i>
                        </div>
                      </div>
                      <div className="preview-item-content">
                        <h6 className="preview-subject font-weight-normal">
                          New Message
                        </h6>
                        <p className="font-weight-light small-text mb-0 text-muted">
                          {" "}
                          2 days ago{" "}
                        </p>
                      </div>
                    </a>
                  </div>
                </li>


                <li className="nav-item">
                  <a
                    className="nav-link count-indicator"
                    id="notificationDropdown"
                    href="#"
                    data-bs-toggle="dropdown"
                  >
                    <MailOutlineOutlinedIcon />
                    <span className="count"></span>
                  </a>
                </li>


                <li className="nav-item nav-profile dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    data-bs-toggle="dropdown"
                    id="profileDropdown"
                  >
                    <img alt="profile" src={user?.profile_image || `${FRONTEND_BASE_URL}/images/default_profile.jpg`} />
                    <p className="top-name-add">{user?.first_name} <KeyboardArrowDownOutlinedIcon /></p>
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-right navbar-dropdown"
                    aria-labelledby="profileDropdown"
                  >
                    <Link className="dropdown-item"
                      href={"/coach/dashboard"}>
                      <AppsIcon /> &nbsp; Dashboard{" "}
                    </Link>
                    <Link
                      className="dropdown-item"
                      href={"/coach/profile"}
                    >
                      <AccountCircleOutlinedIcon />&nbsp;
                      Profile{" "}
                    </Link>
                    <a className="dropdown-item" onClick={handleLogout}>
                      <PowerSettingsNewOutlinedIcon className="mui-icons power-logout" />
                      &nbsp;Logout{" "}
                    </a>
                  </div>
                </li>
              </ul>
              <button
                className="btn btn-link d-none d-lg-block ms-3 mobile-view-add"
                onClick={toggleSidebar}
              >
                <i className="bi bi-list fs-3"></i>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
