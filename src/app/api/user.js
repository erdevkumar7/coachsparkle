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

        return { error: null, data: json.data };
    } catch (err) {
        console.error('Fetch error:', err);
        return { error: 'Unexpected error', data: null };
    }
};