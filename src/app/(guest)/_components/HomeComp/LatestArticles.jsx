import { getFeaturedcoachBlogForHomeAndArticlePage } from "@/app/api/guest";
import Image from "next/image";
import Link from "next/link";

export default async function LatestArticles() {
    const blogsData = await getFeaturedcoachBlogForHomeAndArticlePage(1);
    const blogs = blogsData?.data;

    return (
        <div className="latest-articles-explore">
            {blogs?.length === 0 ?
                (<div className="container">
                    <h1>Latest Articles</h1>
                    <p>No Latest Articles Contributed by Featured Coaches</p>
                </div>) :
                (<div className="container">
                    <h1>Latest Articles</h1>
                    <p>Read Articles Contributed by Featured Coaches</p>
                    <div className="row latest-articles-inner">
                        <div className="articles-btn-top">
                            <Link href="/articles" className="articles-btn-add">All articles</Link>
                        </div>
                        <div className="latest-articles-cards-content row">
                            {blogs && blogs.slice(0, 3).map((blog) => (
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
                                            <h6><i className="bi bi-calendar"></i> {new Date(blog.created_at).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "2-digit",
                                            })}</h6>
                                            <p className="card-text">
                                                {blog.blog_content.replace(/<[^>]+>/g, '').slice(0, 80)}...
                                            </p>
                                            <Link href={`#`} className="read-more-btn">Read More..</Link>
                                            {/* <Link href={`/coachsparkle/articles/${blog.id}`} className="read-more-btn">Read More..</Link> */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>)}
        </div>
    )
}