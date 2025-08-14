import {
  Typography,
  Card,
  CardContent,
  Snackbar,
  Alert

} from "@mui/material";
import { getStudentProfile } from "../../api/authService";
import { useEffect, useState } from "react";

export default function StudentDashboard() {
  const [student, setStudent] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity
    })
  }

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
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={() => { setSnackbar({ ...snackbar, open: false }) }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={() => { setSnackbar({ ...snackbar, open: false }) }}
          sx={{ maxWidth: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
