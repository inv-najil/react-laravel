import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import AdminLayout from "./layouts/AdminLayout";
import StudentLayout from "./layouts/StudentLayout";
import TeacherLayout from "./layouts/TeacherLayout";
import AdminDashboard from "./admin/AdminDashboard";
import StudentDashboard from "./student/StudentDashboard";
import TeacherDashboard from "./teacher/TeacherDashboard";

const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            { index: true, element: <AdminDashboard /> },
        ]
    },
    {
        path: "/teacher",
        element: <TeacherLayout />,
        children: [
            { index: true, element: <TeacherDashboard /> }
        ]

    },
    {
        path: "/student",
        element: <StudentLayout />,
        children: [
            { index: true, element: <StudentDashboard /> }
        ]
    },
    { path: "*", element: <Login /> }
]);
export default router;