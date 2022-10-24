import React from 'react'
import './menuUser.css'
import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import { setArea } from '../../store/slices/AreaSlice'

const menuUser = () => {
  const dispatch = useDispatch()
  let visible = useSelector(state => state.UserMenu)
  //let Area = useSelector(state => state.Area)
  return (
    visible && <div className='menu'>
      <div><Link to={'/'} onClick={() => (dispatch(setArea("Home")))}>Home</Link></div>
      <div><Link to={'/tasks'} onClick={() => (dispatch(setArea("Tareas")))}>Tareas</Link></div>
      <div><Link to={'/activities'} onClick={() => (dispatch(setArea("Actividades")))}>Actividades</Link></div>
      <div><Link to={'/projects'} onClick={() => (dispatch(setArea("Proyectos")))}>Proyectos</Link></div>
      {/*<div><Link to={'/plans'} onClick={() => (dispatch(setArea("Planos")))}>Planos</Link></div>
      */}
      <div><Link to={'/inventaries'} onClick={() => (dispatch(setArea("Inventarios")))} >Inventarios</Link></div>
      <div><Link to={'/materials'} onClick={() => (dispatch(setArea("Materiales")))}>Materiales</Link></div>
      <div><Link to={'/users'} onClick={() => (dispatch(setArea("Usuarios")))}>Usuarios</Link></div>
      <div><Link to={'/rooms'} onClick={() => (dispatch(setArea("Habitaciones")))}>Habitaciones</Link></div>
      <div><Link to={'/accounts'} onClick={() => (dispatch(setArea("Cuentas")))}>Cuentas</Link></div>
      <div><Link to={'/myAccount'} onClick={() => (dispatch(setArea("Mi Cuenta")))}>Mi Cuenta</Link></div>
      <div><Link to={'/notes'} onClick={() => (dispatch(setArea("Notas")))}>Notas</Link></div>
      <div><Link to={'/backups'} onClick={() => (dispatch(setArea("Respaldos")))}>Respaldos</Link></div>
      <div><Link to={'/programming'} onClick={() => (dispatch(setArea("Programacion")))}>Programacion</Link></div>
      
    </div>
  )
}

export default menuUser