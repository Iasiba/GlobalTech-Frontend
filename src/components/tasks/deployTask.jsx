import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import UserList from '../users/userList'
import getConfig from '../../utils/getConfig'
import { useDispatch, useSelector } from 'react-redux'
import { setItem } from '../../store/slices/ItemSlice'
import Activities from '../activities/activities'
import { setVisibleTask } from './../../store/slices/NewsVisibleSlice'
import NewActivity from '../activities/newActivity'
import { updateRefreshMenu } from '../../store/slices/RefreshMenuSlice'
import { updateRefresh } from '../../store/slices/RefreshSlice'
import { useNavigate } from 'react-router-dom'
const deployTask = ({ task }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const BackendAddress = useSelector(state => state.BackendAddress)
    const [MenuVisible, setMenuVisible] = useState(false)
    const [UserListVisible, setUserListVisible] = useState(false)
    const [Visible, setVisible] = useState(false)
    const [VisibleReport, setVisibleReport] = useState(false)
    const [InformationVisible, setInformationVisible] = useState(true)
    const [ActivityVisible, setActivityVisible] = useState(false)

    const RefreshMenu = useSelector(state => state.RefreshMenu)
    const [Click, setClick] = useState(false)

    useEffect(
        () => {
            if (Click) {
                setMenuVisible(!MenuVisible),
                    setClick(false)
            } else {
                setMenuVisible(false)
            }
        }, [RefreshMenu]
    )
    function watchActivities() {
        setActivityVisible(!ActivityVisible)
        setInformationVisible(false)
    }
    function watchInformation() {
        setActivityVisible(false)
        setInformationVisible(!InformationVisible)
    }

    return (
        <>
            <div className='deploy'>
                <div onClick={() => setVisible(!Visible)} className={`${/*task*/''} tableHover createGrid ${task.iscanceled ? "canceled" : task.isfinished ? "finished" : task.taskLists.length ? "assigned" : ""} `}>
                    <p className='activities1'>{task.executionDate + '-' + task.room.project.name + '-' + task.room.name + ':'}</p>
                    <p className='activities'>{task.description}</p>
                    {/*<aside>
                    </aside>
                    <aside>
                        <p>{/*task.room.project.name}</p>
                    </aside>
                    <aside>
                        <p>{/*task.room.name}</p>
                    </aside>
                    <aside>
                    </aside>*/}
                </div>
                <aside className='threePoints' onClick={() => (dispatch(updateRefreshMenu()), setClick(true))}><p>...</p></aside>
                {// menu de cada tarea
                    MenuVisible
                    &&
                    <div className='itemList itemListPrimary '>
                        <p className='items materialItemsWidth' onClick={() => { dispatch(setItem(task)), /*setMenuVisible(false),*/ navigate('/NewActivity')/*setVisibleReport(true)*/ }}>Reporte</p>
                        <p className='items materialItemsWidth' onClick={() => { setMenuVisible(false), setUserListVisible(true) }}>Asignar</p>
                        <p className='items materialItemsWidth' onClick={() => { dispatch(setItem(task)), /*dispatch(setVisibleTask(true)),*/ navigate('/NewTask') /*setMenuVisible(false)*/ }}>Editar</p>
                        {!task.taskLists?.length && <p className='items materialItemsWidth' onClick={() => ((
                            //axios.delete(`http://192.168.0.253:8000/api/v1/tasks/${task.id}/activities`, getConfig()),
                            axios.delete(`http://${BackendAddress}/api/v1/tasks/${task.id}`, getConfig())
                                .then(dispatch(updateRefresh())),
                            setMenuVisible(!MenuVisible)))
                        }>Eliminar</p>}
                    </div>
                }
                {//lista de usuarios a los cuales se puede asignar tareas
                    UserListVisible
                    &&
                    <div className='backgroundUserList'>
                        <UserList
                            task={task}
                            menuvisible={MenuVisible} setmenuvisible={setMenuVisible}
                            userlistvisible={UserListVisible} setUserListVisible={setUserListVisible}
                        />
                    </div>
                }
            </div>
            {Visible && <div className='taskcontent'>
                <ul className={`tasksubcontent`}>
                    <li onClick={() => watchInformation()} className={`tasksub ${InformationVisible && 'selected'}`}>Informacion</li>
                    {(task.activities.length > 0) && <li onClick={() => watchActivities()} className={`tasksub ${ActivityVisible && 'selected'}`}>Actividades</li>}
                </ul>
                {InformationVisible && <div>
                    <p><b>Tarea:</b>  {task.description}</p>
                    {task.observation && <p><b>Observaciones:</b>  {task.observation}</p>}
                    <p><b>Proyecto:</b>  {task.room.project.name}</p>
                    <p><b>Area:</b>  {task.room.name}</p>
                    <p><b>Fecha de Ejecucion:</b> {task.executionDate}</p>
                    <p>
                        <b>Direccion:</b> {task.room.project.address}
                        <a href={`https://maps.google.com/?q=${task.room.project.coordinates}`} className='projectsub'>¿Como llegar?</a>
                    </p>
                    <p><b>Coordenadas:</b>  {task.room.project.coordinates}</p>
                    {task.material && <p><b>Material:</b>  {task.material}</p>}
                </div>}
                <section className="taskActivity" >
                    {ActivityVisible && <Activities taskId={task.id} />}
                </section>
            </div>}
            {
                VisibleReport
                &&
                <div className='report'>
                    < NewActivity
                        task={task}
                        setVisibleReport={setVisibleReport}
                    />
                </div>
            }
        </>
    )
}

export default deployTask