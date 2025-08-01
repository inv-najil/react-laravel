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
import { getStudentProfile } from "../../api/authService";
import { useEffect, useState } from "react";

export default function StudentDashboard() {
  const [student, setStudent] = useState([]);

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
    <Card sx={{ borderRadius: 3, boxShadow: 4, p: 2, backgroundColor: "#748DAE" }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 3, color: "white" }}>
          Hi Student, {student.first_name} {student.last_name}
        </Typography>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: "#9ECAD6" }}>
              <TableRow>
                <TableCell sx={{ color: "black", fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ color: "black", fontWeight: "bold" }}>Roll Number</TableCell>
                <TableCell sx={{ color: "black", fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ color: "black", fontWeight: "bold" }}>Class</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                hover
                sx={{
                  "&:hover": { backgroundColor: "#f0f4ff" },
                }}
              >
                <TableCell>{student.first_name} {student.last_name}</TableCell>
                <TableCell>{student.roll_num}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.class_grade}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
