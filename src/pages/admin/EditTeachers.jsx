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
import { getTeacherById, updateTeacher } from "../../api/authService";
import useSnackbar from "../../hooks/useSnackbar";

export default function EditTeacher() {
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        mode: "onBlur"
    });

    const {showSnackbar, SnackbarComponent} = useSnackbar();

    useEffect(() => {
        getTeacherById(id)
            .then(res => {
                reset(res.data);
            })
            .catch(err => {
                console.error("Failed to fetch", err);
                showSnackbar("Failed to Fetch Teacher", "error")
            })
    }, [id, reset]);

    const onSubmit = async (data) => {
        try {
            await updateTeacher(id, data);
            showSnackbar("Teacher Updated successfully", "success");
            setTimeout(() => {
                navigate("/admin/list-teachers");
            }, 1500);
        } catch (err) {
            console.error("Failed to update", err);
            showSnackbar("Failed to Update Teacher", "error");
        }
    };
    return (
        <Container maxWidth="md">
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#ff9800" }} gutterBottom>
                Edit Teacher
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
                    <Grid item xs={12} sm={6}>
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
                            label="Subject"
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                }
                            }}
                            {...register("subject_specialization", { required: "Subject is required" })}
                            error={!!errors.subject_specialization}
                            helperText={errors.subject_specialization?.message}
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
                    <Grid item xs={12} sm={6}>
                        <Button type="submit" variant="contained" sx={{ mt: 3.5 }}>
                            Update Teacher
                        </Button>
                    </Grid>
                </Grid>
            </form>
           {SnackbarComponent}
        </Container>
    );
}