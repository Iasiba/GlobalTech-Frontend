import React from 'react'
import './projects.css'
import { useState } from 'react'
import Rooms from '../rooms/rooms'
import Accounts from '../accounts/accounts'
import Materials from '../materials/materials'
import Tasks from '../tasks/tasks'
import Backups from '../backups/backups'
const deployProject = ({ project }) => {
  const [Visible, setVisible] = useState(false)
  const [RoomsVisible, setRoomsVisible] = useState(false)
  const [AccountsVisible, setAccountsVisible] = useState(false)
  const [MaterialsVisible, setMaterialsVisible] = useState(false)
  const [TasksVisible, setTasksVisible] = useState(false)
  const [BackupsVisible, setBackupsVisible] = useState(false)
  const [InfoVisible, setInfoVisible] = useState(false)
  return (
    <>
      <div onClick={() => setVisible(!Visible)} className='tableHeader tableHover'>
        <p>{project.name}</p>
      </div>
      {Visible && <div className='content'>
        <div className={`subcontent ${InfoVisible && 'activityGrid'}`}>
          <p onClick={() => setInfoVisible(!InfoVisible)} className={`sub`}>Informacion</p>
          {InfoVisible && <div className='info'>
            <p>Pais: {project.country}</p>
            <p>Ciudad: {project.city}</p>
            <p>Direction: {project.address}</p>
            <p>Referencias: {project.reference}</p>
            <p>Coordenadas: {project.coordinates}</p>
            <p>Planos: {`${project.plane}`}</p>
            <p>Propietario: {project.user.firstName}</p>
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

        {/* <div className={`subcontent ${TasksVisible && 'activityGrid'}`}>
          <p onClick={() => setTasksVisible(!TasksVisible)} className={`sub`}>Tareas</p>
          {TasksVisible && <Tasks projectId={project.id}/>}
  </div>*/}

        <div className={`subcontent ${BackupsVisible && 'activityGrid'}`}>
          <p onClick={() => setBackupsVisible(!BackupsVisible)} className={`sub`}>Respaldos</p>
          {BackupsVisible && <Backups projectId={project.id} />}
        </div>

      </div>}
    </>
  )
}

export default deployProject