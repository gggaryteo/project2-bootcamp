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
  collection,
  addSnapShotListener,
  getDocs,
} from "firebase/firestore";
import { async } from "@firebase/util";

export default function CardComment(id) {
  const [comment, setComment] = useState("");
  const [pastcomments, setPastComments] = useState([]);

  const testname = [
    { user: "David", message: "Hello 1" },
    { user: "Snorlax", message: "Hello 2" },
    { user: "Squirtle", message: "Hello 3" },
  ];
  // How to get username data
  const username = "Snorlax";

  const documentid = id.projectid;
  // "project1"

  useEffect(() => {
    async function realTimeUpdates() {
      const querySnapshot = await getDocs(collection(db, "test-projects"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log("Did it triggered?");
        console.log(doc.id, " => ", doc.data());
      });
    }
  });

  const handleSendComment = async (id) => {
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

    const docref = doc(db, "test-project", documentid);

    await updateDoc(docref, {
      Comments: arrayUnion(commentData),
    });

    const unsub = onSnapshot(
      doc(db, "test-project", "project1"),
      { includeMetadataChanges: true },
      (doc) => {
        console.log(doc.data());
        setPastComments(doc.data().Comments);
      }
    );
  };

  const realTimeUpdates = async () => {
    const querySnapshot = await getDocs(collection(db, "test-projects"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log("Did it triggered?");
      console.log(doc.id, " => ", doc.data());
    });
  };

  return (
    <div>
      <div>
        <h4>Past comments</h4>
        <div>
          {pastcomments.map((msg) => (
            <div>
              <h5>{msg.user}</h5>
              <h5>{msg.message}</h5>
            </div>
          ))}
        </div>
      </div>

      <div className="input-container">
        <h4>Comment</h4>
        <textarea onChange={(event) => setComment(event.target.value)} />

        <button className="button" onClick={handleSendComment}>
          Send
        </button>
      </div>
    </div>
  );
}
