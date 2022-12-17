import React from 'react'
import { useState } from 'react'
import '../../App.css'
import './notes.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setItem } from '../../store/slices/ItemSlice'
import getConfig from '../../utils/getConfig'
const deployNotes = ({ note, setAllNotes }) => {
    const dispatch = useDispatch()
    const [MenuVisible, setMenuVisible] = useState(false)
    return (
        <>
            <div className='deploy'>
                <div className={`table noteBody`}>
                    <p>{note.tittle}</p>
                    <p>{note.note}</p>
                </div>
                <aside className='threePoints' onClick={() => setMenuVisible(!MenuVisible)} ><p>...</p></aside>
                {
                    MenuVisible
                    &&
                    <div className='itemList itemListPrimary '>
                        <p className='items materialItemsWidth' onClick={() => dispatch(setItem(note))}><Link to={'/newNote'}  >Editar</Link></p>
                        <p className='items materialItemsWidth' onClick={() => ((
                            axios.delete(`http://localhost:8000/api/v1/notes/${note.id}`, getConfig())
                                .then(
                                    axios.get('http://localhost:8000/api/v1/users/me/notes', getConfig())
                                        .then(res =>setAllNotes(res.data))
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