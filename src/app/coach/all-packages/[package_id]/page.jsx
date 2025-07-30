import ShowPackages from '../../_coach_components/all-packages/ShowPackages';
import '../../_styles/show_all_packages.css';
import { packageByPackageId, packageIdsByCoachId } from '@/app/api/coach';
import { notFound } from 'next/navigation';

export default async function PackageById({ params, searchParams }) {

  const { package_id } = await params;
  const { coach_id } = await searchParams;
    let allPackageIds;

  try {
    const stored = typeof window !== "undefined" && localStorage.getItem("allPackages");
    allPackageIds = stored ? JSON.parse(stored) : [];
  } catch {
    allPackageIds = [];
  }

  if (!allPackageIds || allPackageIds.length === 0) {
    const res = await packageIdsByCoachId(coach_id);
    allPackageIds = res?.data || [];
  }

  const packageDetails = await packageByPackageId(coach_id, package_id);
  if (!packageDetails || !Array.isArray(packageDetails.data) || packageDetails.data.length === 0) {
    return notFound();
  }

  const selectedPackage = packageDetails.data[0];
    return (
        <div>
            <ShowPackages
                pkg={selectedPackage} allPackages={allPackageIds}
            />
        </div>
    )
}