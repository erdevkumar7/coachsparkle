import Booking from "@/app/(guest)/_components/booking/Booking";
import '../../../../../_styles/coach_packages.css';
import { dateTimeAvalibility } from "@/app/api/packages";
import { notFound } from "next/navigation";

export default async function CoachPackageBookingPage({ params }) {
  const { coach_id, package_id } = await params;
  const packageData = await dateTimeAvalibility(package_id);

   if (!packageData.success) {
      notFound();
   }

  return <>
    <Booking
      packageData={packageData.data}
      coach_id={coach_id}
      package_id={package_id}
    />
  </>
}
