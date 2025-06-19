"use client";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/navigation";
import { FRONTEND_BASE_URL } from "@/utiles/config";
import Cookies from 'js-cookie';
import { HandleAuthLogout, HandleValidateToken } from "@/app/api/auth";

export default function UserHeader({ user }) {
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false);
  const [getuser, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchUser = async () => {
      const tokenData = await HandleValidateToken(token);
      
      if (!tokenData.success) {     
        Cookies.remove('token');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
      }      

    };
    fetchUser();
  }, [router]);



  const toggleSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    if (sidebar) {
      sidebar.classList.toggle("collapsed");
    }
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    // HandleAuthLogout()
    Cookies.remove('token');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };


  return (
    <>
      <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
          <a className="navbar-brand" href="#">
            <img
              src={`${FRONTEND_BASE_URL}/images/favicon.png`}
              alt="favicon logo"
              className="navbar-brand-img d-lg-none"
            />
            <div className="d-none d-lg-block">
              {collapsed ? (
                <img
                  src={`${FRONTEND_BASE_URL}/images/favicon.png`}
                  alt="collapsed logo"
                  className="navbar-brand-img"
                />
              ) : (
                <img
                  src={`${FRONTEND_BASE_URL}/images/logo.png`}
                  alt="full logo"
                  className="navbar-brand-img"
                />
              )}
            </div>
          </a>

          <button
            className="btn btn-link d-none d-lg-block ms-3"
            onClick={toggleSidebar}
          >
            <i className="bi bi-list fs-3"></i>
          </button>
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
                <i className="bi bi-bell"></i>
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
                      <i className="bi bi-gear mx-0"></i>
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
            <li className="nav-item nav-profile dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                data-bs-toggle="dropdown"
                id="profileDropdown"
              >
                <img
                  src={`${user?.profile_image}`}
                  alt="profile" />
                <p className="top-name-add">{user?.first_name}</p>
              </a>
              {/* <button onClick={handleLogout} style={{
                display: 'inline-block',
                padding: '6px 16px',
                backgroundColor: '#007bff',
                color: 'white',
                borderRadius: '4px',
                textDecoration: 'none',
                textAlign: 'center',
                marginLeft: '10px',
                border: 'white'
              }}>Logout</button> */}
              <div
                className="dropdown-menu dropdown-menu-right navbar-dropdown"
                aria-labelledby="profileDropdown"
              >
                <a className="dropdown-item">
                  <i className="bi bi-gear mx-0"></i>&nbsp; Settings{" "}
                </a>
                <a className="dropdown-item" onClick={handleLogout}>
                  <i className="bi bi-power text-primary"></i>&nbsp;Logout{" "}
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
      </nav>
    </>
  );
}
