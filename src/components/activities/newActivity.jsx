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
const newActivity = ({ /*task,*/ setVisibleReport }) => {
    let aux
    const [task, settask] = useState('')//let task = {}
    const dispatch = useDispatch()

    const [Activity, setActivity] = useState(useSelector(state=>state.Item))
    const [ActivityDescription, setActivityDescription] = useState('')
    const NewActivityVisible = useSelector(state => state.NewsVisible)[3]

    const Tasks = AxiosGetHook('http://192.168.0.253:8000/api/v1/tasks')
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
            task.id && setTask(task)
            task.id && setTaskId(task.id)
            task.id && setRooms(task.room.project.rooms)
            axios.get('http://192.168.0.253:8000/api/v1/users/me/materials', getConfig())
                .then(res => setMaterialsAsignatesToMe(res.data))
            }, [task/*Task*/]
            )//useEffect(() => { task && setTask(task) }, [task])
    //Activity.roomId && (task = Activity, Activity = undefined, console.log('entro a borrar activity'))
    useEffect(() => CreateOrEditActivity(), [Activity])

    /*if (Activity.roomId) {
        useEffect(() =>(  settask(Activity), Activity = {} ), [Activity])
    } else {
        if (Activity.id) useEffect(() => setTask(Activity.task), [Activity])//en caso de editar actividades
        
    }*/
    function CreateOrEditActivity() {
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
        data.description = ActivityDescription
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
        navigate(-1)
    }
    function exit() {
        dispatch(setItem(false))
        navigate(-1)
    }
    return (
        <form onSubmit={handleSubmit(submit)} className='createCenter new' >
            <i className='bx bx-x-circle close' onClick={() => exit() /*(task ? setVisibleReport(false) : dispatch(setVisibleActivity(!NewActivityVisible)), dispatch(setItem(false)), navigate(-1))*/}></i>
            <h2>{Activity.task ? 'Editar Actividad' : 'Nueva Actividad'}</h2>
            <div className='createGrid'>
                <label>* Descripcion:</label>
                {<textarea
                    id='ActivityDescription'
                    /*contentEditable*/
                    className='textarea'
                    required
                    onChange={e => setActivityDescription(e.target.value)}
                    defaultValue={Activity.description}
                    maxLength="255"
                >
                    {/*Activity.task ? Activity.description : ''*/}
                </textarea>}
            </div> {/*defaultValue={Activity.task && Activity.description} placeholder='Ej. cablee 5 nodos en cocina' {...register('description')}  */}
            <div className='createGrid'>
                <div>* Tarea:</div>
                <input
                    type="text"
                    autoComplete='off'
                    required
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
                            {MaterialsAsignatesToMe.map(MaterialAsignatedToMe => !MaterialAsignatedToMe.installed && (<div className='MaterialAsignatedToMe' onClick={() => { setMaterialSelected(MaterialAsignatedToMe), setVisibleMaterialAsignedToMe(false) }} key={MaterialAsignatedToMe.id}>{MaterialAsignatedToMe.name}</div>))}
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
            <button>{Activity.task ? 'Actualizar' : 'Crear'}</button>
        </form>
    )
}

export default newActivity