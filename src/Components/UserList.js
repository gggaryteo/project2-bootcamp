// Styles
import './UserList.css'

import React, { useState, useEffect} from 'react'
import { db } from '../firebase'
import { collection, onSnapshot } from 'firebase/firestore';
import { useAuthContext } from '../hooks/useAuthContext';
import UserAvatar from './UserAvatar';
import GreenPikachu from '../assets/greenpika.png'

export default function UserList() {
  const { user } = useAuthContext();
  console.log(user);
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

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

  return (
    <div className='user-list'>
      <h2> Poke Users: </h2>
      {error && <div className='error'>{error}</div>}
      {documents && documents.map((user) => (
        <div className="user-list-item" key={user.id}>
          {user.online && <img className='online-status' src={GreenPikachu} alt="online"/>}
          <span>{user.displayName}</span>
          <UserAvatar src={user.photoURL}/>   
        </div>
      ))}
    </div>
  )
}
