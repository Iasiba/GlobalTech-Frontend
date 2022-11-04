import React, { useState,useEffect } from 'react'
import getConfig from '../../utils/getConfig'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import AxiosGetHook from '../../hooks/axiosGetHook'
import '../../App.css'
import './rooms.css'
const newRoom = () => {
    const Projects = AxiosGetHook('http://localhost:8000/api/v1/projects')
    const AllProjects = Projects.data.data?.projects
    
    const [projectName, setProjectName] = useState('')
    const [Project, setProject] = useState('')
    const [ProjectId, setProjectId] = useState('')
    const [ProjectListVisible, setProjectListVisible] = useState(false)

    const { handleSubmit, reset, register } = useForm()

    const navigate = useNavigate()

    useEffect(() => { setProjectId(Project.id) }, [Project])
    const submit = data => {
        data.projectId = ProjectId

        const URL =  `http://localhost:8000/api/v1/projects/${data.projectId}/rooms`
        axios.post(URL, data, getConfig())
            .then(res => {
                console.log(res, "Ambiente creado")
            })
            .catch(err => console.log(err))
        /*reset({
            email: '',
            password: ''
        })*/
    }
    return (
        <form onSubmit={handleSubmit(submit)} className='createCenter' >
            <h2>Nuevo Ambiente</h2>
            <div className='createGrid'>
                <p>Nombre:</p>
                <input type="text" placeholder='Ej. Cocina' {...register('name')} />
            </div>
            <div className='createGrid'>
                <div>Proyecto:</div>
                <input type="text" onClick={() => setProjectListVisible(!ProjectListVisible)} placeholder='--Selecciona un Proyecto--' value={projectName} {...register('projectName')} />
            </div>
            <div className='createGrid'>
                <div></div>
                <div>
                    {
                        ProjectListVisible&&AllProjects && AllProjects?.map(project => {
                            return (<p className='tableHeader tableHover list' onClick={() => {setProjectName(project.name),setProject(project),setProjectListVisible(!ProjectListVisible)}} key={project.id} project={project}>{project.name}</p>)
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

export default newRoom