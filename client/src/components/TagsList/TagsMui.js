import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { FilledInput, Input, TextField } from "@mui/material";
const theme = createTheme({
  palette: {
    primary: {
      main: "#403354",
    },
    secondary: {
      main: "#604f54",
      light: "#984661",
    },
  },
  root: {
    "& $notchedOutline": {
      borderWidth: 0,
    },
    "&:hover $notchedOutline": {
      borderWidth: 0,
    },
    "&$focused $notchedOutline": {
      borderWidth: 0,
    },
  },
  focused: {},
  notchedOutline: {},
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

export default function TagsMui({ tags, selectTagsFunc }) {
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  useEffect(() => {
    if (personName.length) {
      selectTagsFunc((prev) => {
        return { ...prev, tags: personName.join(","), page: "1" };
      });
    } else {
      selectTagsFunc((prev) => {
        return { ...prev, tags: "" };
      });
    }
  }, [personName]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <FormControl sx={{ m: 1, width: 200 }}>
          <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={personName}
            onChange={handleChange}
            input={<FilledInput label="tag" />}
            // input={<TextField variant="standard" label="Tag" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {tags.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={personName.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </ThemeProvider>
    </div>
  );
}
