import {
    Container,
    TextField,
    Button,
    Typography,
    Paper,
    MenuItem,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { registerAPI } from "../../api/authService";
import { useNavigate } from "react-router-dom";
export default function RegisterTeacher() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm();
    const password = watch("password")
    const navigate = useNavigate();
    const [serverError, setServerError] = useState({});

    const onSubmit = async (data) => {
        try {
            const payload = {
                ...data,
                role: "teacher",
            };
            await registerAPI(payload);
            alert("Teacher registered successfully");
            setServerError({});
            navigate("/admin");
        } catch (err) {
            const message = err.response?.data?.message?.toLowerCase();
            if (message?.includes("email")) {
                setServerError({ email: err.response.data.message });
            } else if (message?.includes("emp")) {
                setServerError({ emp_id: err.response.data.message });
            } else {
                setServerError({});
                alert("Something went wrong");
            }
        }
    };
    return (
        <Container maxWidth="sm">
            <Paper sx={{ p: 4, mt: 6 }}>
                <Typography variant="h5" gutterBottom>
                    Register Teacher
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                        error={!!errors.email || !!serverError.email}
                        helperText={errors.email?.message || serverError.email}
                        margin="normal"
                    />

                    <TextField
                        fullWidth
                        label="Phone"
                        {...register("phone", {
                            required: "Phone number is required",
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: "Phone number must be exactly 10 digits",
                            },
                        })}
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                        margin="normal"
                    />

                    <TextField
                        fullWidth
                        label="First Name"
                        {...register("first_name", {
                            required: "First name is required",
                            pattern: {
                                value: /^[a-zA-Z]{2,}$/,
                                message: "Name must be alphabets atleast 2 characters"
                            },
                        })}
                        error={!!errors.first_name}
                        helperText={errors.first_name?.message}
                        margin="normal"
                    />

                    <TextField
                        fullWidth
                        label="Last Name"
                        {...register("last_name", {
                            required: "Last name is required",
                            pattern: {
                                value: /^[a-zA-Z]{2,}$/,
                                message: "Name must be alphabets atleast 2 characters"
                            },
                        })}
                        error={!!errors.last_name}
                        helperText={errors.last_name?.message}
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

                    <TextField
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        {...register("password_confirmation", {
                            required: "Please confirm password",
                            validate: (val) =>
                                val === password || "Passwords must match",
                        })}
                        error={!!errors.password_confirmation}
                        helperText={errors.password_confirmation?.message}
                        margin="normal"
                    />

                    <TextField
                        fullWidth
                        label="Employee Number"
                        {...register("emp_id", { required: "EMP number is required" })}
                        error={!!errors.emp_id || !!serverError.emp_id}
                        helperText={errors.emp_id?.message || serverError.emp_id}
                        margin="normal"
                    />

                    <TextField
                        fullWidth
                        label="Subject"
                        {...register("subject_specialization", { required: "Subject is required" })}
                        error={!!errors.subject_specialization}
                        helperText={errors.subject_specialization?.message}
                        margin="normal"
                    />


                    <TextField
                        fullWidth
                        label="Date of Joining"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        {...register("date_of_joining", {
                            required: " Date of joining is required",
                        })}
                        error={!!errors.date_of_joining}
                        helperText={errors.date_of_joining?.message}
                        margin="normal"
                    />
                    <TextField
                        select
                        fullWidth
                        label="Status"
                        defaultValue="active"
                        {...register("status", { required: "Status is required" })}
                        error={!!errors.status}
                        helperText={errors.status?.message}
                        margin="normal"
                    >
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="inactive">Inactive</MenuItem>
                    </TextField>

                    <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                        Register Teacher
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}