"use client";
import { useEffect, useState } from "react";
import AvailabilityModal from "./AvailabilityModal";
import {
  getAvailabilityModes,
  getDateRange,
  getSpecificMode,
  getWeeklyAvailability,
  getOnDemand,

} from "@/services/availabilityModes.api";

export default function AvailabilityModesField({
  value,
  onChange,
  isProUser,
  sessionDurationMinutes,
}) {
  const [showModal, setShowModal] = useState(false);
  const [selectedMode, setSelectedMode] = useState("");
  const [modes, setModes] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getAvailabilityModes();
      setModes(res?.availabilitymodes || []);
    })();
  }, []);

  const parseSlots = (raw) => {
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  };

  const handleChange = async (e) => {
    const availabilityId = Number(e.target.value);
    if (!availabilityId) return;

    let data = {};
    const recordId = value?.record_id;

    if (availabilityId === 31 && recordId) {
      const specific = await getSpecificMode(recordId);
      data = {
        specificDates: [
          {
            date: specific.session_dates,
            slots: parseSlots(specific.time_slots),
            maxParticipants: specific.max_participants,
          },
        ],
      };
    }

    if (availabilityId === 32 && recordId) {
      const range = await getDateRange(recordId);
      const weekly = await getWeeklyAvailability(recordId);

      const weeklyAvailability = {};
      weekly.forEach((d) => {
        weeklyAvailability[d.days] = {
          enabled: true,
          start: d.start_time?.slice(0, 5),
          end: d.end_time?.slice(0, 5),
          slots: parseSlots(d.time_slots),
        };
      });

      data = {
        startDate: range?.start_date,
        endDate: range?.end_date,
        bufferTime: range?.booking_notice,
        weeklyAvailability,
      };
    }

    // if (availabilityId === 33 && recordId) {
    //   const ondemand = await getOnDemand(recordId);
    //   data = {
    //     responseSLA: parseSlots(ondemand?.response_time),
    //     instructions: ondemand?.instructions_clients || "",
    //   };
    // }
        if (availabilityId === 33 && recordId) {
  const ondemand = await getOnDemand(recordId);

  data = {
    responseSLA: ondemand?.response_time || "",
    instructions: ondemand?.instructions_clients || "",
  };
}


    setSelectedMode(String(availabilityId));
    setShowModal(true);

    onChange({
      availability_id: availabilityId,
      record_id: recordId,
      data,
    });
  };


    // edit 7/03
  const recordId = value?.record_id;
  useEffect(() => {
  if (value?.availability_id) {
    setSelectedMode(String(value.availability_id));
  }
}, [value]);

  return (
    <>
      <label className="form-label">Client Booking Availability</label>

      <select
        className="form-control"
        disabled={!isProUser}
        value={showModal ? selectedMode : ""}
        onChange={handleChange}
      >
        <option value="">Select</option>
        {modes.map((mode) => (
          <option key={mode.id} value={mode.id}>
            {mode.availability_mode_name}
          </option>
        ))}
      </select>

      {/* ✅ FULL PREVIEW */}
      {value?.availability_id && (
        <div className="mt-3 p-3 border rounded bg-light w-100">
          <div className="fw-semibold text-success mb-2">
            ✓ Saved Availability Mode:{" "}
            {modes.find((m) => m.id === value.availability_id)
              ?.availability_mode_name}
          </div>

          {value.availability_id === 31 &&
            value?.data?.specificDates?.map((d, i) => (
              <div key={i}>
                <strong>{d.date}</strong>
                <div className="small text-muted">
                  Slots: {d.slots?.join(", ") || "-"}
                </div>
                <div className="small text-muted">
                  Max Participants: {d.maxParticipants || "-"}
                </div>
              </div>
            ))}

          {value.availability_id === 32 && (
            <>
              <strong>
                {value.data.startDate} → {value.data.endDate}
              </strong>
              {Object.entries(value.data.weeklyAvailability || {}).map(
                ([day, info]) =>
                  info.enabled && (
                    <div key={day} className="small text-muted">
                      {day}: {info.start} – {info.end}
                    </div>
                  )
              )}
            </>
          )}

          {value.availability_id === 33 && (
            <>
              <div className="small">
                {/* SLA: {value.data.responseSLA?.join(", ") || "-"} */}
                {/* SLA: {
        Array.isArray(value?.data?.responseSLA)
          ? value.data.responseSLA.join(", ")
          : value?.data?.responseSLA || "-"
      } */}
        SLA: {
        value?.data?.responseSLA
          ? `Within ${value.data.responseSLA} hours`
          : "-"
      }
              </div>
              <div className="small">
                Instructions: {value.data.instructions || "-"}
              </div>
            </>
          )}
        </div>
      )}

      {showModal && (
        <AvailabilityModal
          show={showModal}
          onClose={() => {
            setSelectedMode("");
            setShowModal(false);
          }}
          onSave={(payload) => {
            onChange({
              availability_id: payload.mode,
              record_id: value?.record_id,
              data: payload.data,
            });
            setSelectedMode("");
            setShowModal(false);
          }}
          initialMode={Number(selectedMode)}
          initialValue={value}
          sessionDurationMinutes={sessionDurationMinutes}
        />
      )}
    </>
  );
}