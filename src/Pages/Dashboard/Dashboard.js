import "./Dashboard.css"
import ProjectGrid from "../../Components/ProjectGrid";

import React, { useState, useEffect} from "react";
import { db } from "../../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function Dashboard() {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const collectionRef = collection(db, "projects");

    const collectionQuery = query(collectionRef, orderBy("dueDate"))

    const unsubscribe = onSnapshot(
      collectionQuery,
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError("Could not fetch data from collection");
      }
    );
    // component unmount cleanup function
    return () => unsubscribe();
  }, []);


  return (
    <div>
      <h2 className="page-title">Dashboard Page</h2>
      {error && <div className="error">{error}</div>}
      {documents && <ProjectGrid projects={documents}/>}
    </div>
  );
}
