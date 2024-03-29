import React, { useEffect, useState } from 'react'
import getConfig from '../../utils/getConfig'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import '../../App.css'
import './notes.css'
import { useSelector, useDispatch } from 'react-redux'
import { setItem } from '../../store/slices/ItemSlice'
import { setVisibleNote } from './../../store/slices/NewsVisibleSlice'
import { updateRefresh } from '../../store/slices/RefreshSlice'
import { setArea } from '../../store/slices/AreaSlice'
const newNote = () => {
    const dispatch = useDispatch()
    const BackendAddress = useSelector(state => state.BackendAddress)
    const Note = useSelector(state => state.Item)
    const NewNoteVisible = useSelector(state => state.NewsVisible)[8]
    const { handleSubmit, reset, register } = useForm()

    const navigate = useNavigate()
    useEffect(() => {
        dispatch(setArea(Note.id ? 'Editar Nota' : 'Nueva Nota'))
    }, [])

    const submit = data => {
        const URL = Note.id ?
            `http://${BackendAddress}/api/v1/notes/${Note.id}`
            :
            `http://${BackendAddress}/api/v1/notes`
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
        dispatch(updateRefresh())
        navigate(-1)
    }
    return (
        <form onSubmit={handleSubmit(submit)} className='createCenter new' >
            <i className='bx bx-x-circle close' onClick={() => (dispatch(setVisibleNote(!NewNoteVisible)), dispatch(setItem(false)), navigate(-1))}></i>

            <div className='createGrid'>
                <label className='necessary'>Titulo:</label>
                <input
                    type="text"
                    autoComplete='off'
                    required defaultValue={Note.id ? Note.tittle : 'Recordatorio'}
                    placeholder='Titulo'
                    {...register('tittle')}
                />
            </div>
            <div className='createGrid'>
                <label className='necessary'>Nota:</label>
                <textarea
                    autoComplete='off'
                    required
                    defaultValue={Note.id && Note.note}
                    placeholder='Ej. Recoger material'
                    {...register('note')}
                    maxLength="255"
                />
            </div>
            <br />
            <button>{Note.id ? 'Actualizar' : 'Crear'}</button>
        </form>
    )
}

export default newNote