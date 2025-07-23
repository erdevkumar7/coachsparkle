import BookingPackage from "@/app/(guest)/_components/booking/BookingPackage";
import '../../../_styles/coach_packages.css';
import { packageByPackageId } from "@/app/api/coach";

export default async function CoachPackageById({ params }) {

    const { id } = await params;
    let packages;
    const packageDetails = await packageByPackageId(id)
    if(packageDetails){
        packages = packageDetails.data[0];
    }
    // console.log('package', packageDetails)

    return (
        <div>
            <BookingPackage pkg={packages}/>
        </div>
    )
}