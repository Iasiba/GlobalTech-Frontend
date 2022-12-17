import React, { useState } from 'react'
import './backups.css'
import DeployBackups from './deployBackups'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
import { useEffect } from 'react'
const backups = ({ projectId }) => {
  const [Backups, setBackups] = useState('')
  useEffect(() => search(), [])

  function search() {
    const URL = projectId ?
      `http://localhost:8000/api/v1/projects/${projectId}/backups`
      :
      `http://localhost:8000/api/v1/backups`
    axios.get(URL, getConfig())
      .then(
        res => {
          if (res.data?.backups) {
            setBackups(res.data.backups)
          } else {
            setBackups(res.data)
          }
        }
      )
  }
  return (
    <div>
      {
        Backups && <div className="backupGrid tableHeader">
          <p>Software</p>
          <p>Nombre</p>
          <p>Creador</p>
          <p>Descarga</p>
        </div>
      }
      {
        Backups && Backups?.map(backup => {
          return (
            <DeployBackups
              key={backup.id}
              backup={backup}
              search={search}
            />
          )
        })
      }
    </div>
  )
}
export default backups