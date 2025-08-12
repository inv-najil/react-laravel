import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Paper, Grid } from "@mui/material";
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
        <Container maxWidth="md">
            <Paper elevation={5} sx={{ p: 4, mt: 8 }}>
                <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2" }}>
                    Login
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={1} direction="column">
                        <Grid item xs={12} sm={6}>
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
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2 }}
                            >
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}