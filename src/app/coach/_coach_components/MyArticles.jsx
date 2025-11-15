"use client";
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EastIcon from '@mui/icons-material/East';

export default function MyArticles({ articlesInitialData }) {
  // Default to empty array if no data
  const articles = articlesInitialData?.data || [];

  // Function to truncate text for description
  const truncateText = (text, maxLength = 100) => {
    if (!text) return 'No description available';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Function to get status badge class
  const getStatusBadgeClass = (isActive) => {
    return isActive === 1 ? 'badge published' : 'badge pending';
  };

  // Function to get status text
  const getStatusText = (isActive) => {
    return isActive === 1 ? 'Published' : 'Pending';
  };


  return (
    <>
      <h3 className="text-lg font-semibold quick-text">My Articles</h3>
      <div className='articles-tables'>
        {articles.length === 0 ? (
          <div className="no-articles">
            <p>No articles found. Create your first article to get started!</p>
            <div className="footer-btn mt-4">
              {/* <Pagination
                          currentPage={currentPage}
                          lastPage={lastPage}
                          onPageChange={fetchPageData}
                        /> */}

              <button className="manage_add_btn-show">
                Create Article <EastIcon className="mui-icons" />
              </button>
            </div>
          </div>
        ) : (
          <table>
            <thead>
              <tr className="articles-add">
                <th className="name-art">Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
              <tr style={{ height: "10px" }}></tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id} className="info-add">
                  <td>
                    <div className="article-info">
                      <img
                        src={article.blog_image || "/coachsparkle/assets/images/articles-one.png"}
                        alt={article.blog_name}
                        onError={(e) => {
                          // Fallback if image fails to load
                          const target = e.target;
                          target.src = "/coachsparkle/assets/images/articles-one.png";
                        }}
                      />
                      <span>{article.blog_name}</span>
                    </div>
                  </td>
                  <td className="voluptatem-text">
                    {truncateText(article.blog_content)}
                  </td>
                  <td>
                    <span className={getStatusBadgeClass(article.is_active)}>
                      {getStatusText(article.is_active)}
                    </span>
                  </td>
                  <td className="actions delete-and-edit-articles">
                    <DriveFileRenameOutlineOutlinedIcon
                      className="mui-edit-icons"
                      style={{ cursor: 'pointer' }}
                    // Add onClick handler for edit
                    />
                    <DeleteOutlineOutlinedIcon
                      className="mui-delet-add-icon"
                      style={{ cursor: 'pointer' }}
                    // Add onClick handler for delete
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}