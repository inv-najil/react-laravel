import {
    Container,
    TextField,
    Button,
    Paper,
    Typography
} from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getTeacherById, updateTeacher } from "../../api/authService";

export default function EditTeacher() {
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        getTeacherById(id)
            .then(res => {
                reset(res.data);
            })
            .catch(err => {
                console.error("Failed to fetch", err);
                alert("Failed to fetch teacher");
            })
    }, [id, reset]);

    const onSubmit = async (data) => {
        try {
            await updateTeacher(id, data);
            alert("Teacher updated");
            navigate("/admin/list-teachers");
        } catch (err) {
            console.error("Failed to update", err);
            alert("Update failed");
        }
    };
    return (
        <Container maxWidth="sm">
            <Paper sx={{ p: 4, mt: 6 }}>
                <Typography variant="h5" gutterBottom>
                    Edit Teacher
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <TextField
                        fullWidth
                        label="First Name"
                        InputLabelProps={{ shrink: true }}
                        {...register("first_name", { required: "First name is required" })}
                        error={!!errors.first_name}
                        helperText={errors.first_name?.message}
                        margin="normal"
                    />

                    <TextField
                        fullWidth
                        label="Last Name"
                        InputLabelProps={{ shrink: true }}
                        {...register("last_name", { required: "Last name is required" })}
                        error={!!errors.last_name}
                        helperText={errors.last_name?.message}
                        margin="normal"
                    />

                    <TextField
                        fullWidth
                        label="Phone"
                        InputLabelProps={{ shrink: true }}
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

                    <TextField
                        fullWidth
                        label="Subject"
                        InputLabelProps={{ shrink: true }}
                        {...register("subject_specialization", { required: "Subject is required" })}
                        error={!!errors.subject_specialization}
                        helperText={errors.subject_specialization?.message}
                        margin="normal"
                    />

                    <TextField
                        select
                        fullWidth
                        label="Status"
                        InputLabelProps={{ shrink: true }}
                        {...register("status", { required: "Status is required" })}
                        margin="normal"
                        defaultValue="active"
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </TextField>

                    <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                        Update Teacher
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}