import React, { useState, useEffect } from 'react'
import getConfig from '../../utils/getConfig'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import AxiosGetHook from '../../hooks/axiosGetHook'
import '../../App.css'
import './accounts.css'
import { useDispatch, useSelector } from 'react-redux'
import { setItem } from '../../store/slices/ItemSlice'
import { setVisibleAccount } from './../../store/slices/NewsVisibleSlice'
import { updateRefresh } from '../../store/slices/RefreshSlice'
import { setArea } from '../../store/slices/AreaSlice'
const newAccount = () => {
    const dispatch = useDispatch()
    const Account = useSelector(state => state.Item)
    const NewAccountVisible = useSelector(state => state.NewsVisible)[4]

    const Projects = AxiosGetHook('http://192.168.0.253:8000/api/v1/projects')
    const AllProjects = Projects.data.data?.projects

    const [Project, setProject] = useState('')
    const [ProjectListVisible, setProjectListVisible] = useState(false)
    const { handleSubmit, reset, register } = useForm()

    const navigate = useNavigate()

    useEffect(() => {
        Account.id && setProject(Account.project)
        dispatch(setArea(Account.id ? 'Editar Cuenta' : 'Nueva Cuenta'))
    }, [])

    const submit = data => {
        data.projectId = Project.id
        Account.id ?
            axios.put(`http://192.168.0.253:8000/api/v1/accounts/${Account.id}`, data, getConfig())
                .then(res => {
                    console.log(res, "cuenta Actualizada")
                })
                .catch(err => console.log(err))
                .then(dispatch(setItem(false)))
            :
            axios.post(`http://192.168.0.253:8000/api/v1/projects/${data.projectId}/accounts`, data, getConfig())
                .then(res => {
                    console.log(res, "cuenta creada")
                })
                .catch(err => console.log(err))
        dispatch(setVisibleAccount(!NewAccountVisible))//ocultar ventana de creacion de cuentas
        dispatch(updateRefresh())
        navigate(-1)
    }
    return (
        <form onSubmit={handleSubmit(submit)} className='createCenter new' >
            <i className='bx bx-x-circle close' onClick={() => (/*dispatch(setVisibleAccount(!NewAccountVisible)), */dispatch(setItem(false)), navigate(-1))}></i>
            <br />
            <div className='createGrid'>
                <label className='necessary'>Software:</label>
                <input type="text" autoComplete='off' required defaultValue={Account.id && Account.software} placeholder='Ej. Sonos' {...register('software')} />
            </div>
            <div className='createGrid'>
                <label>Direccion Ip:</label>
                <input type="text" autoComplete='off' defaultValue={Account.id ? Account.directionIp : '0.0.0.0'} placeholder='Ej. 0.0.0.0' {...register('directionIp')} />
            </div>
            <div className='createGrid'>
                <label>Propietario:</label>
                <input type="text" autoComplete='off' defaultValue={Account.id && Account.owner} placeholder='Ej. Juan' {...register('owner')} />
            </div>
            <div className='createGrid'>
                <label className='necessary'>Usuario:</label>
                <input type="text" autoComplete='off' required defaultValue={Account.id && Account.user} placeholder='Ej. admin' {...register('user')} />
            </div>
            <div className='createGrid'>
                <label className='necessary'>Contraseña:</label>
                <input type="text" autoComplete='off' required defaultValue={Account.id && Account.password} placeholder='Ej. Password' {...register('password')} />
            </div>
            <div className='createGrid'>
                <label className='necessary'>Proyecto:</label>
                <input type="text" autoComplete='off' required onClick={() => setProjectListVisible(!ProjectListVisible)} placeholder='-Selecciona un Proyecto-' value={/*projectName*/ Project && Project.name} {...register('projectName')} />
            </div>
            <div className='createGrid'>
                <br />
                <div>
                    {
                        ProjectListVisible && AllProjects && AllProjects?.map(project => {
                            return (<p className='tableHeader tableHover list' onClick={() => { /*setProjectName(project.name),*/ setProject(project), setProjectListVisible(!ProjectListVisible) }} key={project.id}>{project.name}</p>)
                        }
                        )
                    }
                </div>
            </div>
            <br />
            <button>{Account.id ? 'Actualizar' : 'Crear'}</button>
        </form>
    )
}
export default newAccount