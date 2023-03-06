import React, { useEffect } from 'react'
import { useState } from 'react'
import '../../App.css'
import './notes.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setItem } from '../../store/slices/ItemSlice'
import getConfig from '../../utils/getConfig'
import { setVisibleNote } from './../../store/slices/NewsVisibleSlice'
import { setRefresh } from '../../store/slices/RefreshSlice'
const deployNotes = ({ note, setAllNotes }) => {
    const dispatch = useDispatch()
    const NewNoteVisible = useSelector(state => state.NewsVisible)[8]
    const Refresh = useSelector(state => state.Refresh)
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
        }, [Refresh]
    )

    return (
        <>
            <div className='deploy'>
                <div className={`table noteBody`}>
                    <p>{note.tittle}</p>
                    <p>{note.note}</p>
                </div>
                <aside className='threePoints'
                    onClick={
                        () => (
                            dispatch(setRefresh(!Refresh)),
                            setClick(true)
                        )
                    }
                ><p>...</p></aside>
                {
                    MenuVisible
                    &&
                    <div className='itemList itemListPrimary '>
                        <p className='items materialItemsWidth' onClick={() => { dispatch(setItem(note)), dispatch(setVisibleNote(!NewNoteVisible)), setMenuVisible(!MenuVisible) }}>Editar</p>
                        <p className='items materialItemsWidth' onClick={() => ((
                            axios.delete(`http://localhost:8000/api/v1/notes/${note.id}`, getConfig())
                                .then(
                                    axios.get('http://localhost:8000/api/v1/users/me/notes', getConfig())
                                        .then(res => setAllNotes(res.data))
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