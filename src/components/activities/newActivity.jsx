import React, { useState, useEffect } from 'react'
import getConfig from '../../utils/getConfig'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import AxiosGetHook from '../../hooks/axiosGetHook'
import '../../App.css'
import './activities.css'
import { useSelector, useDispatch } from 'react-redux'
import { setItem } from '../../store/slices/ItemSlice'
import { setVisibleActivity } from './../../store/slices/NewsVisibleSlice'
const newActivity = ({ task, setVisibleReport }) => {
    const dispatch = useDispatch()
    const Activity = useSelector(state => state.Item)
    const NewActivityVisible = useSelector(state => state.NewsVisible)[3]

    const Tasks = AxiosGetHook('http://localhost:8000/api/v1/tasks')
    const AllTasks = Tasks.data.data?.tasks

    const [Task, setTask] = useState('')
    const [TaskId, setTaskId] = useState('')
    const [TaskListVisible, setTaskListVisible] = useState(false)
    const [Materials, setMaterials] = useState(false)
    const [VisibleMaterialAsignedToMe, setVisibleMaterialAsignedToMe] = useState(false)
    const [MaterialSelected, setMaterialSelected] = useState('')
    const [Rooms, setRooms] = useState('')
    const [VisibleRooms, setVisibleRooms] = useState(false)
    const [RoomSelected, setRoomSelected] = useState('')
    const [MaterialsInstalleds, setMaterialsInstalleds] = useState([])
    const [MaterialsAsignatesToMe, setMaterialsAsignatesToMe] = useState([])
    const [RefreshMaterialsAsignatesToMe, setRefreshMaterialsAsignatesToMe] = useState(false)
    const { handleSubmit, reset, register } = useForm()

    const navigate = useNavigate()
    useEffect(
        () => {
            Task.id && setTaskId(Task.id),
                Task.id && setRooms(Task.room.project.rooms),
                axios.get('http://localhost:8000/api/v1/users/me/materials', getConfig())
                    .then(res => setMaterialsAsignatesToMe(res.data))
        }, [Task]
    )
    useEffect(() => { task && setTask(task) }, [task])

    if (Activity.id) useEffect(() => { setTask(Activity.task) }, [Activity])//en caso de editar materiales

    function installMaterial(material) {
        for (let i = 0; i < MaterialsAsignatesToMe.length; i++) {
            if (material.id == MaterialsAsignatesToMe[i].id) {
                MaterialsAsignatesToMe.splice(i, 1)
                setRefreshMaterialsAsignatesToMe(!RefreshMaterialsAsignatesToMe)
                i = MaterialsAsignatesToMe.length
            }
        }
    }
    function returnMaterial(material) {
        for (let i = 0; i < MaterialsInstalleds.length; i++) {
            if (material.id == MaterialsInstalleds[i].MaterialSelected.id) {
                MaterialsInstalleds.splice(i, 1)
                setRefreshMaterialsAsignatesToMe(!RefreshMaterialsAsignatesToMe)
                i = MaterialsInstalleds.length
            }
        }
    }
    const submit = data => {
        data.taskId = Task.id
        const URL = Activity.id ? `http://localhost:8000/api/v1/activities/${Activity.id}` : `http://localhost:8000/api/v1/tasks/${TaskId}/activities`
        Activity.id ?
            axios.put(URL, data, getConfig())
                .then(res => {
                    console.log(res, "Activiad Actualizada")
                })
                .catch(err => console.log(err))
                .finally(dispatch(setItem(false)))
            :
            axios.post(URL, data, getConfig())
                .then(res => {
                    console.log(res, "Actividad creada")
                })
                .catch(err => console.log(err))
        if (MaterialsInstalleds.length) {
            for (let i = 0; i < MaterialsInstalleds.length; i++) {
                const MaterialId = MaterialsInstalleds[i].MaterialSelected.id;
                MaterialsInstalleds[i].installed = true
                MaterialsInstalleds[i].projectId = MaterialsInstalleds[i].RoomSelected.projectId
                MaterialsInstalleds[i].roomId = MaterialsInstalleds[i].RoomSelected.id
                axios.put(`http://localhost:8000/api/v1/materials/${MaterialId}`, MaterialsInstalleds[i], getConfig())
                    .then(res => {
                        console.log(res, "Material instalado")
                    })
                    .catch(err => console.log(err))
            }
        }
        task
            &&
            (
                task.assigned=false,
                task.userId=null,
                axios.put(`http://localhost:8000/api/v1/tasks/${task.id}`, task, getConfig())
                .then(res => {
                    console.log(res, "Tarea Actualizada")
                })
                .catch(err => console.log(err))
                .finally(dispatch(setItem(false)))
                ,
                setVisibleReport(false)
                ,
                axios.delete(`http://localhost:8000/api/v1/taskList/${task.taskListId}`, getConfig())
                .then(res => {
                    console.log(res, "Asignacion Borrada")
                })
                .catch(err => console.log(err))
            )
        !task && dispatch(setVisibleActivity(!NewActivityVisible))//ocultar ventana de creacion de actividades
    }
    return (
        <form onSubmit={handleSubmit(submit)} className='createCenter new' >
            <i className='bx bx-x-circle close' onClick={() => (task ? setVisibleReport(false) : dispatch(setVisibleActivity(!NewActivityVisible)), dispatch(setItem(false)))}></i>
            <h2>{Activity.id ? 'Editar Actividad' : 'Nueva Actividad'}</h2>
            <div className='createGrid'>
                <div>* Descripcion:</div>
                <input type="text" required defaultValue={Activity.id && Activity.description} placeholder='Ej. cablee 5 nodos en cocina' {...register('description')} />
            </div>
            <div className='createGrid'>
                <div>* Tarea:</div>
                <input type="text" required
                    onClick={() => !task && setTaskListVisible(!TaskListVisible)}
                    placeholder='--selecciona una tarea--'
                    value={Task.description ? Task.description : ''}
                    {...register('taskDescription')} />
            </div>

            <div className='createGrid'>
                <div></div>
                <div>
                    {
                        TaskListVisible && AllTasks && AllTasks?.map(task => {
                            return (<p className='tableHeader tableHover list' onClick={() => { setTask(task), setTaskListVisible(!TaskListVisible) }} key={task.id}>{task.description}</p>)
                        }
                        )
                    }
                </div>
            </div>

            <div className='createGrid'>
                <div>Materials:</div>
                <input type="checkbox" onClick={() => setMaterials(!Materials)} />
            </div>
            {
                Task && Materials &&
                <div>
                    <div >
                        <div>Proyecto</div>
                        <div>{Task.room.project.name}</div>
                    </div>
                    <div className='createGrid'>
                        <div>Habitacion:</div>
                        <input type="text" onClick={() => setVisibleRooms(!VisibleRooms)} defaultValue={RoomSelected ? RoomSelected.name : ''} placeholder='--Selecciona Un Area--' />
                    </div>
                    {
                        VisibleRooms &&
                        <div>
                            {Rooms.map(Room => <div className='MaterialAsignatedToMe' onClick={() => { setRoomSelected(Room), setVisibleRooms(false) }} key={Room.id}>{Room.name}</div>)}
                        </div>
                    }
                    <div className='createGrid'>
                        <div>Material:</div>
                        <input type="text" onClick={() => setVisibleMaterialAsignedToMe(!VisibleMaterialAsignedToMe)} defaultValue={MaterialSelected ? MaterialSelected.name : ''} placeholder='--Selecciona Un Material--' />
                    </div>
                    {
                        VisibleMaterialAsignedToMe &&
                        <div>
                            {MaterialsAsignatesToMe.map(MaterialAsignatedToMe => !MaterialAsignatedToMe.installed&&(<div className='MaterialAsignatedToMe' onClick={() => { setMaterialSelected(MaterialAsignatedToMe), setVisibleMaterialAsignedToMe(false) }} key={MaterialAsignatedToMe.id}>{MaterialAsignatedToMe.name}</div>))}
                        </div>
                    }
                    <div onClick={() => {
                        if (MaterialSelected && RoomSelected) {
                            MaterialsInstalleds.push({ MaterialSelected, RoomSelected }), installMaterial(MaterialSelected)
                                , setMaterialSelected(''), setRoomSelected(''), setRefreshMaterialsAsignatesToMe(!RefreshMaterialsAsignatesToMe)
                        }
                    }} className='add'>agregar</div>
                    <div>{'Materiales instalados: ' + MaterialsInstalleds.length}</div>
                    <section className='MaterialsInstalleds'>
                        {
                            MaterialsInstalleds.length ?
                                MaterialsInstalleds.map(
                                    (materialInstalled) =>
                                        <div className='MaterialInstalled' key={materialInstalled.MaterialSelected.id + materialInstalled.RoomSelected.id}>
                                            <div className='DeleteMaterialInstalled' onClick={() => { MaterialsAsignatesToMe.push(materialInstalled.MaterialSelected), returnMaterial(materialInstalled.MaterialSelected) }}>x</div>
                                            <aside>
                                                {materialInstalled.MaterialSelected.name}
                                            </aside>
                                            <aside>
                                                {materialInstalled.RoomSelected.name}
                                            </aside>
                                        </div>
                                )
                                :
                                <div></div>
                        }
                    </section>
                </div>
            }
            <div>
            </div>
            <br />
            <button>{Activity.id ? 'Actualizar' : 'Crear'}</button>
        </form>
    )
}

export default newActivity