import { useEffect, useState } from "react"
import { db } from "../firebase"
import { doc, onSnapshot } from "firebase/firestore"

// Pass in 2 arguments - specify the collection of which the document is in and the ID of the document
export const useDocument = (projectCollection, id) => {
  const [document, setDocument] = useState(null)
  const [error, setError] = useState(null)

  // update the document data in real time.
  useEffect(() => {
    const docRef = doc(db, projectCollection, id)

    // call a onSnapshot method, and get an initial snapshot of all the data in the document
    // Whenever a change occurs in a document, get additional snapshot and fire the function again.
    const unsubscribe = onSnapshot(docRef, (document) => {
      if(document.data()) {
        setDocument({ ...document.data(), id: document.id })
        setError(null)
      } else {
        setError('There is no such document in our database.')
      }   
    }, (error) => {
      console.log(error.message)
      setError('Failed to fetch document')
    })

    return () => unsubscribe()

  }, [projectCollection, id])

  return {document, error}
}