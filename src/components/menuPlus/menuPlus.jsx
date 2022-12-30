import React from 'react'
import './menuPlus.css'
import { Link } from 'react-router-dom'
import { setVisiblePlusMenu } from '../../store/slices/PlusMenu'
import { useSelector, useDispatch } from 'react-redux'

import {
  setVisibleAccount,
  setVisibleActivity,
  setVisibleBackup,
  setVisibleInventary,
  setVisibleMaterial,
  setVisibleNote,
  setVisibleProject,
  setVisibleRoom,
  setVisibleTask,
  setVisibleUser
} from './../../store/slices/NewsVisibleSlice'
const menuPlus = () => {
  const dispatch = useDispatch()
  let visible = useSelector(state => state.PlusMenu)
  const NewProjectVisible = useSelector(state => state.NewsVisible)[0]
  const NewRoomVisible = useSelector(state => state.NewsVisible)[1]
  const NewTaskVisible = useSelector(state => state.NewsVisible)[2]
  const NewActivityVisible = useSelector(state => state.NewsVisible)[3]
  const NewAccountVisible = useSelector(state => state.NewsVisible)[4]
  const NewInventaryVisible = useSelector(state => state.NewsVisible)[5]
  const NewMaterialVisible = useSelector(state => state.NewsVisible)[6]
  const NewBackupVisible = useSelector(state => state.NewsVisible)[7]
  const NewNoteVisible = useSelector(state => state.NewsVisible)[8]
  const NewUserVisible = useSelector(state => state.NewsVisible)[9]
  return (
    /*visible && */<div>
      <div className={`menuPlus ${visible&&'menuPlusOpen'}`}>
        <div onClick={() => { dispatch(setVisibleProject(!NewProjectVisible), dispatch(setVisiblePlusMenu(!visible))) }} className='menuPlusOptions'>Proyecto</div>
        <div onClick={() => { dispatch(setVisibleRoom(!NewRoomVisible), dispatch(setVisiblePlusMenu(!visible))) }} className='menuPlusOptions'>Area</div>
        <div onClick={() => { dispatch(setVisibleTask(!NewTaskVisible), dispatch(setVisiblePlusMenu(!visible))) }} className='menuPlusOptions'>Tarea</div>
        <div onClick={() => { dispatch(setVisibleActivity(!NewActivityVisible), dispatch(setVisiblePlusMenu(!visible))) }} className='menuPlusOptions'>Actividad</div>
        <div onClick={() => { dispatch(setVisibleAccount(!NewAccountVisible), dispatch(setVisiblePlusMenu(!visible))) }} className='menuPlusOptions'>Cuenta</div>
        <div onClick={() => { dispatch(setVisibleInventary(!NewInventaryVisible), dispatch(setVisiblePlusMenu(!visible))) }} className='menuPlusOptions'>Inventario</div>
        <div onClick={() => { dispatch(setVisibleMaterial(!NewMaterialVisible), dispatch(setVisiblePlusMenu(!visible))) }} className='menuPlusOptions'>Material</div>
        <div onClick={() => { dispatch(setVisibleBackup(!NewBackupVisible), dispatch(setVisiblePlusMenu(!visible))) }} className='menuPlusOptions'>Respaldo</div>
        <div onClick={() => { dispatch(setVisibleNote(!NewNoteVisible), dispatch(setVisiblePlusMenu(!visible))) }} className='menuPlusOptions'>Nota</div>
        <div onClick={() => { dispatch(setVisibleUser(!NewUserVisible), dispatch(setVisiblePlusMenu(!visible))) }} className='menuPlusOptions'>Usuario</div>
        <div><Link to={'/updateManual'} onClick={() => (dispatch(setVisiblePlusMenu(!visible)))}>Manual Guia Tutorial</Link></div>
       <div><Link to={'/updateTaskImage'} onClick={() => (dispatch(setVisiblePlusMenu(!visible)))}>Imagen de Tarea</Link></div>
      </div>
    </div>

  )
}

export default menuPlus