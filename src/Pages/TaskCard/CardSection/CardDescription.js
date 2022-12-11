import React, { useState, useEffect } from "react";
import "./CardDescription.css";
import { ClickAwayListener } from "@mui/material";
import { db } from "../../../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

export default function CardDescription(id) {
  const [projectDescript, setProjectDescript] = useState("");
  const projectid = id.projectid;
  const [editDescription, setEditDescription] = useState(false);

  // Fetch project description upon mounting
  useEffect(() => {
    const fetchCommentData = async () => {
      const document = doc(db, "projects", projectid);
      const documentSnap = await getDoc(document);

      if (documentSnap.exists()) {
        const projectDetails = documentSnap.data().projectDetails;
        return projectDetails;
      } else {
        console.log("no such document");
      }
    };

    fetchCommentData()
      .then((value) =>
        typeof value == "undefined"
          ? setProjectDescript("")
          : setProjectDescript(value)
      )
      .catch(console.error);
  }, []);

  const handleClickAway = async () => {
    setEditDescription(false);
    const docref = doc(db, "projects", projectid);

    await updateDoc(docref, {
      projectDetails: projectDescript,
    });

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
