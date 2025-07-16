import Booking from "../../_components/booking/Booking";
import BookingPackage from "../../_components/booking/BookingPackage";
import "../../_styles/coach_packages.css";
import BreadCrumb from '@/components/BreadCrumb';

export default function Packages(){
    const breadcrumbItems = [
        {label: "Explore Coaches", href: "/coach-detail/list"},
        {label: "Send Coaching Request"}
    ]
    return(
        <div>
            <BreadCrumb items={breadcrumbItems}/>
            <BookingPackage/>
        </div>
    );
}