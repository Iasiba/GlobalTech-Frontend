import React from 'react'
import './users.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setItem } from '../../store/slices/ItemSlice'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
const deployUser = ({ user, searchUsers }) => {
  const dispatch = useDispatch()
  const [Visible, setVisible] = useState(false)
  const [MenuVisible, setMenuVisible] = useState(false)
  return (
    <>
      <div className='deploy'>
        <div onClick={() => setVisible(!Visible)} className='userHeader tableHover'>
          <p>{user.firstName} {user.lastName}</p>
          {user.tasks[0] && <p>{user.tasks && user.tasks[0].description}</p>}
        </div>
        <aside className='threePoints' onClick={() => setMenuVisible(!MenuVisible)} ><p>...</p></aside>
        {
          MenuVisible
          &&
          <div className='itemList itemListPrimary '>
            <p className='items materialItemsWidth' onClick={() => dispatch(setItem(false))}><Link to={'/users'}  >Editar</Link></p>
            <p className='items materialItemsWidth' onClick={() => ((
              axios.delete(`http://localhost:8000/api/v1/users/${user.id}`, getConfig())
                .then(searchUsers()),
              setMenuVisible(!MenuVisible)))
            }>Eliminar</p>
          </div>
        }
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