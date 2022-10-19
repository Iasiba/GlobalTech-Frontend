import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
const deployMaterials = ({material}) => {
    const [Visible, setVisible] = useState(false)
  return (
    <>
    <div onClick={() => setVisible(!Visible)} className='project'>
      <p>{material.name}</p>
    </div>
    {Visible && <div className='deployTask'>
      <p>Usuario Asignado: {}</p>
      <p>Inventario: {material.inventory.name}</p>
      <p>Cantidad: {material.amount}</p>
      <p>Instalado: {}</p>
      <p>Retornado: {material.returned?"si":"no"}</p>
      <p>Dañado: {}</p>
      <p>En espera: {material.onHold? "si":"no" }</p>
      <p>Proyecto: {material.project.name}</p>
      <p><Link className='tasks' to={`/tasks/activity/:${material.id}`}>Actividades </Link> </p>
    </div>}
  </>
  )
}

export default deployMaterials