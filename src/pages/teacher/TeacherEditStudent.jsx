import {
    Container,
    TextField,
    Button,
    Typography,
    Grid,
} from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getStudentByID, updateStudent } from "../../api/authService";
import useSnackbar from "../../hooks/useSnackbar";


export default function TeacherEditStudent() {
    const { id } = useParams();
    const navigate = useNavigate();
    const {showSnackbar, SnackbarComponent} = useSnackbar();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        mode: "onBlur"
    });

    useEffect(() => {
        getStudentByID(id)
            .then(res => {
                reset(res.data);
            })
            .catch(err => {
                console.error("Failed to fetch ", err);
                showSnackbar("Failed to fetch Students", "error")
            });
    }, [id, reset]);

    const onSubmit = async (data) => {
        try {
            await updateStudent(id, data);
            showSnackbar("Student Updated Successfully", "success");
            setTimeout(() => {
                navigate("/teacher/list-students");
            }, 1500)
        } catch (err) {
            console.error("update failed", err);
            showSnackbar("Failed to update Student", "error");
        }
    };
    return (
        <Container maxWidth="md" >
            <Typography variant="h4" sx={{ color: "#ff9800", fontWeight: "bold" }} gutterBottom>
                Edit Student
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="First Name"
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                }
                            }}
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
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                }
                            }}
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

                    <Grid xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Phone"
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                }
                            }}
                            {...register("phone", {
                                required: "Phone is required",
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: "Phone must be 10 digits",
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
                            label="Grade"
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                }
                            }}
                            {...register("class_grade", { required: "Grade is required" })}
                            error={!!errors.class_grade}
                            helperText={errors.class_grade?.message}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            select
                            fullWidth
                            label="Status"
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                }
                            }}
                            {...register("status", { required: "Status is required" })}
                            margin="normal"
                            defaultValue="active"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                            Update Student
                        </Button>
                    </Grid>
                </Grid>
            </form>
            {SnackbarComponent}
        </Container>
    );
}