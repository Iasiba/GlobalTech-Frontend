import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { setItem } from '../../store/slices/ItemSlice'
import getConfig from '../../utils/getConfig'
import './backups.css'
import { setVisibleBackup } from './../../store/slices/NewsVisibleSlice'
import { updateRefresh } from '../../store/slices/RefreshSlice'
import { updateRefreshMenu } from '../../store/slices/RefreshMenuSlice'
const deployBackups = ({ backup }) => {
  const BackendAddress = useSelector(state => state.BackendAddress)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const NewBackupVisible = useSelector(state => state.NewsVisible)[7]
  const [MenuVisible, setMenuVisible] = useState(false)

  const RefreshMenu = useSelector(state => state.RefreshMenu)
  const Refresh = useSelector(state => state.Refresh)
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
  useEffect(() => { }, [Refresh])
  return (
    <>
      <div className='deploy'>
        <div className={`backupBody table`}>
          <p>{backup.software}</p>
          <p>{backup.name}</p>
          <p>{backup.user.firstName}</p>
          <a href={`${backup.backup}`} target="_blank">
            <i className='bx bxs-download'></i>
          </a>
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
            <p className='items materialItemsWidth' onClick={() => { dispatch(setItem(backup)), navigate('/NewBackup')/*dispatch(setVisibleBackup(!NewBackupVisible)), setMenuVisible(!MenuVisible) */ }}>Editar</p>
            <p className='items materialItemsWidth' onClick={() => ((
              axios.delete(`http://${BackendAddress}/api/v1/backups/${backup.id}`, getConfig())
                .then(dispatch(updateRefresh())),
              dispatch(updateRefresh()),
              setMenuVisible(!MenuVisible)))
            }>Eliminar</p>
          </div>
        }
      </div>
    </>
  )
}

export default deployBackups