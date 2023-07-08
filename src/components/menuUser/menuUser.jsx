import React, { useEffect, useState } from 'react'
import './menuUser.css'
import { Link, useNavigate } from 'react-router-dom'

import { setVisibleUserMenu } from '../../store/slices/UserMenu'
import { useSelector, useDispatch } from 'react-redux'

import { setArea } from '../../store/slices/AreaSlice'
import axios from 'axios'
import getConfig from '../../utils/getConfig'

const menuUser = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const BackendAddress = useSelector(state => state.BackendAddress)
  /**let visible = useSelector(state => state.UserMenu)*/
  let UserMenuVisible = useSelector(state => state.UserMenu)
  const [Me, setMe] = useState('')
  //let Area = useSelector(state => state.Area)
  useEffect(() => {
    axios.get(`http://${BackendAddress}/api/v1/users/me`, getConfig())
      .then(res => setMe(res.data))
  }, [])
  const handleLogout = () => {
    localStorage.removeItem('token')
  }
  return (
    /*visible && */<div className={`menu ${UserMenuVisible && 'openmenuUser'}`}>
      {Me.watchActivities && <div className='menuPlusOptions' onClick={() => (navigate('/activities'), dispatch(setVisibleUserMenu(!UserMenuVisible)))}>Actividades</div>}
      {Me.watchDocumentation && <div className='menuPlusOptions' onClick={() => (navigate('/programming'), dispatch(setVisibleUserMenu(!UserMenuVisible)))}>Documentacion</div>}
      {Me.watchHome && <div className='menuPlusOptions' onClick={() => (navigate('/'), dispatch(setVisibleUserMenu(!UserMenuVisible)))}>Home</div>}
      {Me.watchInventaries && <div className='menuPlusOptions' onClick={() => (navigate('/inventaries'), dispatch(setVisibleUserMenu(!UserMenuVisible)))} >Inventarios</div>}
      {Me.watchMyAccount && <div className='menuPlusOptions' onClick={() => (navigate('/myAccount'), dispatch(setVisibleUserMenu(!UserMenuVisible)))}>Mi Cuenta</div>}
      {Me.watchMyHome && <div className='menuPlusOptions' onClick={() => (navigate('/myHome'), dispatch(setVisibleUserMenu(!UserMenuVisible)))}>My Home</div>}
      {Me.watchProjects && <div className='menuPlusOptions' onClick={() => (navigate('/projects'), dispatch(setVisibleUserMenu(!UserMenuVisible)))}>Proyectos</div>}
      {Me.watchTasks && <div className='menuPlusOptions' onClick={() => (navigate('/tasks'), dispatch(setVisibleUserMenu(!UserMenuVisible)))}>Tareas</div>}
      {Me.watchUsers && <div className='menuPlusOptions' onClick={() => (navigate('/users'), dispatch(setVisibleUserMenu(!UserMenuVisible)))}>Usuarios</div>}
      {<div className='menuPlusOptions' onClick={() => (handleLogout(), navigate('/login'), dispatch(setVisibleUserMenu(!UserMenuVisible)))}>Cerrar Sesion</div>}
      {/*  
    <div><Link to={'/userList'} onClick={() => (dispatch(setArea("Lista de Usuarios")), dispatch(setVisibleUserMenu(!UserMenuVisible)))}>Lista de Usuarios</Link></div>
  */}
    </div>
  )
}

export default menuUser