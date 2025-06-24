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