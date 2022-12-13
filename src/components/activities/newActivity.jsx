import React, { useState, useEffect } from 'react'
import getConfig from '../../utils/getConfig'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import AxiosGetHook from '../../hooks/axiosGetHook'
import '../../App.css'
import './activities.css'
import { useSelector, useDispatch } from 'react-redux'
import { setItem } from '../../store/slices/ItemSlice'
const newActivity = () => {
    const dispatch = useDispatch()
    const Activity = useSelector(state => state.Item)

    const Tasks = AxiosGetHook('http://localhost:8000/api/v1/tasks')
    const AllTasks = Tasks.data.data?.tasks

    const [Task, setTask] = useState('')
    const [TaskId, setTaskId] = useState('')
    const [TaskListVisible, setTaskListVisible] = useState(false)

    const { handleSubmit, reset, register } = useForm()

    const navigate = useNavigate()

    useEffect(() => setTaskId(Task.id), [Task])
    if (Activity.id) useEffect(() => { setTask(Activity.task) }, [Activity])//en caso de editar materiales

    const submit = data => {
        console.log(Activity)

        data.taskId = Task.id
        console.log(data)
        const URL = Activity.id ? `http://localhost:8000/api/v1/activities/${Activity.id}` : `http://localhost:8000/api/v1/tasks/${TaskId}/activities`
        Activity.id ?
            axios.put(URL, data, getConfig())
                .then(res => {
                    console.log(res, "Activiad Actualizada")
                })
                .catch(err => console.log(err))
                .finally(dispatch(setItem(false)), navigate('/activities'))
            :
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
            <h2>{Activity.id ? 'Editar Actividad' : 'Nueva Actividad'}</h2>
            <div className='createGrid'>
                <p>Descripcion:</p>
                <input type="text" defaultValue={Activity.id ? Activity.description : 'Ej. Sonos Amp'} placeholder='Ej. cablee 5 nodos en cocina' {...register('description')} />
            </div>
            <div className='createGrid'>
                <div>Tarea:</div>
                <input type="text"
                    onClick={() => setTaskListVisible(!TaskListVisible)}
                    placeholder='--selecciona una tarea--'
                    value={Task.description?Task.description:''}
                    {...register('taskDescription')} />
            </div>

            <div className='createGrid'>
                <div></div>
                <div>
                    {
                        TaskListVisible && AllTasks && AllTasks?.map(task => {
                            return (<p className='tableHeader tableHover list' onClick={() => { setTask(task), setTaskListVisible(!TaskListVisible) }} key={task.id}>{task.description}</p>)
                        }
                        )
                    }
                </div>
            </div>
            <br />
            <button>{Activity.id ? 'Actualizar' : 'Crear'}</button>
        </form>
    )
}

export default newActivity