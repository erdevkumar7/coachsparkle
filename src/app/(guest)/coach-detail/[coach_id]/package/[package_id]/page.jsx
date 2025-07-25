import BookingPackage from '@/app/(guest)/_components/booking/BookingPackage';
import '../../../../_styles/coach_packages.css';
import { packageByPackageId, packageIdsByCoachId } from '@/app/api/coach';
import { notFound } from 'next/navigation';


export default async function CoachPackageById({ params }) {

    const { coach_id, package_id } = await params;
    let packages;
    // const packageDetails = await packageByPackageId(coach_id, package_id)

    const [allPackageIdRes, packageDetails] = await Promise.all([
        packageIdsByCoachId(coach_id),       // Fetch all packages of coach
        packageByPackageId(coach_id, package_id), // Current package details
    ]);

    if (!packageDetails || !Array.isArray(packageDetails.data) || packageDetails.data.length === 0) {
        return notFound(); // Show built-in 404 page  
    }

    const allPackages = allPackageIdRes?.data || [];
    packages = packageDetails.data[0];
    // console.log('allPackages', allPackages)
    return (
        <div>
            <BookingPackage
                pkg={packages}
                allPackages={allPackages}
            />
        </div>
    )
}