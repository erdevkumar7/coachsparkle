'use client';
import { useState } from 'react';
import '../_styles/coach_packages.css';

export default function CoachServicePackages() {
    const [formData, setFormData] = useState({
        title: '',
    });

    const handleChange = async (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('formData', formData)
    }

    return (
        <div className="main-panel">
            <div className="content-wrapper">

                <div className="session-wrapper">
                    <div className="session-card">
                        <img src={`/coachsparkle/images/package1.png`} alt="Team Image" className="top-image" />
                        <div className="session-content">
                            <h2>Confidence Jumpstart Session</h2>
                            <div className="icons-row">
                                📍 Online &nbsp; | &nbsp;
                                👤 1-on-1 coaching &nbsp; | &nbsp;
                                📅 Jun - Aug 2025
                            </div>
                            <div className="icons-row">
                                🗓️ 4 Sessions &nbsp; | &nbsp;
                                ⏱️ 60 Min/Session
                            </div>
                            <div className="icons-row">
                                🧠 Confidence, Goal Clarity, Custom Action Plan
                            </div>
                            <p className="session-description">
                                A one-time deep-dive session to assess your confidence blocks, set clear goals, and walk away with a custom action plan.
                            </p>
                            <div className="price">$290 / Package</div>
                            <a href="#" className="book-btn">View Details</a>
                        </div>
                    </div>

                    <div className="session-card">
                        <img src={`/coachsparkle/images/package2.png`} alt="Team Image" className="top-image" />
                        <div className="session-content">
                            <h2>Breakthrough Package</h2>
                            <div className="icons-row">
                                📍 Online &nbsp; | &nbsp;
                                👤 1-on-1 coaching &nbsp; | &nbsp;
                                📅 Jun - Aug 2025
                            </div>
                            <div className="icons-row">
                                🗓️ 4 Sessions &nbsp; | &nbsp;
                                ⏱️ 60 Min/Session
                            </div>
                            <div className="icons-row">
                                🧠 Confidence, Goal Clarity, Custom Action Plan
                            </div>
                            <p className="session-description">
                                Designed for short-term goal clarity and mindset shifts. Ideal if you’re preparing for a presentation, job interview, or important life transition.
                            </p>
                            <div className="price">$250 / Package</div>
                            <a href="#" className="book-btn">View Details</a>
                        </div>
                    </div>

                    <div className="session-card">
                        <img src={`/coachsparkle/images/package2.png`} alt="Team Image" className="top-image" />
                        <div className="session-content">
                            <h2>Breakthrough Package</h2>
                            <div className="icons-row">
                                📍 Online &nbsp; | &nbsp;
                                👤 1-on-1 coaching &nbsp; | &nbsp;
                                📅 Jun - Aug 2025
                            </div>
                            <div className="icons-row">
                                🗓️ 4 Sessions &nbsp; | &nbsp;
                                ⏱️ 60 Min/Session
                            </div>
                            <div className="icons-row">
                                🧠 Confidence, Goal Clarity, Custom Action Plan
                            </div>
                            <p className="session-description">
                                Designed for short-term goal clarity and mindset shifts. Ideal if you’re preparing for a presentation, job interview, or important life transition.
                            </p>
                            <div className="price">$250 / Package</div>
                            <a href="#" className="book-btn">View Details</a>
                        </div>
                    </div>
                </div>

                <div className="profile-form-add">
                    <div className="card">
                        <div className="profile-form">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="title">Service Title</label>
                                    <input
                                        required
                                        type="text"
                                        id="title"
                                        name="title"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="short_description">Short Desriptions</label>
                                    <input
                                        type="text"
                                        id="short_description"
                                        name="short_description"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="coaching_category">Coaching Category</label>
                                    <select
                                        id="coaching_category"
                                        name="coaching_category"
                                        value={formData.coaching_category}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select </option>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description">Detail Desriptions</label>
                                    <textarea
                                        id="description" name="description" rows="3"
                                        onChange={handleChange}
                                        value={formData.description}>
                                    </textarea>
                                </div>

                                <div className='form-group'>
                                    <label htmlFor='focus'> Service Focus</label>
                                    <select
                                        id='focus'
                                        name='focus'
                                        value={formData.focus}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select </option>
                                        <option value={1}>1</option>
                                    </select>
                                </div>

                                <div className='form-group'>
                                    <label htmlFor='target_audience'> Targeted Audience</label>
                                    <select
                                        id='target_audience'
                                        name='target_audience'
                                        value={formData.target_audience}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select </option>
                                        <option value={1}>1</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="delivery_mode">Delivery Mode</label>
                                    <select
                                        id="delivery_mode"
                                        name="delivery_mode"
                                        value={formData.delivery_mode}
                                        onChange={handleChange}

                                    >
                                        <option value="">Select </option>
                                        {/* {deliveryMode.map((mode) => (
                                            <option key={mode.id} value={mode.id}>
                                                {mode.mode_name}
                                            </option>
                                        ))} */}
                                    </select>
                                </div>

                                <div className='coach-session-count gap-4'>
                                    <div className='form-group col-md-4'>
                                        <label htmlFor='session_count'> Number Of Session</label>
                                        <select
                                            id='session_count'
                                            name='session_count'
                                            value={formData.session_count}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select </option>
                                            <option value={1}>1</option>
                                        </select>
                                    </div>

                                    <div className='form-group col-md-4'>
                                        <label htmlFor='session_duration'> Duration Per Session</label>
                                        <select
                                            id='session_duration'
                                            name='session_duration'
                                            value={formData.session_duration}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select </option>
                                            <option value={1}>1</option>
                                        </select>
                                    </div>

                                    <div className='form-group col-md-4'>
                                        <label htmlFor='session_formate'> Session Formate</label>
                                        <select
                                            id='session_formate'
                                            name='session_formate'
                                            value={formData.session_formate}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select </option>
                                            <option value={1}>1</option>
                                        </select>
                                    </div>
                                </div>

                                <div className='coach-price-currency gap-4'>
                                    <div className='form-group col-md-4'>
                                        <label htmlFor="price">Total Price</label>
                                        <input
                                            required
                                            type="text"
                                            id="price"
                                            name="price"
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className='form-group col-md-4'>
                                        <label htmlFor='currency'> Currency</label>
                                        <select
                                            id='currency'
                                            name='currency'
                                            value={formData.currency}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select </option>
                                            <option value={1}>1</option>
                                        </select>
                                    </div>

                                    <div className='form-group col-md-4'>
                                        <label htmlFor='pricing_model'> Pricing Model</label>
                                        <select
                                            id='pricing_model'
                                            name='pricing_model'
                                            value={formData.pricing_model}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select </option>
                                            <option value={1}>1</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="coach-slot-and-availability gap-4">
                                    <div className='form-group col-md-4'>
                                        <label htmlFor='slot_availability'> Slots Available for Booking</label>
                                        <select
                                            id='slot_availability'
                                            name='slot_availability'
                                            value={formData.slot_availability}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select </option>
                                            <option value={1}>1</option>
                                        </select>
                                    </div>

                                    <div className='form-group col-md-4'>
                                        <label htmlFor='booking_slot'>Availablity</label>
                                        <select
                                            id='booking_slot'
                                            name='booking_slot'
                                            value={formData.booking_slot}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select </option>
                                            <option value={1}>1</option>
                                        </select>
                                    </div>

                                    <div className='form-group col-md-4'>
                                        <label htmlFor='booking_window'>Booking Window</label>
                                        <select
                                            id='booking_window'
                                            name='booking_window'
                                            value={formData.booking_window}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select </option>
                                            <option value={1}>1</option>
                                        </select>
                                    </div>
                                </div>


                                <div className="validity-cancel-resedule gap-4">
                                    <div className='form-group col-md-4'>
                                        <label htmlFor="session_validity">Validity</label>
                                        <input
                                            required
                                            type="text"
                                            id="session_validity"
                                            name="session_validity"
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className='form-group col-md-4'>
                                        <label htmlFor="cancellation_policy">Cancellation Policy</label>
                                        <input
                                            required
                                            type="text"
                                            id="cancellation_policy"
                                            name="cancellation_policy"
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className='form-group col-md-4'>
                                        <label htmlFor="rescheduling_policy">Rescheduling Policy</label>
                                        <input
                                            required
                                            type="text"
                                            id="rescheduling_policy"
                                            name="rescheduling_policy"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="save-btn">
                                    <button type="submit" className="save-btn-add">Save Changes <i className="bi bi-arrow-right"></i></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}