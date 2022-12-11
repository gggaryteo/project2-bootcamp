import React, { useState, useEffect } from "react";
import { ClickAwayListener } from "@mui/material";
import "./CardHeader.css";
import { db } from "../../../firebase";

import { doc, updateDoc, getDoc } from "firebase/firestore";

export default function CardHeader(id) {
  const [projectTitle, setprojectTitle] = useState("");
  const [editTitle, seteditTitle] = useState(false);

  const projectid = id.projectid;

  // Fetch project title upon mounting
  useEffect(() => {
    const fetchCommentData = async () => {
      const document = doc(db, "projects", projectid);
      const documentSnap = await getDoc(document);

      if (documentSnap.exists()) {
        const projectName = documentSnap.data().projectName;
        console.log("Document data ", projectName);
        return projectName;
      } else {
        console.log("no such document");
      }
    };

    fetchCommentData()
      .then((value) =>
        typeof value == "undefined"
          ? setprojectTitle("")
          : setprojectTitle(value)
      )
      .catch(console.error);
  }, []);

  const handleClickAway = async () => {
    const docref = doc(db, "projects", projectid);

    await updateDoc(docref, {
      projectName: projectTitle,
    });

    seteditTitle(false);
  };

  const handleClickTitle = () => {
    seteditTitle(true);
  };

  return (
    <div>
      <h4>Project Name</h4>

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
