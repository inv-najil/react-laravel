import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { useState, useEffect } from "react";
import { registerLoadingSetter } from "./api/axios";
import { CircularProgress, Backdrop } from "@mui/material";

function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    registerLoadingSetter(setLoading);
  }, [])
  return (
    <>
      <Backdrop
        open={loading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
