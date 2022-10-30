import React from 'react'
import { useState } from 'react'
import Tasks from '../tasks/tasks'
const deployRooms = ({ room }) => {
    const [Visible, setVisible] = useState(false)
    return (
        <>
            <div onClick={() => setVisible(!Visible)} className="tableHover">
                    <p>{room.name}</p>
            </div>
            {Visible &&<Tasks roomId={room.id}/>} 
        </>
    )
}

export default deployRooms