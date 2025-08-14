import {
  Typography,
  Card,
  CardContent,
  Snackbar,
  Alert
} from "@mui/material";
import { useState, useEffect } from "react";
import { getTeacherProfile } from "../../api/authService";


export default function TeacherDashboard() {

  const [teacher, setTeacher] = useState([]);
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
  };

  useEffect(() => {
    getTeacherProfile()
      .then(res => {
        setTeacher(res.data);
      })
      .catch(err => {
        console.error("Failed to fetch", err);
        showSnackbar("Failed to Fetch Profile", "error");
      })
  }, [])
  return (
    <>
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
      <Snackbar
        onClose={() => { setSnackbar({ ...snackbar, open: false }) }}
        open={snackbar.open}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => { setSnackbar({ ...snackbar, open: flase }) }}
          severity={snackbar.severity}
          variant="filled"
          sx={{ maxWidth: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
