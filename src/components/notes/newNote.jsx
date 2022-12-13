import React, { useState } from 'react'
import getConfig from '../../utils/getConfig'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import '../../App.css'
import './notes.css'
import { useSelector, useDispatch } from 'react-redux'
import { setItem } from '../../store/slices/ItemSlice'
const newNote = () => {
    const dispatch = useDispatch()
    const Note = useSelector(state => state.Item)
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
                .finally(() => dispatch(setItem(false)), navigate('/myhome'))
            :
            axios.post(URL, data, getConfig())
                .then(res => {
                    console.log(res, "Nota creada")
                })
                .catch(err => console.log(err))
                .finally(() => navigate('/myhome'))

        /*reset({
            email: '',
            password: ''
        })*/
    }
    return (
        <form onSubmit={handleSubmit(submit)} className='createCenter' >
            <h2>{Note.id ? 'Editar Nota' : 'Nueva Nota'}</h2>
            <div className='createGrid'>
                <p>Titulo:</p>
                <input type="text" defaultValue={Note.id ? Note.tittle : 'Titulo'} placeholder='Titulo' {...register('tittle')} />
            </div>
            <div className='createGrid'>
                <p>Nota:</p>
                <input type="text" defaultValue={Note.id ? Note.note : 'Ej. Recoger material'} placeholder='Ej. Recoger material' {...register('note')} />
            </div>
            <br />
            <button>{Note.id ? 'Actualizar' : 'Crear'}</button>
        </form>
    )
}

export default newNote