"use client";
import Link from "next/link";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

const BreadCrumb = ({ items }) => {
  return (
    <nav className="d-flex align-items-center breadcrumb-nav mt-4 container">
      <HomeOutlinedIcon style={{ fontSize: 20 }} />
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span className="d-flex align-items-center" key={index}>
            <span className="mx-2 fw-bold">{">"}</span>
            <Link
              href={item.href}
              className={`breadcrumb-link ${isLast ? "active" : ""}`}
              aria-current={isLast ? "page" : undefined}
            >
              {item.label}
            </Link>
          </span>
        );
      })}
    </nav>
  );
};

export default BreadCrumb;
