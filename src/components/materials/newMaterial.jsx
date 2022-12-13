import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import './materials.css'
import AxiosGetHook from '../../hooks/axiosGetHook'
import '../../App.css'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setItem } from '../../store/slices/ItemSlice'
const newMaterial = () => {
    const dispatch = useDispatch()
    const Material = useSelector(state => state.Item)

    const Projects = AxiosGetHook('http://localhost:8000/api/v1/projects')
    const AllProjects = Projects.data.data?.projects
    const [projectName, setProjectName] = useState('--Selecciona un Proyecto--')
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

    if (Material.id) useEffect(() => { setInventoryName(Material.inventory.name), setInventory(Material.inventory), setProjectName(Material.project.name), setProject(Material.project) }, [Material])//en caso de editar materiales
    const submit = data => {
        data.projectId = ProjectId
        data.inventoryId = InventoryId
        const URL = Material.id ? `http://localhost:8000/api/v1/materials/${Material.id}` : `http://localhost:8000/api/v1/inventories/${InventoryId}/materials`

        Material.id ?
            axios.put(URL, data, getConfig())
                .then(res => {
                    console.log(res, "Material Actualizado")
                })
                .catch(err => console.log(err))
                .finally(() => dispatch(setItem(false)), navigate('/materials'))
            :
            axios.post(URL, data, getConfig())
                .then(res => {
                    console.log(res, "Material creado")
                })
                .catch(err => console.log(err))

        /*reset({
            email: '',
            password: ''
        })*/
        navigate('/materials')
    }
    // 
    return (
        <form onSubmit={handleSubmit(submit)} className='createCenter' >
            {Material.id ? <h2>Editar Material</h2> : <h2>Nuevo Material</h2>}

            <div className='createGrid'>
                <div>Inventario:</div>
                <input type="text" onClick={() => setInventoryListVisible(!InventoryListVisible)} placeholder='--Selecciona un inventario--' value={InventoryName} {...register('inventoryName')} />
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
                <input type="text" onClick={() => setProjectListVisible(!ProjectListVisible)} placeholder='--Selecciona un Proyecto--' value={projectName} {...register('projectName')} />
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


            <div className='createGrid'>
                <p>Material:</p>
                <input type="text" defaultValue={Material.id ? Material.name : 'Ej. Sonos Amp'}{...register('name')} />
            </div>
            <div className='createGrid'>
                <p>Cantidad:</p>
                <input type="number" defaultValue={Material.id ? Material.amount : 0} {...register('amount')} />
            </div>





            <div className='checks'>
                <aside className='check'>
                    <input type="checkbox" defaultChecked={Material.id ? Material.onHold : false}{...register('onHold')} />
                    <div>En espera:</div>
                </aside>
                <aside className='check'>
                    <input type="checkbox" defaultChecked={Material.id ? Material.onHold : false}{...register('installed')} />
                    <div>Instalado:</div>
                </aside>
                <aside className='check'>
                    <input type="checkbox" defaultChecked={Material.id ? Material.onHold : false}{...register('returned')} />
                    <div>Devuelto:</div>
                </aside>
                <aside className='check'>
                    <input type="checkbox" defaultChecked={Material.id ? Material.onHold : false}{...register('damaged')} />
                    <div>Dañado:</div>
                </aside>
            </div>
            <br />
            <button>{Material.id ? 'Actualizar' : 'Crear'}</button>
        </form>
    )
}

export default newMaterial