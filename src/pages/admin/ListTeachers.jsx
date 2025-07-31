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
import { deleteTeacher } from "../../api/authService";
export default function Teachers() {
    const navigate = useNavigate();
    const [teachers, setTeachers] = useState([]);;
    const [totalCount, setTotalCount] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page")) || 1;
    const pageSize = 10;
    useEffect(() => {
        API.get(`/teachers?page=${page}`)
            .then(res => {
                setTeachers(res.data.data);
                setTotalCount(res.data.total);
            })
            .catch(err => {
                console.error("Failed to fetch", err);
                alert("Failed to list Teachers");
                setTeachers([]);
            })
    }, [page]);

    const handlePageChange = (event, value) => {
        setSearchParams({ page: value });
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you wanna delete the teacher?")) return;
        try {
            await deleteTeacher(id);
            setTeachers(prev => prev.filter(teacher => teacher.id != id));
        }
        catch (err) {
            console.error("Failed to delte", err);
            alert("Failed to delete");
        }
    };

    const totalPages = Math.ceil(totalCount / pageSize);
    return (
        <Box>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Teachers List
            </Typography>

            <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>First Name</strong></TableCell>
                            <TableCell><strong>Last Name</strong></TableCell>
                            <TableCell><strong>Emp No</strong></TableCell>
                            <TableCell><strong>Email</strong></TableCell>
                            <TableCell><strong>Subject</strong></TableCell>
                            <TableCell><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teachers.map(teacher => (
                            <TableRow key={teacher.id}>
                                <TableCell>{teacher.first_name}</TableCell>
                                <TableCell>{teacher.last_name}</TableCell>
                                <TableCell>{teacher.emp_id}</TableCell>
                                <TableCell>{teacher.email}</TableCell>
                                <TableCell>{teacher.subject_specialization}</TableCell>

                                <TableCell>
                                    <Tooltip title="Edit">
                                        <IconButton onClick={() => navigate(`/admin/teachers/edit/${teacher.id}`)}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton onClick={() => handleDelete(teacher.id)}>
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