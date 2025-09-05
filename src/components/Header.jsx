"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./_styles/header.css";
import Link from "next/link";
import { FRONTEND_BASE_URL } from "@/utiles/config";
import Cookies from "js-cookie";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { toast } from "react-toastify";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';


export default function Header({ user }) {

  // const [hasMounted, setHasMounted] = useState(false);
  const router = useRouter();

  //   useEffect(() => {
  //   setHasMounted(true);
  // }, []);

  // if (!hasMounted) return null;

  const handleLogout = () => {
    // HandleAuthLogout()
    Cookies.remove("token");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = `${FRONTEND_BASE_URL}/login`;
    //  window.location.reload();
    // router.push("/login");
    toast.success("Logout Successful!")
    sessionStorage.setItem('role', 2);
  };

  return (
    <nav className="navbar navbar-expand-lg coach-top-navber-add user-add-top">
      <div className="container">
        <Link className="navbar-logo-add" href="/">
          <img src={`${FRONTEND_BASE_URL}/images/logo.png`} alt="Logo" />
        </Link>
        <button
          className="navbar-toggler tech"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav list-show">
            <div className="inner-tab-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" href="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/coach-detail/list">
                  Explore Coaches <KeyboardArrowDownIcon className="mui-icons" />
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" href="/send-coaching-request">
                  Send Coaching Request
                  <KeyboardArrowDownIcon className="mui-icons" />
                </Link>
                {/* <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" href="/">Match 1</Link></li>
                                <li><Link className="dropdown-item" href="/">Match 2</Link></li>
                                <li><Link className="dropdown-item" href="/">Match 3</Link></li>
                            </ul> */}
              </li>

              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  For Corporate <KeyboardArrowDownIcon className="mui-icons" />
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" href="/">
                      Corporate 1
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="/">
                      Corporate 2
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="/">
                      Corporate 3
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item mobile-event-add">
                <Link className="nav-link" href="/">
                  Events
                </Link>
              </li>
            </div>

            {user ? (
              // <button onClick={handleLogout} style={{
              //     display: 'inline-block',
              //     padding: '6px 16px',
              //     backgroundColor: '#007bff',
              //     color: 'white',
              //     borderRadius: '4px',
              //     textDecoration: 'none',
              //     textAlign: 'center',
              //     marginLeft: '10px',
              //     border: 'white'
              // }}>Logout</button>
              <div className="register-login head-top-login-add">
                <div className="register-content">
                  <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end logout-add-head">
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
                          <a className="dropdown-item preview-item">
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
                          </a>
                          <a className="dropdown-item preview-item">
                            <div className="preview-thumbnail">
                              <div className="preview-icon bg-warning">
                                <SettingsOutlinedIcon className="mui-icons" />

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
                          </a>
                          <a className="dropdown-item preview-item">
                            <div className="preview-thumbnail">
                              <div className="preview-icon bg-info">
                                <i className="bi bi-person mx-0"></i>
                              </div>
                            </div>
                            <div className="preview-item-content">
                              <h6 className="preview-subject font-weight-normal">
                                New user registration
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
                          <img
                            src={
                              user?.profile_image ||
                              `${FRONTEND_BASE_URL}/images/default_profile.jpg`
                            }
                            alt="profile"
                            style={{
                              borderRadius: "100%",
                              width: "40px",
                              height: "40px",
                            }}
                          />
                          <p className="top-name-add">
                            {user?.first_name}{" "}
                            <KeyboardArrowDownOutlinedIcon />
                          </p>
                        </a>

                        <div
                          className="dropdown-menu dropdown-menu-right navbar-dropdown"
                          aria-labelledby="profileDropdown"
                        >
                          <a className="dropdown-item">
                            <SettingsOutlinedIcon /> &nbsp; Settings{" "}
                          </a>
                          {user?.user_type == 2 && (
                            <Link
                              className="dropdown-item"
                              href={"/user/profile"}
                            >
                              <AccountCircleOutlinedIcon />&nbsp;
                              Profile{" "}
                            </Link>
                          )}
                          {user?.user_type == 3 && (
                            <Link
                              className="dropdown-item"
                              href={"/coach/dashboard"}
                            >
                              <i className="bi bi-person-circle mx-0"></i>&nbsp;
                              Dashboard{" "}
                            </Link>
                          )}
                          <a className="dropdown-item" onClick={handleLogout}>
                            <PowerSettingsNewOutlinedIcon className="mui-icons power-icons" />
                            &nbsp;Logout{" "}
                          </a>
                        </div>
                      </li>
                    </ul>
                    <button
                      className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
                      type="button"
                      data-bs-toggle="offcanvas"
                    >
                      <i className="bi bi-list fs-2"></i>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="register-login head-top-login-add">
                  <div className="register-content">
                    <Link href="/login" className="Login-navbar">
                      Login
                    </Link>
                    <Link
                      href="/select-role"
                      style={{
                        display: "inline-block",
                        padding: "15px 30px",
                        backgroundColor: "#009BFA",
                        color: "white",
                        borderRadius: "10px",
                        textDecoration: "none",
                        textAlign: "center",
                        marginLeft: "10px",
                      }}
                    >
                      Sign up
                    </Link>
                  </div>
                </div>
              </>
            )}

          </ul>

        </div>
      </div>
    </nav>
  );
}
