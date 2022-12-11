import React, { useState, useEffect } from "react";
import "./CardComment.css";

import { db, auth } from "../../../firebase";
import {
  doc,
  updateDoc,
  arrayUnion,
  onSnapshot,
  getDoc,
} from "firebase/firestore";

export default function CardComment(id) {
  const [comment, setComment] = useState("");
  const [pastcomments, setPastComments] = useState([]);
  const projectid = id.projectid;
  const username = auth.currentUser.displayName;

  // Fetch project comments upon mounting
  useEffect(() => {
    const fetchCommentData = async () => {
      const document = doc(db, "projects", projectid);
      const documentSnap = await getDoc(document);

      if (documentSnap.exists()) {
        const projectcomments = documentSnap.data().comments;
        return projectcomments;
      } else {
        console.log("no such document");
      }
    };

    fetchCommentData()
      .then((value) =>
        typeof value == "undefined"
          ? setPastComments([])
          : setPastComments(value)
      )
      .catch(console.error);
    return () => {};
  }, []);

  const handleSendComment = async () => {
    const commentData = {
      message: comment,
      user: username,
      date: new Date().toDateString(),
      id: Math.random(),
    };

    const docref = doc(db, "projects", projectid);

    await updateDoc(
      docref,
      {
        comments: arrayUnion(commentData),
      },
      setComment("")
    );

    onSnapshot(
      doc(db, "projects", projectid),
      { includeMetadataChanges: true },
      (doc) => {
        console.log(doc.data());
        setPastComments(doc.data().comments);
      }
    );
  };

  return (
    <div>
      <div>
        <h4>Past comments</h4>
        <div>
          {pastcomments === []
            ? console.log("Empty")
            : pastcomments.map((msg) => (
                <div key={msg.id}>
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
