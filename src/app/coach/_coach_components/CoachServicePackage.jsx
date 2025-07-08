'use client';
import { useEffect, useState } from "react";
import { getAgeGroup, getAllCoachingCategory, getAllPriceModels, getDeliveryMode, sessionFormats } from "@/app/api/guest";
import Cookies from "js-cookie";
import BookingWindowPicker from "./BookingWindow";
import CoachAvailability from "./CoachAvailability";

export default function CoachServicePackageForm() {
    const [mediaFile, setMediaFile] = useState(null);
    const [categories, setCategories] = useState([]);
    const [ageGroups, setAgeGroups] = useState([]);
    const [deliveryModes, setDeliveryModes] = useState([]);
    const [getFormats, setSessionFormats] = useState([]);
    const [getPriceModels, setPriceModels] = useState([]);

    const [formData, setFormData] = useState({
        title: '',
        short_description: "",
        coaching_category: "",
        description: "",
        focus: "",
        target_audience: "",
        delivery_mode: "",
        session_count: "",
        session_duration: "",
        session_formate: "",
        price: "",
        currency: "USD",
        price_model: "",
        slot_availability: "",
        booking_slot: "",
        booking_window: "",
        session_validity: "",
        cancellation_policy: "",
        rescheduling_policy: "",
        booking_availability: ""
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const resCat = await getAllCoachingCategory();
            if (resCat) {
                setCategories(resCat);
            }
        } catch (error) {
            console.error("Failed to fetch categories", error);
        }

        try {
            const resAge = await getAgeGroup();
            if (resAge) {
                setAgeGroups(resAge);
            }
        } catch (error) {
            console.error("Failed to fetch categories", error);
        }

        try {
            const delRes = await getDeliveryMode();
            if (delRes) {
                setDeliveryModes(delRes);
            }
        } catch (error) {
            console.error("Failed to fetch categories", error);
        }

        try {
            const formateRes = await sessionFormats();
            if (formateRes) {
                setSessionFormats(formateRes);
            }
        } catch (error) {
            console.error("Failed to fetch categories", error);
        }

        try {
            const priceRes = await getAllPriceModels();
            if (priceRes?.data) setPriceModels(priceRes.data);
        } catch (error) {
            console.error("Failed to fetch categories", error);
        }
    };


    const handleChange = async (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = Cookies.get("token");
            const form = new FormData();

            Object.entries(formData).forEach(([key, value]) => {
                form.append(key, value);
            });

            // Append media file if selected
            if (mediaFile) {
                form.append("media_file", mediaFile);
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/adduserservicepackage`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
                body: form,
            });

            const result = await response.json();

            if (result.status) {
                alert("✅ " + result.message);
            } else {
                alert("❌ " + result.message || "Something went wrong.");
            }
        } catch (err) {
            console.error("Error submitting package:", err);
            alert("❌ Network or server error.");
        }
    };

    return (
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
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="short_description">Short Desriptions</label>
                            <input
                                required
                                type="text"
                                id="short_description"
                                name="short_description"
                                value={formData.short_description}
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
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.category_name}
                                    </option>
                                ))}
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
                            <input
                                required
                                type="text"
                                id="focus"
                                name="focus"
                                value={formData.focus}
                                onChange={handleChange}
                                placeholder="e.g., Confidence, Goal Clarity, Custom Action Plane"
                            />
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
                                {ageGroups.map((group) => (
                                    <option key={group.id} value={group.id}>
                                        {group.group_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="delivery_mode">Delivery Mode</label>
                            <select
                                required
                                id="delivery_mode"
                                name="delivery_mode"
                                value={formData.delivery_mode}
                                onChange={handleChange}

                            >
                                <option value="">Select </option>
                                {deliveryModes.map((mode) => (
                                    <option key={mode.id} value={mode.id}>
                                        {mode.mode_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='coach-session-count gap-4'>
                            <div className='form-group col-md-4'>
                                <label htmlFor='session_count'> Number Of Session</label>
                                <input
                                    required
                                    type="number"
                                    max={200}
                                    min={0}
                                    id="session_count"
                                    name="session_count"
                                    value={formData.session_count}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='form-group col-md-4'>
                                <label htmlFor='session_duration'> Session Duration (Minute/Session)</label>
                                <input
                                    required
                                    type="text"
                                    id="session_duration"
                                    name="session_duration"
                                    value={formData.session_duration}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='form-group col-md-4'>
                                <label htmlFor='session_formate'> Session Formate</label>
                                <select
                                    required
                                    id='session_formate'
                                    name='session_formate'
                                    value={formData.session_formate}
                                    onChange={handleChange}
                                >
                                    <option value="">Select </option>
                                    {getFormats.map((fmt) => (
                                        <option key={fmt.id} value={fmt.id}>
                                            {fmt.name}
                                        </option>
                                    ))}
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
                                    value={formData.price}
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
                                    <option value="USD">USD </option>
                                </select>
                            </div>

                            <div className='form-group col-md-4'>
                                <label htmlFor='price_model'> Pricing Model</label>
                                <select
                                    id='price_model'
                                    name='price_model'
                                    value={formData.price_model}
                                    onChange={handleChange}
                                >
                                    <option value="">Select </option>
                                    {getPriceModels.map((mdl) => (
                                        <option key={mdl.id} value={mdl.id}>
                                            {mdl.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="coach-slot-and-availability gap-4">
                            <div className='form-group col-md-4'>
                                <label htmlFor='slot_availability'> Slots Available for Booking</label>
                                <input
                                    required
                                    max={2000}
                                    min={0}
                                    type="number"
                                    id="slot_availability"
                                    name="slot_availability"
                                    value={formData.slot_availability}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* <div className='form-group col-md-4'>
                                <label htmlFor='booking_slot'>Availablity</label>                              
                            </div> */}
                            <CoachAvailability formData={formData} setFormData={setFormData} />

                            {/* <div className='form-group col-md-4'>
                                <label htmlFor='booking_window'>Booking Window</label>                               
                            </div> */}

                            <BookingWindowPicker formData={formData} setFormData={setFormData} />
                        </div>


                        <div className="validity-cancel-resedule gap-4">
                            <div className='form-group col-md-4'>
                                <label htmlFor="session_validity">Validity</label>
                                <input
                                    required
                                    type="text"
                                    id="session_validity"
                                    name="session_validity"
                                    value={formData.session_validity}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='form-group col-md-4'>
                                <label htmlFor="cancellation_policy">Cancellation Policy</label>
                                <input
                                    type="text"
                                    id="cancellation_policy"
                                    name="cancellation_policy"
                                    value={formData.cancellation_policy}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='form-group col-md-4'>
                                <label htmlFor="rescheduling_policy">Rescheduling Policy</label>
                                <input
                                    type="text"
                                    id="rescheduling_policy"
                                    name="rescheduling_policy"
                                    value={formData.rescheduling_policy}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="media_file"> Media Upload</label>
                            <input
                                type="file"
                                id="media_file"
                                name="media_file"
                                accept="image/*"
                                onChange={(e) => setMediaFile(e.target.files[0])}
                            />
                        </div>

                        <div className="save-btn">
                            <button type="submit" className="save-btn-add">Save Changes <i className="bi bi-arrow-right"></i></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}