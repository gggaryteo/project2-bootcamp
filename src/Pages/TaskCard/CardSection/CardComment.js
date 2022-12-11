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

import UserAvatar from "../../../Components/UserAvatar";

export default function CardComment(id) {
  const [comment, setComment] = useState("");
  const [pastcomments, setPastComments] = useState([]);
  const projectid = id.projectid;
  const username = auth.currentUser.displayName;
  const userPhoto = auth.currentUser.photoURL

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
  }, [projectid]);

  const handleSendComment = async (e) => {
    e.preventDefault();

    const commentData = {
      message: comment,
      user: username,
      photoURL: userPhoto,
      id: Math.random(),
      date: new Date().toDateString()
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
        setPastComments(doc.data().comments);
      }
    );
  };

  return (
    <>
      <ul>
        <h4 className="past-comments">Past comments</h4>
        {pastcomments === []
          ? console.log("Empty")
          : pastcomments.map((msg) => (
              <li className="project-comments" key={msg.id}>
                <div className="comment-author">
                  <UserAvatar src={msg.photoURL} />
                  <p>{msg.user}</p>
                </div>

                <div className="comment-content">
                  <p>{msg.message}</p>
                </div>

                <div className="comment-date">
                  <p>
                    {msg.date}
                  </p>
                </div>
              </li>
            ))}
      </ul>

      <form className="input-container" onSubmit={handleSendComment}>
        <h4>Comment</h4>
        <textarea
          onChange={(event) => setComment(event.target.value)}
          value={comment}
          required
        ></textarea>
        <button className="button">Send</button>
      </form>
    </>
  );
}
