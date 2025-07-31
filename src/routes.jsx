import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import AdminLayout from "./layouts/AdminLayout";
import StudentLayout from "./layouts/StudentLayout";
import TeacherLayout from "./layouts/TeacherLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import RegisterStudent from "./pages/admin/StudentRegister";

const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            { index: true, element: <AdminDashboard /> },
            { path: "register-student", element: <RegisterStudent /> },
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