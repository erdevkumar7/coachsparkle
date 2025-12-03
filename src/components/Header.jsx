"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import "./_styles/header.css";
import Link from "next/link";
import { FRONTEND_BASE_URL } from "@/utiles/config";
import Cookies from "js-cookie";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AppsIcon from '@mui/icons-material/Apps';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { toast } from "react-toastify";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import { getNotifications } from "@/app/api/user-client";


export default function Header({ user, token }) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [loading, setLoading] = useState(false);


  // console.log('uiiii', user.user_type)
  // Fetch notifications
  const fetchNotifications = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const data = await getNotifications(token);
      if (data.status) {
        setNotifications(data.notifications || []);
        setNotificationCount(data.count || 0);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setNotifications([]);
      setNotificationCount(0);
    } finally {
      setLoading(false);
    }
  };

  // Mark notification as read
  const markAsRead = async (messageId) => {
    try {
      const token = Cookies.get("token");
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/markNotificationAsRead`,
        { message_id: messageId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update local state
      setNotifications(prev =>
        prev.map(notif =>
          notif.message_id === messageId
            ? { ...notif, is_read: 1 }
            : notif
        )
      );
      setNotificationCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Handle notification click
  const handleNotificationClick = (notification) => {
    // Mark as read
    if (notification.is_read === 0) {
      markAsRead(notification.message_id);
    }

    // Handle different message types
    if (user?.user_type === 3) {
      switch (notification.message_type) {
        case 1:
          router.push(`/coach/messages/1?user_id=${notification.sender_id}`);
          break;
        case 2:
          router.push(`/coach/messages/2?user_id=${notification.sender_id}`);
          break;
        case 3:
          router.push(`/coach/messages/3?user_id=${notification.sender_id}`);
          break;
        default:
          break;
      }
    }

    if (user?.user_type === 2) {
      switch (notification.message_type) {
        case 1:
          router.push(`/user/user-message/1?coach_id=${notification.sender_id}`);
          break;
        case 2:
          router.push(`/user/user-message/2?coach_id=${notification.sender_id}`);
          break;
        case 3:
          router.push(`/user/user-message/3?coach_id=${notification.sender_id}`);
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    if (user) {
      fetchNotifications();

      // Optional: Set up interval to refresh notifications
      // const interval = setInterval(fetchNotifications, 30000); 

      // return () => clearInterval(interval);
    }
  }, [user]);


  const toggleSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    const moblileCollapsBtn = document.getElementById("remov-coll-on-tech");
    const navbarTogglerDemo = document.getElementById("navbarTogglerDemo01")

    if (sidebar) {
      sidebar.classList.toggle("collapsed");
    }

    if (moblileCollapsBtn && navbarTogglerDemo) {
      navbarTogglerDemo.classList.toggle("show");
    }

    setCollapsed(!collapsed);
  };

  // const handleLogout = () => {
  //   Cookies.remove("token");
  //   localStorage.removeItem("user");
  //   window.location.href = `${FRONTEND_BASE_URL}/login`;
  //   toast.success("Logout Successful!")
  // };

  const handleLogout = async () => {
    const token = Cookies.get("token");

    try {
      if (token) {
        axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ).catch(error => {
          console.error("Logout API error:", error);
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      Cookies.remove("token");
      localStorage.removeItem("user");
      toast.success("Logout Successful!");
      window.location.href = `${FRONTEND_BASE_URL}/login`;
    }
  };



  // console.log('notificationsnotifications', notifications)

  return (
    <nav className="navbar navbar-expand-lg coach-top-navber-add user-add-top">
      <div className="container">
        <Link className="navbar-logo-add" href="/">
          <img src={`${FRONTEND_BASE_URL}/images/logo.png`} alt="Logo" />
        </Link>
        <button
          id="remov-coll-on-tech"
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

                <Link className="nav-link active" href="/" onClick={() => closeMenu()}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/coach-detail/list"  onClick={() => closeMenu()}>
                  Explore Coaches <KeyboardArrowDownIcon className="mui-icons" />
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" href="/send-coaching-request"  onClick={() => closeMenu()}>
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
                  className="nav-link"
                  href="/corporate"
                  onClick={() => closeMenu()}
                >
                  For Corporate
                  {/* <KeyboardArrowDownIcon className="mui-icons" /> */}
                </Link>
                {/* <ul className="dropdown-menu">
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
                </ul> */}
              </li>

              {/* <li className="nav-item mobile-event-add">
                <Link className="nav-link" href="/">
                  Events
                </Link>
              </li> */}
            </div>

            {user ? (
              <div className="register-login head-top-login-add">
                <div className="register-content user_dash_add_mob home-add-header">
                  <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end logout-add-head">
                    <button
                      className="navbar-toggler navbar-toggler align-self-center"
                      type="button"
                      data-toggle="minimize"
                    >
                      <span className="icon-menu"></span>
                    </button>
                    <ul className="navbar-nav navbar-nav-right mobile-view-drop">
                      <li className="nav-item dropdown">
                        <a
                          className="nav-link count-indicator dropdown-toggle"
                          id="notificationDropdown"
                          href="#"
                          data-bs-toggle="dropdown"
                          onClick={fetchNotifications}
                        >
                          <NotificationsNoneOutlinedIcon />
                          {/* <span className="count"></span> */}
                          {notificationCount > 0 && (
                            <span className="count">{notificationCount}</span>
                          )}
                        </a>
                        {/* <div
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
                                New Message
                              </h6>
                              <p className="font-weight-light small-text mb-0 text-muted">
                                {" "}
                                2 days ago{" "}
                              </p>
                            </div>
                          </a>
                        </div> */}

                        <div
                          className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list notification-drop-add"
                          aria-labelledby="notificationDropdown"
                          
                        >
                          <div className="dropdown-header">
                            <p className="mb-0 font-weight-normal float-left">
                              Notifications
                            </p>
                            {notifications.length > 0 && (
                              <small
                                className="float-right text-primary cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Mark all as read functionality can be added here
                                }}
                              >
                                {/* Mark all as read */}
                              </small>
                            )}
                          </div>

                          {loading ? (
                            <div className="dropdown-item text-center">
                              <div className="spinner-border spinner-border-sm" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </div>
                            </div>
                          ) : notifications.length > 0 ? (
                            notifications.map((notification) => (
                              <a
                                key={notification.message_id}
                                className={`dropdown-item preview-item ${notification.is_read === 0 ? 'unread-notification' : ''}`}
                                onClick={() => handleNotificationClick(notification)}
                                style={{ cursor: 'pointer' }}
                              >
                                <div className="preview-thumbnail">
                                  <img
                                    src={notification.sender_detail?.profile || `${FRONTEND_BASE_URL}/images/default_profile.jpg`}
                                    alt={notification.sender_detail?.first_name}
                                    style={{
                                      width: '40px',
                                      height: '40px',
                                      borderRadius: '50%',
                                      objectFit: 'cover'
                                    }}
                                  />
                                </div>
                                <div className="preview-item-content">
                                  <div className="d-flex justify-content-between align-items-start">
                                    <h6 className="preview-subject font-weight-normal mb-1" style={{ fontSize: '14px', lineHeight: '1.3' }}>
                                      {notification.sender_detail?.first_name} {notification.sender_detail?.last_name}
                                    </h6>
                                    {notification.document_type == 'enquiry' && <span className="badge bg-primary" style={{ fontSize: '10px' }}> Equiry </span>}
                                    {notification.document_type == 'pdf' && <span className="badge bg-success" style={{ fontSize: '10px' }}> Request </span>}
                                    {notification.document_type == 'link' && <span className="badge bg-warning text-dark" style={{ fontSize: '10px' }}> Booking </span>}
                                  </div>
                                  <span className="login-msg-add mb-1" style={{ fontSize: '12px', color: '#666' }}>
                                    {notification.message.length > 100
                                      ? `${notification.message.substring(0, 100)}...`
                                      : notification.message
                                    }
                                  </span>
                                  <p className="font-weight-light small-text mb-0 text-muted" style={{ fontSize: '11px' }}>
                                    {notification.time}
                                  </p>
                                </div>
                                {notification.is_read === 0 && (
                                  <div className="unread-indicator">
                                    <span className="badge bg-danger" style={{ width: '8px', height: '8px', padding: 0 }}></span>
                                  </div>
                                )}
                              </a>
                            ))
                          ) : (
                            <div className="dropdown-item text-center text-muted">
                              No notifications
                            </div>
                          )}

                          {/* {notifications.length > 0 && (
                            <div className="dropdown-footer text-center">
                              <small
                                className="text-primary cursor-pointer"
                                onClick={() => router.push('/notifications')}
                              >
                                View All
                              </small>
                            </div>
                          )} */}
                        </div>

                        {/* <div
                          className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
                          aria-labelledby="notificationDropdown"
                          style={{ minWidth: '300px', maxHeight: '400px', overflowY: 'auto' }}
                        >
                          <div className="dropdown-header">
                            <p className="mb-0 font-weight-normal float-left">
                              Notifications
                            </p>
                            {notifications.length > 0 && (
                              <small
                                className="float-right text-primary cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                              >
                                Mark all as read
                              </small>
                            )}
                          </div>

                          {loading ? (
                            <div className="dropdown-item text-center">
                              <div className="spinner-border spinner-border-sm" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </div>
                            </div>
                          ) : notifications.length > 0 ? (
                            notifications.map((notification) => (
                              <a
                                key={notification.message_id}
                                className={`dropdown-item preview-item ${notification.is_read === 0 ? 'bg-light' : ''}`}
                                onClick={() => handleNotificationClick(notification)}
                                style={{ cursor: 'pointer' }}
                              >
                                <div className="preview-thumbnail">
                                  <div className={`preview-icon ${notification.is_read === 0 ? 'bg-warning' : 'bg-info'}`}>
                                    <i className="bi bi-bell mx-0"></i>
                                  </div>
                                </div>
                                <div className="preview-item-content">
                                  <h6 className="preview-subject font-weight-normal">
                                    {notification.message.length > 100
                                      ? `${notification.message.substring(0, 100)}...`
                                      : notification.message
                                    }
                                  </h6>
                                  <p className="font-weight-light small-text mb-0 text-muted">
                                    {notification.time}
                                  </p>
                                </div>
                              </a>
                            ))
                          ) : (
                            <div className="dropdown-item text-center text-muted">
                              No notifications
                            </div>
                          )}


                        </div> */}

                      </li>

                      <li className="nav-item">
                        <a
                          className="nav-link count-indicator"
                          id="notificationDropdown"
                          href={user?.user_type === 2 ? `${FRONTEND_BASE_URL}/user/user-message/1` : user?.user_type === 3 ? `${FRONTEND_BASE_URL}/coach/messages/1` : "#"}
                        // data-bs-toggle="dropdown"
                        >
                          <MailOutlineOutlinedIcon />
                          <span className="count"></span>
                        </a>
                      </li>
                      <li className="nav-item nav-profile dropdown">
                        <a
                          className="nav-link dropdown-toggle mobile-view-add-screen"
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
                            {user?.display_name || user?.first_name}{" "}
                            <KeyboardArrowDownOutlinedIcon />
                          </p>
                        </a>

                        <div
                          className="dropdown-menu dropdown-menu-right navbar-dropdown"
                          aria-labelledby="profileDropdown"
                        >
                          {user?.user_type == 2 && (
                            <>
                              <Link className="dropdown-item"
                                href={"/user/dashboard"}>
                                <AppsIcon /> &nbsp; Dashboard{" "}
                              </Link>
                              <Link
                                className="dropdown-item"
                                href={"/user/profile"}
                              >
                                <AccountCircleOutlinedIcon />&nbsp;
                                Profile{" "}
                              </Link>
                              <a className="dropdown-item" onClick={handleLogout}>
                                <PowerSettingsNewOutlinedIcon className="mui-icons power-icons" />
                                &nbsp;Logout{" "}
                              </a>
                            </>
                          )}

                          {user?.user_type == 3 && (
                            <>
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
                                <PowerSettingsNewOutlinedIcon className="mui-icons power-icons" />
                                &nbsp;Logout{" "}
                              </a>
                            </>
                          )}

                        </div>
                      </li>
                    </ul>
                    <button
                      className="navbar-toggler navbar-toggler-right d-lg-none align-self-center mobile-view-toggle-right"
                      type="button"
                      onClick={toggleSidebar}
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
                    <Link href="/login" className="Login-navbar" onClick={() => closeMenu()}>
                      Login
                    </Link>
                    <Link className="sign-up-add" 
                      href="/select-role" onClick={() => closeMenu()}
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
