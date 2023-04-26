import React, { useState } from 'react'
import './backups.css'
import DeployBackups from './deployBackups'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
const backups = ({ projectId }) => {
  const Refresh = useSelector(state => state.Refresh)
  const [Backups, setBackups] = useState('')
  useEffect(() => search(), [Refresh])

  function search() {
    const URL = projectId ?
      `http://192.168.0.253:8000/api/v1/projects/${projectId}/backups`
      :
      `http://192.168.0.253:8000/api/v1/backups`
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

      //
      axios.get(`http://192.168.0.253:8000/public/Houser 230413 v15.10.hwqs`, getConfig())
      .then(
        res => {
          console.log(res)
        }
      )
      //
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
            />
          )
        })
      }
    </div>
  )
}
export default backups