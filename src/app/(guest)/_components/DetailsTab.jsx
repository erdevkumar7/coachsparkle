'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function LabTabs() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="About" value="1" />
                        <Tab label="Experiences and Key Achievements" value="2" />
                        <Tab label="Credentials" value="3" />
                        <Tab label="Reviews" value="4" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <div className='tab-cont'>
                        <p><strong>Confidence & Communication Coach | Empowering Professionals to Speak with Impact</strong></p>

                        <p>With over 8 years of coaching experience, Sarah Lee is a certified Confidence & Communication Coach who specializes in helping individuals unlock their voice, overcome self-doubt, and present themselves with clarity and conviction — both professionally and personally.</p>

                        <p>Sarah began her career in corporate communications and public relations, where she led global brand campaigns and media training for executives. Over time, she saw a growing need for personalized coaching in confidence-building, particularly for those navigating career pivots, leadership roles, or high-stakes presentations. This led her to pursue formal coaching certifications in NLP (Neuro-Linguistic Programming) and ICF-accredited coaching, combining proven frameworks with empathetic guidance.</p>

                        <p>Today, Sarah works with a wide range of clients — from young professionals and entrepreneurs to mid-career leaders and international students — helping them speak up, show up, and succeed. Her coaching style is warm, actionable, and insight-driven, blending mindset work with practical tools like speech structure, body language, and audience connection.
                        She is passionate about helping introverts thrive in extroverted spaces, preparing clients for public speaking engagements, and building communication confidence in English for non-native speakers.</p>
                    </div>
                </TabPanel>
                <TabPanel value="2">
                    <div className='tab-cont'>
                        <p>With over 8 years of experience in personal development coaching, I specialize in helping individuals break through self-doubt, build lasting confidence, and take bold action toward their personal and professional goals.</p>

                        <p>My coaching journey began in the corporate learning space, where I designed growth programs for mid-level professionals. Today, I work with clients ranging from early-career professionals to women navigating career transitions or life pivots.<br />
I’m certified in Transformational Coaching and trained in mindfulness-based approaches. My sessions blend deep listening, practical strategies, and mindset reframing to help you create meaningful, lasting change.</p>

                        <p>Whether you’re preparing for a big presentation, seeking clarity in your career, or simply want to feel more confident in your daily life — I’m here to support you every step of the way.<br />
Let’s unlock your potential — one powerful conversation at a time.</p>
                    </div>
                </TabPanel>
                <TabPanel value="3">
                    <div className='certifi'>
                        <a href="#"><img src={`/coachsparkle/images/certi1.jpg`} alt="" /></a>
                        <a href="#"><img src={`/coachsparkle/images/certi2.png`} alt="" /></a>
                        <a href="#"><img src={`/coachsparkle/images/certi3.webp`} alt="" /></a>
                        <a href="#"><img src={`/coachsparkle/images/certi4.webp`} alt="" /></a>
                        <a href="#"><img src={`/coachsparkle/images/certi5.jpeg`} alt="" /></a>
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
