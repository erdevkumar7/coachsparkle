const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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
    const coachSubTypeRes = await fetch(`${apiUrl}/getSubCoachType/${coach_type_id}`, {
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