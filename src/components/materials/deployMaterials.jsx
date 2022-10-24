import React from 'react'
import { useState } from 'react'
const deployMaterials = ({ material }) => {
  const [Visible, setVisible] = useState(false)
  return (
    <>
      <div onClick={() => setVisible(!Visible)} className='materialsHeader tableHover'>
        <p>{material.name}</p>
        <p>{material.amount}</p>
        <p>{material.project.name}</p>
      </div>
      {Visible && <div className='content'>
        <p>Cantidad: {material.amount}</p>
        <p>Proyecto: {material.project.name}</p>
        <p>Instalado: { }</p>
        <p>Retornado: {material.returned ? "si" : "no"}</p>
        <p>Dañado: { }</p>
        <p>En espera: {material.onHold ? "si" : "no"}</p>
        <p>Inventario: {material.inventory.name}</p>
        <p>Usuario Asignado: { }</p>
      </div>}
    </>
  )
}

export default deployMaterials