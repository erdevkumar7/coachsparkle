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

    React.useEffect(() => {
        getUserReviews();
    }, []);

    const getUserReviews = async () => {
        if (!coach?.user_id) return;
        setLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coachReviewsFrontend`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ coach_id: coach.user_id }),
            })

            const resData = await res.json();
            if (resData.status) {
                setReviews(resData.data || []);
            } else {
                // If API returns status false, treat it as no reviews
                setReviews([]);
            }
        } catch (err) {
            console.error('Error fetching reviews:', err);
            // On error, just set empty reviews instead of showing error
            setReviews([]);
        } finally {
            setLoading(false);
        }
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


    // console.log('reviews', reviews)

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
                                {/* {coach?.short_bio
                                    ? coach.short_bio.length > 100
                                        ? coach.short_bio.slice(0, 100) + "..."
                                        : coach.short_bio
                                    : "Confidence & Communication Coach | Empowering Professionals to Speak with Impact"} */}

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
                            {reviews.map((review, index) =>
                                <div className="review-section" key={index}>
                                    <div className="review-card">
                                        <div className="review-adding">
                                            <img src={review?.user?.profile_image || `${FRONTEND_BASE_URL}/images/default_profile.jpg`} alt="Coach Image" />
                                            <div className="review-header">
                                                <div className="rating-star-adding">

                                                    {/* <img src="./imges/star-add-icons.png"> */}
                                                    <p>
                                                        <strong className="profile-name">{review?.user?.first_name} {review?.user?.last_name}</strong><br />
                                                        <small className="month-date-add">{formatDate(review?.created_at)}</small>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="review-content">
                                            {/* <strong>Good Tour, Really Well Organised</strong> */}
                                            <p className="review-text">
                                                {/* {review?.review_text} */}
                                                {expandedIndex === index
                                                    ? review?.review_text
                                                    : `${review?.review_text.slice(0, 260)}`}
                                                {review?.review_text.length > 260 && (
                                                    <span className="less-more-conent" onClick={() => handleToggle(index)} >
                                                        {expandedIndex === index ? "..Read Less" : " ..Read More"}
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>)}
                        </>) :
                        (<div className="review-section">
                            <div className="review-card">
                                <p>No Reviews Available</p>
                            </div>
                        </div>)}
                </TabPanel>
            </TabContext>
        </Box>
    );
}
