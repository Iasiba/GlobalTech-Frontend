import React, { useEffect } from 'react'
import { useState } from 'react'
import '../../App.css'
import './notes.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setItem } from '../../store/slices/ItemSlice'
import getConfig from '../../utils/getConfig'
import { setVisibleNote } from './../../store/slices/NewsVisibleSlice'
import { updateRefresh } from '../../store/slices/RefreshSlice'
import { updateRefreshMenu } from '../../store/slices/RefreshMenuSlice'
const deployNotes = ({ note, setAllNotes }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const NewNoteVisible = useSelector(state => state.NewsVisible)[8]
    const RefreshMenu = useSelector(state => state.RefreshMenu)
    const [MenuVisible, setMenuVisible] = useState(false)
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

    return (
        <>
            <div className='deploy'>
                <div className={`createGrid`}>
                    <p className="activities1">{note.tittle}</p>
                    <p className="activities">{note.note}</p>
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
                        <p className='items materialItemsWidth' onClick={() => { dispatch(setItem(note)), navigate('/NewNote')/*dispatch(setVisibleNote(!NewNoteVisible)), setMenuVisible(!MenuVisible) */ }}>Editar</p>
                        <p className='items materialItemsWidth' onClick={() => ((
                            axios.delete(`http://192.168.0.253:8000/api/v1/notes/${note.id}`, getConfig())
                                .then(
                                    dispatch(updateRefresh())
                                ),
                            setMenuVisible(!MenuVisible)))
                        }>Eliminar</p>
                    </div>
                }
            </div>
        </>
    )
}
export default deployNotes