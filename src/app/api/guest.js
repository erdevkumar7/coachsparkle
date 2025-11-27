const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getAllMasters = async () => {
    const masterRes = await fetch(`${apiUrl}/getallmastercategories`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    });

    const masterData = await masterRes.json();
    // console.log('masterData', masterData)
    if (masterData) {
        return masterData;
    } else {
        return null;
    }
}

export const getAllContries = async () => {
    const countryRes = await fetch(`${apiUrl}/getCountries`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
    });
    const countriesData = await countryRes.json();
    return countriesData;
}

export const getAllLanguages = async () => {
    const langRes = await fetch(`${apiUrl}/getLanguages`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
    });
    return await langRes.json();
}

export const getStatesOfaCountry = async (country_id) => {

    const StateRes = await fetch(`${apiUrl}/getStates/${country_id}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
    });
    return await StateRes.json();
}

export const getCitiesOfaState = async (state_id) => {
    const res = await fetch(`${apiUrl}/getCities/${state_id}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
    });
    return await res.json();
};

export const getDeliveryMode = async () => {
    const deliveryRes = await fetch(`${apiUrl}/getDeliveryMode`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
    });
    const deliveryData = await deliveryRes.json();
    return deliveryData;
}

export const getCoachType = async () => {
    const coachTypeRes = await fetch(`${apiUrl}/getCoachType`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
    });
    const coachTypeData = await coachTypeRes.json();
    return coachTypeData;
}

export const getSubCoachType = async (coach_type_id) => {
    const newURL = coach_type_id ? `${apiUrl}/getSubCoachType/${coach_type_id}` : `${apiUrl}/getSubCoachType`;

    const coachSubTypeRes = await fetch(`${newURL}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
    });
    const coachSubTypeData = await coachSubTypeRes.json();
    return coachSubTypeData;
}

export const getAgeGroup = async () => {
    const ageGroupRes = await fetch(`${apiUrl}/ageGroups`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
    });
    return await ageGroupRes.json();
}

export const getAllCoachingCategory = async () => {
    const res = await fetch(`${apiUrl}/coachingCategories`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
    });
    return await res.json();
}

export const sessionFormats = async () => {
    const res = await fetch(`${apiUrl}/sessionFormats`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
    });
    return await res.json();
}

export const getAllPriceModels = async () => {
    const res = await fetch(`${apiUrl}/priceModels`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
    });
    return await res.json();
}

export const getAllCoachServices = async () => {
    const res = await fetch(`${apiUrl}/getAllCoachServices`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
    });
    return await res.json();
}

export const getcoachExperienceLevel = async () => {
    const res = await fetch(`${apiUrl}/coachExperienceLevel`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
    });
    return await res.json();
}

export const getMasterBudgetRange = async () => {
    const res = await fetch(`${apiUrl}/getMasterBudgetRange`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
    });
    return await res.json();
}

export const getCommunicationChannels = async () => {
    const res = await fetch(`${apiUrl}/communicationChannels`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
    });
    return await res.json();
}

export const getLatestMasterBlogs = async (coach_id) => {
    const res = await fetch(`${apiUrl}/getFrontcoachBlog`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            coach_id: coach_id // pass coach id
        }),
        cache: "no-store" // optional: avoid caching issues in Next.js
    });

    const json = await res.json();
    if (json?.success && Array.isArray(json.data)) {
        return json.data.slice(0, 3);
    }

    return [];
};

export const getFeaturedcoachBlogForHomeAndArticlePage = async () => {
    const res = await fetch(`${apiUrl}/getFeaturedcoachBlog`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
        },
    });

    const json = await res.json();
    if (json?.success && Array.isArray(json.data)) {
        return json.data;
    }
    return [];
};

export const getMasterBlogs = async () => {
    const res = await fetch(`${apiUrl}/getmasterblogs`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
        },
    });

    const json = await res.json();
    if (json?.success && Array.isArray(json.data)) {
        return json.data;
    }
    return [];
};

export const fetchAvailability = async (packageId) => {
    const res = await fetch(`${apiUrl}/date_time_avalibility`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ package_id: packageId }),
    });

    const data = await res.json();
    if (!data.success) throw new Error(data.message || "Failed to fetch");

    return data.data;
};

export const getMasterFaq = async () => {
    try {
        const res = await fetch(`${apiUrl}/getfaqs`, {
            method: 'GET',
            headers: {
                Accept: "application/json",
            },
            cache: 'no-store',
        });

        const json = await res.json();
        console.log("Full API response:", json);

        if (Array.isArray(json)) {
            return json; // ✅ Directly return array
        }
        return [];
    } catch (error) {
        console.error("Error fetching FAQs:", error);
        return [];
    }
};

export const getCommunicationChannel = async () => {
    const ageGroupRes = await fetch(`${apiUrl}/communicationChannels`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
    });
    return await ageGroupRes.json();
}



