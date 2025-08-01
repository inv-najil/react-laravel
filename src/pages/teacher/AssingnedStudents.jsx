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
import { deleteStudent, getTeacherById, getTeacherProfile, getTeacherStudents } from "../../api/authService";

export default function AssingnedStudent() {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getTeacherProfile();
                console.log(res);
                const teacherId = res.data.id;
                console.log(teacherId);
                const studentres = await getTeacherStudents(teacherId);
                console.log(studentres.data.data);
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
        <Card sx={{ borderRadius: 3, boxShadow: 4, backgroundColor: "#748DAE" }}>
            <CardContent>
                <TableContainer>
                    <Table>
                        <TableHead sx={{ backgroundColor: "#9ECAD6" }}>
                            <TableRow>
                                <TableCell sx={{ color: "black", fontWeight: "bold" }}>Name</TableCell>
                                <TableCell sx={{ color: "black", fontWeight: "bold" }}>Roll Number</TableCell>
                                <TableCell sx={{ color: "black", fontWeight: "bold" }}>Class</TableCell>
                                <TableCell sx={{ color: "black", fontWeight: "bold" }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.map(student => (
                                <TableRow key={student.id} hover sx={{
                                    "&:hover": { backgroundColor: "#f0f4ff" },
                                }}>
                                    <TableCell sx={{ color: "white" }}>{student.first_name} {student.last_name}</TableCell>
                                    <TableCell sx={{ color: "white" }}>{student.roll_num}</TableCell>
                                    <TableCell sx={{ color: "white" }}>{student.class_grade}</TableCell>
                                    <TableCell>
                                        <Tooltip title="edit">
                                            <IconButton onClick={() => { navigate(`/teacher/students/edit/${student.id}`) }}>
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="delete">
                                            <IconButton onClick={() => { handleDelete(student.id) }}>
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