export const formatBookingAvailability = (startStr, endStr) => {
    if (!startStr || !endStr) return "";
  
    const start = new Date(startStr);
    const end = new Date(endStr);

    if (isNaN(start) || isNaN(end)) return "";

    const sameMonth = start.getMonth() === end.getMonth();
    const sameYear = start.getFullYear() === end.getFullYear();

    const format = new Intl.DateTimeFormat("en-US", { month: "short" });

    const startMonth = format.format(start);
    const endMonth = format.format(end);
    const year = end.getFullYear(); // or start.getFullYear(), if both same

    if (sameMonth && sameYear) {
        return `${endMonth} ${year}`;
    } else {
        return `${startMonth} - ${endMonth} ${year}`;
    }
};

export function formatBookingWindow(bookingRange) {
  if (!bookingRange) return "";

  const [startStr, endStr] = bookingRange.split(" - ");
  const startDate = new Date(startStr);
  const endDate = new Date(endStr);

  const options = { year: "numeric", month: "long", day: "numeric" };

  return `${startDate.toLocaleDateString("en-US", options)} to ${endDate.toLocaleDateString("en-US", options)}`;
}


