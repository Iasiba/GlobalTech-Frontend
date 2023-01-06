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
import { setVisibleBackup } from './../../store/slices/NewsVisibleSlice'
const newBackup = () => {
    const dispatch = useDispatch()
    const Backup = useSelector(state => state.Item)
    const NewBackupVisible = useSelector(state => state.NewsVisible)[7]
    const Projects = AxiosGetHook('http://localhost:8000/api/v1/projects')

    const AllProjects = Projects.data.data?.projects
    const [projectName, setProjectName] = useState('')
    const [Project, setProject] = useState('')
    const [ProjectListVisible, setProjectListVisible] = useState(false)

    const [File, setFile] = useState('')

    const { handleSubmit, reset, register } = useForm()
    const navigate = useNavigate()

    if (Backup.id) useEffect(() => { setProject(Backup.project), setProjectName(Backup.project.name) }, [])
    const tiempoTranscurrido = Date.now()
    const hoy = new Date(tiempoTranscurrido)
    const today = hoy.toLocaleDateString()
    const date = today.split('/')
    const year = date[2]
    const month = date[1]
    const day = date[0]

    const submit = data => {
        const Data = new FormData()
        Data.append("backups", File)

        data.projectId = Project.id
        data.date = year + '/' + month + '/' + day//Today // "2020/06/12"//
        data.name = Project.name + year + month + day + 'V' + data.version
        console.log(data,Data)
        const URL = Backup.id ?
            `http://localhost:8000/api/v1/backups/${Backup.id}`
            :
            `http://localhost:8000/api/v1/backups`
        Backup.id ?
            axios.put(URL, data, getConfig())
                .then(() => {
                    axios.post(`http://localhost:8000/api/v1/backups/${Backup.id}`, Data, getConfig())
                        .then(res => { console.log(res) })
                })
                .catch(err => console.log(err))
                .finally(() => dispatch(setItem(false)))
            :
            axios.post(URL, data, getConfig())
                .then(res => {
                    console.log(res)
                    /*axios.post(`http://localhost:8000/api/v1/backups/${res.data.backup.id}`, Data, getConfig())
                        .then(res => { console.log(res) })*/

                })
                .catch(err => console.log(err))
        dispatch(setVisibleBackup(!NewBackupVisible))
        navigate('/myhome')
    }

    return (
        <form onSubmit={handleSubmit(submit)} className='createCenter new' >
            <i className='bx bx-x-circle close' onClick={() => dispatch(setVisibleBackup(!NewBackupVisible))}></i>
            {Backup.id ? <h2>Editar Respaldo</h2> : <h2>Nuevo Respaldo</h2>}
            <div className='createGrid'>
                <div>* Proyecto:</div>
                <input type="text" required
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
                <div>* Software:</div>
                <input type="text" required defaultValue={Backup.id && Backup.software} placeholder='Ej. Lutron Homeworks'{...register('software')} />
            </div>
            <div className='createGrid'>
                <div>* Version:</div>
                <input type="number" required /*min="0" max="100" step="0.01"*/ defaultValue={Backup.id && Backup.version} placeholder='Ej. 3.5->35' {...register('version')} />
            </div>
            <div className='createGrid'>
                <div>Respaldo:</div>
                <input type="file" onChange={event => setFile(event.target.files[0])} />
            </div>
            <br />
            <button>{Backup.id ? 'Actualizar' : 'Crear'}</button>
        </form>
    )
}

export default newBackup