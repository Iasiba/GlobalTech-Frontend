import React from 'react'
import './menuUser.css'
import { Link, useNavigate } from 'react-router-dom'

import { setVisibleUserMenu } from '../../store/slices/UserMenu'
import { useSelector, useDispatch } from 'react-redux'

import { setArea } from '../../store/slices/AreaSlice'

const menuUser = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  /**let visible = useSelector(state => state.UserMenu)*/
  let UserMenuVisible = useSelector(state => state.UserMenu)
  //let Area = useSelector(state => state.Area)
  return (
    /*visible && */<div className={`menu ${UserMenuVisible && 'openmenuUser'}`}>
      <div className='menuPlusOptions' onClick={() => (navigate('/activities'), dispatch(setArea("Actividades")), dispatch(setVisibleUserMenu(!UserMenuVisible)))}>Actividades</div>
      <div className='menuPlusOptions' onClick={() => (navigate('/programming'), dispatch(setArea("Programacion")), dispatch(setVisibleUserMenu(!UserMenuVisible)))}>Documentacion</div>
      <div className='menuPlusOptions' onClick={() => (navigate('/'), dispatch(setArea("Home")), dispatch(setVisibleUserMenu(!UserMenuVisible)))}>Home</div>
      <div className='menuPlusOptions' onClick={() => (navigate('/inventaries'), dispatch(setArea("Inventarios")), dispatch(setVisibleUserMenu(!UserMenuVisible)))} >Inventarios</div>
      <div className='menuPlusOptions' onClick={() => (navigate('/myAccount'), dispatch(setArea("Mi Cuenta")), dispatch(setVisibleUserMenu(!UserMenuVisible)))}>Mi Cuenta</div>
      <div className='menuPlusOptions' onClick={() => (navigate('/myHome'), dispatch(setArea("MyHome")), dispatch(setVisibleUserMenu(!UserMenuVisible)))}>MyHome</div>
      <div className='menuPlusOptions' onClick={() => (navigate('/projects'), dispatch(setArea("Proyectos")), dispatch(setVisibleUserMenu(!UserMenuVisible)))}>Proyectos</div>
      <div className='menuPlusOptions' onClick={() => (navigate('/tasks'), dispatch(setArea("Tareas")), dispatch(setVisibleUserMenu(!UserMenuVisible)))}>Tareas</div>
      <div className='menuPlusOptions' onClick={() => (navigate('/users'), dispatch(setArea("Usuarios")), dispatch(setVisibleUserMenu(!UserMenuVisible)))}>Usuarios</div>
      {/*  
    <div><Link to={'/userList'} onClick={() => (dispatch(setArea("Lista de Usuarios")), dispatch(setVisibleUserMenu(!UserMenuVisible)))}>Lista de Usuarios</Link></div>
  */}
    </div>
  )
}

export default menuUser