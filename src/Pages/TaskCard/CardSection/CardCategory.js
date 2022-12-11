import React, { useState, useEffect } from "react";
import "./CardCategory.css";
import { db } from "../../../firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectLabels(id) {
  const [category, setCategory] = useState("");
  const projectid = id.projectid;

  useEffect(() => {
    const fetchCommentData = async () => {
      const document = doc(db, "projects", projectid);
      const documentSnap = await getDoc(document);

      if (documentSnap.exists()) {
        const projectCategory = documentSnap.data().projectCategory;
        console.log("Document data ", projectCategory);
        return projectCategory;
      } else {
        console.log("no such document");
      }
    };

    fetchCommentData()
      .then((value) =>
        typeof value == "undefined" ? setCategory("") : setCategory(value)
      )
      .catch(console.error);
  }, []);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div className="category-container">
      <h4>Category : {category}</h4>
    </div>
  );
}
