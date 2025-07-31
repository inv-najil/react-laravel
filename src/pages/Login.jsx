import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Paper } from "@mui/material";
import { loginAPI } from "../api/authService";
import { getStoredUser } from "../utils/auth";

export default function Login() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (formData) => {
        try {
            const response = await loginAPI(formData);
            localStorage.setItem("user", JSON.stringify({
                access: response.data.token,
                user: response.data.user,
            }));
            const { role } = response.data.user;
            navigate(`/${role}`);
        } catch (err) {
            alert("Invalid email or password");
        }
    };
    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Login
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        fullWidth
                        label="Email"
                        margin="normal"
                        {...register("email", { required: "Email is required" })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        margin="normal"
                        {...register("password", { required: "Password is required" })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                    >
                        Login
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}