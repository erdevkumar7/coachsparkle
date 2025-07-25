import BookingPackage from '@/app/(guest)/_components/booking/BookingPackage';
import '../../../../_styles/coach_packages.css';
import { packageByPackageId } from '@/app/api/coach';
import { notFound } from 'next/navigation';


export default async function CoachPackageById({ params }) {

    const {coach_id, package_id } = await params;
    let packages;
    const packageDetails = await packageByPackageId(coach_id, package_id)

    if (!packageDetails || !Array.isArray(packageDetails.data) || packageDetails.data.length === 0) {
        return notFound(); // Show built-in 404 page  
    }

    packages = packageDetails.data[0]; 
    console.log('packageDetails',packageDetails)
    return (
        <div>
            <BookingPackage pkg={packages} />
        </div>
    )
}