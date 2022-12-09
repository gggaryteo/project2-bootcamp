import React, { useState, useEffect } from "react";
import "./CardComments.css";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function CardComment() {
  // Call comments from data

  const [doc, setAllDocs] = useState([]);

  const getData = async () => {
    const colref = collection(db, "projects");
    const snapshot = await getDocs(colref);
    const docs = snapshot.docs.map((doc) => doc.data());

    console.log(snapshot);
    console.log(docs);

    // await getDocs(collection(db, "todos"))
    //         .then((querySnapshot)=>{
    //             const newData = querySnapshot.docs
    //                 .map((doc) => ({...doc.data(), id:doc.id }));
    //             setTodos(newData);
    //             console.log(todos, newData);
    //         })
  };

  return (
    <div className="past-comments-containter">
      <h4>Past Comments</h4>
      <button onClick={getData}>Click Me!</button>
    </div>
  );
}
