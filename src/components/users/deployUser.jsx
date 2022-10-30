import React from 'react'
import './users.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
const deployUser = ({ user }) => {
  const [Visible, setVisible] = useState(false)
  console.log(user)
  return (
    <>
      <div onClick={() => setVisible(!Visible)} className='userHeader tableHover'>
        <p>{user.firstName} {user.lastName}</p>
        {user.tasks[0]&&<p>{user.tasks && user.tasks[0].description}</p>}
      </div>
      {Visible && <div className='deployTask'>
        <p>Email: {user.email}</p>
        <p>Perfil: {user.profileImage}</p>
        <p>Telefono: {user.phone}</p>
        <p>Material: { }</p>
        <p>Proyectos: { }</p>
        <p>Tareas: { }</p>
        <p>Tarea Actual: { }</p>
        <p>Actividades: { }</p>
      </div>}
    </>
  )
}

export default deployUser