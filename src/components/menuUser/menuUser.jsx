import React from 'react'
import './menuUser.css'
import { Link } from 'react-router-dom'

import { setVisibleUserMenu } from '../../store/slices/UserMenu'
import { useSelector, useDispatch } from 'react-redux'

import { setArea } from '../../store/slices/AreaSlice'

const menuUser = () => {
  const dispatch = useDispatch()
  let visible = useSelector(state => state.UserMenu)
  let UserMenuVisible = useSelector(state => state.UserMenu)
  //let Area = useSelector(state => state.Area)
  return (
    visible && <div className='menu'>
    <div><Link to={'/'} onClick={() => (dispatch(setArea("Home")), dispatch(setVisibleUserMenu(!UserMenuVisible)))}>Home</Link></div>
    <div><Link to={'/myHome'} onClick={() => (dispatch(setArea("MyHome")), dispatch(setVisibleUserMenu(!UserMenuVisible)))}>MyHome</Link></div>
    <div><Link to={'/tasks'} onClick={() => (dispatch(setArea("Tareas")), dispatch(setVisibleUserMenu(!UserMenuVisible)))}>Tareas</Link></div>
    <div><Link to={'/activities'} onClick={() => (dispatch(setArea("Actividades")), dispatch(setVisibleUserMenu(!UserMenuVisible)))}>Actividades</Link></div>
    <div><Link to={'/projects'} onClick={() => (dispatch(setArea("Proyectos")), dispatch(setVisibleUserMenu(!UserMenuVisible)))}>Proyectos</Link></div>
    {/*<div><Link to={'/plans'} onClick={() => (dispatch(setArea("Planos")))}>Planos</Link></div>
    */}
    <div><Link to={'/inventaries'} onClick={() => (dispatch(setArea("Inventarios")), dispatch(setVisibleUserMenu(!UserMenuVisible)))} >Inventarios</Link></div>
    <div><Link to={'/materials'} onClick={() => (dispatch(setArea("Materiales")), dispatch(setVisibleUserMenu(!UserMenuVisible)))}>Materiales</Link></div>
    <div><Link to={'/users'} onClick={() => (dispatch(setArea("Usuarios")), dispatch(setVisibleUserMenu(!UserMenuVisible)))}>Usuarios</Link></div>
    <div><Link to={'/rooms'} onClick={() => (dispatch(setArea("Habitaciones")), dispatch(setVisibleUserMenu(!UserMenuVisible)))}>Habitaciones</Link></div>
    <div><Link to={'/accounts'} onClick={() => (dispatch(setArea("Cuentas")), dispatch(setVisibleUserMenu(!UserMenuVisible)))}>Cuentas</Link></div>
    <div><Link to={'/myAccount'} onClick={() => (dispatch(setArea("Mi Cuenta")), dispatch(setVisibleUserMenu(!UserMenuVisible)))}>Mi Cuenta</Link></div>
    <div><Link to={'/notes'} onClick={() => (dispatch(setArea("Notas")), dispatch(setVisibleUserMenu(!UserMenuVisible)))}>Notas</Link></div>
    <div><Link to={'/backups'} onClick={() => (dispatch(setArea("Respaldos")), dispatch(setVisibleUserMenu(!UserMenuVisible)))}>Respaldos</Link></div>
    <div><Link to={'/programming'} onClick={() => (dispatch(setArea("Programacion")), dispatch(setVisibleUserMenu(!UserMenuVisible)))}>Programacion</Link></div>
  {/*  
    <div><Link to={'/userList'} onClick={() => (dispatch(setArea("Lista de Usuarios")), dispatch(setVisibleUserMenu(!UserMenuVisible)))}>Lista de Usuarios</Link></div>
  */}
  </div>
  )
}

export default menuUser