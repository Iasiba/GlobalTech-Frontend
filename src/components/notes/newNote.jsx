import React, { useState } from 'react'
import getConfig from '../../utils/getConfig'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import '../../App.css'
import './notes.css'
const newNote = () => {
    const { handleSubmit, reset, register } = useForm()

    const navigate = useNavigate()

    const submit = data => {
        const URL =  `http://localhost:8000/api/v1/notes`
        axios.post(URL, data, getConfig())
            .then(res => {
                console.log(res, "Nota creada")
            })
            .catch(err => console.log(err))
        /*reset({
            email: '',
            password: ''
        })*/
    }
    return (
        <form onSubmit={handleSubmit(submit)} className='createCenter' >
            <h2>Nueva Nota</h2>
            <div className='createGrid'>
                <p>Titulo:</p>
                <input type="text" placeholder='Titulo' {...register('tittle')} />
            </div>
            <div className='createGrid'>
                <p>Nota:</p>
                <input type="text" placeholder='Ej. Recoger material' {...register('note')} />
            </div>
            <br />
            <button>Crear</button>
        </form>
    )
}

export default newNote