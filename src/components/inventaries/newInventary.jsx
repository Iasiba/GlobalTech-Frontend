import React, { useState } from 'react'
import getConfig from '../../utils/getConfig'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import '../../App.css'
import './inventaries.css'
const newInventary = () => {
    const { handleSubmit, reset, register } = useForm()

    const navigate = useNavigate()

    const submit = data => {
        const URL =  `http://localhost:8000/api/v1/inventories`
        axios.post(URL, data, getConfig())
            .then(res => {
                console.log(res, "Inventario creado")
            })
            .catch(err => console.log(err))
        /*reset({
            email: '',
            password: ''
        })*/
    }
    return (
        <form onSubmit={handleSubmit(submit)} className='createCenter' >
            <h2>Nuevo Inventario</h2>
            <div className='createGrid'>
                <p>Nombre:</p>
                <input type="text" placeholder='Ej. Herramientas' {...register('name')} />
            </div>
            <br />
            <button>Crear</button>
        </form>
    )
}

export default newInventary