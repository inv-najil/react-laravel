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
      })
      .catch(err => {
        console.error("Error in fetching", err);
        alert("Error in getting count");
      })
  }, [])
  return (
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
  );
}
