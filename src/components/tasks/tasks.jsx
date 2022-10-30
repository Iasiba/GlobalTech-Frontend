import React from 'react'
import "./tasks.css"
import DeployTask from './deployTask'
import AxiosGetHook from '../../hooks/axiosGetHook'
const tasks = ({roomId}) => {
  const Tasks = AxiosGetHook(roomId?`http://localhost:8000/api/v1/rooms/${roomId}/tasks`:'http://localhost:8000/api/v1/tasks')
  const AllTasks = roomId? Tasks.data?.data:Tasks.data.data?.tasks
  return (
    <div>
      <div className="taskHeader tableHeader">
        <p>Fecha</p>
        <p>Proyecto</p>
        <p>Area</p>
        <p>Descripcion</p>
      </div>
      {
        Tasks && AllTasks?.map(task =>{ 
            return (<DeployTask key={task.id} task={task}/>)
        })
      }
    </div>
  )
}

export default tasks