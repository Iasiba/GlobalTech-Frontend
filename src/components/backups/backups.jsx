import React from 'react'
import './backups.css'
import DeployBackups from './deployBackups'
import AxiosGetHook from '../../hooks/axiosGetHook'
const backups = () => {
  const backup = AxiosGetHook('http://localhost:8000/api/v1/backups')
  const AllBackups = backup.data.data?.backups
  return (
    <div>
      <div className="backupGrid tableHeader">
        <p>Software</p>
        <p>Nombre</p>
        <p>Creador</p>
        <p>Descarga</p>
      </div>
      {
        AllBackups && AllBackups?.map(backup =>{ 
            return (<DeployBackups key={backup.id} backup={backup}/>)
        })
      }
    </div>
  )
}

export default backups