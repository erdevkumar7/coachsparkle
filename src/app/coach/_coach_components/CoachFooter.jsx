"use client";
import { FRONTEND_BASE_URL } from "@/config/url_config";

export default function UserFooter() {
  return (
    <>
      <script src={`${FRONTEND_BASE_URL}/assets/vendors/js/vendor.bundle.base.js`}></script>
      <script src={`${FRONTEND_BASE_URL}/assets/vendors/chart.js/chart.umd.js`}></script>
      <script src={`${FRONTEND_BASE_URL}/assets/vendors/datatables.net/jquery.dataTables.js`}></script>
      <script src={`${FRONTEND_BASE_URL}/assets/vendors/datatables.net-bs5/dataTables.bootstrap5.js`}></script>
      <script src={`${FRONTEND_BASE_URL}/assets/js/dataTables.select.min.js`}></script>
      <script src={`${FRONTEND_BASE_URL}/assets/js/off-canvas.js`}></script>
      <script src={`${FRONTEND_BASE_URL}/assets/js/template.js`}></script>
      <script src={`${FRONTEND_BASE_URL}/assets/js/settings.js`}></script>
      <script src={`${FRONTEND_BASE_URL}/assets/js/todolist.js`}></script>
      <script src={`${FRONTEND_BASE_URL}/assets/js/jquery.cookie.js`}></script>
      <script src={`${FRONTEND_BASE_URL}/assets/js/dashboard.js`}></script>
    </>
  );
}