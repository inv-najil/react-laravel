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
import { getStudentByID, updateStudent } from "../../api/authService";

export default function EditStudent() {
    const { id } = useParams();
    console.log("Editing student ID:", id);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        getStudentByID(id)
            .then(res => {
                reset(res.data);
            })
            .catch(err => {
                console.error("Failed to fetch ", err);
                alert("could not load student data");
            });
    }, [id, reset]);

    const onSubmit = async (data) => {
        try {
            await updateStudent(id, data);
            alert("student Updated");
            navigate("/admin/list-students");
        } catch (err) {
            console.error("update failed", err);
            alert("Failed to update student");
        }
    };
    return (
        <Container maxWidth="sm">
            <Paper sx={{ p: 4, mt: 6 }}>
                <Typography variant="h5" gutterBottom>
                    Edit Student
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
                        label="Grade"
                        InputLabelProps={{ shrink: true }}
                        {...register("class_grade", { required: "Grade is required" })}
                        error={!!errors.class_grade}
                        helperText={errors.class_grade?.message}
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
                        Update Student
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}