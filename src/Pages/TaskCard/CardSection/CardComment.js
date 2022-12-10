import React, { useState, useEffect } from "react";
import "./CardComment.css";

import { db } from "../../../firebase";
import {
  doc,
  setDoc,
  Timestamp,
  updateDoc,
  arrayUnion,
  onSnapshot,
  addSnapShotListener,
  querySnapshot,
  getDoc,
} from "firebase/firestore";
import { async } from "@firebase/util";

export default function CardComment(id) {
  const [comment, setComment] = useState("");
  const [pastcomments, setPastComments] = useState([]);
  const documentid = id.projectid;

  // How to get username data
  const username = "Snorlax";

  // Fetch project comments upon mounting
  useEffect(() => {
    const fetchCommentData = async () => {
      // Change "test-project" to "projects" later
      const document = doc(db, "test-project", "project1");
      const documentSnap = await getDoc(document);

      if (documentSnap.exists()) {
        const projectcomments = documentSnap.data().Comments;
        // console.log("Document data ", projectcomments);
        return projectcomments;
      } else {
        console.log("no such document");
      }
    };

    fetchCommentData()
      .then((value) => setPastComments(value))
      .catch(console.error);
  }, []);

  const handleSendComment = async (id) => {
    const commentData = {
      message: comment,
      // How to retrieve username
      user: username,
      date: new Date().toDateString(),
    };

    const docref = doc(db, "test-project", documentid);

    await updateDoc(
      docref,
      {
        Comments: arrayUnion(commentData),
      },
      setComment("")
    );

    onSnapshot(
      doc(db, "test-project", "project1"),
      { includeMetadataChanges: true },
      (doc) => {
        console.log(doc.data());
        setPastComments(doc.data().Comments);
      }
    );
  };

  return (
    <div>
      <div>
        <h4>Past comments</h4>
        <div>
          {pastcomments.map((msg) => (
            <div>
              <p>{msg.user}</p>
              <p>{msg.message}</p>
              <p>{msg.date}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="input-container">
        <h4>Comment</h4>
        <textarea
          onChange={(event) => setComment(event.target.value)}
          value={comment}
        />
        <button className="button" onClick={handleSendComment}>
          Send
        </button>
      </div>
    </div>
  );
}
