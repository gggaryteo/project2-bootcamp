import './UserAvatar.css'

import React from 'react'

export default function UserAvatar(props) {
  return (
    <div className='avatar'>
      <img src={props.src} alt="User Avatar"/>
    </div>
  )
}
