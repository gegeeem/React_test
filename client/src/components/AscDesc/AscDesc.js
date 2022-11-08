import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#260d4a",
    },
    secondary: {
      main: "#583c64",
    },
    default: {
      main: "#260d4a",
    },
    text: {
      primary: "rgba(12,1,22,0.87)",
      secondary: "rgba(16,1,43,0.54)",
    },
  },
});

export default function AscDesc({ label, defaulValue, changeDirectionFunc }) {
  const [age, setAge] = React.useState([]);

  const handleChange = (event) => {
    setAge(event.target.value);
    changeDirectionFunc(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minWidth: 120 }}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Direction"
            onChange={handleChange}
          >
            {defaulValue.map((el) => (
              <MenuItem key={el} value={el}>
                {el}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </ThemeProvider>
  );
}
