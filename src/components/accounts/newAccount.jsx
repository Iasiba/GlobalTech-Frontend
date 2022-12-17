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

const newAccount = () => {
    const dispatch = useDispatch()
    const Account = useSelector(state => state.Item)

    const Projects = AxiosGetHook('http://localhost:8000/api/v1/projects')
    const AllProjects = Projects.data.data?.projects

    const [Project, setProject] = useState('')
    const [ProjectListVisible, setProjectListVisible] = useState(false)
    const { handleSubmit, reset, register } = useForm()

    const navigate = useNavigate()
    if (Account.id) useEffect(() => { setProject(Account.project) }, [])

    const submit = data => {
        data.projectId = Project.id //ProjectId
        Account.id ?
            axios.put(`http://localhost:8000/api/v1/accounts/${Account.id}`, data, getConfig())
                .then(res => {
                    console.log(res, "cuenta Actualizada")
                })
                .catch(err => console.log(err))
                .then(dispatch(setItem(false)), navigate('/accounts'))
            :
            axios.post(`http://localhost:8000/api/v1/projects/${data.projectId}/accounts`, data, getConfig())
                .then(res => {
                    console.log(res, "cuenta creada")
                })
                .catch(err => console.log(err))
                .finally(navigate('/accounts'))
    }
    return (
        <form onSubmit={handleSubmit(submit)} className='createCenter' >
            <h2>{Account.id ? 'Editar Cuenta' : 'Nueva Cuenta'}</h2>
            <div className='createGrid'>
                <p>Software:</p>
                <input type="text" defaultValue={Account.id && Account.software} placeholder='Ej. Sonos' {...register('software')} />
            </div>
            <div className='createGrid'>
                <p>Direccion Ip:</p>
                <input type="text" defaultValue={Account.id && Account.directionIp} placeholder='Ej. 0.0.0.0' {...register('directionIp')} />
            </div>
            <div className='createGrid'>
                <p>Propietario:</p>
                <input type="text" defaultValue={Account.id && Account.owner} placeholder='Ej. Juan' {...register('owner')} />
            </div>
            <div className='createGrid'>
                <p>Usuario:</p>
                <input type="text" defaultValue={Account.id && Account.user} placeholder='Ej. admin' {...register('user')} />
            </div>
            <div className='createGrid'>
                <div>Contraseña:</div>
                <input type="text" defaultValue={Account.id && Account.password} placeholder='Ej. Password' {...register('password')} />
            </div>
            <div className='createGrid'>
                <div>Proyecto:</div>
                <input type="text" onClick={() => setProjectListVisible(!ProjectListVisible)} placeholder='Ej. La Cima' value={/*projectName*/ Project && Project.name} {...register('projectName')} />
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