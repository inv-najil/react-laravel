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
import { getStudentProfile } from "../../api/authService";
import { useEffect, useState } from "react";

export default function StudentDashboard() {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    getStudentProfile()
      .then(res => {
        setStudent(res.data);
      })
      .catch(err => {
        console.error("Failed to fetch", err);
        alert("Failed to fetch student profile");
      });
  }, []);

  return (
    <TableContainer component={Paper} sx={{ overflowX: "auto", p: 2 }}>
      {student && (
        <Typography variant="h5" sx={{ mb: 3 }}>
          Hi {student.first_name}
        </Typography>
      )}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Roll Number</strong></TableCell>
            <TableCell><strong>Email</strong></TableCell>
            <TableCell><strong>Class</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {student && (
            <TableRow key={student.id}>
              <TableCell>{student.first_name} {student.last_name}</TableCell>
              <TableCell>{student.roll_num}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.class_grade}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
