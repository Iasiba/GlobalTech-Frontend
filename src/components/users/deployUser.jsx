import React, { useEffect } from 'react'
import './users.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
import { updateRefresh } from '../../store/slices/RefreshSlice'
import { updateRefreshMenu } from '../../store/slices/RefreshMenuSlice'
/*
backups
materials
programmings

userImages
projects
notes

taskLists
activities
tasks
*/

const deployUser = ({ user }) => {
  const dispatch = useDispatch()
  const [Visible, setVisible] = useState(false)
  const [MenuVisible, setMenuVisible] = useState(false)

  const Refresh = useSelector(state => state.Refresh)
  const RefreshMenu = useSelector(state => state.RefreshMenu)
  const [Click, setClick] = useState(false)

  const [TaskList, setTaskList] = useState('')
  const [Task, setTask] = useState('')
  function tasks() {
    axios.get(`http://192.168.0.253:8000/api/v1/taskList/me/${user.id}`, getConfig())
      .then(res => setTaskList(res.data))
  }
  function auxTask() {
    let task = ""
    for (let i = 0; i < TaskList.length; i++) {
      task += " " + TaskList[i].task.description + ","
    }
    setTask(task)
  }
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
  useEffect(() => tasks(), [/*Refresh*/]
  )
  useEffect(() => auxTask(), [TaskList])

  return (
    <>
      <div className='deploy'>
        <div onClick={() => setVisible(!Visible)} className='userHeader tableHover'>
          <p>{user.firstName} {user.lastName}</p>
          {<p>{/*user.tasks && user.tasks[0].description*/ Task}</p>}
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
          MenuVisible &&
          !user.activities.length &&
          !user.backups.length &&
          !user.materials.length &&
          !user.notes.length &&
          !user.programmings.length &&
          !user.projects.length &&
          !user.taskLists.length &&
          !user.tasks.length &&
          !user.userImages.length &&
          <div className='itemList itemListPrimary '>
            <p className='items materialItemsWidth' onClick={() => ((
              axios.delete(`http://192.168.0.253:8000/api/v1/users/${user.id}`, getConfig())
                .then(dispatch(updateRefresh())),
              dispatch(updateRefresh()),
              setMenuVisible(!MenuVisible)))
            }>Eliminar</p>
          </div>
        }
      </div>
      {Visible && <div className='deployTask'>
        <p>Email: {user.email}</p>
        <p>Imagen de Perfil: {user.profileImage}</p>
        <p>Telefono: {user.phone}</p>
        <p>Material: { }</p>
        <p>Proyectos: { }</p>
        <p>Tareas: {Task}</p>
        <p>Tarea Actual: { }</p>
        <p>Actividades: { }</p>
      </div>}
    </>
  )
}

export default deployUser