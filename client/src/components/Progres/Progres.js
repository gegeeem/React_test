import * as React from "react";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Progres() {
  const [displayMessage, setDisplayMessage] = useState("progresContainer");
  useEffect(() => {
    setDisplayMessage("progresContainer-display");
    const timer = setTimeout(() => {
      setDisplayMessage("progresContainer");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={displayMessage}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "gray",
        }}
      >
        <div>Reordering Quotes</div>
        <CircularProgress color="inherit" />
      </Box>
    </div>
  );
}
