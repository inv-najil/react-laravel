import {
  Typography,
  Grid,
  Card,
  CardContent,
  Snackbar,
  Alert
} from "@mui/material";
import { useState, useEffect } from "react";
import { getTotalCount } from "../../api/authService";

export default function AdminDashboard() {
  const [count, setCount] = useState({ teachers: 0, students: 0 });
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
    getTotalCount()
      .then(res => {
        setCount(res.data);
      })
      .catch(err => {
        console.error("Error in fetching", err);
        showSnackbar("Failed to fetch count", "error");
      })
  }, [])
  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "#ff9800", mb: 3 }}>
        Welcome, Admin
      </Typography>
      <Grid container
        direction="row"
        spacing={3}
        sx={{
          justifyContent: "flex-start",
        }}>
        <Grid item xs={6}>
          <Card sx={{ backgroundColor: "#263238", boxShadow: 3, borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: "#ff9800" }}>Total Teacher</Typography>
              <Typography variant="h4" sx={{ color: "#eceff1" }}>{count.teachers}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ backgroundColor: "#263238", boxShadow: 3, borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: "#ff9800" }}>Total Students</Typography>
              <Typography variant="h4" sx={{ color: "#eceff1" }}>{count.students}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => { setSnackbar({ ...snackbar, open: false }) }}
      >
        <Alert
          onClose={() => { setSnackbar({ ...snackbar, open: false }) }}
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
