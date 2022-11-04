import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import AxiosGetHook from '../../hooks/axiosGetHook'
import '../../App.css'
import './tasks'
import getConfig from '../../utils/getConfig'
const newTask = () => {
    const Projects = AxiosGetHook('http://localhost:8000/api/v1/projects')
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
        Project && axios.get(`http://localhost:8000/api/v1/projects/${Project.id}/rooms`, getConfig())
            .then(res => setRooms(res.data))
            .catch(err => console.log(err))
    }, [Project])


    const [IsCanceled, setIsCanceled] = useState(false)
    const [IsFinished, setIsFinished] = useState(false)

    const { handleSubmit, reset, register } = useForm()
    const navigate = useNavigate()

    const submit = data => {
        data.roomId = Room.id
        data.isfinished=IsFinished
        data.iscanceled=IsCanceled
        const URL = `http://localhost:8000/api/v1/rooms/${Room.id}/tasks`
        axios.post(URL, data, getConfig())
            .then(res => {
                console.log(res, "Tarea Creada")
            })
            .catch(err => console.log(err))
        /*reset({
            email: '',
            password: ''
        })*/
    }

    return (
        <form onSubmit={handleSubmit(submit)} className='createCenter' >
            <h2>Nueva Tarea</h2>
            <div className='createGrid'>
                <div>Fecha de ejecucion:</div>
                <input type="date" placeholder='2022/05/31' {...register('executionDate')} />
            </div>
            <div className='createGrid'>
                <div>Proyecto:</div>
                <input type="text" onClick={() => setProjectListVisible(!ProjectListVisible)} placeholder='--Selecciona un Proyecto--' value={projectName} {...register('projectName')} />
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
                <div>Habitacion:</div>
                <input type="text" onClick={() => { setRoomListVisible(!RoomListVisible) }} placeholder='--Selecciona una Habitacion--' value={RoomName} {...register('roomName')} />
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
                <p>Descripcion:</p>
                <input type="text" placeholder='Ej.Montar Tv Terraza ' {...register('description')} />
            </div>
            <div className='createGrid'>
                <p>Observacion:</p>
                <input type="text" placeholder='Ej. se entrego a cliente' {...register('observation')} />
            </div>
            <div className='createGrid'>
                <p>Material:</p>
                <input type="text" placeholder='Ej. cables, conectores' {...register('material')} />
            </div>
            <div className='createGrid'>
                <p>Finalizado:</p>
                <input type="checkbox" checked={IsFinished} onClick={() => {setIsFinished(!IsFinished)}}{...register('isfinished')} />
            </div>
            <div className='createGrid'>
                <div>Cancelado:</div>
                <input type="checkbox" checked={IsCanceled} onClick={() => {setIsCanceled(!IsCanceled)}} {...register('iscanceled')} />
            </div>
            <br />
            <button>Crear</button>
        </form>
    )
}

export default newTask