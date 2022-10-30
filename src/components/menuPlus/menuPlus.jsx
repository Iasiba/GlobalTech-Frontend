import React from 'react'
import './menuPlus.css'
import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
const menuPlus = () => {
  let visible = useSelector(state => state.PlusMenu)
  return (
    visible && <div>
      <div className='menuPlus'>
        <div><Link to={'/newProject'} >Proyecto</Link></div>
        <div><Link to={'/newRoom'} >Ambiente</Link></div>
        <div><Link to={'/newTask'} >Tarea</Link></div>
        <div><Link to={'/updateTaskImage'} >Imagen de Tarea</Link></div>
        <div><Link to={'/newActivity'} >Actividad</Link></div>
        <div><Link to={'/updateManual'} >Manual</Link></div>
        <div><Link to={'/updateGuide'} >Guia</Link></div>
        <div><Link to={'/updateTutorial'} >Tutorial</Link></div>
        <div><Link to={'/newInventary'} >Inventario</Link></div>
        <div><Link to={'/newMaterial'} >Material</Link></div>
        <div><Link to={'/newRole'} >Rol</Link></div>
        <div><Link to={'/newUser'} >Usuario</Link></div>
        <div><Link to={'/newAccount'} >Cuenta</Link></div>
        <div><Link to={'/newBackup'} >Respaldo</Link></div>
        <div><Link to={'/updateBackup'} >Cargar Respaldo</Link></div>
        <div><Link to={'/newNote'} >Nota</Link></div>
        <div><Link to={'/updateUserImage'} >Imagen de Usuario</Link></div>

      </div>
    </div>

  )
}

export default menuPlus