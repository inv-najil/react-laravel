import {
  Typography,
  Card,
  CardContent,
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
    <Card sx={{ borderRadius: 3, boxShadow: 4, p: 2, backgroundColor: "#263238" }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 3, color: "#eceff1", fontWeight: "bold" }}>
          Hi Teacher, {teacher.first_name} {teacher.last_name}
        </Typography>
        <Typography variant="body2" sx={{ mt: 3, color: "#ff9800", fontWeight: "bold" }}>
          Email :
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "#eceff1" }}>
          {teacher.email}
        </Typography>
        <Typography variant="body2" sx={{ mt: 3, color: "#ff9800", fontWeight: "bold" }}>
          Employee ID :
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "#eceff1" }}>
          {teacher.emp_id}
        </Typography>
        <Typography variant="body2" sx={{ mt: 3, color: "#ff9800", fontWeight: "bold" }}>
          Subject :
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "#eceff1" }}>
          {teacher.subject_specialization}
        </Typography>
      </CardContent>
    </Card>
  );
}
