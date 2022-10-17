import React from 'react'
import './menuPlus.css'
import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
const menuPlus = () => {
  let visible = useSelector(state => state.PlusMenu)
  return (
    visible && <div>
      <div className='menuPlus'>
        <div><Link to={'/tasks'} >Tarea</Link></div>
        <div><Link to={'/projects'} >Proyecto</Link></div>
        <div><Link to={'/inventaries'} >Inventario</Link></div>
        <div><Link to={'/users'} >Usuario</Link></div>
        <div><Link to={'/accounts'} >Cuenta</Link></div>
      </div>
    </div>

  )
}

export default menuPlus