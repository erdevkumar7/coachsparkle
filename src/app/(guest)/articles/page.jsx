"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getFeaturedcoachBlogForHomeAndArticlePage } from "../../api/guest";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import { CircularProgress } from "@mui/material";

export default function Articles() {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchPageData = async (page) => {
    setLoading(true);
    try {
      const response = await getFeaturedcoachBlogForHomeAndArticlePage(page);

      if (response?.data) {
        setBlogs(response.data);
        setCurrentPage(response.pagination.current_page);
        setLastPage(response.pagination.last_page);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPageData(1);
  }, []);

  if (loading) {
    return (
      <div className="latest-articles-explore">
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <CircularProgress />
        </div>
      </div>);
  }

  return (
    <div className="latest-articles-explore">
      {blogs?.length === 0 ? (
        <div className="container mb-4">
          <h1 className="mt-5">Articles</h1>
          <p>No Latest Articles Contributed by Featured Coaches</p>
        </div>
      ) : (
        <div className="container">
          <h1 className="mt-5">Articles</h1>
          <p>Read Articles Contributed by Featured Coaches</p>
          <div className="row latest-articles-inner">
            <div className="latest-articles-cards-content row">
              {blogs.map((blog) => (
                <div
                  className="col-12 col-sm-6 col-md-4 mb-4 latest-articles-cards"
                  key={blog.id}
                >
                  <div className="card h-100">
                    <Link href={`/articles/${blog.id}`}>
                    <Image
                      src={blog.blog_image}
                      alt="Img"
                      width={1000}
                      height={226}
                    />
                    </Link>
                    <div className="card-body d-flex flex-column">
                      <Link href={`/articles/${blog.id}`} className="text-decoration-none">
                      <h5 className="card-title">{blog.blog_name}</h5>
                      </Link>
                      <h6>
                        <i className="bi bi-calendar"></i>{" "}
                        {new Date(blog.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                        })}
                      </h6>
                      <p className="card-text">
                        {blog.blog_content.replace(/<[^>]+>/g, "").slice(0, 80)}
                        ...
                      </p>
                       <Link href={`/articles/${blog.id}`} className="read-more-btn">
                        Read More..
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

              <Pagination
                currentPage={currentPage}
                lastPage={lastPage}
                onPageChange={fetchPageData}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}