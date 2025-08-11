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
            <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold", color: "#ff9800" }}>
                Teachers List
            </Typography>

            <TableContainer sx={{ overflowX: "auto", backgroundColor: "#263238" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold", color: "#ff9800" }}>First Name</TableCell>
                            <TableCell sx={{ fontWeight: "bold", color: "#ff9800" }}>Last Name</TableCell>
                            <TableCell sx={{ fontWeight: "bold", color: "#ff9800" }}>Emp No</TableCell>
                            <TableCell sx={{ fontWeight: "bold", color: "#ff9800" }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: "bold", color: "#ff9800" }}>Subject</TableCell>
                            <TableCell sx={{ fontWeight: "bold", color: "#ff9800" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teachers.map(teacher => (
                            <TableRow key={teacher.id}>
                                <TableCell sx={{ color: "#eceff1" }}>{teacher.first_name}</TableCell>
                                <TableCell sx={{ color: "#eceff1" }}>{teacher.last_name}</TableCell>
                                <TableCell sx={{ color: "#eceff1" }}>{teacher.emp_id}</TableCell>
                                <TableCell sx={{ color: "#eceff1" }}>{teacher.email}</TableCell>
                                <TableCell sx={{ color: "#eceff1" }}>{teacher.subject_specialization}</TableCell>

                                <TableCell>
                                    <Tooltip title="Edit">
                                        <IconButton onClick={() => navigate(`/admin/teachers/edit/${teacher.id}`)} sx={{ color: "#eceff1" }}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton onClick={() => handleDelete(teacher.id)} sx={{ color: "#eceff1" }}>
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