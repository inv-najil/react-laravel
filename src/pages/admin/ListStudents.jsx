import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box,
    Typography,
    Pagination,
    IconButton,
    Tooltip
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { deleteStudent } from "../../api/authService";

export default function Students() {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page")) || 1;
    const pageSize = 10;

    useEffect(() => {
        API.get(`/students?page=${page}`)
            .then(res => {
                setStudents(res.data.data);
                setTotalCount(res.data.total);
            })
            .catch(err => {
                console.error("failedto fetch", err);
                alert("Failed to list")
                setStudents([]);
            })
    }, [page]);

    const handlePageChange = (event, value) => {
        setSearchParams({ page: value });
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure u wanna delete this studenten?")) return;
        try {
            await deleteStudent(id);
            setStudents(prev => prev.filter(student => student.id !== id));
        } catch (err) {
            console.error("Failed to delete", err);
            alert("failed to delete");

        }
    };

    const totalPages = Math.ceil(totalCount / pageSize);
    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold", color: "#ff9800" }}>
                Students List
            </Typography>

            <TableContainer  sx={{ backgroundColor: "#263238", overflowX: "auto" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: "#ff9800", fontWeight: "bold" }}>First Name</TableCell>
                            <TableCell sx={{ color: "#ff9800", fontWeight: "bold" }}>Last Name</TableCell>
                            <TableCell sx={{ color: "#ff9800", fontWeight: "bold" }}>Roll No</TableCell>
                            <TableCell sx={{ color: "#ff9800", fontWeight: "bold" }}>Email</TableCell>
                            <TableCell sx={{ color: "#ff9800", fontWeight: "bold" }}>Teacher ID</TableCell>
                            <TableCell sx={{ color: "#ff9800", fontWeight: "bold" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map(student => (
                            <TableRow key={student.id}>
                                <TableCell sx={{ color: "#eceff1" }}>{student.first_name}</TableCell>
                                <TableCell sx={{ color: "#eceff1" }}>{student.last_name}</TableCell>
                                <TableCell sx={{ color: "#eceff1" }}>{student.roll_num}</TableCell>
                                <TableCell sx={{ color: "#eceff1" }}>{student.email}</TableCell>
                                <TableCell sx={{ color: "#eceff1" }}>{student.teacher_id}</TableCell>
                                <TableCell>
                                    <Tooltip title="Edit">
                                        <IconButton onClick={() => navigate(`/admin/students/edit/${student.id}`)} sx={{ color: "#eceff1" }}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton onClick={() => handleDelete(student.id)} sx={{ color: "#eceff1" }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box display="flex" justifyContent="center" sx={{ mt: 3 }}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </Box>
    );
}