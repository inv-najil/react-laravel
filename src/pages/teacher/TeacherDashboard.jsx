import {
  Typography,
  Paper,
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
    <TableContainer component={Paper} sx={{ overflowX: "auto", p: 2 }}>
      {teacher && (
        <Typography variant="h5" sx={{ mb: 3 }}>
          Hi Teacher,{teacher.first_name} {teacher.last_name}
        </Typography>
      )}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Emp Number</strong></TableCell>
            <TableCell><strong>Email</strong></TableCell>
            <TableCell><strong>Subject</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teacher && (
            <TableRow key={teacher.id}>
              <TableCell>{teacher.first_name} {teacher.last_name}</TableCell>
              <TableCell>{teacher.emp_id}</TableCell>
              <TableCell>{teacher.email}</TableCell>
              <TableCell>{teacher.subject_specialization}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
