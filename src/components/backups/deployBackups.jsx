import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setItem } from '../../store/slices/ItemSlice'
import getConfig from '../../utils/getConfig'
import './backups.css'
import { setVisibleBackup } from './../../store/slices/NewsVisibleSlice'
const deployBackups = ({ backup, search }) => {
  const dispatch = useDispatch()
  const NewBackupVisible = useSelector(state => state.NewsVisible)[7]
  const [MenuVisible, setMenuVisible] = useState(false)
  return (
    <>
      <div className='deploy'>
        <div className={`backupBody table`}>
          <p>{backup.software}</p>
          <p>{backup.name}</p>
          <p>{backup.user.firstName}</p>
          <a href={`${backup.backup}`}>
            <i className='bx bxs-download'></i>
          </a>
        </div>

        <aside className='threePoints' onClick={() => setMenuVisible(!MenuVisible)} ><p>...</p></aside>
        {
          MenuVisible
          &&
          <div className='itemList itemListPrimary '>
            <p className='items materialItemsWidth' onClick={() => {dispatch(setItem(backup)),dispatch(setVisibleBackup(!NewBackupVisible)),setMenuVisible(!MenuVisible)}}>Editar</p>
            <p className='items materialItemsWidth' onClick={() => ((
              axios.delete(`http://localhost:8000/api/v1/backups/${backup.id}`, getConfig())
                .then(search()),
              setMenuVisible(!MenuVisible)))
            }>Eliminar</p>
          </div>
        }
      </div>
    </>
  )
}

export default deployBackups