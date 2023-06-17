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
import { updateRefresh } from '../../store/slices/RefreshSlice'
import { setArea } from '../../store/slices/AreaSlice'
const newBackup = () => {
    const dispatch = useDispatch()
    const Backup = useSelector(state => state.Item)
    const NewBackupVisible = useSelector(state => state.NewsVisible)[7]
    const Projects = AxiosGetHook('http://192.168.0.253:8000/api/v1/projects')

    const AllProjects = Projects.data.data?.projects
    const [projectName, setProjectName] = useState('')
    const [Project, setProject] = useState('')
    const [ProjectListVisible, setProjectListVisible] = useState(false)

    const [File, setFile] = useState('')

    const { handleSubmit, reset, register } = useForm()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(setArea(Backup.id ? 'Editar Respaldo' : 'Nuevo Respaldo'))
        assignBackup()
    }, [])
    const tiempoTranscurrido = Date.now()
    const hoy = new Date(tiempoTranscurrido)
    const today = hoy.toLocaleDateString()
    const date = today.split('/')
    const year = date[2]
    const month = date[1]
    const day = date[0]

    const submit = data => {
        const Data = new FormData()
        Data.append('backups', File)

        data.projectId = Project.id
        data.date = year + '/' + month + '/' + day//Today // "2020/06/12"//
        data.name = Project.name + year + month + day + 'V' + data.version
        console.log(File, data, Data, "datos con archivo")
        const URL = Backup.id ?
            `http://192.168.0.253:8000/api/v1/backups/${Backup.id}`
            :
            `http://192.168.0.253:8000/api/v1/backups`
        Backup.id ?
            axios.put(URL, data, getConfig())
                .then(() => {
                    axios.post(`http://192.168.0.253:8000/api/v1/backups/${Backup.id}`, Data, getConfig())
                        .then(res => { console.log(res) })
                })
                .catch(err => console.log(err))
                .finally(() => dispatch(setItem(false)))
            :
            /*axios.post(`http://localhost:8000/api/v1/backups/df45cad5-f0fa-40dd-9b4b-ce908d209714`, Data, getConfig())
                        .then(res => { console.log(res) })*/
            axios.post(URL, data, getConfig())
                .then(res => {
                    console.log(res)
                    axios.post(`http://192.168.0.253:8000/api/v1/backups/${res.data.backup.id}`, Data, getConfig())
                        .then(res => { console.log(res) })
                })
                .catch(err => console.log(err))
        dispatch(setVisibleBackup(!NewBackupVisible))
        dispatch(updateRefresh())
        navigate(-1)
    }
    function assignBackup() {
        if (Backup.id) {
            setProject(Backup.project),
                setProjectName(Backup.project.name)
        }
    }
    return (
        <form onSubmit={handleSubmit(submit)} className='createCenter new' >
            <i className='bx bx-x-circle close' onClick={() => (dispatch(setVisibleBackup(!NewBackupVisible)), dispatch(setItem(false)), navigate(-1))}></i>
            <br />
            <div className='createGrid'>
                <label className='necessary'>Proyecto:</label>
                <input
                    type="text"
                    required
                    autoComplete='off'
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
                <label className='necessary'>Software:</label>
                <input type="text" autoComplete='off' required defaultValue={Backup.id && Backup.software} placeholder='Ej. Lutron Homeworks'{...register('software')} />
            </div>
            <div className='createGrid'>
                <label className='necessary'>Version:</label>
                <input type="number" autoComplete='off' required /*min="0" max="100" step="0.01"*/ defaultValue={Backup.id && Backup.version} placeholder='Ej. 3.5->35' {...register('version')} />
            </div>
            <div className='createGrid'>
                <label className='necessary'>Respaldo:</label>
                <input type="file" autoComplete='off' onChange={event => setFile(event.target.files[0])} />
            </div>
            <br />
            <button>{Backup.id ? 'Actualizar' : 'Crear'}</button>
        </form>
    )
}

export default newBackup