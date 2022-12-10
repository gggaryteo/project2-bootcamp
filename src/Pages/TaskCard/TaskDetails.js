import React from 'react'
import UserAvatar from '../../Components/UserAvatar'
import { useFirestore } from '../../hooks/useFirestore'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'

export default function TaskDetails({ taskData }) {
  const { deleteDocument } = useFirestore('projects')
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleDelete = (e) => {
    deleteDocument(taskData.id)
    navigate("/")
  }

  return (
    <div>
      <div className='project-taskData'>
        <h2 className='title'>{taskData.projectName}</h2>
        <p className='created-by'> Project Created By: {taskData.createdBy.displayName}</p>
        <p className='date'> Project Due Date: {taskData.dueDate.toDate().toLocaleDateString()} </p>
        <p className='details'>{taskData.projectDetails}</p>
        <h4>Project Assigned to: </h4>
        <div className='users'>
        {taskData.storeAssignedUsers.map(user => (
            <UserAvatar key={user.id} src={user.photoURL}/>
        ))}
        </div>
      </div>
      {user.uid === taskData.createdBy.id && (<button className='btn' onClick={handleDelete}>Mark As Complete</button>)}
    </div>
  )
}
