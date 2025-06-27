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
                                        <label htmlFor='session_count'> Delivey Data</label>
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
                                        <label htmlFor='session_count'> Session Count</label>
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