'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function LabTabs({ coach }) {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
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
                    <h5 className="what-user-text">What User's Say</h5>
                    <div className="review-section">
                        <div className="review-card">
                            <div className="review-adding">
                                <img src={`/coachsparkle/images/user-review-profile.png`} alt="Coach Image" />
                                <div className="review-header">
                                    <div className="rating-star-adding">

                                        {/* <img src="./imges/star-add-icons.png"> */}
                                        <p>
                                            <strong className="profile-name">Selena McCoy</strong><br />
                                            <small className="month-date-add">15 October 2024</small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="review-content">
                                <strong>Good Tour, Really Well Organised</strong>
                                <p className="review-text">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu.
                                </p>
                            </div>
                        </div>

                        <div className="review-card">
                            <div className="review-adding">
                                <img src={`/coachsparkle/images/user-review-profile.png`} alt="Coach Image" />
                                <div className="review-header">
                                    <div className="rating-star-adding">
                                        <p>
                                            <strong className="profile-name">Selena McCoy</strong><br />
                                            <small className="month-date-add">15 October 2024</small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="review-content">
                                <strong>Good Tour, Really Well Organised</strong>
                                <p className="review-text">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu.
                                </p>
                            </div>
                        </div>

                        <div className="review-card">
                            <div className="review-adding">
                                <img src={`/coachsparkle/images/user-review-profile.png`} alt="Coach Image" />
                                <div className="review-header">
                                    <div className="rating-star-adding">

                                        {/* <img src="./imges/star-add-icons.png"> */}
                                        <p>
                                            <strong className="profile-name">Selena McCoy</strong><br />
                                            <small className="month-date-add">15 October 2024</small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="review-content">
                                <strong>Good Tour, Really Well Organised</strong>
                                <p className="review-text">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu.
                                </p>
                            </div>
                        </div>
                    </div>
                </TabPanel>
            </TabContext>
        </Box>
    );
}
