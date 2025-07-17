export const formatBookingAvailability = (range) => {
    if (!range) return "";

    const [startStr, endStr] = range.split(" - ");
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
