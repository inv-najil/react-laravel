import { useState, useCallback } from "react";
import { Snackbar, Alert } from "@mui/material";

export default function useSnackbar() {
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const showSnackbar = useCallback((message, severity = "success") => {
        setSnackbar({ open: true, message, severity });
    }, []);

    const SnackbarComponent = (
        <Snackbar
            open={snackbar.open}
            autoHideDuration={2000}
            onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <Alert
                severity={snackbar.severity}
                variant="filled"
                onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
                sx={{ maxWidth: "100%" }}
            >
                {snackbar.message}
            </Alert>
        </Snackbar>
    );

    return { showSnackbar, SnackbarComponent };
}