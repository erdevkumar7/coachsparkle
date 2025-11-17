"use client";
import { useCallback, useState } from 'react';
import { toast } from "react-toastify";
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EastIcon from '@mui/icons-material/East';
import CloseIcon from '@mui/icons-material/Close';
import { getCoachArticles } from '@/app/api/coach';
import Pagination from '@/components/Pagination';

export default function MyArticles({ articlesInitialData, token }) {
  const [articles, setArticles] = useState(articlesInitialData.data || []);
  const [currentPage, setCurrentPage] = useState(articlesInitialData.pagination.current_page);
  const [lastPage, setLastPage] = useState(articlesInitialData.pagination.last_page);
  const [deletingId, setDeletingId] = useState(null);

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    blog_name: '',
    blog_content: '',
    blog_image: null,
    is_active: 1
  });

  const fetchPageData = async (page) => {
    const res = await getCoachArticles(page, token);
    if (res?.data) {
      setArticles(res.data.data);
      setCurrentPage(res.data.pagination.current_page);
      setLastPage(res.data.pagination.last_page);
    }
  };

  // Open Create Modal
  const openCreateModal = () => {
    setFormData({
      blog_name: '',
      blog_content: '',
      blog_image: null,
      is_active: 1
    });
    setIsCreateModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (article) => {
    setSelectedArticle(article);
    setFormData({
      blog_name: article.blog_name,
      blog_content: article.blog_content,
      blog_image: article.blog_image,
      is_active: article.is_active
    });
    setIsEditModalOpen(true);
  };

  // Close Modals
  const closeModals = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedArticle(null);
    setFormData({
      blog_name: '',
      blog_content: '',
      blog_image: null,
      is_active: 1
    });
  };

  // Handle form input changes
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        blog_image: file
      }));
    }
  };

  // Create Article
  const handleCreateArticle = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();
      submitData.append('blog_name', formData.blog_name);
      submitData.append('blog_content', formData.blog_content);
      submitData.append('is_active', formData.is_active.toString());
      
      if (formData.blog_image) {
        submitData.append('blog_image', formData.blog_image);
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/addcoachBlog`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: submitData,
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Article created successfully!');
        closeModals();
        fetchPageData(currentPage);
      } else {
        toast.error(`Failed to create article: ${result.message}`);
      }
    } catch (error) {
      console.error('Error creating article:', error);
      alert('Error creating article. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Update Article
  const handleUpdateArticle = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();
      submitData.append('id', selectedArticle.id);
      submitData.append('blog_name', formData.blog_name);
      submitData.append('blog_content', formData.blog_content);
      submitData.append('is_active', formData.is_active.toString());
      
      if (formData.blog_image instanceof File) {
        submitData.append('blog_image', formData.blog_image);
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/updatecoachBlog`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: submitData,
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Article updated successfully!');
        closeModals();
        fetchPageData(currentPage);
      } else {
        toast.error(`Failed to update article: ${result.message}`);
      }
    } catch (error) {
      console.error('Error updating article:', error);
      alert('Error updating article. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to truncate text for description
  const truncateText = (text, maxLength = 100) => {
    if (!text) return 'No description available';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Common function to get status information
  const getStatusInfo = (isActive) => {
    return {
      badgeClass: isActive === 1 ? 'badge published' : 'badge pending',
      text: isActive === 1 ? 'Published' : 'Pending'
    };
  };

  // Function to handle article deletion
  const handleDeleteArticle = async (articleId) => {
    if (!window.confirm('Are you sure you want to delete this article?')) {
      return;
    }

    setDeletingId(articleId);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/deletecoachBlog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: articleId
        }),
      });

      const result = await response.json();

      if (result.success) {
        setArticles(prevArticles => prevArticles.filter(article => article.id !== articleId));
        if (articles.length === 1 && currentPage > 1) {
          fetchPageData(currentPage - 1);
        } else {
          fetchPageData(currentPage);
        }
        alert('Article deleted successfully!');
      } else {
        alert(`Failed to delete article: ${result.message}`);
      }
    } catch (error) {
      console.error('Error deleting article:', error);
      alert('Error deleting article. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <h3 className="text-lg font-semibold quick-text">My Articles</h3>
      <div className='articles-tables'>
        {articles.length === 0 ? (
          <div className="no-articles">
            <p>No articles found. Create your first article to get started!</p>
            <div className="footer-btn mt-4">
              <button className="manage_add_btn-show" onClick={openCreateModal}>
                Create Article <EastIcon className="mui-icons" />
              </button>
            </div>
          </div>
        ) : (
          <>
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
                {articles.map((article) => {
                  const status = getStatusInfo(article.is_active);
                  
                  return (
                    <tr key={article.id} className="info-add">
                      <td>
                        <div className="article-info">
                          <img
                            src={article.blog_image || "/coachsparkle/assets/images/articles-one.png"}
                            alt={article.blog_name}
                            onError={(e) => {
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
                        <span className={status.badgeClass}>
                          {status.text}
                        </span>
                      </td>
                      <td className="actions delete-and-edit-articles">
                        <DriveFileRenameOutlineOutlinedIcon
                          className="mui-edit-icons"
                          style={{ cursor: 'pointer' }}
                          onClick={() => openEditModal(article)}
                        />
                        <DeleteOutlineOutlinedIcon
                          className="mui-delet-add-icon"
                          style={{ 
                            cursor: deletingId === article.id ? 'not-allowed' : 'pointer',
                            opacity: deletingId === article.id ? 0.6 : 1
                          }}
                          onClick={() => !deletingId && handleDeleteArticle(article.id)}
                          disabled={deletingId === article.id}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="footer-btn mt-4 create-article-sec">
              <Pagination
                currentPage={currentPage}
                lastPage={lastPage}
                onPageChange={fetchPageData}
              />

              <button className="manage_add_btn-show" onClick={openCreateModal}>
                Create Article <EastIcon className="mui-icons" />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Create Article Modal - Inline like CompletedCoaching */}
      <div className={`article-modal-backdrop ${isCreateModalOpen ? "visible" : "hidden"}`} onClick={closeModals}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Create New Article</h3>
            <button className="modal-close" onClick={closeModals}>
              <CloseIcon />
            </button>
          </div>
          
          <form onSubmit={handleCreateArticle}>
            <div className="form-group">
              <label>Article Name</label>
              <input
                type="text"
                name="blog_name"
                value={formData.blog_name}
                onChange={handleInputChange}
                required
                placeholder="Enter article name"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="blog_content"
                value={formData.blog_content}
                onChange={handleInputChange}
                required
                rows="6"
                placeholder="Enter article description"
              />
            </div>

            <div className="form-group">
              <label>Article Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              {formData.blog_image && !(formData.blog_image instanceof File) && (
                <div className="current-image">
                  <p>Current Image:</p>
                  <img 
                    src={formData.blog_image} 
                    alt="Current" 
                    style={{ maxWidth: '200px', marginTop: '10px' }}
                  />
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                name="is_active"
                value={formData.is_active}
                onChange={handleInputChange}
              >
                <option value={1}>Published</option>
                <option value={0}>Pending</option>
              </select>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn-cancel" onClick={closeModals}>
                Cancel
              </button>
              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? 'Processing...' : 'Create Article'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Edit Article Modal - Inline like CompletedCoaching */}
      <div className={`article-modal-backdrop ${isEditModalOpen ? "visible" : "hidden"}`} onClick={closeModals}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Edit Article</h3>
            <button className="modal-close" onClick={closeModals}>
              <CloseIcon />
            </button>
          </div>
          
          <form onSubmit={handleUpdateArticle}>
            <div className="form-group">
              <label>Article Name</label>
              <input
                type="text"
                name="blog_name"
                value={formData.blog_name}
                onChange={handleInputChange}
                required
                placeholder="Enter article name"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="blog_content"
                value={formData.blog_content}
                onChange={handleInputChange}
                required
                rows="6"
                placeholder="Enter article description"
              />
            </div>

            <div className="form-group">
              <label>Article Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              {formData.blog_image && !(formData.blog_image instanceof File) && (
                <div className="current-image">
                  <p>Current Image:</p>
                  <img 
                    src={formData.blog_image} 
                    alt="Current" 
                    style={{ maxWidth: '200px', marginTop: '10px' }}
                  />
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                name="is_active"
                value={formData.is_active}
                onChange={handleInputChange}
              >
                <option value={1}>Published</option>
                <option value={0}>Pending</option>
              </select>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn-cancel" onClick={closeModals}>
                Cancel
              </button>
              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? 'Processing...' : 'Update Article'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}