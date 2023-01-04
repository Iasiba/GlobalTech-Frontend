import React, { useState } from 'react'
import getConfig from '../../utils/getConfig'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import '../../App.css'
import './notes.css'
import { useSelector, useDispatch } from 'react-redux'
import { setItem } from '../../store/slices/ItemSlice'
import { setVisibleNote } from './../../store/slices/NewsVisibleSlice'
const newNote = () => {
    const dispatch = useDispatch()
    const Note = useSelector(state => state.Item)
    const NewNoteVisible = useSelector(state => state.NewsVisible)[8]
    const { handleSubmit, reset, register } = useForm()

    const navigate = useNavigate()

    const submit = data => {
        const URL = Note.id ? `http://localhost:8000/api/v1/notes/${Note.id}` : `http://localhost:8000/api/v1/notes`
        Note.id ?
            axios.put(URL, data, getConfig())
                .then(res => {
                    console.log(res, "Nota Actualizada")
                })
                .catch(err => console.log(err))
                .finally(() => dispatch(setItem(false)))
            :
            axios.post(URL, data, getConfig())
                .then(res => {
                    console.log(res, "Nota creada")
                })
                .catch(err => console.log(err))
        dispatch(setVisibleNote(!NewNoteVisible))//ocultar ventana de creacion y edicion de notas
    }
    return (
        <form onSubmit={handleSubmit(submit)} className='createCenter new' >
            <i class='bx bx-x-circle close' onClick={() => dispatch(setVisibleNote(!NewNoteVisible))}></i>
            <h2>{Note.id ? 'Editar Nota' : 'Nueva Nota'}</h2>
            <div className='createGrid'>
                <div>* Titulo:</div>
                <input type="text" required defaultValue={Note.id ? Note.tittle : 'Recordatorio'} placeholder='Titulo' {...register('tittle')} />
            </div>
            <div className='createGrid'>
                <div>* Nota:</div>
                <input type="text" required defaultValue={Note.id && Note.note} placeholder='Ej. Recoger material' {...register('note')} />
            </div>
            <br />
            <button>{Note.id ? 'Actualizar' : 'Crear'}</button>
        </form>
    )
}

export default newNote