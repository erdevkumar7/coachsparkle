import { cookies } from 'next/headers';
import '../../../(guest)/_styles/coach_packages.css';
import '../../_styles/dashboard.css';
import { notFound } from 'next/navigation';
import Link from "next/link";
import CheckIcon from '@mui/icons-material/Check';

export default async function BookingConfirmPage({ params, searchParams }) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const searchParmData = await searchParams;
    const txn_id = searchParmData.txn_id;

    const bookingConfirmRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transaction_detail`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ txn_id }),
        cache: 'no-store'
    });

    const bookingConfirmData = await bookingConfirmRes.json();

    if (!bookingConfirmData.success) {
        notFound();
    }

    const booking_confirm = bookingConfirmData.data.transaction_detail;

    return (
        <div className="modal d-block booking-confirm-modal">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content rounded-4 overflow-hidden">
                    <div className="modal-header text-white flex-column align-items-start">
                        <div className="d-flex align-items-center mb-2">
                            <h5 className="modal-title mb-0">
                                <span className="me-2 fs-4"><CheckIcon className='check-box-add'/></span>
                                Booking Confirmed {booking_confirm.session_title} with {booking_confirm.first_name} {booking_confirm.last_name}
                            </h5>
                        </div>
                    </div>

                    <div className="modal-body">
                        <p>
                            Hi Deven,
                            <br />
                            Thank you for booking the{" "}
                            <strong>
                                {booking_confirm.session_title}
                            </strong>{" "}
                            with {booking_confirm.first_name} {booking_confirm.last_name}. Your journey toward
                            clarity and growth begins now!
                        </p>

                        <h6 className="fw-bold mt-4">
                            Package Details:
                        </h6>
                        <ul className="list-unstyled small">
                            <li>
                                <strong>Coach:</strong> {booking_confirm.first_name} {booking_confirm.last_name}
                            </li>
                            <li>
                                <strong>Start Date:</strong> {booking_confirm.booking_availability_start} (to be confirmed)
                            </li>
                            <li>
                                <strong>Number of Sessions:</strong> {booking_confirm.session_count ?? 'N/A'}
                            </li>
                            <li>
                                <strong>Session Format:</strong> {booking_confirm.delivery_mode}
                            </li>
                            <li>
                                <strong>Weekly Use:</strong> Use all 3
                                sessions within 6 weeks
                            </li>
                            <li>
                                <strong>Policy:</strong> {booking_confirm.cancellation_policy}
                            </li>
                            <li>
                                <strong>Notes:</strong> Intake form +
                                session worksheet + voice note support
                            </li>
                        </ul>

                        {booking_confirm?.delivery_mode_detail &&
                            <>
                                <h6 className="fw-bold mt-4">
                                    Zoom Meeting/Video Link
                                </h6>
                                <p className="small">
                                    Please join your sessions at the scheduled
                                    time using the link below:
                                    <br />
                                    <Link href={booking_confirm?.delivery_mode_detail} className="link" target="blank">
                                        Join Zoom/Video Meeting
                                    </Link>
                                    <br />
                                    (The same link will remain for all
                                    sessions unless otherwise updated by your
                                    coach.)
                                </p>
                            </>}

                        <h6 className="fw-bold mt-4">
                            What’s Included
                        </h6>
                        <ul className="small">
                            {booking_confirm?.price_model &&
                                <li>{booking_confirm?.price_model}</li>}
                            {booking_confirm?.rescheduling_policy &&
                                <li>{booking_confirm?.rescheduling_policy}</li>}
                        </ul>

                        <h6 className="fw-bold mt-4">Next Steps</h6>
                        <p className="small">
                            {booking_confirm.first_name ?? 'Coach'} will be in touch shortly to schedule
                            your first session and share prep
                            materials. You can also message her
                            directly from your dashboard.
                        </p>
                    </div>

                    <div className="modal-footer justify-content-start gap-3">
                        <Link href="/user/user-message" className="btn msg-btn">
                            Message {booking_confirm.first_name} <i className="bi bi-arrow-right"></i>
                        </Link>

                        <Link href="/user/booking" className="btn btn-primary">
                            View Bookings <i className="bi bi-arrow-right"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}