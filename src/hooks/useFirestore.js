import { useReducer, useEffect, useState } from "react";
import { doc, addDoc, deleteDoc, collection, Timestamp} from "firebase/firestore";
import { db } from "../firebase";

// When we make a request to add a new document, when firestore sends back the response, the document will be updated.
// Is the request ongoing, if it is -> set it to true
// Is there any error when receiving response from firebase? if there is, set to true. if not null.
// Is the request successful?
let initialState = {
  document: null,
  isLoading: false,
  error: null,
  success: null
}

const reducer = (state, action) => {
  switch(action.type){
    case 'IS_LOADING':
      return { document: null, error: null,  isLoading: true, success: false}
    
    case 'ADD_DOCUMENT':
      return { error: null, isLoading: false, success: true, document: action.payload}

    case 'ERROR':
      return {isLoading: false, document: null, success: false, error: action.payload}
    
    default:
      return state
  }
}

export const useFirestore = (projectCollection) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // when component unmounts, setIsCancelled to true so that it won't update any local states.
  // So when you navigate to other pages, there won't be any errors
  const [isCancelled, setIsCancelled] = useState(false);

  // only dispatch if isCancelled is false
  const dispatchIfNotCancelled = (action) => {
    if(!isCancelled) {
      dispatch(action)
    }
  }

  // projects reference
  // Pass collection as a second argument. Can be anything like users, projects etc.
  const projectsRef = collection(db, projectCollection)

  // Add a new document (an object)
  const addDocument = async (doc) => {
    dispatch({type: 'IS_LOADING'})

    try {
      const createdAt = Timestamp.fromDate(new Date())
      // add the document object from the component and createdAt into a new collection
      const addedDocument = await addDoc(projectsRef, {...doc, createdAt})
      // we will only update state if the person doesn't navigate away from the page
      dispatchIfNotCancelled({type: 'ADD_DOCUMENT', payload: addedDocument})
    }
    catch(error){
      dispatchIfNotCancelled({type: 'ERROR', payload: error.message})
    }
  }


  // Delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: 'IS_PENDING' })

    try {
      await deleteDoc(doc(projectsRef, id))
    } 
    
    catch(error){
      dispatchIfNotCancelled({ type: 'ERROR', payload: 'Could not delete project. Please try again.'})
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true);
  }, [])

  return { addDocument, deleteDocument, state}
  
}