import React, { useState } from 'react'
import getConfig from '../../utils/getConfig'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import '../../App.css'
import './projects.css'
const newProject = () => {
    

    const { handleSubmit, reset, register } = useForm()

    const navigate = useNavigate()

    const submit = data => {
        //data.directionIp='0.0.0.0'
        /*const newData={
            "directionIp":"0.0.0.0",
            "owner":"li6uki7uk8ikkkkkkkkkkkkkk587x6ynyhrnrdy5",
            "password":"root",
            "projectId":"12a1166e-6945-45b6-85ef-aca1134e6776",
            "projectName":"yyy",
            "software":"gndtnthn",
            "user":". ñ  "
        }*/
        const URL =  `http://localhost:8000/api/v1/projects`
        axios.post(URL, data, getConfig())
            .then(res => {
                console.log(res, "Proyecto creado")
            })
            .catch(err => console.log(err))
        /*reset({
            email: '',
            password: ''
        })*/
    }
    return (
        <form onSubmit={handleSubmit(submit)} className='createCenter' >
            <h2>Nuevo Projecto</h2>
            <div className='createGrid'>
                <p>Nombre:</p>
                <input type="text" placeholder='Ej. Vasconcelos' {...register('name')} />
            </div>
            <div className='createGrid'>
                <p>Direccion:</p>
                <input type="text" placeholder='Ej. calle matamorros' {...register('address')} />
            </div>
            <div className='createGrid'>
                <p>Plano:</p>
                <input type="text" placeholder='Link' {...register('plane')} />
            </div>
            <div className='createGrid'>
                <p>Coordenadas:</p>
                <input type="text" placeholder='Ej. 25.653315,-100.382917' {...register('coordinates')} />
            </div>
            <div className='createGrid'>
                <div>Referencias:</div>
                <input type="text" placeholder='Ej. frente a un parque' {...register('reference')} />
            </div>
            <div className='createGrid'>
                <div>Ciudad:</div>
                <input type="text" placeholder='Ej. Monterrey' {...register('city')} />
            </div>
            <div className='createGrid'>
                <div>Estado:</div>
                <input type="text" placeholder='Ej. Nuevo Leon' {...register('state')} />
            </div>
            <div className='createGrid'>
                <div>Pais:</div>
                <input type="country" placeholder='Ej. Mexico' {...register('country')} />
            </div>

            <br />
            <button>Crear</button>
        </form>
    )
}

export default newProject