export const getUserPendingCoachingClient = async (page = 1, token) => {
  if (!token) {
    return { error: "No token provided", data: null };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getPendingCoaching?page=${page}`, {
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


export const getUserProgressCoachingClient = async (page = 1, token) => {
  console.log('page', page)
  if (!token) {
    return { error: "No token provided", data: null };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getCoachingPackages?page=${page}`, {
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
