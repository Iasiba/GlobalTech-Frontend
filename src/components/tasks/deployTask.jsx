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
                {
                    MenuVisible
                    &&
                    <div className='itemList itemListPrimary '>
                        <p className='items materialItemsWidth' onClick={() => { dispatch(setItem(task)), /*setMenuVisible(false),*/ navigate('/NewActivity')/*setVisibleReport(true)*/ }}>Reporte</p>
                        <p className='items materialItemsWidth' onClick={() => { setMenuVisible(false), setUserListVisible(true) }}>Asignar</p>
                        <p className='items materialItemsWidth' onClick={() => { dispatch(setItem(task)), /*dispatch(setVisibleTask(true)),*/ navigate('/NewTask') /*setMenuVisible(false)*/ }}>Editar</p>
                        {!task.taskLists?.length && <p className='items materialItemsWidth' onClick={() => ((
                            //axios.delete(`http://192.168.0.253:8000/api/v1/tasks/${task.id}/activities`, getConfig()),
                            axios.delete(`http://192.168.0.253:8000/api/v1/tasks/${task.id}`, getConfig())
                                .then(dispatch(updateRefresh())),
                            setMenuVisible(!MenuVisible)))
                        }>Eliminar</p>}
                    </div>
                }
                {
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
                    <li onClick={() => watchActivities()} className={`tasksub ${ActivityVisible && 'selected'}`}>Actividades</li>
                </ul>
                {InformationVisible && <div>
                    <p>Tarea: {task.description}</p>
                    <p>Observaciones: {task.observation}</p>
                    <p>Proyecto: {task.room.project.name}</p>
                    <p>Area: {task.room.name}</p>
                    <p>Fecha de Ejecucion: {task.executionDate}</p>
                    <p>Direccion: {task.room.project.address}</p>
                    <p>Coordenadas: {task.room.project.coordinates}</p>
                    <p>Material: {task.material}</p>
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