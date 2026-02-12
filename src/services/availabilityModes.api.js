import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const addSpecificDate = async ({
  availabilityId,   // 31
  session_date,     // "2026-02-02"
  time_slot,        // ["10:00", "11:00", "12:00"]
  max_participants, // 15
  specific_id       // 4
}) => {
  const token = Cookies.get("token");

  if (!token) {
    throw new Error("Auth token missing");
  }

  const payload = {
    session_date,
    time_slot,
    max_participants,
    specific_id,
  };

  const res = await axios.post(
    `${API_URL}/specific-date-add/${availabilityId}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
};

export const getAvailabilityModes = async () => {
  const token = Cookies.get("token");

  if (!token) {
    throw new Error("Auth token missing");
  }

  const res = await axios.get(
    `${API_URL}/availability-mode-list`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

  return res.data; 
};
