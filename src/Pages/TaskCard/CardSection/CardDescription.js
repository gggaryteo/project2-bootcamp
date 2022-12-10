import React, { useState, useEffect } from "react";
import "./CardDescription.css";
import { ClickAwayListener } from "@mui/material";
import { fontWeight } from "@mui/system";

export default function CardDescription() {
  const [projectDescript, setProjectDescript] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  );

  const [textformat, setTextFormat] = useState("textformat");
  const [editDescription, setEditDescription] = useState(false);

  const handleClickAway = () => {
    setEditDescription(false);

    // UPDATE DOCS ON CHANGE DESCRIPTION TO FIREBASE
  };

  const handleClickEdit = () => {
    setEditDescription(true);
  };

  return (
    <div className="description-container">
      <h4>Project Details</h4>
      <div className="content-box">
        <ClickAwayListener onClickAway={handleClickAway}>
          {editDescription ? (
            <textarea
              className="content"
              onChange={(event) => {
                setProjectDescript(event.target.value);
              }}
              value={projectDescript}
            />
          ) : (
            <div className="content-display" onClick={handleClickEdit}>
              {projectDescript}
            </div>
          )}
        </ClickAwayListener>
      </div>
    </div>
  );
}
