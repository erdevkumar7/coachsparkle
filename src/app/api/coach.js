import { cookies } from "next/headers";
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