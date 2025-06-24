"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { getCitiesOfaState, getStatesOfaCountry } from "@/app/api/guest";

export default function CoachUpdateForm({ user, countries, deliveryMode }) {
    const router = useRouter();
    const [getToken, setToken] = useState();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const [formData, setFormData] = useState({
        user_type: user?.user_type || 3,
        first_name: user?.first_name || '',
        last_name: user?.last_name || '',
        email: user?.email || '',
        country_id: user?.country_id || '',
        state_id: user?.state_id || '',
        city_id: user?.city_id || '',
        coaching_category: user?.coaching_category || '',
        professional_title: '',
        company_name: '',
    });


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
        };
        loadDefaults();
    }, [formData.country_id, formData.state_id]);


    // const handleChange = (e) => {
    //     const { name, value } = e.target;

    //     setFormData((prev) => ({
    //         ...prev,
    //         [name]: value,
    //     }));

    // };

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



    // console.log('user', user.country_id)
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
                        <label htmlFor="coaching_category">Main Coaching Category</label>
                        <select
                            id="coaching_category"
                            name="coaching_category"
                            value={formData.coaching_category}
                            onChange={handleChange}

                        >
                            <option value="">Select Coaching</option>

                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="country_id">Sub Coaching Category</label>
                        <select
                            id="country_id"
                            name="country_id"
                            value={formData.country_id}
                            onChange={handleChange}

                        >
                            <option value="">Select Sub category</option>

                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="city_id">Gender*</label>
                        <select
                            id="city_id"
                            name="city_id"
                            value={formData.city_id}
                            onChange={handleChange}

                        >
                            <option value="">Select </option>

                        </select>
                    </div>


                    <div className="form-group">
                        <label htmlFor="professional_title">Professional Title</label>
                        <input
                            type="text"
                            id="professional_title"
                            name="professional_title"
                            required
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
                            required
                            value={formData.company_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="city_id">City</label>
                        <select
                            id="city_id"
                            name="city_id"
                            value={formData.city_id}
                            onChange={handleChange}

                        >
                            <option value=""></option>

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