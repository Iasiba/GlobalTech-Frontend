import React, { useEffect, useState } from 'react'
import "./tasks.css"
import DeployTask from './deployTask'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
import { useDispatch, useSelector } from 'react-redux'
import { setArea } from '../../store/slices/AreaSlice'
const tasks = ({ roomId, home, myhome }) => {
  const dispatch = useDispatch()
  const [AllTasks, setAllTasks] = useState('')
  const [Home, setHome] = useState('')
  const Refresh = useSelector(state => state.Refresh)
  useEffect(() => searchTasks(), [Refresh, roomId, home, myhome])

  function searchTasks() {
    dispatch(setArea("Tareas"))
    let url = 'http://192.168.0.253:8000/api/v1/tasks'// home y otras opciones
    if (roomId) url = `http://192.168.0.253:8000/api/v1/rooms/${roomId}/tasks`
    if (myhome) url = 'http://192.168.0.253:8000/api/v1/users/me/taskList'
    axios.get(url, getConfig())
      .then(res => {
        if (myhome) {
          let aux = []
          res.data.map(taskList => (taskList.task.taskListId = taskList.id, aux.push(taskList.task)))
          setAllTasks(aux)
        } else {
          if (res.data?.tasks) {
            if (home) {
              let aux = res.data?.tasks?.filter(task => (task.iscanceled == false && task.isfinished == false))
              setAllTasks(aux)
            } else {
              setAllTasks(res.data?.tasks)
            }
          } else {
            setAllTasks(res.data)
          }
        }
      })

    if (home) {
      if (Home == '' && AllTasks && home) {
        let aux = AllTasks?.filter(task => (task.iscanceled == false && task.isfinished == false))
        setAllTasks(aux)
        setHome(home)
      }
    }
  }

  useEffect(() => {
    for (let i = 0; i < AllTasks?.length; i++) {
      for (let j = 0; j < AllTasks?.length; j++) {
        let x = AllTasks[j].executionDate.split("-")
        x = parseInt(x.join(""), 10)
        let y = AllTasks[i].executionDate.split("-")
        y = parseInt(y.join(""), 10)
        if (x > y) {
          let aux = AllTasks[i]
          AllTasks[i] = AllTasks[j]
          AllTasks[j] = aux
        }
      }
    }
  }, [AllTasks])

  return (
    <div className='contentDeploy'>
      {/*<div className="taskHeader tableHeader">
        <p>Fecha</p>
        <p>Proyecto</p>
        <p>Area</p>
        <p>Descripcion</p>
  </div>*/}
      {
        AllTasks && AllTasks?.map(task => {
          return (
            <DeployTask
              key={task.id}
              task={task}
            />)
        })
      }
    </div>
  )
}

export default tasks