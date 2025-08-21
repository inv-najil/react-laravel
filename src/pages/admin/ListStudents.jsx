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
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import { Download } from "@mui/icons-material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { deleteStudent, exportStudent, importStudents } from "../../api/authService";
import useSnackbar from "../../hooks/useSnackbar";

export default function Students() {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const [importing, setImporting] = useState(false);
    const page = parseInt(searchParams.get("page")) || 1;
    const pageSize = 10;

    const { showSnackbar, SnackbarComponent } = useSnackbar();

    useEffect(() => {
        API.get(`/students?page=${page}`)
            .then(res => {
                setStudents(res.data.data);
                setTotalCount(res.data.total);
            })
            .catch(err => {
                console.error("failedto fetch", err);
                showSnackbar("Failed to fetch students", "error");
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
            showSnackbar("student deleted sucessfully", "success")
        } catch (err) {
            console.error("Failed to delete", err);
            showSnackbar("Failed to delete student", "error")

        }
    };

    const totalPages = Math.ceil(totalCount / pageSize);

    const handleExport = async () => {
        try {
            const response = await exportStudent();
            const blob = new Blob([response.data], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);
            showSnackbar(
                <a href={url} download="students.csv" style={{ color: "white" }}>
                    Click here to download CSV
                </a>,
                "success"
            );
        } catch (err) {
            console.error("Failed to export", err);
            showSnackbar("Failed to export students", "error");
        }
    }

    const handleImport = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append("file", file);

        try {
            setImporting(true);
            const response = await importStudents(formData);
            if (response.data.failures && response.data.failures.length > 0) {
                const errorMessage = response.data.failures.map(f =>
                    `Row ${f.row}:${f.errors.join(", ")}`).join('\n');
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
            const res = await API.get(`/students?page=${page}`);
            setStudents(res.data.data);
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
            {students.length === 0 ? (
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    py={5}
                    sx={{ color: "text.secondary" }}
                >
                    <PersonOffIcon />
                    <Typography variant="h6">No students</Typography>
                    <Typography variant="body2">
                        No Students Registered yet
                    </Typography>
                </Box>
            ) : (
                <>
                    <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold", color: "#ff9800" }}>
                        Students List
                    </Typography>
                    <Box display="flex" justifyContent="space-between" mb={2}>
                        <input
                            accept=".csv"
                            type="file"
                            id="import-students-file"
                            style={{ display: "none" }}
                            onChange={handleImport}
                        />
                        <label htmlFor="import-students-file">
                            <Button
                                variant="outlined"
                                component="span"
                                color="warning"
                                startIcon={<FileUploadIcon />}
                                disabled={importing}
                            >
                                {importing ? "Importing..." : "Import Students"}
                            </Button>
                        </label>
                        <Button variant="outlined"
                            color="warning"
                            startIcon={<Download />}
                            onClick={handleExport}
                        >
                            Export Students
                        </Button>
                    </Box>
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
                                                <IconButton onClick={() => navigate(`/admin/students/edit/${student.id}`)} sx={{ color: "#eceff1" }}>
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
                                            <IconButton onClick={() => navigate(`/admin/students/edit/${student.id}`)} sx={{ color: "#eceff1" }}>
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