import { Button, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Welcome Admin
      </Typography>
    </>
  );
}
