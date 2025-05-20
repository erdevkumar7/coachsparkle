import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/header.module.css";

export default function Header() {

    return (
        <nav className="navbar navbar-expand-lg coach-top-navber-add">           
            <div className="container">
                <Link className="navbar-logo-add" href="/"><Image src="/images/logo.png" alt="Logo" width={100} height={100} /></Link>
                <button className="navbar-toggler tech" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <ul className="navbar-nav list-show">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" href="/">Home</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Browse Coaches
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" href="/">Coaches 1</Link></li>
                                <li><Link className="dropdown-item" href="/">Coaches 2</Link></li>
                                <li><Link className="dropdown-item" href="/">Coaches 3</Link></li>
                            </ul>
                        </li>

                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Get Match
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" href="/">Match 1</Link></li>
                                <li><Link className="dropdown-item" href="/">Match 2</Link></li>
                                <li><Link className="dropdown-item" href="/">Match 3</Link></li>
                            </ul>
                        </li>

                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                For Corporate
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" href="/">Corporate 1</Link></li>
                                <li><Link className="dropdown-item" href="/">Corporate 2</Link></li>
                                <li><Link className="dropdown-item" href="/">Corporate 3</Link></li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" href="/">Events</Link>
                        </li>
                    </ul>

                    <div className="register-login">
                        <div className="register-content">
                            <Link href="/" className="Login-navbar">Login</Link>
                            <Link href="/"
                                style={{
                                    display: 'inline-block',
                                    padding: '8px 16px',
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    borderRadius: '4px',
                                    textDecoration: 'none',
                                    textAlign: 'center',
                                }}
                            >
                                Sign up
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}