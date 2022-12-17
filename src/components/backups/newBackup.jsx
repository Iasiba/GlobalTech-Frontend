import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import './backups.css'
import AxiosGetHook from '../../hooks/axiosGetHook'
import '../../App.css'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setItem } from '../../store/slices/ItemSlice'
const newMaterial = () => {
    const dispatch = useDispatch()
    const Backup = useSelector(state => state.Item)
    const Projects = AxiosGetHook('http://localhost:8000/api/v1/projects')

    const AllProjects = Projects.data.data?.projects
    const [projectName, setProjectName] = useState('')
    const [Project, setProject] = useState('')
    const [ProjectListVisible, setProjectListVisible] = useState(false)

    const { handleSubmit, reset, register } = useForm()
    const navigate = useNavigate()

    if (Backup.id) useEffect(() => { setProject(Backup.project),setProjectName(Backup.project.name) }, [])
    const tiempoTranscurrido = Date.now()
    const hoy = new Date(tiempoTranscurrido)
    const today = hoy.toLocaleDateString()
    const year = today.substring(6, 10)
    const month = today.substring(3, 5)
    const day = today.substring(0, 2)

    const submit = data => {
        data.projectId = Project.id
        data.date = year + '/' + month + '/' + day//Today // "2020/06/12"//
        data.name = Project.name + year + month + day + 'V' + data.version
        data.backup = 'https://www.youtube.com/watch?v=DIexYmyB1zk'
        const URL = Backup.id ? `http://localhost:8000/api/v1/backups/${Backup.id}` : `http://localhost:8000/api/v1/backups`
        console.log(data)
        Backup.id ?
            axios.put(URL, data, getConfig())
                .then(res => {
                    console.log(res, "Respaldo Actualizado")
                })
                .catch(err => console.log(err))
                .finally(() => dispatch(setItem(false)), navigate('/backups'))
            :
            axios.post(URL, data, getConfig())
                .then(res => {
                    console.log(res, "Respaldo creado")
                })
                .catch(err => console.log(err))
                .finally(navigate('/backups'))
    }
    
    return (
        <form onSubmit={handleSubmit(submit)} className='createCenter' >
            {Backup.id ? <h2>Editar Respaldo</h2> : <h2>Nuevo Respaldo</h2>}
            <div className='createGrid'>
                <div>Proyecto:</div>
                <input type="text"
                    onClick={() => setProjectListVisible(!ProjectListVisible)}
                    placeholder='--Selecciona un Proyecto--'
                    value={projectName}
                    {...register('projectName')}
                />
            </div>{/**/}
             <div className='createGrid'>
             <div></div>
                <div>
                    {
                        ProjectListVisible && AllProjects && AllProjects?.map(project => {
                            return (
                                <p className='tableHeader tableHover list'
                                    onClick={
                                        () => {
                                            setProjectName(project.name)
                                            setProject(project)
                                            setProjectListVisible(!ProjectListVisible)
                                        }
                                    }
                                    key={project.id}
                                >{project.name}</p>
                            )
                        }
                        )
                    }
                </div>
            </div>
            <div className='createGrid'>
                <p>Software:</p>
                <input type="text" defaultValue={Backup.id && Backup.software } placeholder='Ej. Lutron Homeworks'{...register('software')} />
            </div>
            <div className='createGrid'>
                <p>Version:</p>
                <input type='number' defaultValue={Backup.id &&Backup.version} placeholder='Ej. 3.5->35' {...register('version')} />
            </div>
           

            <div className='createGrid'>
                <p>Respaldo:</p>
                <input type="file" />
            </div>
            <br />
            <button>{Backup.id ? 'Actualizar' : 'Crear'}</button>
        </form>
    )
}

export default newMaterial