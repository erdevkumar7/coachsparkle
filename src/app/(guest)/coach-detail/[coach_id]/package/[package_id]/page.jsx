import BookingPackage from '@/app/(guest)/_components/booking/BookingPackage';
import '../../../../_styles/coach_packages.css';
import { packageByPackageId, packageIdsByCoachId } from '@/app/api/coach';
import { notFound } from 'next/navigation';
import { HandleValidateTokenOnServer } from '@/app/api/user';


export default async function CoachPackageById({ params }) {

    const { coach_id, package_id } = await params;
    const tokenData = await HandleValidateTokenOnServer();
    let user_id;
    if (tokenData) {
        user_id = tokenData.data.id
    }
    let packages;
    // const packageDetails = await packageByPackageId(coach_id, package_id)

    const [allPackageIdRes, packageDetails, incrementViewRes] = await Promise.all([
        packageIdsByCoachId(coach_id),       // Fetch all packages of coach
        packageByPackageId(coach_id, package_id), // Current package details

        // Increment profile view count
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/submit-coach-and-package-views`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                coach_id,
                package_id,
                user_id: user_id ?? null,
            }),
            cache: "no-store",
        }).catch((error) => {
            console.error("Error increasing profile view count:", error);
            return null;
        }),

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