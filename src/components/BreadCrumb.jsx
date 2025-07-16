"use client";
import Link from "next/link";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

const BreadCrumb = ({ items }) => {
  return (
    <nav className="d-flex align-items-center breadcrumb-nav mt-4 container">
      <HomeOutlinedIcon style={{ fontSize: 20 }} />
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const classNames = `breadcrumb-link ${isLast ? "active" : ""}`;

        return (
          <span className="d-flex align-items-center" key={index}>
            <span className="mx-2 fw-bold">{">"}</span>

            {item.onClick ? (
              <button
                type="button"
                onClick={item.onClick}
                className={classNames + " btn btn-link p-0 border-0 text-decoration-none"}
                aria-current={isLast ? "page" : undefined}
              >
                {item.label}
              </button>
            ) : (
              <Link
                href={item.href || "#"}
                className={classNames}
                aria-current={isLast ? "page" : undefined}
              >
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default BreadCrumb;
