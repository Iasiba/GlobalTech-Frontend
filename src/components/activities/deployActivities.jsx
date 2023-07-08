import React, { useEffect } from 'react'
import { useState } from 'react'
import './activities.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setItem } from '../../store/slices/ItemSlice'
import getConfig from '../../utils/getConfig'
import { setVisibleActivity } from './../../store/slices/NewsVisibleSlice'
import { updateRefreshMenu } from '../../store/slices/RefreshMenuSlice'
import { updateRefresh } from '../../store/slices/RefreshSlice'
import { useNavigate } from 'react-router-dom'
const deployActivities = ({ activity, myhome }) => {
  const BackendAddress = useSelector(state => state.BackendAddress)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const NewActivityVisible = useSelector(state => state.NewsVisible)[3]
  const [Visible, setVisible] = useState(false)
  const [MenuVisible, setMenuVisible] = useState(false)

  const RefreshMenu = useSelector(state => state.RefreshMenu)
  const [Click, setClick] = useState(false)
  const [Observations, setObservations] = useState(false)
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
  useEffect(() => { }, [activity, myhome])
  //activity.createdAt +' '+activity.task.room.project.name +'-'+!myhome && activity.user.firstName+' : '+activity.description 
  return (
    <>
      <div className='deploy'>
        {/*<div onClick={() => setVisible(!Visible)} className={`${myhome ? "myHomeActivity" : {/*activity }} table`}>
          <p>{activity.createdAt</p>
          <p>{activity.task.room.project.name}</p>
          <p>{activity.description}</p>
          {!myhome && <p>{activity.user.firstName}</p>}
        </div>*/}
        <div
          className={"createGrid"}
          onClick={() => setObservations(!Observations)}
        >
          <p className='activities1'>{activity.createdAt + ' - ' + activity.task.room.project.name + ' - ' + activity.user.firstName + ': ' /*+ activity.description*/}</p>
          <p className='activities'>{activity.description}</p>
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
            <p className='items materialItemsWidth' onClick={() => { dispatch(setItem(activity)), navigate('/NewActivity')/*dispatch(setVisibleActivity(!NewActivityVisible)), setMenuVisible(!MenuVisible) */ }}>Editar</p>
            <p className='items materialItemsWidth' onClick={() => ((
              axios.delete(`http://${BackendAddress}/api/v1/activities/${activity.id}`, getConfig())
                .then(dispatch(updateRefresh())),
              setMenuVisible(!MenuVisible)
            ))}>Eliminar</p>
          </div>
        }
      </div>
      {activity.observation && Observations && <p className='activityObservations'><b>{`Observaciones: `}</b>{activity.observation}</p>}
    </>
  )
}

export default deployActivities