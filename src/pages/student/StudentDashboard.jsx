import {
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { getStudentProfile } from "../../api/authService";
import { useEffect, useState } from "react";
import useSnackbar from "../../hooks/useSnackbar";

export default function StudentDashboard() {
  const [student, setStudent] = useState([]);
  const {showSnackbar, SnackbarComponent} = useSnackbar();

  useEffect(() => {
    getStudentProfile()
      .then(res => {
        setStudent(res.data);
      })
      .catch(err => {
        console.error("Failed to fetch", err);
        showSnackbar("Failed to get profile", "error")
      });
  }, []);
  return (
    <>
      <Card sx={{ borderRadius: 3, boxShadow: 4, p: 2, backgroundColor: "#263238" }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 3, color: "#eceff1", fontWeight: "bold" }}>
            Hi Student, {student.first_name} {student.last_name}
          </Typography>
          <Typography variant="body1" sx={{ mt: 3, color: "#ff9800", fontWeight: "bold" }}>
            Email :
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#eceff1" }}>
            {student.email}
          </Typography>
          <Typography variant="body1" sx={{ mt: 3, color: "#ff9800", fontWeight: "bold" }}>
            Roll Number :
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#eceff1" }}>
            {student.roll_num}
          </Typography>
          <Typography variant="body1" sx={{ mt: 3, color: "#ff9800", fontWeight: "bold" }}>
            Class :
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#eceff1" }}>
            {student.class_grade}
          </Typography>
        </CardContent>
      </Card>
     {SnackbarComponent}
    </>
  );
}
