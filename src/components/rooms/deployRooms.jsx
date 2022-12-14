import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setItem } from '../../store/slices/ItemSlice'
import getConfig from '../../utils/getConfig'
import Tasks from '../tasks/tasks'
import { setVisibleRoom } from './../../store/slices/NewsVisibleSlice'
const deployRooms = ({ room, searchRooms }) => {
    const dispatch = useDispatch()
    const NewRoomVisible = useSelector(state => state.NewsVisible)[1]
    const [Visible, setVisible] = useState(false)
    const [MenuVisible, setMenuVisible] = useState(false)
    return (
        <>
            <div className='deploy'>
                <div onClick={() => setVisible(!Visible)} className="tableHover roomBody">
                    <p>{room.name}</p>
                </div>
                <aside className='threePoints' onClick={() => setMenuVisible(!MenuVisible)} ><p>...</p></aside>
                {
                    MenuVisible
                    &&
                    <div className='itemList itemListPrimary '>
                        <p className='items materialItemsWidth' onClick={() => {dispatch(setItem(room)),dispatch(setVisibleRoom(!NewRoomVisible)),setMenuVisible(!MenuVisible)}}>Editar</p>
                        <p className='items materialItemsWidth' onClick={() => ((
                            axios.delete(`http://localhost:8000/api/v1/rooms/${room.id}`, getConfig())
                                .then(searchRooms()),
                            setMenuVisible(!MenuVisible)))
                        }>Eliminar</p>
                    </div>
                }
            </div>
            {Visible && <Tasks roomId={room.id} />}
        </>
    )
}

export default deployRooms