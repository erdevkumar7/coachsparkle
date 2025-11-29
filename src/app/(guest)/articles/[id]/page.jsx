import { getBlogDetails } from "@/app/api/guest";
import Image from "next/image";

export default async function ArticleDetails({ params }) {

    const { id } = params;

    const blogData = await getBlogDetails(id);
    const blog = blogData?.data;

    if (!blog) {
        return (
            <div className="container py-5">
                <h1>Article Not Found</h1>
                <p>The article you're looking for does not exist.</p>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <h1 className="mb-3">{blog.blog_name}</h1>

            <h6 className="text-muted mb-4">
                <i className="bi bi-calendar"></i> {new Date(blog.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}
            </h6>

            <Image
                src={blog.blog_image}
                alt={blog.blog_name}
                width={1200}
                height={400}
                className="mb-4 object-fit-contain"
            />

            <div
                className="article-content"
                dangerouslySetInnerHTML={{ __html: blog.blog_content }}
            ></div>
        </div>
    );
}
