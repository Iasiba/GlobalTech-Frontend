import React from 'react'
import './users.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
const deployUser = ({ user }) => {
    const [Visible, setVisible] = useState(false)
    return (
      <>
        <div onClick={() => setVisible(!Visible)} className='project'>
          <p>{user.firstName} {user.lastName}</p>
        </div>
        {Visible && <div className='deployTask'>
          <p>Email: {user.email}</p>
          <p>Perfil: {user.profileImage}</p>
          <p>Telefono: {user.phone}</p>
          <p>Tareas: {}</p>
          <p>Tarea Actual: {user.tasks[user.tasks.length-1].description}</p>
          <p>Material: {}</p>
          <p><Link className='tasks' to={`/tasks/activity/:${user.id}`}>Actividades </Link> </p>
        </div>}
      </>
    )
  }

export default deployUser