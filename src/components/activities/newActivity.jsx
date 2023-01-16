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
import { setVisibleActivity } from './../../store/slices/NewsVisibleSlice'
const newActivity = () => {
    const dispatch = useDispatch()
    const Activity = useSelector(state => state.Item)
    const NewActivityVisible = useSelector(state => state.NewsVisible)[3]

    const Tasks = AxiosGetHook('http://localhost:8000/api/v1/tasks')
    const AllTasks = Tasks.data.data?.tasks

    const [Task, setTask] = useState('')
    const [TaskId, setTaskId] = useState('')
    const [TaskListVisible, setTaskListVisible] = useState(false)
    const [Materials, setMaterials] = useState(false)
    const [VisibleMaterialAsignedToMe, setVisibleMaterialAsignedToMe] = useState(false)
    const [MaterialSelected, setMaterialSelected] = useState('')
    const [Rooms, setRooms] = useState('')
    const [VisibleRooms, setVisibleRooms] = useState(false)
    const [RoomSelected, setRoomSelected] = useState('')
    const [MaterialsInstalleds, setMaterialsInstalleds] = useState([])
    const [MaterialsAsignatesToMe, setMaterialsAsignatesToMe] = useState([])
    const { handleSubmit, reset, register } = useForm()

    const navigate = useNavigate()
    console.log(MaterialsInstalleds)
    useEffect(
        () => {
            console.log(MaterialsInstalleds)
            Task.id && setTaskId(Task.id),
                Task.id && setRooms(Task.room.project.rooms),
                axios.get('http://localhost:8000/api/v1/users/me/materials', getConfig())
                    .then(res => setMaterialsAsignatesToMe(res.data))
        }, [Task, MaterialsInstalleds.length]
    )
    if (Activity.id) useEffect(() => { setTask(Activity.task) }, [Activity])//en caso de editar materiales

    const submit = data => {
        data.taskId = Task.id
        console.log(data)
        const URL = Activity.id ? `http://localhost:8000/api/v1/activities/${Activity.id}` : `http://localhost:8000/api/v1/tasks/${TaskId}/activities`
        Activity.id ?
            axios.put(URL, data, getConfig())
                .then(res => {
                    console.log(res, "Activiad Actualizada")
                })
                .catch(err => console.log(err))
                .finally(dispatch(setItem(false)))
            :
            axios.post(URL, data, getConfig())
                .then(res => {
                    console.log(res, "Actividad creada")
                })
                .catch(err => console.log(err))
        dispatch(setVisibleActivity(!NewActivityVisible))//ocultar ventana de creacion de actividades
    }
    return (
        <form onSubmit={handleSubmit(submit)} className='createCenter new' >
            <i className='bx bx-x-circle close' onClick={() => dispatch(setVisibleActivity(!NewActivityVisible))}></i>
            <h2>{Activity.id ? 'Editar Actividad' : 'Nueva Actividad'}</h2>
            <div className='createGrid'>
                <div>* Descripcion:</div>
                <input type="text" required defaultValue={Activity.id && Activity.description} placeholder='Ej. cablee 5 nodos en cocina' {...register('description')} />
            </div>
            <div className='createGrid'>
                <div>* Tarea:</div>
                <input type="text" required
                    onClick={() => setTaskListVisible(!TaskListVisible)}
                    placeholder='--selecciona una tarea--'
                    value={Task.description ? Task.description : ''}
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

            <div className='createGrid'>
                <div>Materials:</div>
                <input type="checkbox" onClick={() => setMaterials(!Materials)} />
            </div>
            {
                Task && Materials &&
                <div>
                    <div className='createGrid'>
                        <div>{"Proyecto: " + Task.room.project.name}</div>
                    </div>
                    <div className='createGrid'>
                        <div>Habitacion:</div>
                        <input type="text" onClick={() => setVisibleRooms(!VisibleRooms)} defaultValue={RoomSelected ? RoomSelected.name : ''} placeholder='--Selecciona Un Area--' />
                    </div>
                    {
                        VisibleRooms &&
                        <div>
                            {Rooms.map(Room => <div onClick={() => { setRoomSelected(Room), setVisibleRooms(false) }} key='Room.id'>{Room.name}</div>)}
                        </div>
                    }
                    <div className='createGrid'>
                        <div>Material:</div>
                        <input type="text" onClick={() => setVisibleMaterialAsignedToMe(!VisibleMaterialAsignedToMe)} defaultValue={MaterialSelected ? MaterialSelected.name : ''} placeholder='--Selecciona Un Material--' />
                    </div>
                    {
                        VisibleMaterialAsignedToMe &&
                        <div>
                            {MaterialsAsignatesToMe.map(MaterialAsignatedToMe => <div onClick={() => { setMaterialSelected(MaterialAsignatedToMe), setVisibleMaterialAsignedToMe(false) }} key={MaterialAsignatedToMe.id}>{MaterialAsignatedToMe.name}</div>)}
                        </div>
                    }
                    <div onClick={() => MaterialsInstalleds.push({ MaterialSelected, RoomSelected })}>agregar</div>
                    <section>
                        <div>Materiales instalados:</div>
                        {
                            MaterialsInstalleds.length ?
                                MaterialsInstalleds.map((materialInstalled) => <div>
                                    <aside>
                                        {materialInstalled.MaterialSelected.name}
                                    </aside>
                                    <aside>
                                        {materialInstalled.RoomSelected.name}
                                    </aside>
                                </div>)
                                :
                                <div>No tiene Materiales instalados</div>
                        }
                    </section>
                </div>
            }
            <div>

            </div>
            <br />
            <button>{Activity.id ? 'Actualizar' : 'Crear'}</button>
        </form>
    )
}

export default newActivity