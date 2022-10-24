import React from 'react'
import { useState } from 'react'
import Activities from '../activities/activities'
const deployTask = ({ task }) => {
    const [Visible, setVisible] = useState(false)
    const [ActivityVisible, setActivityVisible] = useState(false)
    return (
        <>
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
            {Visible && <div className='content'>
                <p>Tarea: {task.description}</p>
                <p>Proyecto: {task.room.project.name}</p>
                <p>Area: {task.room.name}</p>
                <p>Fecha de Ejecucion: {task.executionDate}</p>
                <p>Direccion: {task.room.project.address}</p>
                <p>Coordenadas: {task.room.project.coordinates}</p>
                <p>Material: {task.material}</p>
                <div className={`subcontent ${ActivityVisible && 'activityGrid'}`}>
                    <p onClick={() => setActivityVisible(!ActivityVisible)} className={`sub`}>Actividades</p>
                    {ActivityVisible && <Activities />}
                </div>
            </div>}
        </>
    )
}

export default deployTask