import React, { useState, useEffect } from 'react'
import getConfig from '../../utils/getConfig'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import AxiosGetHook from '../../hooks/axiosGetHook'
import '../../App.css'
import './materials.css'
const newMaterial = () => {
    const Projects = AxiosGetHook('http://localhost:8000/api/v1/projects')
    const AllProjects = Projects.data.data?.projects
    const [projectName, setProjectName] = useState('')
    const [Project, setProject] = useState('')
    const [ProjectId, setProjectId] = useState('')
    const [ProjectListVisible, setProjectListVisible] = useState(false)

    const Inventories = AxiosGetHook('http://localhost:8000/api/v1/inventories')
    const AllInventories = Inventories.data.data?.inventory
    const [InventoryName, setInventoryName] = useState('')
    const [Inventory, setInventory] = useState('')
    const [InventoryId, setInventoryId] = useState('')
    const [InventoryListVisible, setInventoryListVisible] = useState('')
    const { handleSubmit, reset, register } = useForm()

    const navigate = useNavigate()

    useEffect(() => { setProjectId(Project.id) }, [Project])
    useEffect(() => { setInventoryId(Inventory.id) }, [Inventory])

    const submit = data => {
        data.projectId = ProjectId
        data.inventoryId=InventoryId

        const URL = `http://localhost:8000/api/v1/inventories/${InventoryId}/materials`
        axios.post(URL, data, getConfig())
            .then(res => {
                console.log(res, "Material creado")
            })
            .catch(err => console.log(err))
        /*reset({
            email: '',
            password: ''
        })*/
    }
    return (
        <form onSubmit={handleSubmit(submit)} className='createCenter' >
            <h2>Nuevo Material</h2>
            <div className='createGrid'>
                <p>Nombre:</p>
                <input type="text" placeholder='Ej. Sonos Amp' {...register('name')} />
            </div>
            <div className='createGrid'>
                <p>Cantidad:</p>
                <input type="number" placeholder='0-1000' {...register('amount')} />
            </div>
            <div className='createGrid'>
                <p>En espera:</p>
                <input type="text" placeholder='default: no' {...register('onHold')} />
            </div>
            <div className='createGrid'>
                <p>Retornado:</p>
                <input type="text" placeholder='default: no' {...register('returned')} />
            </div>




            <div className='createGrid'>
                <div>Inventario:</div>
                <input type="text" onClick={() => setInventoryListVisible(!InventoryListVisible)} placeholder='Selecciona un inventario' value={InventoryName} {...register('inventoryName')} />
            </div>
            <div className='createGrid'>
                <div></div>
                <div>
                    {
                        InventoryListVisible && AllInventories && AllInventories?.map(inventory => {
                            return (<p className='tableHeader tableHover list' onClick={() => { setInventoryName(inventory.name), setInventory(inventory), setInventoryListVisible(!InventoryListVisible) }} key={inventory.id}>{inventory.name}</p>)
                        }
                        )
                    }
                </div>
            </div>





            <div className='createGrid'>
                <div>Proyecto:</div>
                <input type="text" onClick={() => setProjectListVisible(!ProjectListVisible)} placeholder='Ej. La Cima' value={projectName} {...register('projectName')} />
            </div>
            <div className='createGrid'>
                <div></div>
                <div>
                    {
                        ProjectListVisible && AllProjects && AllProjects?.map(project => {
                            return (<p className='tableHeader tableHover list' onClick={() => { setProjectName(project.name), setProject(project), setProjectListVisible(!ProjectListVisible) }} key={project.id}>{project.name}</p>)
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

export default newMaterial