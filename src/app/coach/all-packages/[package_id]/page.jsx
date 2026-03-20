import ShowPackages from '../../_coach_components/all-packages/ShowPackages';
import '../../_styles/show_all_packages.css';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function PackageById({ params, searchParams }) {

  const { package_id } = await params;
  const { coach_id } = await searchParams;
  
  // Get token from cookies to authenticate coach
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  
  let allPackageIds = [];

  // Fetch all package IDs for this coach (with auth to include drafts)
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/get_AarrayOfServicePackageIds_ByCoachId/${coach_id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({ coach_id }),
        cache: 'no-store',
      }
    );
    const data = await res.json();
    allPackageIds = data?.data || [];
  } catch (error) {
    console.error('Error fetching package IDs:', error);
  }

  // Fetch package details with authentication (so coach can see draft/unpublished packages)
  const packageDetails = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/getServicePackageById/${coach_id}/${package_id}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify({ coach_id, package_id }),
      cache: 'no-store',
    }
  ).then(res => res.json());
  
  if (!packageDetails || !Array.isArray(packageDetails.data) || packageDetails.data.length === 0) {
    return notFound();
  }

  const selectedPackage = packageDetails.data[0];
  
  return (
    <div>
      <ShowPackages
        pkg={selectedPackage}
        allPackages={allPackageIds}
      />
    </div>
  );
}