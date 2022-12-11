import "./CreateProject.css";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import { collection, onSnapshot, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";

const INITIAL_CATEGORIES = [
  {value: 'Programming', label: 'Programming'},
  {value: 'Marketing', label: 'Marketing'},
  {value: 'DevOps', label: 'DevOps'},
  {value: 'Pokemon', label: 'Pokemon'},
]

export default function CreateProject() {
  // custom hooks
  const { user } = useAuthContext();
  const { addDocument, state } = useFirestore('projects');

  // navigate hook
  const navigate = useNavigate();

  const [projectName, setProjectName] = useState('');
  const [projectDetails, setProjectDetails] = useState('');
  const [projectCategory, setProjectCategory] = useState('');
  // Add users into an array if we assign a project to them
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [dueDate, setDueDate] = useState('');
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, "users");

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      let results = [];
      snapshot.docs.forEach(doc => {
        results.push({...doc.data(),id: doc.id})
      })

      setDocuments(results);
      setError(null);
    }, (error) => {
      console.log(error);
      setError('Could not fetch data from collection')
    })

    // component unmount cleanup function
    return () => unsubscribe();

  }, [])

  // Map through the documents, return a new array and update the users array with a value and label pair.
  useEffect(() => {
    // if there are documents...
    if(documents) {
      const options = documents.map((user) => {
        return {
          value: user, 
          label: user.displayName
        }
      })
      setUsers(options);
    }
  }, [documents])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // every time we submit the form, reset error to null first
    setError(null);

    // If there is no category selected, output error message
    if(!projectCategory) {
      setError('Please select a category')
      return
    }
    // If there is no assigned users, array.length === 0 , output error message
    if(assignedUsers.length < 1) {
      setError('Please assign a user to at least one person.')
      return
    }

    const createdBy = {
      id: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
    }

    const storeAssignedUsers = assignedUsers.map(user => {
      return {
        displayName: user.value.displayName,
        photoURL: user.value.photoURL,
        id: user.value.id
      }
    })

    // Store the project into an object. Ultimately, this will be oassed as a document to the custom hook and be stored in the database.
    const project = {
      createdBy,
      projectName,
      projectDetails,
      projectCategory: projectCategory.value,
      dueDate: Timestamp.fromDate(new Date(dueDate)),
      comments: [],
      storeAssignedUsers
    }
    
    await addDocument(project)
    if (!state.error) {
      // if there's no error in the updating of the state, redirect user to dashboard.
      navigate('/');
    }
  }


  const handleOption = (option) => {
    setProjectCategory(option);
  }

  const handleUserOption = (option) => {
    setAssignedUsers(option);
  }

  return (
    <div className="project-form">
      <h2 className="page-title">Project Page</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project Name:</span>
          <input
            required
            type="text"
            onChange={(e) => setProjectName(e.target.value)}
            value={projectName}
          />
        </label>
        <label>
          <span>Project Details:</span>
          <textarea
            required
            type="text"
            onChange={(e) => setProjectDetails(e.target.value)}
            value={projectDetails}
          ></textarea>
        </label>
        <label>
          <span>Project Category:</span>
          <Select
            options={INITIAL_CATEGORIES}
            onChange={handleOption}
          />
        </label>
        <label>
          <span>Assign To Users:</span>
          <Select
            isMulti
            options={users}
            onChange={handleUserOption}
          />
        </label>
        <label>
          <span>Deadline:</span>
          <input
            required
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>
        <button className="btn">Create Project Now!</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
