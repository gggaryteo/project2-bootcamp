import React, { useState, useEffect } from "react";
import { ClickAwayListener } from "@mui/material";
import "./CardHeader.css";

export default function CardHeader() {
  const [projectTitle, setprojectTitle] = useState("Project-2-bootcamp");
  const [editTitle, seteditTitle] = useState(false);

  const handleClickAway = () => {
    seteditTitle(false);
  };

  const handleClickTitle = () => {
    seteditTitle(true);
  };

  return (
    <div>
      <h4>Title</h4>

      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          {editTitle ? (
            <textarea
              onChange={(event) => {
                setprojectTitle(event.target.value);
              }}
              className="title-edit"
              value={projectTitle}
            />
          ) : (
            <h4 onClick={handleClickTitle} className="title-display">
              {projectTitle}
            </h4>
          )}
        </div>
      </ClickAwayListener>
    </div>
  );
}
