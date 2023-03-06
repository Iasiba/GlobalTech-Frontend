import React, { useEffect } from 'react'
import './users.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setItem } from '../../store/slices/ItemSlice'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
import { setRefresh } from '../../store/slices/RefreshSlice'
const deployUser = ({ user, searchUsers }) => {
  const dispatch = useDispatch()
  const [Visible, setVisible] = useState(false)
  const [MenuVisible, setMenuVisible] = useState(false)

  const Refresh = useSelector(state => state.Refresh)
  const [Click, setClick] = useState(false)
  useEffect(
    () => {
      if (Click) {
        setMenuVisible(!MenuVisible),
          setClick(false)
      } else {
        setMenuVisible(false)
      }
    }, [Refresh]
  )
  return (
    <>
      <div className='deploy'>
        <div onClick={() => setVisible(!Visible)} className='userHeader tableHover'>
          <p>{user.firstName} {user.lastName}</p>
          {user.tasks[0] && <p>{user.tasks && user.tasks[0].description}</p>}
        </div>
        <aside className='threePoints'
          onClick={
            () => (
              dispatch(setRefresh(!Refresh)),
              setClick(true)
            )
          }
        ><p>...</p></aside>
        {
          MenuVisible
          &&
          <div className='itemList itemListPrimary '>
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