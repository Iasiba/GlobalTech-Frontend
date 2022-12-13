import React from 'react'
import './backups.css'
import DeployBackups from './deployBackups'
import AxiosGetHook from '../../hooks/axiosGetHook'
const backups = ({ projectId }) => {
  const AllBackups = AxiosGetHook(projectId ? `http://localhost:8000/api/v1/projects/${projectId}/backups` : `http://localhost:8000/api/v1/backups`)
  const Backups = projectId ? AllBackups.data?.data : AllBackups.data.data?.backups
  return (
    <div>
      {Backups&&<div className="backupGrid tableHeader">
        <p>Software</p>
        <p>Nombre</p>
        <p>Creador</p>
        <p>Descarga</p>
      </div>}
      {
        Backups && Backups?.map(backup => {
          return (<DeployBackups key={backup.id} backup={backup} />)
        })
      }
    </div>
  )
}

export default backups