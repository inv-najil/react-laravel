import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
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
            <Typography variant="h5" sx={{ mb: 2 }}>
                Students List
            </Typography>

            <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>First Name</strong></TableCell>
                            <TableCell><strong>Last Name</strong></TableCell>
                            <TableCell><strong>Roll No</strong></TableCell>
                            <TableCell><strong>Email</strong></TableCell>
                            <TableCell><strong>Teacher ID</strong></TableCell>
                            <TableCell><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map(student => (
                            <TableRow key={student.id}>
                                <TableCell>{student.first_name}</TableCell>
                                <TableCell>{student.last_name}</TableCell>
                                <TableCell>{student.roll_num}</TableCell>
                                <TableCell>{student.email}</TableCell>
                                <TableCell>{student.teacher_id}</TableCell>
                                <TableCell>
                                    <Tooltip title="Edit">
                                        <IconButton onClick={() => navigate(`/admin/students/edit/${student.id}`)}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton onClick={() => handleDelete(student.id)}>
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