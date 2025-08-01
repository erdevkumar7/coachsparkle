const apiUrl = process.env.NEXT_PUBLIC_API_URL;


export async function dateTimeAvalibility(packageId) {
  try {
    const res = await fetch(`${apiUrl}/date_time_avalibility`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ package_id: packageId }),
      cache: 'no-store'
    });


    if (!res) {
      // e.g., 404 from backend or validation error
      console.error(`API responded with status ${res.status}`);
      return null;
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Availability fetch error:", error);
    return null;
  }
}

