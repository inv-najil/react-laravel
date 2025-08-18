import {
    Typography,
    Card,
    CardContent,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    IconButton,
    Tooltip,
    Box,
    Snackbar,
    Alert
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteStudent, getTeacherProfile, getTeacherStudents } from "../../api/authService";

export default function AssingnedStudent() {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    const showSnackbar = (message, severity = "success") => {
        setSnackbar({
            open: true,
            message,
            severity
        })
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getTeacherProfile();
                const teacherId = res.data.id;
                const studentres = await getTeacherStudents(teacherId);
                setStudents(studentres.data.data);
            }
            catch (error) {
                console.log("failed to fetch", error);
                showSnackbar("Failed to fetch profile", "error");
            }
        };
        fetchData();
    }, [])

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure u want to delete this student?")) return;
        try {
            await deleteStudent(id);
            setStudents(prev => prev.filter(student => student.id != id));
            showSnackbar("Student deleted Sucessfully", "success");
        }
        catch (error) {
            console.error("Failed to delete the student", error);
            showSnackbar("Failed to delete student", "error");
        }
    };
    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold", color: "#ff9800" }}>
                Students List
            </Typography>

            <TableContainer sx={{
                backgroundColor: "#263238",
                overflowX: "auto",
                maxWidth: "100%",
                display: { xs: "none", md: "block" }
            }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: "#ff9800", fontWeight: "bold" }}>First Name</TableCell>
                            <TableCell sx={{ color: "#ff9800", fontWeight: "bold" }}>Last Name</TableCell>
                            <TableCell sx={{ color: "#ff9800", fontWeight: "bold" }}>Email</TableCell>
                            <TableCell sx={{ color: "#ff9800", fontWeight: "bold" }}>Phone</TableCell>
                            <TableCell sx={{ color: "#ff9800", fontWeight: "bold" }}>Roll No</TableCell>
                            <TableCell sx={{ color: "#ff9800", fontWeight: "bold" }}>Class</TableCell>
                            <TableCell sx={{ color: "#ff9800", fontWeight: "bold" }}>Date of Birth</TableCell>
                            <TableCell sx={{ color: "#ff9800", fontWeight: "bold" }}>Admission Date</TableCell>
                            <TableCell sx={{ color: "#ff9800", fontWeight: "bold" }}>Teacher ID</TableCell>
                            <TableCell sx={{ color: "#ff9800", fontWeight: "bold" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map(student => (
                            <TableRow key={student.id}>
                                <TableCell sx={{ color: "#eceff1" }}>{student.first_name}</TableCell>
                                <TableCell sx={{ color: "#eceff1" }}>{student.last_name}</TableCell>
                                <TableCell sx={{ color: "#eceff1" }}>{student.email}</TableCell>
                                <TableCell sx={{ color: "#eceff1" }}>{student.phone}</TableCell>
                                <TableCell sx={{ color: "#eceff1" }}>{student.roll_num}</TableCell>
                                <TableCell sx={{ color: "#eceff1" }}>{student.class_grade}</TableCell>
                                <TableCell sx={{ color: "#eceff1" }}>{student.dob}</TableCell>
                                <TableCell sx={{ color: "#eceff1" }}>{student.admission_date}</TableCell>
                                <TableCell sx={{ color: "#eceff1" }}>{student.teacher_id}</TableCell>
                                <TableCell>
                                    <Tooltip title="Edit">
                                        <IconButton onClick={() => navigate(`/teacher/students/edit/${student.id}`)} sx={{ color: "#eceff1" }}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton onClick={() => handleDelete(student.id)} sx={{ color: "#eceff1" }}>
                                            <PersonRemoveOutlinedIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ display: { xs: "block", md: "none" } }}>
                {students.map(student => (
                    <Card
                        key={student.id}
                        sx={{ mb: 2, backgroundColor: "#263238", color: "#eceff1" }}
                    >
                        <CardContent>
                            <Typography variant="h6">
                                {student.first_name} {student.last_name}
                            </Typography>
                            <Typography>Email: {student.email}</Typography>
                            <Typography>Phone: {student.phone}</Typography>
                            <Typography>Roll No: {student.roll_num}</Typography>
                            <Typography>Class: {student.class_grade}</Typography>
                            <Typography>DOB: {student.dob}</Typography>
                            <Typography>Admission: {student.admission_date}</Typography>
                            <Typography>Teacher Assigned: {student.teacher_id}</Typography>
                            <Box sx={{ mt: 1 }}>
                                <Tooltip title="Edit">
                                    <IconButton onClick={() => navigate(`/teacher/students/edit/${student.id}`)} sx={{ color: "#eceff1" }}>
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete">
                                    <IconButton onClick={() => handleDelete(student.id)} sx={{ color: "#eceff1" }}>
                                        <PersonRemoveOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>
            <Snackbar
                open={snackbar.open}
                onClose={() => { setSnackbar({ ...snackbar, open: false }) }}
                autoHideDuration={5000}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={() => { setSnackbar({ ...snackbar, opne: false }) }}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ maxWidth: "100%" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}