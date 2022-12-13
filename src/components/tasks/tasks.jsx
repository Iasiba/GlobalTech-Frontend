import React, { useEffect, useState } from 'react'
import "./tasks.css"
import DeployTask from './deployTask'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
const tasks = ({ roomId, home, myhome }) => {
  const [AllTasks, setAllTasks] = useState('')
  const [Home, setHome] = useState('')
  useEffect(() => searchTasks(), [])

  function searchTasks() {
    let url = 'http://localhost:8000/api/v1/tasks'// home y otras opciones
    if (roomId) url = `http://localhost:8000/api/v1/rooms/${roomId}/tasks`
    if (myhome) url = 'http://localhost:8000/api/v1/users/me/tasks'
    axios.get(url, getConfig())
      .then(res => {
        if (res.data?.tasks) {
          setAllTasks(res.data?.tasks)
        } else {
          setAllTasks(res.data)
        }
      })
  }

  useEffect(() => {
    for (let i = 0; i < AllTasks?.length; i++) {
      for (let j = 0; j < AllTasks?.length; j++) {
        let x = AllTasks[j].executionDate.split("-")
        x = parseInt(x.join(""), 10)
        let y = AllTasks[i].executionDate.split("-")
        y = parseInt(y.join(""), 10)
        //console.log(x," x ",y," y ")
        if (x > y) {
          let aux = AllTasks[i]
          AllTasks[i] = AllTasks[j]
          AllTasks[j] = aux
        }
      }
    }
    if (Home == '' && AllTasks && home) {
      let aux = AllTasks?.filter(task => (task.iscanceled == false && task.isfinished == false))
      setAllTasks(aux)
      setHome(home)
    }
  }, [AllTasks])

  return (
    <div>
      <div className="taskHeader tableHeader">
        <p>Fecha</p>
        <p>Proyecto</p>
        <p>Area</p>
        <p>Descripcion</p>
      </div>
      {
        AllTasks && AllTasks?.map(task => {
          return (
            <DeployTask
              key={task.id}
              task={task}
              searchTasks={searchTasks}
            />)
        })
      }
    </div>
  )
}

export default tasks