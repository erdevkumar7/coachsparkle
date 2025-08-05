import { FRONTEND_BASE_URL } from "@/utiles/config";
import Image from "next/image";
import { getLatestMasterBlogs } from "../../api/guest";
import Link from "next/link";

export default async function Articles(){
  const blogs = await getLatestMasterBlogs();
    return(
              <div className="latest-articles-explore">
                <div className="container">
                  <h1 className="mt-5">Articles</h1>
                  <p>Read Articles Contributed by Featured Coaches</p>
<div className="row latest-articles-inner">
  <div className="latest-articles-cards-content row">
    {blogs.map((blog) => (
      <div className="col-12 col-sm-6 col-md-4 latest-articles-cards" key={blog.id}>
        <div className="card h-100">
          <Image
            src={blog.blog_image}
            alt={blog.blog_name}
            width={1000}
            height={226}
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">{blog.blog_name}</h5>
            <h6><i className="bi bi-calendar"></i> {new Date(blog.created_at).toLocaleDateString()}</h6>
            <p className="card-text">
              {blog.blog_content.replace(/<[^>]+>/g, '').slice(0, 80)}...
            </p>
            <Link href={`/coachsparkle/articles/${blog.id}`} className="read-more-btn">Read More..</Link>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
                </div>
              </div>
    );
}