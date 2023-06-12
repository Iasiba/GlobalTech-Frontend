import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import AxiosGetHook from '../../hooks/axiosGetHook'
import './tasks'
import '../../App.css'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setItem } from '../../store/slices/ItemSlice'
import { setVisibleTask } from './../../store/slices/NewsVisibleSlice'
import { updateRefresh } from '../../store/slices/RefreshSlice'
const newTask = () => {
    //const NewTaskVisible = useSelector(state => state.NewsVisible)[2]
    const dispatch = useDispatch()
    const Task = useSelector(state => state.Item)

    const Projects = AxiosGetHook('http://192.168.0.253:8000/api/v1/projects')
    const AllProjects = Projects.data.data?.projects
    const [projectName, setProjectName] = useState('')
    const [Project, setProject] = useState('')
    const [ProjectListVisible, setProjectListVisible] = useState(false)

    const [Rooms, setRooms] = useState('')
    const [Room, setRoom] = useState('')
    const [RoomName, setRoomName] = useState('')
    const [RoomListVisible, setRoomListVisible] = useState(false)
    useEffect(() => {
        AllProjects && setProject(AllProjects.filter(project => project.name === projectName)[0])
    }, [projectName])
    useEffect(() => {
        Project && axios.get(`http://192.168.0.253:8000/api/v1/projects/${Project.id}/rooms`, getConfig())
            .then(res => setRooms(res.data))
            .catch(err => console.log(err))
    }, [Project])

    useEffect(() => setTaskValues(), [Task])//en caso de editar tareas


    const { handleSubmit, reset, register } = useForm()
    const navigate = useNavigate()

    const submit = data => {
        data.roomId = Room.id
        Task.id ?
            axios.put(`http://192.168.0.253:8000/api/v1/tasks/${Task.id}`, data, getConfig())
                .then(res => {
                    console.log(res, "Tarea Actualizada")
                })
                .catch(err => console.log(err))
                .finally(dispatch(setItem(false)))
            :
            axios.post(`http://192.168.0.253:8000/api/v1/rooms/${Room.id}/tasks`, data, getConfig())
                .then(res => {
                    console.log(res, "Tarea Creada")
                })
                .catch(err => console.log(err))
        //dispatch(setVisibleTask(!NewTaskVisible))//ocultar ventana de creacion de Tareas
        dispatch(updateRefresh())
        navigate(-1)
    }
    function setTaskValues() {
        if (Task.id) {
            setRoom(Task.room)
            setRoomName(Task.room.name)
            setProject(Task.room.project)
            setProjectName(Task.room.project.name)
        }
    }
    return (
        <form onSubmit={handleSubmit(submit)} className='createCenter new' >
            <i className='bx bx-x-circle close' onClick={() => (/*dispatch(setVisibleTask(!NewTaskVisible)), */dispatch(setItem(false)), navigate(-1))}></i>
            <h2>{Task.id ? 'Editar Tarea' : 'Nueva Tarea'}</h2>
            <div className='createGrid'>
                <label className='necessary'>Fecha de ejecucion:</label>
                <input
                    type="date"
                    autoComplete='off'
                    required
                    defaultValue={Task.id && Task.executionDate}
                    placeholder='2022/05/31'
                    {...register('executionDate')}
                />
            </div>
            <div className='createGrid'>
                <label className='necessary'>Proyecto:</label>
                <input
                    type="text"
                    autoComplete='off'
                    required
                    onClick={() => setProjectListVisible(!ProjectListVisible)}
                    placeholder='--Selecciona un Proyecto--'
                    value={projectName}
                    {...register('projectName')}
                />
            </div>
            <div className='createGrid'>
                <div></div>
                <div>
                    {
                        ProjectListVisible && AllProjects && AllProjects?.map(project => {
                            return (<p className='tableHeader tableHover list' onClick={() => { setProjectName(project.name), setProjectListVisible(!ProjectListVisible) }} key={project.id}>{project.name}</p>)
                        })
                    }
                </div>
            </div>
            <div className='createGrid'>
                <label className='necessary'>Habitacion:</label>
                <input
                    type="text"
                    autoComplete='off'
                    required
                    onClick={() => { setRoomListVisible(!RoomListVisible) }}
                    placeholder='--Selecciona una Habitacion--'
                    value={RoomName}
                    {...register('roomName')}
                />
            </div>
            <div className='createGrid'>
                <div></div>
                <div>
                    {
                        RoomListVisible && Rooms && Rooms?.map(room => {
                            return (<p className='tableHeader tableHover list' onClick={() => { setRoomName(room.name), setRoom(room), setRoomListVisible(!RoomListVisible) }} key={room.id} >{room.name}</p>)
                        }
                        )
                    }
                </div>
            </div>
            <div className='createGrid'>
                <label className='necessary'>Descripcion:</label>
                <textarea
                    autoComplete='off'
                    required
                    defaultValue={Task.id ? Task.description : ''}
                    placeholder='Ej.Montar Tv Terraza '
                    {...register('description')}
                    maxLength="255"
                />
            </div>
            <div className='createGrid'>
                <label>Observacion:</label>
                <textarea
                    autoComplete='off'
                    defaultValue={Task.id ? Task.observation : ''}
                    placeholder='Ej. se entrego material a cliente'
                    {...register('observation')}
                    maxLength="255"
                />
            </div>
            <div className='createGrid'>
                <label>Material Necesario:</label>
                <textarea
                    autoComplete='off'
                    defaultValue={Task.id ? Task.material : ''}
                    placeholder='Ej. cables, conectores'
                    {...register('material')}
                    maxLength="255"
                />
            </div>

            <div className='checks'>
                <aside className='check'>
                    <input type="checkbox" defaultChecked={Task.id && Task.isfinished} {...register('isfinished')} />
                    <label>Finalizado:</label>
                </aside>
                <aside className='check'>
                    <input type="checkbox" defaultChecked={Task.id && Task.iscanceled}  {...register('iscanceled')} />
                    <label>Cancelado:</label>
                </aside>
            </div>

            <br />
            <button>{Task.id ? 'Actualizar' : 'Crear'}</button>
        </form>
    )
}
/*<Link to={'/tasks'}>{'Crear'}</Link> */
export default newTask