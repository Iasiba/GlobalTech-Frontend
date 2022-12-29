import React, { useState, useEffect } from 'react'
import getConfig from '../../utils/getConfig'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import AxiosGetHook from '../../hooks/axiosGetHook'
import '../../App.css'
import './rooms.css'
import { setItem } from '../../store/slices/ItemSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setVisibleRoom } from './../../store/slices/NewsVisibleSlice'
const newRoom = () => {
    const NewRoomVisible = useSelector(state => state.NewsVisible)[1]
    const dispatch = useDispatch()
    const Room = useSelector(state => state.Item)

    const Projects = AxiosGetHook('http://localhost:8000/api/v1/projects')
    const AllProjects = Projects.data.data?.projects

    const [Project, setProject] = useState('')
    const [ProjectListVisible, setProjectListVisible] = useState(false)

    const { handleSubmit, reset, register } = useForm()

    const navigate = useNavigate()
    if (Room.id) useEffect(() => setProject(Room.project), [])

    const submit = data => {
        data.projectId = Project.id
        Room.id ?
            axios.put(`http://localhost:8000/api/v1/rooms/${Room.id}`, data, getConfig())
                .then(res => {
                    console.log(res, "Habitacion Actualizada")
                })
                .catch(err => console.log(err))
                .finally(
                    dispatch(setItem(false))
                )
            :
            axios.post(`http://localhost:8000/api/v1/projects/${data.projectId}/rooms`, data, getConfig())
                .then(res => {
                    console.log(res, "Habitacion Creada")
                })
                .catch(err => console.log(err))
        dispatch(setVisibleRoom(!NewRoomVisible))//ocultar ventana de creacion de habiaciones
    }
    return (
        <form onSubmit={handleSubmit(submit)} className='createCenter new' >
            <h2>{Room.id ? 'Editar Area' : 'Nueva Area'}</h2>
            <div className='createGrid'>
                <p>Nombre:</p>
                <input type="text" defaultValue={Room.id && Room.name} placeholder='Ej. Cocina' {...register('name')} />
            </div>
            <div className='createGrid'>
                <div>Proyecto:</div>
                <input type="text" value={Project && Project.name} onClick={() => setProjectListVisible(!ProjectListVisible)} placeholder='--Selecciona un Proyecto--'  {...register('projectName')} />
            </div>
            <div className='createGrid'>
                <div></div>
                <div>
                    {
                        ProjectListVisible && AllProjects && AllProjects?.map(project => {
                            return (<p className='tableHeader tableHover list' onClick={() => { setProject(project), setProjectListVisible(!ProjectListVisible) }} key={project.id} project={project}>{project.name}</p>)
                        }
                        )
                    }
                </div>
            </div>
            <br />
            <button>{Room.id ? 'Actualizar' : 'Crear'}</button>
        </form>
    )
}

export default newRoom