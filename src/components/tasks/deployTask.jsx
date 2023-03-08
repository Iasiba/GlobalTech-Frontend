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
import { setRefresh } from '../../store/slices/RefreshSlice'
const deployTask = ({ task, searchTasks }) => {
    const dispatch = useDispatch()
    const [MenuVisible, setMenuVisible] = useState(false)
    const [UserListVisible, setUserListVisible] = useState(false)
    const [Visible, setVisible] = useState(false)
    const [ActivityVisible, setActivityVisible] = useState(false)
    const [VisibleReport, setVisibleReport] = useState(false)

    const Refresh = useSelector(state => state.Refresh)
    const [Click, setClick] = useState(false)
    useEffect(
        () => {
            if (Click) {
                setMenuVisible(!MenuVisible),
                    setClick(false)
            } else {
                setMenuVisible(false)
            }
        }, [Refresh]
    )

    return (
        <>
            <div className='deploy'>
                <div onClick={() => setVisible(!Visible)} className={`task tableHover ${task.iscanceled && "canceled"} ${task.isfinished && "finished"}`}>
                    <aside>
                        <p>{task.executionDate}</p>
                    </aside>
                    <aside>
                        <p>{task.room.project.name}</p>
                    </aside>
                    <aside>
                        <p>{task.room.name}</p>
                    </aside>
                    <aside>
                        <p>{task.description}</p>
                    </aside>

                </div>

                <aside className='threePoints'
                    onClick={
                        () => (
                            dispatch(setRefresh(!Refresh)),
                            setClick(true)
                        )
                    }
                ><p>...</p></aside>

                {
                    MenuVisible
                    &&
                    <div className='itemList itemListPrimary '>
                        <p className='items materialItemsWidth' onClick={() => { setMenuVisible(false), setVisibleReport(true) }}>Reporte</p>
                        <p className='items materialItemsWidth' onClick={() => { setMenuVisible(false), setUserListVisible(true) }}>Asignar</p>
                        <p className='items materialItemsWidth' onClick={() => { dispatch(setItem(task)), dispatch(setVisibleTask(true)), setMenuVisible(false) }}>Editar</p>
                        <p className='items materialItemsWidth' onClick={() => ((
                            axios.delete(`http://localhost:8000/api/v1/tasks/${task.id}/activities`, getConfig()),
                            axios.delete(`http://localhost:8000/api/v1/tasks/${task.id}`, getConfig())
                                .then(searchTasks()),
                            setMenuVisible(!MenuVisible)))
                        }>Eliminar</p>
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
            {Visible && <div className='content'>
                <p>Tarea: {task.description}</p>
                <p>Observaciones: {task.observation}</p>
                <p>Proyecto: {task.room.project.name}</p>
                <p>Area: {task.room.name}</p>
                <p>Fecha de Ejecucion: {task.executionDate}</p>
                <p>Direccion: {task.room.project.address}</p>
                <p>Coordenadas: {task.room.project.coordinates}</p>
                <p>Material: {task.material}</p>
                <div className={`subcontent ${ActivityVisible && 'activityGrid'}`}>
                    <p onClick={() => setActivityVisible(!ActivityVisible)} className={`sub`}>Actividades</p>
                    {ActivityVisible && <Activities taskId={task.id} />}
                </div>
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