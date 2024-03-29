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
import { setArea } from '../../store/slices/AreaSlice'
const newTask = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const BackendAddress = useSelector(state => state.BackendAddress)
    const Task = useSelector(state => state.Item)
    //const NewTaskVisible = useSelector(state => state.NewsVisible)[2]

    const Projects = AxiosGetHook(`http://${BackendAddress}/api/v1/projects`)
    const AllProjects = Projects.data.data?.projects
    const [projectName, setProjectName] = useState('')
    const [Project, setProject] = useState({ name: '--Seleccione Proyecto--' })
    const [ProjectListVisible, setProjectListVisible] = useState(false)

    const [Rooms, setRooms] = useState('')
    const [Room, setRoom] = useState({ name: '--Selecciona Habitacion--' })
    const [RoomName, setRoomName] = useState('')
    const [RoomListVisible, setRoomListVisible] = useState(false)
    useEffect(() => {
        AllProjects && setProject(AllProjects.filter(project => project.name === projectName)[0])
    }, [projectName])
    useEffect(() => {
        Project.id && axios.get(`http://${BackendAddress}/api/v1/projects/${Project.id}/rooms`, getConfig())
            .then(res => setRooms(res.data))
            .catch(err => console.log(err))
    }, [Project])

    useEffect(() => {
        dispatch(setArea(Task.id ? 'Editar Tarea' : 'Nueva Tarea'))
        setTaskValues()
    }, [Task])//en caso de editar tareas


    const { handleSubmit, reset, register } = useForm()

    const submit = data => {
        data.roomId = Room.id
        data.roomName = Room.name
        Task.id ?
            axios.put(`http://${BackendAddress}/api/v1/tasks/${Task.id}`, data, getConfig())
                .then(res => {
                    console.log(res, "Tarea Actualizada")
                })
                .catch(err => console.log(err))
                .finally(dispatch(setItem(false)))
            :
            axios.post(`http://${BackendAddress}/api/v1/rooms/${Room.id}/tasks`, data, getConfig())
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
                <div className="selectableMenu">
                    <span className="selectableMenu__label" onClick={() => setProjectListVisible(!ProjectListVisible)}>{Project.name}</span>
                    <ul className="selectableMenu__list zindex1">
                        {
                            ProjectListVisible && AllProjects && AllProjects?.map(
                                project => {
                                    return (
                                        <li
                                            className='selectableMenu__item'
                                            onClick={
                                                () => {
                                                    setProject(project)
                                                    setProjectListVisible(false)
                                                }
                                            }
                                            key={project.id}
                                        >{project.name}</li>
                                    )
                                }
                            )
                        }
                    </ul>
                </div>
            </div>

            {/*<div className='createGrid'>
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
            </div>*/}




            <div className='createGrid'>
                <label className='necessary'>Habitacion:</label>
                <div className="selectableMenu">
                    <span className="selectableMenu__label" onClick={() => setRoomListVisible(!RoomListVisible)}>{Room.name}</span>
                    <ul className="selectableMenu__list">
                        {
                            RoomListVisible && Rooms && Rooms?.map(
                                room => {
                                    return (
                                        <li
                                            className='selectableMenu__item'
                                            onClick={
                                                () => {
                                                    setRoom(room)
                                                    setRoomListVisible(false)
                                                }
                                            }
                                            key={room.id}
                                        >{room.name}</li>
                                    )
                                }
                            )
                        }
                    </ul>
                </div>
            </div>
            {
                /* 
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
                */
            }
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
                    className='textArea'
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
                    className='textArea'
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

            <button>{Task.id ? 'Actualizar' : 'Crear'}</button>
        </form>
    )
}
/*<Link to={'/tasks'}>{'Crear'}</Link> */
export default newTask