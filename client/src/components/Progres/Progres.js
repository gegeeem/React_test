import * as React from "react";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Progres({ displayProgres, displayFunc }) {
  const [displayMessage, setDisplayMessage] = useState("progresContainer");
  useEffect(() => {
    if (displayProgres) {
      setDisplayMessage("progresContainer-display");
      const timer = setTimeout(() => {
        setDisplayMessage("progresContainer");
        displayFunc("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [displayProgres]);

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
