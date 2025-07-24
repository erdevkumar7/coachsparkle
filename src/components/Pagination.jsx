"use client";

import React from "react";

export default function Pagination({
  currentPage,
  lastPage,
  onPageChange,
}) {
  if (lastPage <= 1) return null;

  const handleClick = (page) => {
    if (page !== currentPage && page >= 1 && page <= lastPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="container-fluid pt-3 pagination-content-add">
      <div className="row pagination-content-inner">
        <div className="pagination">
          <button
            className="page-btn"
            onClick={() => handleClick(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <i className="bi bi-chevron-left"></i> Back
          </button>

          {Array.from({ length: lastPage }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`page-number ${page === currentPage ? "active" : ""}`}
              onClick={() => handleClick(page)}
            >
              {page}
            </button>
          ))}

          <button
            className="page-btn"
            onClick={() => handleClick(currentPage + 1)}
            disabled={currentPage === lastPage}
          >
            Next <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
