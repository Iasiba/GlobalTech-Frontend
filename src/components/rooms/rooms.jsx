import React from 'react'
import "./rooms.css"
import DeployRooms from './deployRooms'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
import { useSelector } from 'react-redux'
const rooms = ({ projectId }) => {
    const Refresh = useSelector(state => state.Refresh)
    const [Rooms, setRooms] = useState('')
    useEffect(() => { searchRooms()}, [projectId, Refresh])

    function searchRooms() {
        const URL = projectId ? `http://192.168.0.253:8000/api/v1/projects/${projectId}/rooms` : `http://localhost:8000/api/v1/rooms`
        axios.get(URL, getConfig())
            .then(res => {
                if (res.data?.rooms) {
                    setRooms(res.data?.rooms)
                } else {
                    setRooms(res.data)
                }
            })
    }
    return (
        <div >
            {
                Rooms && Rooms?.map(room => {
                    return (
                        <DeployRooms
                            key={room.id}
                            room={room}
                        />
                    )
                })
            }
        </div>
    )
}

export default rooms