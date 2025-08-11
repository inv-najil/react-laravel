import {
    Container,
    TextField,
    Button,
    Typography,
    Paper,
    MenuItem,
    Grid,
    Box,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { registerAPI } from "../../api/authService";
import { useNavigate } from "react-router-dom";
import { getAllTeachers } from "../../api/authService";

export default function RegisterStudent() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();
    const [teachers, setTeachers] = useState([]);
    const navigate = useNavigate();
    const password = watch("password");
    const [serverError, setServerError] = useState({});

    useEffect(() => {
        getAllTeachers()
            .then((res) => {
                setTeachers(res.data.data || []);
            })
            .catch((err) => {
                console.error("Failed to fetch teachers", err);
                setTeachers([]);
            });
    }, []);


    const onSubmit = async (data) => {
        try {
            const payload = {
                ...data,
                role: "student",
            };
            await registerAPI(payload);
            alert("student Registerd successfully");
            setServerError({});
            navigate("/admin");
        } catch (err) {
            const message = err.response?.data?.message?.toLowerCase();
            if (message?.includes("email")) {
                setServerError({ email: err.response.data.message });
            } else if (message?.includes("roll")) {
                setServerError({ roll_num: err.response.data.message });
            } else {
                setServerError({});
                alert("Something went wrong");
            }
        }
    };
    return (
        <Container maxWidth="md">
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#ff9800" }} gutterBottom>
                Register Student
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
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
                            error={!!errors.email || !!serverError.email}
                            helperText={errors.email?.message || serverError.email}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
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
                    </Grid>
                    <Grid item xs={12} sm={6}>
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
                    </Grid>
                    <Grid item xs={12} sm={6}>
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
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Roll Number"
                            {...register("roll_num", { required: "Roll number is required" })}
                            error={!!errors.roll_num || serverError.roll_num}
                            helperText={errors.roll_num?.message || serverError.roll_num}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Grade"
                            {...register("class_grade", { required: "Grade is required" })}
                            error={!!errors.class_grade}
                            helperText={errors.class_grade?.message}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Date of Birth"
                            type="date"
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                }
                            }}
                            {...register("dob", { required: "Date of birth is required" })}
                            error={!!errors.dob}
                            helperText={errors.dob?.message}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Admission Date"
                            type="date"
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                }
                            }}
                            {...register("admission_date", {
                                required: "Admission date is required",
                            })}
                            error={!!errors.admission_date}
                            helperText={errors.admission_date?.message}
                            margin="normal"
                        />
                    </Grid>
                    <Box sx={{ minWidth: 200 }}>
                        <Grid item>
                            <TextField
                                select
                                fullWidth
                                label="Assigned Teacher"
                                {...register("teacher_id", { required: "Teacher is required" })}
                                error={!!errors.teacher_id}
                                helperText={errors.teacher_id?.message}
                                margin="normal"
                                defaultValue=""
                            >
                                {teachers.length === 0 ? (
                                    <MenuItem value="" disabled>No teachers found</MenuItem>
                                ) : (
                                    teachers.map((teacher) => (
                                        <MenuItem key={teacher.id} value={teacher.id}>
                                            {`${teacher.first_name || ""} - ${teacher.emp_id}`}
                                        </MenuItem>
                                    ))
                                )}
                            </TextField>
                        </Grid>
                    </Box>
                    <Grid item xs={12} sm={6}>
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
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" sx={{mt:3.5}}>
                            Register Student
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}
