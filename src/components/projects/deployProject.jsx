import React from 'react'
import './projects.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
const deployProject = ({ project }) => {
  const [Visible, setVisible] = useState(false)
  return (
    <>
      <div onClick={() => setVisible(!Visible)} className='project'>
        <p>{project.name}</p>
      </div>
      {Visible && <div className='deployTask'>
        <p>Pais: {project.country}</p>
        <p>Ciudad: {project.city}</p>
        <p>Direction: {project.address}</p>
        <p>Referencias: {project.reference}</p>
        <p>Coordenadas: {project.coordinates}</p>
        <p>Planos: {`${project.plane}`}</p>
        <p>Habitaciones: { }</p>
        <p>Cuentas: {}</p>
        <p>Respaldos: {}</p>
        <p>Materiales: {}</p>
        <p>Propietario: {project.user.firstName}</p>
        <p>tareas: {}</p>
        <p><Link className='tasks' to={`/tasks/activity/:${project.id}`}>Actividades </Link> </p>
      </div>}
    </>
  )
}

export default deployProject