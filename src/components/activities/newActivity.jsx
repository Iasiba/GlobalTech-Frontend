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
import { updateRefresh } from '../../store/slices/RefreshSlice'
import { setArea } from '../../store/slices/AreaSlice'
const newActivity = ({ /*task,*/ setVisibleReport }) => {
    let aux
    const [task, settask] = useState('')//let task = {}
    const dispatch = useDispatch()

    const [Activity, setActivity] = useState(useSelector(state => state.Item))
    const [ActivityDescription, setActivityDescription] = useState('')
    const NewActivityVisible = useSelector(state => state.NewsVisible)[3]

    const Tasks = AxiosGetHook('http://192.168.0.253:8000/api/v1/tasks')
    const AllTasks = Tasks.data.data?.tasks

    const [Task, setTask] = useState({ description: '--Selecciona la Tarea--' })
    const [TaskId, setTaskId] = useState('')
    const [TaskListVisible, setTaskListVisible] = useState(false)
    const [Materials, setMaterials] = useState(false)
    const [VisibleMaterialAsignedToMe, setVisibleMaterialAsignedToMe] = useState(false)
    const [MaterialSelected, setMaterialSelected] = useState({ name: "--Selecciona Material--" })
    const [Rooms, setRooms] = useState('')
    const [VisibleRooms, setVisibleRooms] = useState(false)
    const [RoomSelected, setRoomSelected] = useState({ name: "--Selecciona Area--" })
    const [MaterialsInstalleds, setMaterialsInstalleds] = useState([])
    const [MaterialsAsignatesToMe, setMaterialsAsignatesToMe] = useState([])
    const [RefreshMaterialsAsignatesToMe, setRefreshMaterialsAsignatesToMe] = useState(false)
    const { handleSubmit, reset, register } = useForm()

    const navigate = useNavigate()
    
    useEffect(
        () => {
            task.id && setTask(task)
            task.id && setTaskId(task.id)
            task.id && setRooms(task.room.project.rooms)
            axios.get('http://192.168.0.253:8000/api/v1/users/me/materials', getConfig())
                .then(res => setMaterialsAsignatesToMe(res.data))
        }, [task, Task]
    )//useEffect(() => { task && setTask(task) }, [task])
    //Activity.roomId && (task = Activity, Activity = undefined, console.log('entro a borrar activity'))
    useEffect(() => InitialValuesCreateOrEditActivity(), [Activity])

    /*if (Activity.roomId) {
        useEffect(() =>(  settask(Activity), Activity = {} ), [Activity])
    } else {
        if (Activity.id) useEffect(() => setTask(Activity.task), [Activity])//en caso de editar actividades
        
    }*/
    function InitialValuesCreateOrEditActivity() {
        dispatch(setArea(Activity.task ? 'Editar Actividad' : 'Nueva Actividad'))
        Activity.roomId && (settask(Activity), setActivity({})) //en caso de crear actividades en una tarea especifica
        Activity.task && setTask(Activity.task) //en caso de editar actividades
    }
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
        //data.description = ActivityDescription
        data.taskId = Task.id
        const URL = Activity.task ? `http://192.168.0.253:8000/api/v1/activities/${Activity.id}` : `http://192.168.0.253:8000/api/v1/tasks/${data.taskId/*TaskId*/}/activities`
        Activity.task ?
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
                axios.put(`http://192.168.0.253:8000/api/v1/materials/${MaterialId}`, MaterialsInstalleds[i], getConfig())
                    .then(res => {
                        console.log(res, "Material instalado")
                    })
                    .catch(err => console.log(err))
            }
        }

        task
            &&
            (
                /*aux = task,
                console.log(aux),
                aux.assigned = false,
                aux.userId = null,
                axios.put(`http://192.168.0.253:8000/api/v1/tasks/${task.id}`, aux, getConfig())
                    .then(res => {
                        console.log(res, "Tarea Actualizada")
                    })
                    .catch(err => console.log(err))
                    .finally(dispatch(setItem(false)))
                //,
                //setVisibleReport(false)
                ,
                */
                axios.get("http://192.168.0.253:8000/api/v1/users/me", getConfig())
                    .then(res => {
                        const meId = res.data.id
                        for (let i = 0; i < task.taskLists.length; i++) {
                            console.log(task.taskLists)
                            if (task.taskLists[i].userId === meId) {
                                axios.delete(`http://192.168.0.253:8000/api/v1/taskList/${task.taskLists[i].id}`, getConfig())
                                    .then(res => {
                                        console.log(res, "Asignacion Borrada"),
                                            dispatch(updateRefresh())
                                    })
                                    .catch(err => console.log(err))
                            }
                        }
                    })
            )
        //!task && dispatch(setVisibleActivity(!NewActivityVisible))//ocultar ventana de creacion de actividades
        //dispatch(updateRefresh())
        dispatch(setItem(false))
        navigate(-1)
    }




    return (
        <form onSubmit={Task.id && handleSubmit(submit)} className='createCenter new' >
            <i className='bx bx-x-circle close' onClick={() => { dispatch(setItem(false)), navigate(-1) } /*(task ? setVisibleReport(false) : dispatch(setVisibleActivity(!NewActivityVisible)), dispatch(setItem(false)), navigate(-1))*/}></i>
            <div className='createGrid'>
                <label className='necessary'>Descripcion:</label>
                <textarea
                    autoComplete='off'
                    required
                    id='ActivityDescription'
                    defaultValue={Activity.description}
                    placeholder='Ej: Se cablearon nodos de red'
                    {...register('description')}
                    maxLength="255"
                /*onChange={e => setActivityDescription(e.target.value)}*/
                />
            </div> {/*defaultValue={Activity.task && Activity.description} placeholder='Ej. cablee 5 nodos en cocina' {...register('description')}  */}

            <div className='createGrid'>
                <label className='necessary'>Tarea:</label>
                <div className="selectableMenu">
                    <span className="selectableMenu__label" onClick={() => setTaskListVisible(!TaskListVisible)}>{Task.description}</span>
                    <ul className="selectableMenu__list zindex2">
                        {
                            TaskListVisible && AllTasks && AllTasks?.map(
                                task => {
                                    return (
                                        <li
                                            className='selectableMenu__item'
                                            onClick={
                                                () => {
                                                    setTask(task)
                                                    setTaskListVisible(false)
                                                }
                                            }
                                            key={task.id}
                                        >{task.description}</li>
                                    )
                                }
                            )
                        }
                    </ul>
                </div>
            </div>

            <div className='createGrid'>
                <label >Materiales:</label>
                <input type="checkbox" disabled={!Task.id} onClick={() => setMaterials(!Materials)} />
            </div>
            {
                Task && Materials &&
                <div>
                    <div >
                        <div>Proyecto</div>
                        <div>{Task.room.project.name}</div>
                    </div>
                    <div className='createGrid'>
                        <label className='necessary'>Habitacion:</label>
                        <div className="selectableMenu">
                            <span className="selectableMenu__label" onClick={() => setVisibleRooms(!VisibleRooms)} >{RoomSelected.name}</span>
                            <ul className="selectableMenu__list zindex1">
                                {
                                    VisibleRooms && Task.room.project.rooms.map(
                                        Room => {
                                            return (
                                                <li
                                                    className='selectableMenu__item'
                                                    onClick={
                                                        () => {
                                                            setRoomSelected(Room)
                                                            setVisibleRooms(false)
                                                        }
                                                    }
                                                    key={Room.id}
                                                >{Room.name}</li>
                                            )
                                        }
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                    {/*
                        <input type="text" onClick={() => setVisibleRooms(!VisibleRooms)} defaultValue={RoomSelected ? RoomSelected.name : ''} placeholder='--Selecciona Un Area--' />
                        VisibleRooms &&
                        <div>
                            {Task.room.project.rooms.map(Room => <div className='MaterialAsignatedToMe' onClick={() => { setRoomSelected(Room), setVisibleRooms(false) }} key={Room.id}>{Room.name}</div>)}
                        </div>

                        */
                    }
                    <div className='createGrid'>
                        <label className='necessary'>Material:</label>
                        <div className="selectableMenu">
                            <span className="selectableMenu__label" onClick={() => setVisibleMaterialAsignedToMe(!VisibleMaterialAsignedToMe)} >{MaterialSelected.name}</span>
                            <ul className="selectableMenu__list">
                                {
                                    VisibleMaterialAsignedToMe && MaterialsAsignatesToMe.map(
                                        MaterialAsignatedToMe => {
                                            return (
                                                (Task.room?.project?.id==MaterialAsignatedToMe.project?.id||!MaterialAsignatedToMe.project?.id)&&!MaterialAsignatedToMe.installed && <li
                                                    className='selectableMenu__item'
                                                    onClick={
                                                        () => {
                                                            setMaterialSelected(MaterialAsignatedToMe)
                                                            setVisibleMaterialAsignedToMe(false)
                                                        }
                                                    }
                                                    key={MaterialAsignatedToMe.id}
                                                >{MaterialAsignatedToMe.name}</li>
                                            )
                                        }
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                    {/*
                        <input type="text" onClick={() => setVisibleMaterialAsignedToMe(!VisibleMaterialAsignedToMe)} defaultValue={MaterialSelected ? MaterialSelected.name : ''} placeholder='--Selecciona Un Material--' />
                        VisibleMaterialAsignedToMe &&
                        <div>
                            {MaterialsAsignatesToMe.map(
                                MaterialAsignatedToMe => !MaterialAsignatedToMe.installed && (<div className='MaterialAsignatedToMe' onClick={() => { setMaterialSelected(MaterialAsignatedToMe), setVisibleMaterialAsignedToMe(false) }} key={MaterialAsignatedToMe.id}>{MaterialAsignatedToMe.name}</div>))}
                        </div>
                        */
                    }
                    <div onClick={() => {
                        if (MaterialSelected.id && RoomSelected.id) {
                            MaterialsInstalleds.push({ MaterialSelected, RoomSelected }), installMaterial(MaterialSelected)
                                , setMaterialSelected({ name: "--Selecciona Material--" }), setRoomSelected({ name: "--Selecciona Area--" }), setRefreshMaterialsAsignatesToMe(!RefreshMaterialsAsignatesToMe)
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
            <button>{Activity.task ? 'Actualizar' : 'Crear'}</button>
        </form>
    )
}

export default newActivity
{/*
                <div className='createGrid'>
                <label className='necessary'>Tarea:</label>
                <textarea
                    className='textArea'
                    autoComplete='off'
                    required
                    onClick={() => !task && setTaskListVisible(!TaskListVisible)}
                    placeholder='--selecciona una tarea--'
                    value={Task.description ? Task.description : ''}
                    {...register('taskDescription')}
                />

            </div>
            <div className='createGrid'>
                <label></label>
                <div className='listNews'>
                    {
                        TaskListVisible && AllTasks && AllTasks?.map(
                            task => {
                                return (
                                    <p
                                        className=' list '
                                        onClick={
                                            () => {
                                                setTask(task)
                                                setTaskListVisible(!TaskListVisible)
                                            }
                                        }
                                        key={task.id}
                                    >{task.description}</p>
                                )
                            }
                        )
                    }
                </div>
            </div>
            */}