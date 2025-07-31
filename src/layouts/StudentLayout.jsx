import { Outlet } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

export default function StudentLayout() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}