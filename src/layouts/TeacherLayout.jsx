import { Outlet } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";

export default function TeacherLayout() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
