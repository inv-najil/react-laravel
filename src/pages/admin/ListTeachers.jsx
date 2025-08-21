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
    Button,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { Download } from "@mui/icons-material";
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { deleteTeacher, exportTeacher, importTeachers } from "../../api/authService";
import useSnackbar from "../../hooks/useSnackbar";

export default function Teachers() {
    const navigate = useNavigate();
    const [teachers, setTeachers] = useState([]);;
    const [totalCount, setTotalCount] = useState(0);
    const [importing, setImporting] = useState(false);
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

    const handleExport = async () => {
        try {
            const response = await exportTeacher();
            const blob = new Blob([response.data], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);
            showSnackbar(
                <a href={url} download="teachers.csv" style={{ color: "white" }}>
                    Click Here to download csv
                </a>, "success"
            )
        } catch (err) {
            console.error("Failed to download", err);
            showSnackbar("Error in downloading the csv", "error");
        }

    };

    const handleImport = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append("file", file);
        try {
            setImporting(true);
            const response = await importTeachers(formData);
            if (response.data.failures && response.data.failures.length > 0) {
                const errorMessage = response.data.failures.map(f =>
                    `Row ${f.row}:${f.errors.join(", ")}`).join("\n");
                showSnackbar(
                    <>
                        {response.data.message} <br />
                        <pre style={{ whiteSpace: "pre-wrap" }}>{errorMessage}</pre>
                    </>,
                    "error"
                );
            } else {
                showSnackbar(response.data.message, "success");
            }
            const res = await API.get(`/teachers?page=${page}`);
            setTeachers(res.data.data);
            setTotalCount(res.data.total);
        } catch (err) {
            console.error("Failed to import", err);
            showSnackbar("Import failed", "error");
        }
        finally {
            setImporting(false);
            event.target.value = "";
        }
    }

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
                    <Box display="flex" justifyContent="space-between" mb={2}>
                        <input
                            accept=".csv"
                            type="file"
                            id="import-teacher-file"
                            onChange={handleImport}
                            style={{ display: "none" }}

                        />
                        <label htmlFor="import-teacher-file">
                            <Button
                                component="span"
                                variant="outlined"
                                color="warning"
                                disabled={importing}
                                startIcon={<FileUploadIcon />}
                            >
                                {importing ? "Importing..." : "Import Teacher"}
                            </Button>
                        </label>
                        <Button
                            variant="outlined"
                            color="warning"
                            startIcon={<Download />}
                            onClick={handleExport}
                        >
                            Export Teacher
                        </Button>
                    </Box>

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