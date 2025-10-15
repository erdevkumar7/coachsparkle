// app/coach/update-service-package/[package_id]/page.js
import UpdateServicePackageForm from "@/app/coach/_coach_components/UpdateServicePackageForm";
import "../../../_styles/coach_packages.css";
import { getAllMasters } from "@/app/api/guest";

export default async function UpdateServicePackage() {

   const allMasters = await getAllMasters() || {};
   // console.log('alll', allMasters)
 

   return (
      <UpdateServicePackageForm allMasters={allMasters}/>
   );
}