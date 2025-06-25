"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { getCitiesOfaState, getStatesOfaCountry, getSubCoachType } from "@/app/api/guest";

export default function CoachUpdateForm({ user, countries, allLanguages, coachTypes, deliveryMode, ageGroup }) {
    const router = useRouter();
    const [getToken, setToken] = useState();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [coachSubTypes, setSubCoachTypes] = useState([]);

    const [formData, setFormData] = useState({
        user_type: user?.user_type || 3,
        first_name: user?.first_name || '',
        gender: user?.gender || '',
        last_name: user?.last_name || '',
        email: user?.email || '',
        country_id: user?.country_id || '',
        state_id: user?.state_id || '',
        city_id: user?.city_id || '',
        coach_type: user?.coach_type || '',
        coach_subtype: user?.coach_subtype || '',
        professional_title: user?.professional_title || '',
        company_name: user?.company_name || '',
        experience: user?.experience || '',
        delivery_mode: user?.delivery_mode || '',
        price: user?.price || '',
        age_group: user?.age_group || '',
        language_names: user?.language_names?.map(lang => lang.id) || [],
    });

    // console.log('coachSubTypes', coachSubTypes)
    useEffect(() => {
        const loadDefaults = async () => {
            if (formData.country_id) {
                const stateRes = await getStatesOfaCountry(formData.country_id);
                setStates(stateRes || []);
            }
            if (formData.state_id) {
                const cityRes = await getCitiesOfaState(formData.state_id);
                setCities(cityRes || []);
            }
            if (formData.coach_type) {
                const coachSubtypeRes = await getSubCoachType(formData.coach_type)
                setSubCoachTypes(coachSubtypeRes || []);
            }
        };
        loadDefaults();
    }, [formData.country_id, formData.state_id]);



    const handleChange = async (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "country_id") {
            setFormData((prev) => ({
                ...prev,
                state_id: "",
                city_id: "",
            }));

            const stateRes = await getStatesOfaCountry(value);
            setStates(stateRes || []);
            setCities([]); // reset cities
        }

        if (name === "state_id") {
            setFormData((prev) => ({
                ...prev,
                city_id: "",
            }));

            const cityRes = await getCitiesOfaState(value);
            setCities(cityRes || []);
        }

        if (name === 'coach_type') {
            setFormData((prev) => ({
                ...prev,
                coach_subtype: "",
            }));
            const subTypeRes = await getSubCoachType(value);
            setSubCoachTypes(subTypeRes || []);
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('formData', formData)
        // try {
        //     const res = await axios.post(`${apiUrl}/updateProfile`, formData, {
        //         headers: {
        //             Authorization: `Bearer ${getToken}`,
        //             Accept: 'application/json'
        //         },
        //     });

        //     if (res.data.success) {
        //         alert('Profile updated successfully!');
        //     } else {
        //         alert('Update failed.');
        //     }
        // } catch (err) {
        //     console.error(err);
        //     alert('Error updating profile.');
        // }
    };



    console.log('user', formData.language_names)
    return (
        <div className="profile-form">
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="firstName">First Name*</label>
                        <input
                            type="text"
                            id="firstName"
                            name="first_name"
                            required
                            value={formData.first_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="last_name"
                            required
                            value={formData.last_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email*</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="country_id">Country</label>
                        <select
                            id="country_id"
                            name="country_id"
                            value={formData.country_id}
                            onChange={handleChange}

                        >
                            <option value="">Select Country</option>
                            {countries.map((country) => (
                                <option key={country.country_id} value={country.country_id}>
                                    {country.country_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="state_id">State</label>
                        <select
                            id="state_id"
                            name="state_id"
                            value={formData.state_id}
                            onChange={handleChange}
                        >
                            <option value="">Select State</option>
                            {states.map((state) => (
                                <option key={state.state_id} value={state.state_id}>
                                    {state.state_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="city_id">City</label>
                        <select
                            id="city_id"
                            name="city_id"
                            value={formData.city_id}
                            onChange={handleChange}
                        >
                            <option value="">Select City</option>
                            {cities.map((city) => (
                                <option key={city.city_id} value={city.city_id}>
                                    {city.city_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="coach_type">Main Coaching Category</label>
                        <select
                            id="coach_type"
                            name="coach_type"
                            value={formData.coach_type}
                            onChange={handleChange}

                        >
                            <option value="">Select Coaching</option>
                            {coachTypes.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.type_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="coach_subtype">Sub Coaching Category</label>
                        <select
                            id="coach_subtype"
                            name="coach_subtype"
                            value={formData.coach_subtype}
                            onChange={handleChange}

                        >
                            <option value="">Select Sub category</option>
                            {coachSubTypes.map((sub_type) => (
                                <option key={sub_type.id} value={sub_type.id}>
                                    {sub_type.subtype_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="gender">Gender*</label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}

                        >
                            <option value="">Select </option>
                            <option value={1}>Male</option>
                            <option value={2}>Female</option>
                            <option value={3}>Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="professional_title">Professional Title</label>
                        <input
                            type="text"
                            id="professional_title"
                            name="professional_title"
                            value={formData.professional_title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="company_name">Company name</label>
                        <input
                            type="text"
                            id="company_name"
                            name="company_name"
                            value={formData.company_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="experience">Company name</label>
                        <input
                            type="text"
                            id="experience"
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                        />
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
                            {deliveryMode.map((mode) => (
                                <option key={mode.id} value={mode.id}>
                                    {mode.mode_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="age_group">Target Audience/Age Group</label>
                        <select
                            id="age_group"
                            name="age_group"
                            value={formData.age_group}
                            onChange={handleChange}

                        >
                            <option value="">Select Coaching</option>
                            {ageGroup.map((group) => (
                                <option key={group.id} value={group.id}>
                                    {group.group_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="language_names">Language</label>
                        {/* <select
                            id="language_names"
                            name="language_names"
                            multiple
                            value={formData.language_names}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    language_names: Array.from(e.target.selectedOptions, (option) => parseInt(option.value))
                                })
                            }
                        >
                            {allLanguages.map((lang) => (
                                <option key={lang.id} value={lang.id}>
                                    {lang.language}
                                </option>
                            ))}
                        </select> */}

                        <select
                            id="language_names"
                            name="language_names"
                            value={formData.language_names[0] || ''}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    language_names: [parseInt(e.target.value)]
                                })
                            }
                        >
                            <option value="">Select</option>
                            {allLanguages.map((lang) => (
                                <option key={lang.id} value={lang.id}>
                                    {lang.language}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>



                <div className="save-btn">
                    <button type="submit" className="save-btn-add">Save Changes <i className="bi bi-arrow-right"></i></button>
                </div>
            </form>
        </div>
    );
};