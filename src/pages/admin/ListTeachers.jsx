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
    Tooltip,
    Card,
    CardContent,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { deleteTeacher } from "../../api/authService";
import useSnackbar from "../../hooks/useSnackbar";

export default function Teachers() {
    const navigate = useNavigate();
    const [teachers, setTeachers] = useState([]);;
    const [totalCount, setTotalCount] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page")) || 1;
    const pageSize = 10;

    const { showSnackbar, SnackbarComponent } = useSnackbar();

    useEffect(() => {
        API.get(`/teachers?page=${page}`)
            .then(res => {
                setTeachers(res.data.data);
                setTotalCount(res.data.total);
            })
            .catch(err => {
                console.error("Failed to fetch", err);
                showSnackbar("Failed to fetch teacher", "error")
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
            showSnackbar("Teacher deleted successfully", "success");
        }
        catch (err) {
            console.error("Failed to delte", err);
            showSnackbar("Failed to delte Teacher", "error");
        }
    };

    const totalPages = Math.ceil(totalCount / pageSize);
    return (
        <Box>
            {teachers.length === 0 ? (
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    py={5}
                    sx={{ color: "text.secondary" }}
                >
                    <PersonOffIcon />
                    <Typography variant="h6">No Teachers</Typography>
                    <Typography variant="body2">
                        No Teachers Registered yet
                    </Typography>
                </Box>
            ) : (
                <>
                    <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold", color: "#ff9800" }}>
                        Teachers List
                    </Typography>

                    <TableContainer sx={{
                        overflowX: "auto",
                        backgroundColor: "#263238",
                        display: { xs: "none", md: "block" }
                    }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: "bold", color: "#ff9800" }}>First Name</TableCell>
                                    <TableCell sx={{ fontWeight: "bold", color: "#ff9800" }}>Last Name</TableCell>
                                    <TableCell sx={{ fontWeight: "bold", color: "#ff9800" }}>Email</TableCell>
                                    <TableCell sx={{ fontWeight: "bold", color: "#ff9800" }}>Phone Number</TableCell>
                                    <TableCell sx={{ fontWeight: "bold", color: "#ff9800" }}>Emp No</TableCell>
                                    <TableCell sx={{ fontWeight: "bold", color: "#ff9800" }}>Joining Date</TableCell>
                                    <TableCell sx={{ fontWeight: "bold", color: "#ff9800" }}>Subject</TableCell>
                                    <TableCell sx={{ fontWeight: "bold", color: "#ff9800" }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {teachers.map(teacher => (
                                    <TableRow key={teacher.id}>
                                        <TableCell sx={{ color: "#eceff1" }}>{teacher.first_name}</TableCell>
                                        <TableCell sx={{ color: "#eceff1" }}>{teacher.last_name}</TableCell>
                                        <TableCell sx={{ color: "#eceff1" }}>{teacher.email}</TableCell>
                                        <TableCell sx={{ color: "#eceff1" }}>{teacher.phone}</TableCell>
                                        <TableCell sx={{ color: "#eceff1" }}>{teacher.emp_id}</TableCell>
                                        <TableCell sx={{ color: "#eceff1" }}>{teacher.date_of_joining}</TableCell>
                                        <TableCell sx={{ color: "#eceff1" }}>{teacher.subject_specialization}</TableCell>

                                        <TableCell>
                                            <Tooltip title="Edit">
                                                <IconButton onClick={() => navigate(`/admin/teachers/edit/${teacher.id}`)} sx={{ color: "#eceff1" }}>
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton onClick={() => handleDelete(teacher.id)} sx={{ color: "#eceff1" }}>
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
                        {teachers.map(teacher => (
                            <Card
                                key={teacher.id}
                                sx={{ mb: 2, backgroundColor: "#263238", color: "#eceff1" }}
                            >
                                <CardContent>
                                    <Typography variant="h6">{teacher.first_name} {teacher.last_name}</Typography>
                                    <Typography>Email: {teacher.email}</Typography>
                                    <Typography>Phone: {teacher.phone}</Typography>
                                    <Typography>Employee Id: {teacher.emp_id}</Typography>
                                    <Typography>Subject: {teacher.subject_specialization}</Typography>
                                    <Typography>Joining Date: {teacher.date_of_joining}</Typography>
                                    <Box sx={{ mt: 1 }}>
                                        <Tooltip title="Edit">
                                            <IconButton onClick={() => navigate(`/admin/teachers/edit/${teacher.id}`)} sx={{ color: "#eceff1" }}>
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton onClick={() => handleDelete(teacher.id)} sx={{ color: "#eceff1" }}>
                                                <PersonRemoveOutlinedIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                    <Box display="flex" justifyContent="center" sx={{ mt: 3 }}>
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </Box>
                </>
            )}
            {SnackbarComponent}
        </Box>
    );
}