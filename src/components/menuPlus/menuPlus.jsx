import React, { useEffect, useState } from 'react'
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
  setVisibleUser,
  setVisibleGuide
} from './../../store/slices/NewsVisibleSlice'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
const menuPlus = () => {
  const dispatch = useDispatch()
  let visible = useSelector(state => state.PlusMenu)
  const [Me, setMe] = useState('')

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
  const NewGuideVisible = useSelector(state => state.NewsVisible)[10]

  //const Refresh = useSelector(state => state.Refresh)

  useEffect(() => {
    axios.get('http://192.168.0.253:8000/api/v1/users/me', getConfig())
      .then(res => setMe(res.data))
  }, [/*Refresh*/])


  return (
    /*visible && */<div>
      <div className={`menuPlus ${visible && 'menuPlusOpen'}`}>
        <div><Link to={'/NewActivity'} onClick={() => { dispatch(setVisibleActivity(!NewActivityVisible), dispatch(setVisiblePlusMenu(!visible))) }} className='menuPlusOptions'>Actividad</Link></div>
        <div><Link to={'/NewLocation'}  onClick={() => { dispatch(setVisibleRoom(!NewRoomVisible), dispatch(setVisiblePlusMenu(!visible))) }} className='menuPlusOptions'>Area</Link></div>
        <div><Link to={'/NewAccount'} onClick={() => { dispatch(setVisibleAccount(!NewAccountVisible), dispatch(setVisiblePlusMenu(!visible))) }} className='menuPlusOptions'>Cuenta</Link></div>
        <div><Link to={'/NewGuide'} onClick={() => { dispatch(setVisibleGuide(!NewGuideVisible), dispatch(setVisiblePlusMenu(!visible))) }} className='menuPlusOptions'>Guia</Link></div>
        <div><Link to={'/NewInventary'} onClick={() => { dispatch(setVisibleInventary(!NewInventaryVisible), dispatch(setVisiblePlusMenu(!visible))) }} className='menuPlusOptions'>Inventario</Link></div>
        <div><Link to={'/NewMaterial'} onClick={() => { dispatch(setVisibleMaterial(!NewMaterialVisible), dispatch(setVisiblePlusMenu(!visible))) }} className='menuPlusOptions'>Material</Link></div>
        <div><Link to={'/NewNote'} onClick={() => { dispatch(setVisibleNote(!NewNoteVisible), dispatch(setVisiblePlusMenu(!visible))) }} className='menuPlusOptions'>Nota</Link></div>
        <div><Link to={'/NewProject'} onClick={() => { dispatch(setVisibleProject(!NewProjectVisible), dispatch(setVisiblePlusMenu(!visible))) }} className='menuPlusOptions'>Proyecto</Link></div>
        <div><Link to={'/NewBackup'} onClick={() => { dispatch(setVisibleBackup(!NewBackupVisible), dispatch(setVisiblePlusMenu(!visible))) }} className='menuPlusOptions'>Respaldo</Link></div>
        <div><Link to={'/NewTask'} onClick={() => { dispatch(setVisibleTask(!NewTaskVisible), dispatch(setVisiblePlusMenu(!visible))) }} className='menuPlusOptions'>Tarea</Link></div>
        <div><Link to={'/NewUser'} onClick={() => { dispatch(setVisibleUser(!NewUserVisible), dispatch(setVisiblePlusMenu(!visible))) }} className='menuPlusOptions'>Usuario</Link></div>
        {/*<div><Link to={'/updateTaskImage'} onClick={() => (dispatch(setVisiblePlusMenu(!visible)))}>Imagen de Tarea</Link></div>*/}
      </div>
    </div>
    /*
    <div className={`menuPlus ${visible && 'menuPlusOpen'}`}>
        {Me.createOrEditActivities && <div onClick={() => { dispatch(setVisibleActivity(!NewActivityVisible), dispatch(setVisiblePlusMenu(!visible))) }} className='menuPlusOptions'>Actividad</div>}
        {Me.createOrEditArea && <div onClick={() => { dispatch(setVisibleRoom(!NewRoomVisible), dispatch(setVisiblePlusMenu(!visible))) }} className='menuPlusOptions'>Area</div>}
        {Me.createOrEditAccount && <div onClick={() => { dispatch(setVisibleAccount(!NewAccountVisible), dispatch(setVisiblePlusMenu(!visible))) }} className='menuPlusOptions'>Cuenta</div>}
        {Me.createOrEditGuide && <div onClick={() => { dispatch(setVisibleGuide(!NewGuideVisible), dispatch(setVisiblePlusMenu(!visible))) }} className='menuPlusOptions'>Guia</div>}
        {Me.createOrEditInventary && <div onClick={() => { dispatch(setVisibleInventary(!NewInventaryVisible), dispatch(setVisiblePlusMenu(!visible))) }} className='menuPlusOptions'>Inventario</div>}
        {Me.createOrEditMaterial && <div onClick={() => { dispatch(setVisibleMaterial(!NewMaterialVisible), dispatch(setVisiblePlusMenu(!visible))) }} className='menuPlusOptions'>Material</div>}
        {Me.createOrEditNote && <div onClick={() => { dispatch(setVisibleNote(!NewNoteVisible), dispatch(setVisiblePlusMenu(!visible))) }} className='menuPlusOptions'>Nota</div>}
        {Me.createOrEditProject && <div onClick={() => { dispatch(setVisibleProject(!NewProjectVisible), dispatch(setVisiblePlusMenu(!visible))) }} className='menuPlusOptions'>Proyecto</div>}
        {Me.createOrEditBackup && <div onClick={() => { dispatch(setVisibleBackup(!NewBackupVisible), dispatch(setVisiblePlusMenu(!visible))) }} className='menuPlusOptions'>Respaldo</div>}
        {Me.createOrEditTask && <div onClick={() => { dispatch(setVisibleTask(!NewTaskVisible), dispatch(setVisiblePlusMenu(!visible))) }} className='menuPlusOptions'>Tarea</div>}
        {Me.createOrEditUser && <div onClick={() => { dispatch(setVisibleUser(!NewUserVisible), dispatch(setVisiblePlusMenu(!visible))) }} className='menuPlusOptions'>Usuario</div>}
    */
  )
}

export default menuPlus