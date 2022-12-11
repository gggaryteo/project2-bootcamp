import React from 'react'
import './Dashboard.css'

const INITIAL_ARRAY = ['All', 'Mine', 'Programming', 'DevOps', 'Marketing', 'Pokemon']

export default function Filter({ currentFilter, changeFilter }) {

  const handleClick = (filterName) => {
    console.log(filterName);
    // Lift state up and call a function in the parent component
    changeFilter(filterName);
  }

  return (
    <div className='project-filter'>
      <nav>
        {INITIAL_ARRAY.map((item) => (
          <button className={currentFilter === item ? "active" : ""} key={item} onClick={() => handleClick(item)}>
            {item}
          </button>
        ))}
      </nav>
    </div>
  )
}
