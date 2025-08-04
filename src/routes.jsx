import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import AdminLayout from "./layouts/AdminLayout";
import StudentLayout from "./layouts/StudentLayout";
import TeacherLayout from "./layouts/TeacherLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import RegisterStudent from "./pages/admin/StudentRegister";
import RegisterTeacher from "./pages/admin/TeacherRegister";
import Students from "./pages/admin/ListStudents";
import EditStudent from "./pages/admin/EditStudent";
import Teachers from "./pages/admin/ListTeachers";
import EditTeacher from "./pages/admin/EditTeachers";
import AssingnedStudent from "./pages/teacher/AssingnedStudents";
import TeacherEditStudent from "./pages/teacher/TeacherEditStudent";
import ProtectedRoute from "./components/ProtectedRoutes";

const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    {
        path: "/admin",
        element: <ProtectedRoute allowedRole={"admin"}>
            <AdminLayout />
        </ProtectedRoute>,
        children: [
            { index: true, element: <AdminDashboard /> },
            { path: "register-student", element: <RegisterStudent /> },
            { path: "register-teacher", element: <RegisterTeacher /> },
            { path: "list-students", element: <Students /> },
            { path: "students/edit/:id", element: <EditStudent /> },
            { path: "list-teachers", element: <Teachers /> },
            { path: "teachers/edit/:id", element: <EditTeacher /> },

        ]
    },
    {
        path: "/teacher",
        element: <ProtectedRoute allowedRole={"teacher"}>
            <TeacherLayout />
        </ProtectedRoute>,
        children: [
            { index: true, element: <TeacherDashboard /> },
            { path: "list-students", element: <AssingnedStudent /> },
            { path: "students/edit/:id", element: <TeacherEditStudent /> },
        ]

    },
    {
        path: "/student",
        element: <ProtectedRoute allowedRole={"student"}>
            <StudentLayout />
        </ProtectedRoute>,
        children: [
            { index: true, element: <StudentDashboard /> }
        ]
    },
    { path: "*", element: <Login /> }
]);
export default router;