import "./Dashboard.css"
import ProjectGrid from "../../Components/ProjectGrid";

import React, { useState, useEffect} from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { db } from "../../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import Filter from "./Filter";

export default function Dashboard() {
  const { user } = useAuthContext();
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [currentFilter, setCurrentFilter] = useState("All");

  // Send the filtered projects into the Project Grid Component as props
  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  }

  const filteredProjects = documents ? documents.filter((document) => {
    switch (currentFilter) {

      case 'All':
        return true

      case 'Mine':
        let assignedToMe = false
        document.storeAssignedUsers.forEach((assignedUser) => {
          if (user.uid === assignedUser.id) {
            assignedToMe = true
          }
        })
        return assignedToMe

      case 'Programming':
      case 'DevOps':
      case 'Marketing':
      case 'Pokemon':
        // returns a boolean value
        // if category of that document is equal to the current filter we clicked on, return true.
        return document.projectCategory === currentFilter
      
      default:
        return true
    }
  }) : null

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
      {documents && <Filter currentFilter={currentFilter} changeFilter={changeFilter}/>}
      {filteredProjects && <ProjectGrid projects={filteredProjects}/>}
    </div>
  );
}
