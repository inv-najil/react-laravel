import {
  Typography,
  Grid,
  Card,
  CardContent
} from "@mui/material";
import { useState, useEffect } from "react";
import { getTotalCount } from "../../api/authService";

export default function AdminDashboard() {
  const [count, setCount] = useState({ teachers: 0, students: 0 });
  useEffect(() => {
    getTotalCount()
      .then(res => {
        setCount(res.data);
        console.log(res.data);
      })
      .catch(err => {
        console.error("Error in fetching", err);
        alert("Error in getting count");
      })
  }, [])
  return (
    <Grid container spacing={3} sx={{ minHeight: "100vh" }}>
      <Grid item xs={6}>
        <Card sx={{ backgroundColor: "#748DAE", boxShadow: 3, borderRadius: 3, color: "white" }}>
          <CardContent>
            <Typography variant="h6">Total Teacher</Typography>
            <Typography variant="h4">{count.teachers}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card sx={{ backgroundColor: "#748DAE", boxShadow: 3, borderRadius: 3, color: "white" }}>
          <CardContent>
            <Typography variant="h6">Total Students</Typography>
            <Typography variant="h4">{count.students}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
