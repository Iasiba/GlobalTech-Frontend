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
  const BackendAddress = useSelector(state => state.BackendAddress)
  const [Visible, setVisible] = useState(false)
  const [MenuVisible, setMenuVisible] = useState(false)

  const Refresh = useSelector(state => state.Refresh)
  const RefreshMenu = useSelector(state => state.RefreshMenu)
  const [Click, setClick] = useState(false)

  const [TaskList, setTaskList] = useState('')
  const [Task, setTask] = useState('')
  const [Materials, setMaterials] = useState('')
  const [Projects, setProjects] = useState('')
  const [Activities, setActivities] = useState('')
  function tasks() {
    axios.get(`http://${BackendAddress}/api/v1/taskList/me/${user.id}`, getConfig())
      .then(res => setTaskList(res.data))
  }
  function auxTask() {
    let task = ""
    for (let i = 0; i < TaskList.length; i++) {
      task += " " + TaskList[i].task.description + ","
    }
    setTask(task)
    user.materials.map(material => { if (material.userId == user.id) { setMaterials(Materials + material.name + ', ') } })
    user.projects.map(project => { if (project.userId == user.id) { setProjects(Projects + project.name + ', ') } })
    user.activities.map(activity => { if (activity.userId == user.id) { setActivities(Activities + activity.description + ', ') } })
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
  useEffect(() => tasks(), [/*Refresh*/])
  useEffect(() => auxTask(), [TaskList])

  return (
    <>
      <div className='deploy'>
        <div onClick={() => setVisible(!Visible)} className='userHeader tableHover'>
          <p><b>{user.firstName} {user.lastName}</b></p>
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
              axios.delete(`http://${BackendAddress}/api/v1/users/${user.id}`, getConfig())
                .then(dispatch(updateRefresh())),
              dispatch(updateRefresh()),
              setMenuVisible(!MenuVisible)))
            }>Eliminar</p>
          </div>
        }
      </div>
      {Visible && <div className='deployTask'>
        <p><b>Email:</b> {user.email}</p>
        {user.phone && <p><b>Telefono:</b> {user.phone}</p>}
        {Materials && <p><b>Material:</b> {Materials}</p>}
        {Projects && <p><b>Proyectos:</b> {Projects}</p>}
        {Task && <p><b>Tareas:</b> {Task}</p>}
        {Activities && <p><b>Actividades:</b> {Activities}</p>}
      </div>}
    </>
  )
}

export default deployUser