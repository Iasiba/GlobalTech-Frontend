import React from 'react'
import "./rooms.css"
import DeployRooms from './deployRooms'
import AxiosGetHook from '../../hooks/axiosGetHook'
const rooms = ({projectId}) => {
    const AllRooms = AxiosGetHook(projectId?`http://localhost:8000/api/v1/projects/${projectId}/rooms`:`http://localhost:8000/api/v1/rooms`)
    const Rooms = projectId?AllRooms.data?.data: AllRooms.data.data?.rooms
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