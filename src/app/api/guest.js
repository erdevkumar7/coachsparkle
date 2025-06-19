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