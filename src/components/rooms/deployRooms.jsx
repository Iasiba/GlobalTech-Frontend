import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setItem } from '../../store/slices/ItemSlice'
import getConfig from '../../utils/getConfig'
import Tasks from '../tasks/tasks'
import { setVisibleRoom } from './../../store/slices/NewsVisibleSlice'
import { updateRefreshMenu } from '../../store/slices/RefreshMenuSlice'
import { updateRefresh } from '../../store/slices/RefreshSlice'
import { useNavigate } from 'react-router-dom'
const deployRooms = ({ room }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const NewRoomVisible = useSelector(state => state.NewsVisible)[1]
    const [Visible, setVisible] = useState(false)
    const [MenuVisible, setMenuVisible] = useState(false)

    const RefreshMenu = useSelector(state => state.RefreshMenu)
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
        }, [RefreshMenu]
    )
    useEffect(() => { }, [room, Refresh])
    function deleteRoom() {
        axios.get(`http://192.168.0.253:8000/api/v1/rooms/${room.id}/tasks`, getConfig())
            .then(res => {
                let i
                for (i = 0; i < res.data.length; i++) {
                    axios.delete(`http://192.168.0.253:8000/api/v1/tasks/${res.data[i].id}`, getConfig())
                    dispatch(updateRefresh())
                }
                if (i === res.data.length) {
                    i += 1
                    axios.delete(`http://192.168.0.253:8000/api/v1/rooms/${room.id}`, getConfig())
                    dispatch(updateRefresh())
                }
            })
        dispatch(updateRefresh())
    }

    return (
        <>
            <div className='deploy'>
                <div onClick={() => setVisible(!Visible)} className="tableHover roomBody">
                    <p>{room.name}</p>
                </div>
                <aside className='threePoints'
                    onClick={
                        () => (
                            dispatch(updateRefreshMenu()),
                            setClick(true)
                        )
                    }
                ><p>...</p></aside>

                {
                    MenuVisible
                    &&
                    <div className='itemList itemListPrimary '>
                        <p className='items materialItemsWidth' onClick={() => { dispatch(setItem(room)), navigate('/NewLocation') /*dispatch(setVisibleRoom(!NewRoomVisible)), setMenuVisible(!MenuVisible) */ }}>Editar</p>
                        {!room.materials.length && !room.tasks.length && <p className='items materialItemsWidth' onClick={() => (
                            deleteRoom(),
                            dispatch(updateRefresh()),
                            setMenuVisible(!MenuVisible),
                            dispatch(updateRefresh())
                        )}>Eliminar</p>}
                    </div>
                }
            </div>
            {Visible && <Tasks roomId={room.id} />}
        </>
    )
}

export default deployRooms