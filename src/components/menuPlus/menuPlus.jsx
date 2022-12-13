import React from 'react'
import './menuPlus.css'
import { Link } from 'react-router-dom'
import { setVisiblePlusMenu } from '../../store/slices/PlusMenu'
import { useSelector, useDispatch } from 'react-redux'
const menuPlus = () => {
  const dispatch = useDispatch()
  let visible = useSelector(state => state.PlusMenu)
  return (
    visible && <div>
      <div className='menuPlus'>
        <div><Link to={'/newProject'} onClick={() => (dispatch(setVisiblePlusMenu(!visible)))}>Proyecto</Link></div>
        <div><Link to={'/newRoom'} onClick={() => (dispatch(setVisiblePlusMenu(!visible)))}>Ambiente</Link></div>
        <div><Link to={'/newTask'} onClick={() => (dispatch(setVisiblePlusMenu(!visible)))}>Tarea</Link></div>
        <div><Link to={'/newActivity'} onClick={() => (dispatch(setVisiblePlusMenu(!visible)))}>Actividad</Link></div>
        <div><Link to={'/updateManual'} onClick={() => (dispatch(setVisiblePlusMenu(!visible)))}>Manual</Link></div>
        <div><Link to={'/updateGuide'} onClick={() => (dispatch(setVisiblePlusMenu(!visible)))}>Guia</Link></div>
        <div><Link to={'/updateTutorial'} onClick={() => (dispatch(setVisiblePlusMenu(!visible)))}>Tutorial</Link></div>
        <div><Link to={'/newInventary'} onClick={() => (dispatch(setVisiblePlusMenu(!visible)))}>Inventario</Link></div>
        <div><Link to={'/newMaterial'} onClick={() => (dispatch(setVisiblePlusMenu(!visible)))}>Material</Link></div>
        <div><Link to={'/newRole'} onClick={() => (dispatch(setVisiblePlusMenu(!visible)))}>Rol</Link></div>
        <div><Link to={'/newUser'} onClick={() => (dispatch(setVisiblePlusMenu(!visible)))}>Usuario</Link></div>
        <div><Link to={'/newAccount'} onClick={() => (dispatch(setVisiblePlusMenu(!visible)))}>Cuenta</Link></div>
        <div><Link to={'/newBackup'} onClick={() => (dispatch(setVisiblePlusMenu(!visible)))}>Respaldo</Link></div>
        <div><Link to={'/updateBackup'} onClick={() => (dispatch(setVisiblePlusMenu(!visible)))}>Cargar Respaldo</Link></div>
        <div><Link to={'/newNote'} onClick={() => (dispatch(setVisiblePlusMenu(!visible)))}>Nota</Link></div>
        <div><Link to={'/assignMaterial'} onClick={() => (dispatch(setVisiblePlusMenu(!visible)))}>Asignar Material</Link></div>
        <div><Link to={'/assignTask'} onClick={() => (dispatch(setVisiblePlusMenu(!visible)))}>Asignar Tareas</Link></div>
        <div><Link to={'/updateUserImage'} onClick={() => (dispatch(setVisiblePlusMenu(!visible)))}>Imagen de Usuario</Link></div>
        <div><Link to={'/updateTaskImage'} onClick={() => (dispatch(setVisiblePlusMenu(!visible)))}>Imagen de Tarea</Link></div>


      </div>
    </div>

  )
}

export default menuPlus