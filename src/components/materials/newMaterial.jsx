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
import { setVisibleMaterial } from './../../store/slices/NewsVisibleSlice'

import { setRefresh, updateRefresh } from '../../store/slices/RefreshSlice'
import { setArea } from '../../store/slices/AreaSlice'
const newMaterial = () => {
    const dispatch = useDispatch()
    const Material = useSelector(state => state.Item)
    const NewMaterialVisible = useSelector(state => state.NewsVisible)[6]
    const Projects = AxiosGetHook('http://192.168.0.253:8000/api/v1/projects')
    const AllProjects = Projects.data.data?.projects
    const [projectName, setProjectName] = useState('')
    const [Project, setProject] = useState({ name: "--Selecciona Proyecto--" })
    const [ProjectId, setProjectId] = useState('')
    const [ProjectListVisible, setProjectListVisible] = useState(false)

    const Inventories = AxiosGetHook('http://192.168.0.253:8000/api/v1/inventories')
    const AllInventories = Inventories.data.data?.inventory
    const [InventoryName, setInventoryName] = useState('')
    const [Inventory, setInventory] = useState({ name: "--Selecciona Inventario--" })
    const [InventoryId, setInventoryId] = useState('')
    const [InventoryListVisible, setInventoryListVisible] = useState('')

    //const Refresh = useSelector(state=>state.Refresh)
    const { handleSubmit, reset, register } = useForm()

    const navigate = useNavigate()
    useEffect(() => { dispatch(setArea(Material.id ? 'Editar Material' : 'Nuevo Material')) }, [])

    useEffect(() => { setProjectId(Project.id) }, [Project])
    useEffect(() => { setInventoryId(Inventory.id) }, [Inventory])

    useEffect(() => assignInventory(), [Material])//en caso de editar materiales
    const submit = data => {
        data.projectId = Project.id
        data.inventoryId = Inventory.id
        data.inventoryName = Inventory.name
        const URL = Material.id ? `http://192.168.0.253:8000/api/v1/materials/${Material.id}` : `http://192.168.0.253:8000/api/v1/inventories/${InventoryId}/materials`

        Material.id ?
            axios.put(URL, data, getConfig())
                .then(res => {
                    console.log(res, "Material Actualizado")
                })
                .catch(err => console.log(err))
                .finally(() => dispatch(setItem(false)))
            :
            createMaterial(URL, data)
        //dispatch(setVisibleMaterial(!NewMaterialVisible))//ocultar ventana de creacion de materiales
        dispatch(updateRefresh())//dispatch(setRefresh(!Refresh))
        navigate(-1)
    }
    function createMaterial(URL, data) {
        const Amount = data.amount
        data.amount = 1
        for (let i = 0; i < Amount; i++) {
            axios.post(URL, data, getConfig())
                .then(res => {
                    console.log(res, "Material creado")
                })
                .catch(err => console.log(err))
        }
    }
    function assignInventory() {
        if (Material.id) {
            setInventoryName(Material.inventory.name)
            setInventory(Material.inventory)
            Material.project?.name && setProjectName(Material.project.name)
            Material.project && setProject(Material.project)
        }
    }
    return (
        <form onSubmit={handleSubmit(submit)} className='createCenter new' >
            <i className='bx bx-x-circle close' onClick={() => (/*dispatch(setVisibleMaterial(!NewMaterialVisible)), */dispatch(setItem(false)), navigate(-1))}></i>

            <div className='createGrid'>
                <label className='necessary'>Inventario:</label>
                <div className="selectableMenu">
                    <span className="selectableMenu__label" onClick={() => setInventoryListVisible(!InventoryListVisible)}>{Inventory.name}</span>
                    <ul className="selectableMenu__list zindex1">
                        {
                            InventoryListVisible && AllInventories && AllInventories?.map(
                                inventory => {
                                    return (
                                        <li
                                            className='selectableMenu__item'
                                            onClick={
                                                () => {
                                                    setInventory(inventory)
                                                    setInventoryListVisible(false)
                                                }
                                            }
                                            key={inventory.id}
                                        >{inventory.name}</li>
                                    )
                                }
                            )
                        }
                    </ul>
                </div>
            </div>
            { /*   <div className='createGrid'>
                <label className='necessary'>Inventario:</label>
                <input
                    type="text"
                    autoComplete='off'
                    required
                    onClick={() => setInventoryListVisible(!InventoryListVisible)}
                    placeholder='--Selecciona un inventario--'
                    value={InventoryName}
                    {...register('inventoryName')}
                />
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
            </div>*/}

            <div className='createGrid'>
                <label className='necessary'>Material:</label>
                <input
                    type="text"
                    autoComplete='off'
                    required
                    defaultValue={Material.id && Material.name}
                    placeholder='Ej. Conectores, Bocinas'
                    {...register('name')}
                />
            </div>
            <div className='createGrid'>
                <label>Color:</label>
                <input
                    type="text"
                    autoComplete='off'
                    defaultValue={Material.id && Material.color}
                    placeholder='Ej. Blanco'
                    {...register('color')}
                />
            </div>
            <div className='createGrid'>
                <label className='necessary'>Modelo:</label>
                <input
                    type="text"
                    autoComplete='off'
                    required
                    defaultValue={Material.id && Material.model}
                    placeholder='modelo'
                    {...register('model')}
                />
            </div>
            <div className='createGrid'>
                <label className='necessary'>Cantidad:</label>
                <input
                    type="number"
                    autoComplete='off'
                    required
                    defaultValue={Material.id && Material.amount}
                    placeholder='0-1000'
                    {...register('amount')}
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
                <label>Proyecto:</label>
                <input
                    type="text"
                    autoComplete='off'
                    onClick={() => setProjectListVisible(!ProjectListVisible)}
                    placeholder='--Selecciona un Proyecto--'
                    /*defaultValue={Material.id && Material.project.name}*
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
                                            setProjectName(project.name),
                                                setProject(project),
                                                setProjectListVisible(!ProjectListVisible)
                                        }
                                    }
                                    key={project.id}
                                >{project.name}</p>)
                        }
                        )
                    }
                </div>
            </div>
*/}
            <div className='checks'>
                <aside className='check'>
                    <input type="checkbox" defaultChecked={Material.id ? Material.onHold : false}{...register('onHold')} />
                    <div>En espera</div>
                </aside>
                <aside className='check'>
                    <input type="checkbox" defaultChecked={Material.id ? Material.installed : false}{...register('installed')} />
                    <div>Instalado</div>
                </aside>
                <aside className='check'>
                    <input type="checkbox" defaultChecked={Material.id ? Material.returned : false}{...register('returned')} />
                    <div>Devuelto</div>
                </aside>
                <aside className='check'>
                    <input type="checkbox" defaultChecked={Material.id ? Material.damaged : false}{...register('damaged')} />
                    <div>Dañado</div>
                </aside>
                <aside className='check'>
                    <input type="checkbox" defaultChecked={Material.id ? Material.delivered : false}{...register('delivered')} />
                    <div>Entregado</div>
                </aside>
            </div>
            <br />
            <button>{Material.id ? 'Actualizar' : 'Crear'}</button>
        </form>
    )
}

export default newMaterial