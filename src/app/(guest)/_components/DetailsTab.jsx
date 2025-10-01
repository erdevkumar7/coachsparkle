'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { FRONTEND_BASE_URL } from '@/utiles/config';

export default function LabTabs({ coach }) {
    const [value, setValue] = React.useState('1');
    const [reviews, setReviews] = React.useState([]);
    const [expandedIndex, setExpandedIndex] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [loadingMore, setLoadingMore] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [hasMore, setHasMore] = React.useState(true);

    React.useEffect(() => {
        getUserReviews(1); // Load first page on initial render
    }, [coach?.user_id]);

    const getUserReviews = async (page = 1, loadMore = false) => {
        if (!coach?.user_id) return;
        
        if (loadMore) {
            setLoadingMore(true);
        } else {
            setLoading(true);
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coachReviewsFrontend`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    coach_id: coach.user_id,
                    page: page 
                }),
            })

            const resData = await res.json();
            if (resData.status) {
                if (loadMore) {
                    // Append new reviews to existing ones
                    setReviews(prevReviews => [...prevReviews, ...resData.data]);
                } else {
                    // Replace reviews for first load
                    setReviews(resData.data || []);
                }
                
                // Update pagination info
                setCurrentPage(page);
                setHasMore(page < resData.pagination.last_page);
            } else {
                if (!loadMore) {
                    setReviews([]);
                }
                setHasMore(false);
            }
        } catch (err) {
            console.error('Error fetching reviews:', err);
            if (!loadMore) {
                setReviews([]);
            }
            setHasMore(false);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }

    const handleLoadMore = () => {
        const nextPage = currentPage + 1;
        getUserReviews(nextPage, true);
    }

    const handleToggle = (index) => {
        setExpandedIndex((prev) => (prev === index ? null : index));
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (error) {
            return dateString;
        }
    };

    // Safe text truncation function
    const truncateText = (text, maxLength) => {
        if (!text || text.length <= maxLength) return text;
        return text.slice(0, maxLength);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                        variant="scrollable"
                        scrollButtons="auto"
                        allowScrollButtonsMobile
                        sx={{
                            '& .MuiTab-root': {
                                fontSize: { xs: '12px', sm: '14px' },
                                minWidth: { xs: '100px', sm: 'auto' },
                                padding: { xs: '6px', sm: '12px' },
                            },
                        }}
                    >
                        <Tab label="About" value="1" />
                        <Tab label="Experiences and Key Achievements" value="2" />
                        <Tab label="Credentials" value="3" />
                        <Tab label="Reviews" value="4" />
                    </TabList>
                </Box>
                
                <TabPanel value="1">
                    <div className='tab-cont'>
                        <p>
                            <strong>
                                {coach?.coach_subtype?.length > 0 &&
                                    coach.coach_subtype.map((subtype, index) => (
                                        <span key={index}>
                                            {subtype.subtype_name}{" | "}
                                        </span>
                                    ))}
                            </strong>
                        </p>
                        <p>{coach?.detailed_bio?.trim() ? coach.detailed_bio : 'Not available'}</p>
                    </div>
                </TabPanel>
                
                <TabPanel value="2">
                    <div className='tab-cont'>
                        <p>{coach?.exp_and_achievement?.trim() ? coach.exp_and_achievement : 'Not available'}</p>
                    </div>
                </TabPanel>
                
                <TabPanel value="3">
                    <div className="certifi">
                        {coach?.user_documents?.length > 0 ? (
                            coach.user_documents.map((doc) => (
                                <a
                                    key={doc.id}
                                    href={doc.document_file}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img src={doc.document_file} alt={doc.original_name} />
                                </a>
                            ))
                        ) : (
                            <p>Not available</p>
                        )}
                    </div>
                </TabPanel>

                <TabPanel value="4">
                    {loading ? (
                        <div className="review-section">
                            <div className="review-card">
                                <p>Loading reviews...</p>
                            </div>
                        </div>
                    ) : reviews.length > 0 ? (
                        <>
                            <h5 className="what-user-text">What User's Say</h5>
                            {reviews.map((review, index) => {
                                const reviewText = review?.review_text || '';
                                const shouldTruncate = reviewText.length > 260;
                                const displayText = expandedIndex === index 
                                    ? reviewText 
                                    : truncateText(reviewText, 260);

                                return (
                                    <div className="review-section" key={`${review.id}-${index}`}>
                                        <div className="review-card">
                                            <div className="review-adding">
                                                <img 
                                                    src={review?.user?.profile_image || `${FRONTEND_BASE_URL}/images/default_profile.jpg`} 
                                                    alt="User Profile" 
                                                    onError={(e) => {
                                                        e.target.src = `${FRONTEND_BASE_URL}/images/default_profile.jpg`;
                                                    }}
                                                />
                                                <div className="review-header">
                                                    <div className="rating-star-adding">
                                                        <p>
                                                            <strong className="profile-name">
                                                                {review?.user?.first_name} {review?.user?.last_name}
                                                            </strong>
                                                            <br />
                                                            <small className="month-date-add">
                                                                {formatDate(review?.created_at)}
                                                            </small>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="review-content">
                                                <p className="review-text">
                                                    {displayText}
                                                    {shouldTruncate && (
                                                        <span 
                                                            className="less-more-conent" 
                                                            onClick={() => handleToggle(index)}
                                                            style={{ 
                                                                color: '#007bff', 
                                                                cursor: 'pointer',
                                                                marginLeft: '4px'
                                                            }}
                                                        >
                                                            {expandedIndex === index ? "..Read Less" : " ..Read More"}
                                                        </span>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            
                            {/* Load More Button */}
                            {hasMore && (
                                <div className='details-add-reviews'>
                                    <button 
                                        className='detail-review'
                                        onClick={handleLoadMore}
                                        disabled={loadingMore}
                                        onMouseOver={(e) => {
                                            if (!loadingMore) {
                                                e.target.style.backgroundColor = '#009bfa';
                                            }
                                        }}
                                        onMouseOut={(e) => {
                                            if (!loadingMore) {
                                                e.target.style.backgroundColor = '#009bfa';
                                            }
                                        }}
                                    >
                                        {loadingMore ? 'Loading...' : 'Load More Reviews'}
                                    </button>
                                </div>
                            )}

                            {/* Show message when all reviews are loaded */}
                            {!hasMore && reviews.length > 3 && (
                                <div style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
                                    <p>All reviews loaded</p>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="review-section">
                            <div className="review-card">
                                <p>No Reviews Available</p>
                            </div>
                        </div>
                    )}
                </TabPanel>
            </TabContext>
        </Box>
    );
}