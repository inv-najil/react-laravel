import {
    Container,
    TextField,
    Button,
    Typography,
    MenuItem,
    Grid,
    Box,
    InputAdornment,
    IconButton
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BadgeIcon from '@mui/icons-material/Badge';
import SchoolIcon from '@mui/icons-material/School';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { registerAPI } from "../../api/authService";
import { useNavigate } from "react-router-dom";
import { getAllTeachers } from "../../api/authService";
import useSnackbar from "../../hooks/useSnackbar";


export default function RegisterStudent() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        mode: "onBlur"
    });
    const [teachers, setTeachers] = useState([]);
    const navigate = useNavigate();
    const password = watch("password");
    const [serverError, setServerError] = useState({});
    const { showSnackbar, SnackbarComponent } = useSnackbar();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickShowPassword = () => { setShowPassword((prev) => !prev) };
    const handleClickConfirmPassword = () => { setShowConfirmPassword((prev) => !prev) };

    useEffect(() => {
        getAllTeachers()
            .then((res) => {
                setTeachers(res.data.data || []);
            })
            .catch((err) => {
                console.error("Failed to fetch teachers", err);
                showSnackbar("Failed to fetch Teachers", "error");
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
            showSnackbar("Student Registered Successfully", "success");
            setServerError({});
            setTimeout(() => {
                navigate("/admin");
            }, 1500);
        } catch (err) {
            const message = err.response?.data?.message?.toLowerCase();
            if (message?.includes("email")) {
                setServerError({ email: err.response.data.message });
            } else if (message?.includes("roll")) {
                setServerError({ roll_num: err.response.data.message });
            } else {
                setServerError({});
                showSnackbar("Student Registeration failed", "error");
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
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon fontSize="small" />
                                    </InputAdornment>
                                )
                            }}
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
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PhoneIcon fontSize="small" />
                                        </InputAdornment>
                                    )
                                }
                            }}
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
                            type={showPassword ? "text" : "password"}
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
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleClickShowPassword} edge="end">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Confirm Password"
                            type={showConfirmPassword ? "text" : "password"}
                            {...register("password_confirmation", {
                                required: "Please confirm password",
                                validate: (val) =>
                                    val === password || "Passwords must match",
                            })}
                            error={!!errors.password_confirmation}
                            helperText={errors.password_confirmation?.message}
                            margin="normal"
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleClickConfirmPassword} edge="end">
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }
                            }}
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
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <BadgeIcon fontSize="small" />
                                        </InputAdornment>
                                    )
                                }
                            }}
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
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SchoolIcon fontSize="small" />
                                        </InputAdornment>
                                    )
                                }
                            }}
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
                            {...register("dob", {
                                required: "Date of birth is required",
                                validate: (val) => {
                                    const dob_val = new Date(val);
                                    const today = new Date();
                                    if (dob_val >= today) {
                                        return "Date of Birth canot be in future";
                                    }
                                    return true;
                                }
                            })}
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
                                validate: (val) => {
                                    const admission_val = new Date(val);
                                    const dob_val = new Date(watch("dob"));
                                    const today = new Date();
                                    if (admission_val > today) {
                                        return "Admission date Can not be in future";
                                    }
                                    if (dob_val && admission_val <= dob_val) {
                                        return "Admission can not be before dob"
                                    }
                                    return true;
                                }
                            })}
                            error={!!errors.admission_date}
                            helperText={errors.admission_date?.message}
                            margin="normal"
                        />
                    </Grid>
                    <Box sx={{ minWidth: 200 }}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                select
                                fullWidth
                                label="Assigned Teacher"
                                {...register("teacher_id", { required: "Teacher is required" })}
                                error={!!errors.teacher_id}
                                helperText={errors.teacher_id?.message}
                                margin="normal"
                                defaultValue=""
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountBoxIcon fontSize="small" />
                                            </InputAdornment>
                                        )
                                    }
                                }}
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
                    <Box sx={{ minWidth: 200 }}>
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
                    </Box>
                    <Grid item xs={12} sm={6}>
                        <Button type="submit" variant="contained" sx={{ mt: 3.5 }}>
                            Register Student
                        </Button>
                    </Grid>
                </Grid>
            </form>
            {SnackbarComponent}
        </Container>
    );
}
