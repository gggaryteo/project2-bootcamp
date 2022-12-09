import React, { useState, useEffect } from "react";
import "./CardSendComment.css";

import { db } from "../../../firebase";
import {
  doc,
  setDoc,
  Timestamp,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

export default function CardSendComment() {
  const [comment, setComment] = useState("");

  // How to get username data
  const username = "Snorlax";

  const handleSendComment = async () => {
    // send data to firestore
    // get username
    // get timestamp
    // get comment
    // store data in an array of objects

    const commentData = {
      message: comment,
      user: username,
      date: new Date().toDateString(),
    };

    const docref = doc(db, "test-project", "project1");

    await updateDoc(docref, {
      Comments: arrayUnion(commentData),
    });

    console.log(docref.id);
  };

  return (
    <div className="input-container">
      <h4>Comment</h4>
      <textarea onChange={(event) => setComment(event.target.value)} />

      <button className="button" onClick={handleSendComment}>
        Send
      </button>
    </div>
  );
}
