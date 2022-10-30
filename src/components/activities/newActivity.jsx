import React, { useState, useEffect } from 'react'
import getConfig from '../../utils/getConfig'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import AxiosGetHook from '../../hooks/axiosGetHook'
import '../../App.css'
import './activities.css'
const newActivity = () => {
    const Tasks = AxiosGetHook('http://localhost:8000/api/v1/tasks')
    const AllTasks = Tasks.data.data?.tasks

    const [TaskDescription, setTaskDescription] = useState('')
    const [Task, setTask] = useState('')
    const [TaskId, setTaskId] = useState('')
    const [TaskListVisible, setTaskListVisible] = useState(false)

    const { handleSubmit, reset, register } = useForm()

    const navigate = useNavigate()

    useEffect(() => { setTaskId(Task.id) }, [Task])

    const submit = data => {
        data.taskId = TaskId

        const URL = `http://localhost:8000/api/v1/tasks/${TaskId}/activities`
        axios.post(URL, data, getConfig())
            .then(res => {
                console.log(res, "Actividad creada")
            })
            .catch(err => console.log(err))
        /*reset({
            email: '',
            password: ''
        })*/
    }
    return (
        <form onSubmit={handleSubmit(submit)} className='createCenter' >
            <h2>Nueva Actividad</h2>
            <div className='createGrid'>
                <p>Descripcion:</p>
                <input type="text" placeholder='Ej. cablee 5 nodos en cocina' {...register('description')} />
            </div>
            <div className='createGrid'>
                <p>Finalizado:</p>
                <input type="text" placeholder='default:no' {...register('isfinished')} />
            </div>
            <div className='createGrid'>
                <p>Cancelado:</p>
                <input type="text" placeholder='default: no' {...register('iscanceled')} />
            </div>
            <div className='createGrid'>
                <div>Tarea:</div>
                <input type="text" onClick={() => setTaskListVisible(!TaskListVisible)} placeholder='--selecciona una tarea--' value={TaskDescription} {...register('taskDescription')} />
            </div>

            <div className='createGrid'>
                <div></div>
                <div>
                    {
                        TaskListVisible && AllTasks && AllTasks?.map(task => {
                            return (<p className='tableHeader tableHover list' onClick={() => { setTaskDescription(task.description), setTask(task), setTaskListVisible(!TaskListVisible) }} key={task.id}>{task.description}</p>)
                        }
                        )
                    }
                </div>
            </div>
            <br />
            <button>Crear</button>
        </form>
    )
}

export default newActivity