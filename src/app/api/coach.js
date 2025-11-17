import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;


export const getCoachById = async (id, user_id) => {
    const res = await fetch(
        `${apiUrl}/coachDetails?id=${id}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, user_id }),
            cache: "no-store",
        }
    );
    const result = await res.json();
    return result.data;
};

// Add this function to your server-side utilities or in the same file
export const getCoachCalendarStatus = async (coach_id) => {
    try {
        const response = await fetch(`${apiUrl}/calendar-status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ coach_id: parseInt(coach_id) }),
        });

        const data = await response.json();
        return data || null;
    } catch (error) {
        console.error('Error fetching calendar status:', error);
        return null;
    }
}

export const allPackagesOfaCoach = async (givenToken) => {
    if (!givenToken) return null;
    const res = await fetch(`${apiUrl}/getalluserservicepackage`,
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

export const similarCoaches = async (coach_id) => {
    if (!coach_id) return null;

    const res = await fetch(`${apiUrl}/similarcoaches`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ coach_id }),
            cache: "no-store", // prevent caching if dynamic
        }
    );
    return await res.json();
}


export const packageByPackageId = async (coach_id, package_id) => {
    if (!package_id || !coach_id) return null;

    const res = await fetch(`${apiUrl}/getServicePackageById/${coach_id}/${package_id}`,
        {
            method: "POST",
            headers: {
                Accept: 'application/json'
            },
            cache: "no-store",
        }
    )

    return await res.json();
}

export const packageIdsByCoachId = async (coach_id) => {
    if (!coach_id) return null;

    const res = await fetch(`${apiUrl}/get_AarrayOfServicePackageIds_ByCoachId/${coach_id}`,
        {
            method: "POST",
            headers: {
                Accept: 'application/json'
            },
            cache: "no-store",
        }
    )

    return await res.json();
}

export const updateCoachData = async (form, getToken) => {
    const res = await axios.post(`${apiUrl}/updateProfile`, form, {
        headers: {
            Authorization: `Bearer ${getToken}`,
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        },
    });

    return res;
}

export const getCoachServicePerformances = async (page = 1, token) => {
    if (!token) {
        return { error: "No token provided", data: null };
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coachServicePerformances?page=${page}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        });

        const json = await response.json();

        if (!json.success) {
            return { error: json.message || "Unknown error", data: null };
        }

        return { error: null, data: json };
    } catch (err) {
        console.error("Fetch error:", err);
        return { error: "Unexpected error", data: null };
    }
};

export const getCoachArticles = async (page = 1, token) => {
    if (!token) {
        return { error: "No token provided", data: null };
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getcoachBlog?page=${page}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        });

        const json = await response.json();

        if (!json.success) {
            return { error: json.message || "Unknown error", data: null };
        }

        return { error: null, data: json };
    } catch (err) {
        console.error("Fetch error:", err);
        return { error: "Unexpected error", data: null };
    }
};