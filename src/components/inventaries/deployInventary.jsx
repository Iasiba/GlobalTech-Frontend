import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Materials from '../materials/materials'
const deployInventary = ({ inventary }) => {
    const [Visible, setVisible] = useState(false)
    return (
        <>
            <div onClick={() => setVisible(!Visible)} className={`tableHeader tableHover ${inventary.iscanceled && "canceled"} ${inventary.isfinished && "finished"}`}>
                <p>{inventary.name}</p>
            </div>
            {Visible && <div className='content'>
                <Materials/>
                <p><Link className='activity' to={`/tasks/activity/:${inventary.id}`}>Actividades </Link> </p>
            </div>}
        </>
    )
}

export default deployInventary