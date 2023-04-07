import React, { useEffect } from 'react'
import './projects.css'
import { useState } from 'react'
import Rooms from '../rooms/rooms'
import Accounts from '../accounts/accounts'
import Materials from '../materials/materials'
import Tasks from '../tasks/tasks'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setItem } from '../../store/slices/ItemSlice'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
import Backups from '../backups/backups'
import { setVisibleProject } from './../../store/slices/NewsVisibleSlice'
import { updateRefresh } from '../../store/slices/RefreshSlice'
import { updateRefreshMenu } from '../../store/slices/RefreshMenuSlice'
const deployProject = ({ project }) => {
  const dispatch = useDispatch()
  const NewProjectVisible = useSelector(state => state.NewsVisible)[0]

  const [Visible, setVisible] = useState(false)
  const [RoomsVisible, setRoomsVisible] = useState(false)
  const [AccountsVisible, setAccountsVisible] = useState(false)
  const [MaterialsVisible, setMaterialsVisible] = useState(false)
  const [BackupsVisible, setBackupsVisible] = useState(false)
  const [InfoVisible, setInfoVisible] = useState(false)

  const [MenuVisible, setMenuVisible] = useState(false)

  const Refresh = useSelector(state => state.Refresh)
  const RefreshMenu = useSelector(state => state.RefreshMenu)
  const [Click, setClick] = useState(false)
  useEffect(
    () => {
      if (Click) {
        setMenuVisible(!MenuVisible),
          setClick(false)
      } else {
        setMenuVisible(false)
      }
    }, [RefreshMenu]
  )
  useEffect(
    (/** */) => {}, [project, Refresh]
  )
  return (
    <>
      <div className='deploy'>
        <div onClick={() => setVisible(!Visible)} className='tableHover projectTittle'>
          <p>{project.name}</p>
        </div>
        <aside className='threePoints'
          onClick={
            () => (
              dispatch(updateRefreshMenu()),
              setClick(true)
            )
          }
        ><p>...</p></aside>
        {
          MenuVisible
          &&
          <div className='itemList itemListPrimary '>
            <p className='items materialItemsWidth' onClick={() => { dispatch(setItem(project)), dispatch(setVisibleProject(true)), setMenuVisible(!MenuVisible) }}>Editar</p>
            <p className='items materialItemsWidth' onClick={() => ((
              axios.delete(`http://192.168.0.253:8000/api/v1/projects/${project.id}`, getConfig())
                .then(/*,
                  console.log('eliminado con exito falta eliminar todo el contenido de el proyecto para que funcione sin roblemas')
                  axios.get('http://localhost:8000/api/v1/users/me/notes', getConfig())
                    .then(res => { console.log(res), setAllNotes(res.data) })*/
                ),
              dispatch(updateRefresh()),
              setMenuVisible(!MenuVisible)))
            }>Eliminar</p>
          </div>
        }
      </div>
      {Visible && <div className='content'>
        <div className={`subcontent ${InfoVisible && 'activityGrid'}`}>
          <p onClick={() => setInfoVisible(!InfoVisible)} className={`sub`}>Informacion</p>
          {InfoVisible && <div className='info'>
            <p><b>Pais:</b>  {project.country}</p>
            <p><b>Ciudad:</b> {project.city}</p>
            <p><b>Direction:</b> {project.address}</p>
            <p><b>Referencias:</b> {project.reference}</p>
            <p><b>Coordenadas:</b> {project.coordinates}</p>
            <p><b>Planos:</b> <a href={`${project.plane}`}>{`${project.plane}`}</a></p>
            <p><b>Propietario:</b> {project.user.firstName}</p>
          </div>}
        </div>


        <div className={`subcontent ${RoomsVisible && 'activityGrid'}`}>
          <p onClick={() => setRoomsVisible(!RoomsVisible)} className={`sub`}>Habitaciones</p>
          {RoomsVisible && <Rooms projectId={project.id} />}
        </div>

        <div className={`subcontent ${AccountsVisible && 'activityGrid'}`}>
          <p onClick={() => setAccountsVisible(!AccountsVisible)} className={`sub`}>Cuentas</p>
          {AccountsVisible && <Accounts projectId={project.id} />}
        </div>

        <div className={`subcontent ${MaterialsVisible && 'activityGrid'}`}>
          <p onClick={() => setMaterialsVisible(!MaterialsVisible)} className={`sub`}>Materials</p>
          {MaterialsVisible && <Materials projectId={project.id} />}
        </div>

        {
          /* 
            <div className={`subcontent ${TasksVisible && 'activityGrid'}`}>
              <p onClick={() => setTasksVisible(!TasksVisible)} className={`sub`}>Tareas</p>
              {TasksVisible && <Tasks projectId={project.id}/>}
            </div>
          */
        }

        <div className={`subcontent ${BackupsVisible && 'activityGrid'}`}>
          <p onClick={() => setBackupsVisible(!BackupsVisible)} className={`sub`}>Respaldos</p>
          {BackupsVisible && <Backups projectId={project.id} />}
        </div>

      </div>}
    </>
  )
}

export default deployProject