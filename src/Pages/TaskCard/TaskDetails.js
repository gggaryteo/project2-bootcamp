import React from 'react'
import UserAvatar from '../../Components/UserAvatar'

export default function TaskDetails({ taskData }) {
  return (
    <div>
      <div className='project-taskData'>
        <h2 className='title'>{taskData.projectName}</h2>
        <p className='date'> Project Due Date: {taskData.dueDate.toDate().toLocaleDateString()} </p>
        <p className='details'>{taskData.projectDetails}</p>
        <h4>Project Assigned to: </h4>
        <div className='users'>
        {taskData.storeAssignedUsers.map(user => (
            <UserAvatar key={user.id} src={user.photoURL}/>
        ))}
        </div>
      </div>
    </div>
  )
}
