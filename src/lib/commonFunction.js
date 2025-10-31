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


//  "givenDate": "2025-11-07" -> and  "givenTime": "09:30" -> into  Fri, Nov 7, 9:30 AM (GMT+8)
export function newDateTimeFormatter(givenDate, givenTime) {
    try {
        const startDate = new Date(`${givenDate}T${givenTime}`);

        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const dayName = days[startDate.getDay()];
        const monthName = months[startDate.getMonth()];
        const day = startDate.getDate();

        const formatTime = (date) => {
            let hours = date.getHours();
            let minutes = date.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0' + minutes : minutes;
            return `${hours}:${minutes} ${ampm}`;
        };

        const startTime = formatTime(startDate);

        return `${dayName}, ${monthName} ${day}, ${startTime} (GMT+8)`;

    } catch (error) {
        console.error('Error formatting date:', error);
        return `${session.session_date_start} at ${session.slot_time_start}`;
    }
};
