import {
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { useState, useEffect } from "react";
import { getTeacherProfile } from "../../api/authService";


export default function TeacherDashboard() {

  const [teacher, setTeacher] = useState([]);
  useEffect(() => {
    getTeacherProfile()
      .then(res => {
        setTeacher(res.data);
      })
      .catch(err => {
        console.error("Failed to fetch", err);
        alert("Failed to fetch");
      })
  }, [])
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 4, p: 2, backgroundColor: "#748DAE" }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 3, color: "white" }}>
          Hi Teacher, {teacher.first_name} {teacher.last_name}
        </Typography>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: "#9ECAD6" }}>
              <TableRow>
                <TableCell sx={{ color: "black", fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ color: "black", fontWeight: "bold" }}>Emp Number</TableCell>
                <TableCell sx={{ color: "black", fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ color: "black", fontWeight: "bold" }}>Subject</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                hover
                sx={{
                  "&:hover": { backgroundColor: "#f0f4ff" },
                }}
              >
                <TableCell>{teacher.first_name} {teacher.last_name}</TableCell>
                <TableCell>{teacher.emp_id}</TableCell>
                <TableCell>{teacher.email}</TableCell>
                <TableCell>{teacher.subject_specialization}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
