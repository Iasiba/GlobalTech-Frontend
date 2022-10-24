import React from 'react'
import "./rooms.css"
import DeployRooms from './deployRooms'
import AxiosGetHook from '../../hooks/axiosGetHook'
const rooms = () => {
    const AllRooms = AxiosGetHook('http://localhost:8000/api/v1/rooms')
    const Rooms = AllRooms.data.data?.rooms
    return (
        <div>
            {
                Rooms && Rooms?.map(room => {
                    return (<DeployRooms key={room.id} room={room} />)
                })
            }
        </div>
    )
}

export default rooms