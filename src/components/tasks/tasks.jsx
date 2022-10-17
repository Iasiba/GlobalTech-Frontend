import React from 'react'
import "./tasks.css"
import { Link } from 'react-router-dom'

import DeployTask from './deployTask'

import AxiosGetHook from '../../hooks/axiosGetHook'
const tasks = ({projectId}) => {
  const AllTask = AxiosGetHook('http://localhost:8000/api/v1/tasks')
  const AllTasks = AllTask.data.data?.tasks
  return (
    <div className='tasks'>
      <div className="gridHeader">
        <p>Fecha</p>
        <p>Proyecto</p>
        <p>Area</p>
        <p>Descripcion</p>
      </div>
      {
        AllTasks && AllTasks?.map(task =>{ 
            return (<DeployTask key={task.id} task={task}/>)
        })
      }
    </div>
  )
}

export default tasks