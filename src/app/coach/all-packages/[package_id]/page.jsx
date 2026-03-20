import ShowPackages from '../../_coach_components/all-packages/ShowPackages';
import '../../_styles/show_all_packages.css';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { allPackagesOfaCoach } from '@/app/api/coach';

export default async function PackageById({ params, searchParams }) {

  const { package_id } = await params;
  const { coach_id } = await searchParams;
  
  // Get token from cookies to authenticate coach
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  
  if (!token) {
    return notFound();
  }
  
  // Fetch all packages for this coach (includes draft, unpublished, published)
  const allPackagesResponse = await allPackagesOfaCoach(token);
  const allPackages = allPackagesResponse?.data || [];
  
  if (!allPackages || allPackages.length === 0) {
    return notFound();
  }

  // Find the specific package
  const selectedPackage = allPackages.find(pkg => pkg.id == package_id);
  
  if (!selectedPackage) {
    return notFound();
  }
  
  return (
    <div>
      <ShowPackages
        pkg={selectedPackage}
        allPackages={allPackages.map(p => p.id)}
      />
    </div>
  );
}