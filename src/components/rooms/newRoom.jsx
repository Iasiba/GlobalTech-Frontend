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
import { updateRefresh } from '../../store/slices/RefreshSlice'
import { setArea } from '../../store/slices/AreaSlice'
const newRoom = () => {
    const dispatch = useDispatch()
    const BackendAddress = useSelector(state => state.BackendAddress)
    const NewRoomVisible = useSelector(state => state.NewsVisible)[1]
    const Room = useSelector(state => state.Item)

    const Projects = AxiosGetHook(`http://${BackendAddress}/api/v1/projects`)
    const AllProjects = Projects.data.data?.projects

    const [Project, setProject] = useState({ name: "--Selecciona un Proyecto--" })
    const [ProjectListVisible, setProjectListVisible] = useState(false)

    const { handleSubmit, reset, register } = useForm()

    const navigate = useNavigate()
    useEffect(() => {
        dispatch(setArea(Room.id ? 'Editar Area' : 'Nueva Area'))
        Room.id && setProject(Room.project)
    }, [])

    const submit = data => {
        data.projectId = Project.id
        Room.id ?
            axios.put(`http://${BackendAddress}/api/v1/rooms/${Room.id}`, data, getConfig())
                .then(res => {
                    console.log(res, "Habitacion Actualizada")
                })
                .catch(err => console.log(err))
                .finally(
                    dispatch(setItem(false))
                )
            :
            axios.post(`http://${BackendAddress}/api/v1/projects/${data.projectId}/rooms`, data, getConfig())
                .then(res => {
                    console.log(res, "Habitacion Creada")
                })
                .catch(err => console.log(err))
        dispatch(setVisibleRoom(!NewRoomVisible))//ocultar ventana de creacion de habiaciones
        dispatch(updateRefresh())
        navigate(-1)
    }
    return (
        <form onSubmit={Project.id && handleSubmit(submit)} className='createCenter new' >
            <i className='bx bx-x-circle close' onClick={() => (/*dispatch(setVisibleRoom(!NewRoomVisible)), */dispatch(setItem(false)), navigate(-1))}></i>

            <div className='createGrid'>
                <label className='necessary'>Nombre:</label>
                <input
                    type="text"
                    autoComplete='off'
                    required
                    defaultValue={Room.id && Room.name}
                    placeholder='Ej. Cocina'
                    {...register('name')}
                />
            </div>

            <div className='createGrid'>
                <label className='necessary'>Proyecto:</label>
                <div className="selectableMenu">
                    <span className="selectableMenu__label" onClick={() => setProjectListVisible(!ProjectListVisible)}>{Project.name}</span>
                    <ul className="selectableMenu__list">
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



            {/* 
           <div className='createGrid'>
                <label className='necessary'>Proyecto:</label>
                <input
                    type="text"
                    autoComplete='off'
                    required
                    value={Project && Project.name}
                    onClick={() => setProjectListVisible(!ProjectListVisible)}
                    placeholder='--Selecciona un Proyecto--'
                    {...register('projectName')}
                />
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
            </div>*/}
            <br />
            <button>{Room.id ? 'Actualizar' : 'Crear'}</button>
        </form>
    )
}

export default newRoom