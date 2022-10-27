import React, { useState } from 'react'
import getConfig from '../../utils/getConfig'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import AxiosGetHook from '../../hooks/axiosGetHook'
import '../../App.css'
import './accounts.css'
const newAccount = () => {
    const Projects = AxiosGetHook('http://localhost:8000/api/v1/projects')
    const AllProjects = Projects.data.data?.projects
    
    const [projectName, setProjectName] = useState('')
    const [ProjectListVisible, setProjectListVisible] = useState(false)

    const { handleSubmit, reset, register } = useForm()

    const navigate = useNavigate()

    const submit = data => {
        const project = AllProjects.filter(project => project.name === data.projectName)[0]
        data.projectId = project ? project.id : ""
        //data.directionIp='0.0.0.0'
        /*const newData={
            "directionIp":"0.0.0.0",
            "owner":"li6uki7uk8ikkkkkkkkkkkkkk587x6ynyhrnrdy5",
            "password":"root",
            "projectId":"12a1166e-6945-45b6-85ef-aca1134e6776",
            "projectName":"yyy",
            "software":"gndtnthn",
            "user":". ñ  "
        }*/
        const URL =  `http://localhost:8000/api/v1/projects/${data.projectId}/accounts`
        axios.post(URL, data, getConfig())
            .then(res => {
                console.log(res, "cuenta creada")
            })
            .catch(err => console.log(err))
        /*reset({
            email: '',
            password: ''
        })*/
    }
    return (
        <form onSubmit={handleSubmit(submit)} className='createCenter' >
            <h2>Nueva Cuenta</h2>
            <div className='createGrid'>
                <p>Software:</p>
                <input type="text" placeholder='Ej. Sonos' {...register('software')} />
            </div>
            <div className='createGrid'>
                <p>Direccion Ip:</p>
                <input type="text" placeholder='Ej. 0.0.0.0' {...register('directionIp')} />
            </div>
            <div className='createGrid'>
                <p>Propietario:</p>
                <input type="text" placeholder='Ej. Juan' {...register('owner')} />
            </div>
            <div className='createGrid'>
                <p>Usuario:</p>
                <input type="text" placeholder='Ej. admin' {...register('user')} />
            </div>
            <div className='createGrid'>
                <div>Contraseña:</div>
                <input type="text" placeholder='Ej. Password' {...register('password')} />
            </div>
            <div className='createGrid'>
                <div>Proyecto:</div>
                <input type="text" onClick={() => setProjectListVisible(!ProjectListVisible)} placeholder='Ej. La Cima' value={projectName} {...register('projectName')} />
            </div>


            <div className='createGrid'>
                <div></div>
                <div>
                    {
                        ProjectListVisible&&AllProjects && AllProjects?.map(project => {
                            return (<p className='tableHeader tableHover list' onClick={() => {setProjectName(project.name), setProjectListVisible(!ProjectListVisible)}} key={project.id} project={project}>{project.name}</p>)
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

export default newAccount