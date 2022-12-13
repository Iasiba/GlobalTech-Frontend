import React from 'react'
import { useState } from 'react'
import './activities.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setItem } from '../../store/slices/ItemSlice'
import getConfig from '../../utils/getConfig'
const deployActivities = ({ activity, searcActivities }) => {
  const [Visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const [MenuVisible, setMenuVisible] = useState(false)
  return (
    <>
      <div className='deploy'>
        <div onClick={() => setVisible(!Visible)} className={`activity table`}>
          <p>{activity.task.room.project.name}</p>
          <p>{activity.description}</p>
          <p>{activity.createdAt}</p>
          <p>{activity.user.firstName}</p>
        </div>
        <aside className='threePoints' onClick={() => setMenuVisible(!MenuVisible)} ><p>...</p></aside>
        {
          MenuVisible
          &&
          <div className='itemList itemListPrimary '>
            <p className='items materialItemsWidth' onClick={() => dispatch(setItem(activity))}><Link to={'/newActivity'}  >Editar</Link></p>
            <p className='items materialItemsWidth' onClick={() => ((
              axios.delete(`http://localhost:8000/api/v1/activities/${activity.id}`, getConfig())
                .then(searcActivities()),
              setMenuVisible(!MenuVisible)
            ))}>Eliminar</p>
          </div>
        }
      </div>
    </>
  )
}

export default deployActivities