import { cookies } from "next/headers";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getUserProfileData = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        return { error: 'No token provided', data: null };
    }

    try {
        const response = await fetch(`${apiUrl}/getuserprofile`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API error response:', errorText);
            return { error: 'Failed to fetch user profile', data: null, removeToken: true };
        }

        const json = await response.json();

        if (!json.success) {
            return { error: json.message || 'Unknown error', data: null };
        }

        return { error: null, data: json.data, token };
    } catch (err) {
        console.error('Fetch error:', err);
        return { error: 'Unexpected error', data: null };
    }
};


export const getUserPendingCoaching = async (page = 1) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        return { error: 'No token provided', data: null };
    }

    try {
        const response = await fetch(`${apiUrl}/getPendingCoaching?page=${page}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API error response:', errorText);
            return { error: 'Failed to fetch user profile', data: null, removeToken: true };
        }

        const json = await response.json();

        if (!json.success) {
            return { error: json.message || 'Unknown error', data: null };
        }

        return { error: null, data: json };
    } catch (err) {
        console.error('Fetch error:', err);
        return { error: 'Unexpected error', data: null };
    }
};



export const cochingRequestsListsUserDashboard = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
        return { error: "No token", data: null };
    }
    try {
        const res = await fetch(`${apiUrl}/cochingRequestsListsUserDashboard`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
            cache: "no-store",
        });
        const json = await res.json();
        if (!json.status) {
            return { error: json.message || "Error", data: null };
        }
        return { error: null, data: json.data };
    } catch (err) {
        console.error("Request list fetch error:", err);
        return { error: "Unexpected error", data: null };
    }
}


export const HandleValidateTokenOnServer = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return null;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/validateToken`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
            cache: 'no-store',
        });

        if (!res.ok) {
            // Cookies.remove('token');
            // localStorage.removeItem('token');
            // localStorage.removeItem('user');
            return null;
        }

        return await res.json();

    } catch (error) {
        return null;
    }
}

// app/api/auth.js
export const HandleValidateTokenOnServerWithReturnToken = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return null;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/validateToken`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
            cache: 'no-store',
        });

        if (!res.ok) {
            // Cookies.remove('token');
            // localStorage.removeItem('token');
            // localStorage.removeItem('user');
            return null;
        }

        const jsonData = await res.json();

        return { jsonData, token };

    } catch (error) {
        return null;
    }
}

export async function getUserReviews() {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return { error: "No token provided", data: [] }; // return empty array
    }

    try {
        const res = await fetch(`${apiUrl}/userReviews`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
            cache: "no-store",
        });

        if (!res.ok) {
            const errorText = await res.text();
            // console.error("API error response:", errorText);
            return { error: "Failed to fetch reviews", data: [] }; // return empty array
        }

        const json = await res.json();

        // If no reviews, return empty array
        if (!json.status) {
            console.warn("No reviews found:", json.message); // optional log
            return { error: null, data: [] };
        }

        return { error: null, data: json.data || [] };
    } catch (err) {
        console.error("Fetch error:", err);
        return { error: "Unexpected error", data: [] };
    }
}


export async function getUserBookedGoalsListData() { 
     const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    // return token;
    if (!token) return null;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getuserbookedgoalslist`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
            cache: "no-store" // ensure fresh validation
        });
        // console.log('rrrrrrrrrrr', res)      
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
}

