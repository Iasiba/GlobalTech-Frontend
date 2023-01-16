import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import UserList from '../users/userList'
import getConfig from '../../utils/getConfig'
import { useDispatch } from 'react-redux'
import { setItem } from '../../store/slices/ItemSlice'
import Activities from '../activities/activities'
import { setVisibleTask } from './../../store/slices/NewsVisibleSlice'
const deployTask = ({ task, searchTasks }) => {
    const dispatch = useDispatch()
    const [MenuVisible, setMenuVisible] = useState(false)
    const [UserListVisible, setUserListVisible] = useState(false)
    const [Visible, setVisible] = useState(false)
    const [ActivityVisible, setActivityVisible] = useState(false)
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
                <aside className='threePoints' onClick={() => setMenuVisible(!MenuVisible)} ><p>...</p></aside>
                {
                    MenuVisible
                    &&
                    <div className='itemList itemListPrimary '>
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
                    <UserList
                        task={task}
                        menuvisible={MenuVisible} setmenuvisible={setMenuVisible}
                        userlistvisible={UserListVisible} setuserlistvisible={setUserListVisible}
                    />
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
        </>
    )
}

export default deployTask