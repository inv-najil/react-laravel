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
    Tooltip
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteStudent, getTeacherProfile, getTeacherStudents } from "../../api/authService";

export default function AssingnedStudent() {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
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
                alert("Failed to fetch")
            }
        };
        fetchData();
    }, [])

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure u want to delete this student?")) return;
        try {
            await deleteStudent(id);
            setStudents(prev => prev.filter(student => student.id != id));
        }
        catch (error) {
            console.error("Failed to delete the student", error);
            alert("failed to delete")
        }
    };


    return (
        <Card sx={{ borderRadius: 3, boxShadow: 4, backgroundColor: "#263238" }}>
            <CardContent>
                <Typography variant="h4" sx={{ color: "#ff9800", fontWeight: "bold" }} gutterBottom>
                    Students
                </Typography>
                <TableContainer sx={{ overflowX: "auto" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: "#ff9800", fontWeight: "bold" }}>Name</TableCell>
                                <TableCell sx={{ color: "#ff9800", fontWeight: "bold" }}>Email</TableCell>
                                <TableCell sx={{ color: "#ff9800", fontWeight: "bold" }}>Phone</TableCell>
                                <TableCell sx={{ color: "#ff9800", fontWeight: "bold" }}>Roll Number</TableCell>
                                <TableCell sx={{ color: "#ff9800", fontWeight: "bold" }}>Class</TableCell>
                                <TableCell sx={{ color: "#ff9800", fontWeight: "bold" }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.map(student => (
                                <TableRow key={student.id}>
                                    <TableCell sx={{ color: "#eceff1" }}>{student.first_name} {student.last_name}</TableCell>
                                    <TableCell sx={{ color: "#eceff1" }}>{student.email}</TableCell>
                                    <TableCell sx={{ color: "#eceff1" }}>{student.phone}</TableCell>
                                    <TableCell sx={{ color: "#eceff1" }}>{student.roll_num}</TableCell>
                                    <TableCell sx={{ color: "#eceff1" }}>{student.class_grade}</TableCell>
                                    <TableCell>
                                        <Tooltip title="edit">
                                            <IconButton onClick={() => { navigate(`/teacher/students/edit/${student.id}`) }} sx={{ color: "#eceff1" }}>
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="delete">
                                            <IconButton onClick={() => { handleDelete(student.id) }} sx={{ color: "#eceff1" }}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )
}