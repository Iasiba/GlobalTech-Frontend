import React from 'react'
import './menuPlus.css'
import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
const menuPlus = () => {
  let visible = useSelector(state => state.PlusMenu)
  return (
    visible && <div>
      <div className='menuPlus'>
        <div><Link to={'/newTask'} >Crear Tarea</Link></div>
        <div><Link to={'/newProject'} >Crear Proyecto</Link></div>
        <div><Link to={'/newInventary'} >Crear Inventario</Link></div>
        <div><Link to={'/newUser'} >Crear Usuario</Link></div>
        <div><Link to={'/newAccount'} >Crear Cuenta</Link></div>
      </div>
    </div>

  )
}

export default menuPlus