import React, { useEffect } from 'react'
import './projects.css'
import { useState } from 'react'
import Rooms from '../rooms/rooms'
import Accounts from '../accounts/accounts'
import Materials from '../materials/materials'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setItem } from '../../store/slices/ItemSlice'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
import Backups from '../backups/backups'
import { updateRefresh } from '../../store/slices/RefreshSlice'
import { updateRefreshMenu } from '../../store/slices/RefreshMenuSlice'
import ExcelGenerator from '../ExcelGenerator/ExcelGenerator'
const deployProject = ({ project }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const BackendAddress = useSelector(state => state.BackendAddress)
  const [Visible, setVisible] = useState(false)
  const [InfoVisible, setInfoVisible] = useState(true)
  const [RoomsVisible, setRoomsVisible] = useState(false)
  const [AccountsVisible, setAccountsVisible] = useState(false)
  const [MaterialsVisible, setMaterialsVisible] = useState(false)
  const [BackupsVisible, setBackupsVisible] = useState(false)

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
    (/** */) => { }, [project, Refresh]
  )
  function watchInfo() {
    setInfoVisible(!InfoVisible)
    setRoomsVisible(false)
    setAccountsVisible(false)
    setMaterialsVisible(false)
    setBackupsVisible(false)
  }
  function watchRooms() {
    setInfoVisible(false)
    setRoomsVisible(!RoomsVisible)
    setAccountsVisible(false)
    setMaterialsVisible(false)
    setBackupsVisible(false)
  }
  function watchAccounts() {
    setInfoVisible(false)
    setRoomsVisible(false)
    setAccountsVisible(!AccountsVisible)
    setMaterialsVisible(false)
    setBackupsVisible(false)
  }
  function watchMaterials() {
    setInfoVisible(false)
    setRoomsVisible(false)
    setAccountsVisible(false)
    setMaterialsVisible(!MaterialsVisible)
    setBackupsVisible(false)
  }
  function watchBackups() {
    setInfoVisible(false)
    setRoomsVisible(false)
    setAccountsVisible(false)
    setMaterialsVisible(false)
    setBackupsVisible(!BackupsVisible)
  }
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
        {//menu de tareas
          MenuVisible
          &&
          <div className='itemList itemListPrimary '>
            <ExcelGenerator data={project} />
            <p className='items materialItemsWidth' onClick={() => { dispatch(setItem(project)), navigate('/NewProject')/*dispatch(setVisibleProject(true)), setMenuVisible(!MenuVisible)*/ }}>Editar</p>
            {
              !project.accounts.length &&
              !project.backups.length &&
              !project.rooms.length &&
              !project.materials.length &&
              <p className='items materialItemsWidth' onClick={() => ((
                axios.delete(`http://${BackendAddress}/api/v1/projects/${project.id}`, getConfig())
                  .then(/*,
                  console.log('eliminado con exito falta eliminar todo el contenido de el proyecto para que funcione sin roblemas')
                  axios.get('http://localhost:8000/api/v1/users/me/notes', getConfig())
                    .then(res => { console.log(res), setAllNotes(res.data) })*/
                ),
                dispatch(updateRefresh()),
                setMenuVisible(!MenuVisible)))
              }>Eliminar</p>}
          </div>
        }
      </div>
      {Visible && <div className='projectcontent'>
        <ul className='projectsubcontent'>
          <li onClick={() => watchInfo()/*setInfoVisible(!InfoVisible)*/} className={`projectsub ${InfoVisible && 'selected'}`}>Informacion</li>
          {(project.rooms.length > 0) && <li onClick={() => watchRooms() /*setRoomsVisible(!RoomsVisible)*/} className={`projectsub ${RoomsVisible && 'selected'}`}>Habitaciones</li>}
          {(project.accounts.length > 0) && <li onClick={() => watchAccounts() /*setAccountsVisible(!AccountsVisible)*/} className={`projectsub ${AccountsVisible && 'selected'}`}>Cuentas</li>}
          {(project.materials.length > 0) && <li onClick={() => watchMaterials() /*setMaterialsVisible(!MaterialsVisible)*/} className={`projectsub ${MaterialsVisible && 'selected'}`}>Materials</li>}
          {(project.backups.length > 0) && <li onClick={() => watchBackups() /*setBackupsVisible(!BackupsVisible)*/} className={`projectsub ${BackupsVisible && 'selected'}`}>Respaldos</li>}
        </ul>
        <aside>
          {InfoVisible && <div className='info'>
            <p><b>Pais:</b>  {project.country}</p>
            <p><b>Ciudad:</b> {project.city}</p>
            <p><b>Direccion:</b> {project.address}</p>
            {project.reference && <p><b>Referencias:</b> {project.reference}</p>}
            <p><b>Coordenadas:</b> {/*'25.653315, -100.382917'*/project.coordinates} <a href={`https://maps.google.com/?q=${project.coordinates}`} className='projectsub'>¿Como llegar?</a></p>
            {/*<p><b>Planos:</b> <a href={`${project.plane}`} className='projectsub'>Ver planos</a></p>*/}
            <p><b>Propietario:</b> {project.user.firstName}</p>
          </div>}
          {RoomsVisible && <Rooms projectId={project.id} />}
          {AccountsVisible && <Accounts projectId={project.id} />}
          {MaterialsVisible && <Materials projectId={project.id} />}
          {BackupsVisible && <Backups projectId={project.id} />}
        </aside>
        {
          /* 
            <div className={`subcontent ${TasksVisible && 'activityGrid'}`}>
              <p onClick={() => setTasksVisible(!TasksVisible)} className={`sub`}>Tareas</p>
              {TasksVisible && <Tasks projectId={project.id}/>}
            </div>
          */
        }
      </div>}
    </>
  )
}

export default deployProject