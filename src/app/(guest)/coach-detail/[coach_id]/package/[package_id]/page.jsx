import BookingPackage from '@/app/(guest)/_components/booking/BookingPackage';
import '../../../../_styles/coach_packages.css';
import { notFound } from 'next/navigation';
import { HandleValidateTokenOnServer } from '@/app/api/user';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function CoachPackageById({ params }) {

    const { coach_id, package_id } = await params;
    const tokenData = await HandleValidateTokenOnServer();
    let user_id;
    if (tokenData) {
        user_id = tokenData.data.id
    }

    // Fetch all packages of coach
    const allPackageIdRes = await fetch(`${apiUrl}/get_AarrayOfServicePackageIds_ByCoachId/${coach_id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({ coach_id }),
        cache: 'no-store',
    }).then(res => res.json()).catch(err => {
        console.error('Error fetching package IDs:', err);
        return null;
    });

    // Fetch current package details
const res = await fetch(`${apiUrl}/getServicePackageById/${coach_id}/${package_id}`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    body: JSON.stringify({ coach_id, package_id }),
    cache: 'no-store',
});

console.log("STATUS:", res.status);

const text = await res.text();
console.log("RAW RESPONSE:", text);

let packageDetails = null;

try {
    packageDetails = JSON.parse(text);
} catch (e) {
    console.error("JSON PARSE ERROR:", e);
}
    // Increment profile view count
    await fetch(`${apiUrl}/submit-coach-and-package-views`, {
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
    });

if (!packageDetails || !packageDetails.data) {
    return notFound();
}

const allPackages = allPackageIdRes?.data || [];

const packages = Array.isArray(packageDetails.data)
    ? packageDetails.data[0]
    : packageDetails.data;

    return (
        <div>
            <BookingPackage
                pkg={packages}
                allPackages={allPackages}
            />
        </div>
    )
}