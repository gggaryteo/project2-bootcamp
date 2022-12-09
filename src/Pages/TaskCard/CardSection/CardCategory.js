import React, { useState } from "react";
import "./CardCategory.css";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectLabels() {
  const [category, setCategory] = useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div className="category-container">
      <h4>Category :</h4>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          className="dropdown"
          value={category}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value={"Design"}>Design</MenuItem>
          <MenuItem value={"Marketing"}>Marketing</MenuItem>
          <MenuItem value={"Business"}>Business</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
