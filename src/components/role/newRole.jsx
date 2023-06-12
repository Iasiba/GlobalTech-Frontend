import React, { useState } from 'react'
import getConfig from '../../utils/getConfig'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import '../../App.css'
import './role.css'
const newRole = () => {
    const { handleSubmit, reset, register } = useForm()

    const navigate = useNavigate()

    const submit = data => {
        const URL = `http://localhost:8000/api/v1/roles`
        axios.post(URL, data, getConfig())
            .then(res => {
                console.log(res, "Rol creado")
            })
            .catch(err => console.log(err))
        /*reset({
            email: '',
            password: ''
        })*/
    }
    return (
        <form onSubmit={handleSubmit(submit)} className='createCenter' >
            <h2>Nuevo Rol</h2>
            <div className='createGrid'>
                <label className='necessary'>Nombre:</label>
                <input
                    type="text"
                    autoComplete='off'
                    placeholder='Nombre de Rol'
                    {...register('name')}
                />
            </div>
            <br />
            <button>Crear</button>
        </form>
    )
}

export default newRole