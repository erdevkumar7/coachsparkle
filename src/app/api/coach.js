
const apiUrl = process.env.NEXT_PUBLIC_API_URL;


export const getCoachById = async (id) => {
    const res = await fetch(
        `${apiUrl}/coachDetails?id=${id}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
            cache: "no-store", // prevent caching if dynamic
        }
    );
    const result = await res.json();
    return result.data;
};

export const allPackagesOfaCoach = async (givenToken) => {
    if (!givenToken) return null;
    const res = await fetch(`${apiUrl}/getallcoachservicepackage`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${givenToken}`,
                Accept: 'application/json',
            },
            cache: "no-store", // prevent caching if dynamic
        }
    );
    return await res.json()
};