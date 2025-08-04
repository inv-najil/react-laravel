import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Paper } from "@mui/material";
import { loginAPI } from "../api/authService";
import { getStoredUser } from "../utils/auth";
import { useAuth } from "../context/AuthContext";
export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (formData) => {
        try {
            const response = await loginAPI(formData);
            const { token, user, role } = response.data;
            login({ user, token });
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
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                                message: "Invalid email format",
                            },
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        margin="normal"
                    />


                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        margin="normal"
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