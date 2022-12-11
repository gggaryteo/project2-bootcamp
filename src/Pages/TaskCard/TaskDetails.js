import React, { useState } from "react";
import UserAvatar from "../../Components/UserAvatar";
import { useFirestore } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

import EditIcon from "../../assets/EditIcon.svg";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function TaskDetails({ taskData }) {
  const { deleteDocument } = useFirestore("projects");
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);

  const [projectName, setprojectName] = useState(taskData.projectName);
  const [projectDetails, setprojectDetails] = useState(taskData.projectDetails);

  const projectid = taskData.id;

  const handleDelete = (e) => {
    deleteDocument(taskData.id);
    navigate("/");
  };

  const handleEdit = (e) => {
    e.preventDefault();

    setEdit(true);
  };

  const handleSave = (e) => {
    e.preventDefault();

    const docref = doc(db, "projects", projectid);

    updateDoc(docref, {
      projectName: projectName,
      projectDetails: projectDetails,
    });

    setEdit(false);
    return true;
  };

  const handleCancel = (e) => {
    e.preventDefault();

    const previousName = taskData.projectName;
    const previousDetails = taskData.projectDetails;

    setprojectName(previousName);
    setprojectDetails(previousDetails);

    setEdit(false);
  };

  const handleTitle = (e) => {
    setprojectName(e.target.value);
  };
  const handleDetails = (e) => {
    setprojectDetails(e.target.value);
  };

  // MUI MENU LISTENERS
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div className="project-taskData">
        <div className="image-button">
          <Button
            id="demo-positioned-button"
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <img src={EditIcon} alt="Edit" className="image" />
          </Button>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            {!edit ? (
              <MenuItem onClick={handleEdit}>Edit</MenuItem>
            ) : (
              <div>
                <MenuItem onClick={handleSave}>Save</MenuItem>
                <MenuItem onClick={handleCancel}>Cancel</MenuItem>
              </div>
            )}
          </Menu>
        </div>

        <div>
          {edit ? (
            <input
              className="title"
              onChange={handleTitle}
              value={projectName}
            />
          ) : (
            <h2 className="title">{projectName}</h2>
          )}
          <p className="created-by">
            Project Created By: {taskData.createdBy.displayName}
          </p>
          <p className="date">
            Project Due Date: {taskData.dueDate.toDate().toLocaleDateString()}
          </p>
          {edit ? (
            <input
              className="details"
              onChange={handleDetails}
              value={projectDetails}
            />
          ) : (
            <p className="details">{projectDetails}</p>
          )}
        </div>

        <h4>Project Assigned to: </h4>
        <div className="users">
          {taskData.storeAssignedUsers.map((user) => (
            <UserAvatar key={user.id} src={user.photoURL} />
          ))}
        </div>
      </div>
      {user.uid === taskData.createdBy.id && (
        <button className="btn" onClick={handleDelete}>
          Mark As Complete
        </button>
      )}
    </div>
  );
}
