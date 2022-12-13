import React, { useState } from 'react'
import getConfig from '../../utils/getConfig'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import '../../App.css'
import './projects.css'
import { setItem } from '../../store/slices/ItemSlice'
import { useDispatch, useSelector } from 'react-redux'

const newProject = () => {

    const Project = useSelector(state => state.Item)
    const { handleSubmit, reset, register } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submit = data => {
        Project.id ?
            axios.put(`http://localhost:8000/api/v1/projects/${Project.id}`, data, getConfig())
                .then(res => {
                    console.log(res, "Proyecto Actualizado")
                })
                .catch(err => console.log(err))
                .finally(
                    dispatch(setItem(false)),
                    navigate('/projects')
                )
            :
            axios.post(`http://localhost:8000/api/v1/projects`, data, getConfig())
                .then(res => {
                    console.log(res, "Proyecto creado")
                })
                .catch(err => console.log(err))
                .finally(
                    navigate('/projects')
                )
    }
    return (
        <form onSubmit={handleSubmit(submit)} className='createCenter' >
            <h2>{Project.id ? 'Editar Proyecto' : 'Nuevo Proyecto'}</h2>
            <div className='createGrid'>
                <p>Nombre:</p>
                <input type="text" defaultValue={Project.id && Project.name} placeholder='Ej. Vasconcelos' {...register('name')} />
            </div>
            <div className='createGrid'>
                <p>Direccion:</p>
                <input type="text" defaultValue={Project.id && Project.address} placeholder='Ej. calle matamorros' {...register('address')} />
            </div>
            <div className='createGrid'>
                <p>Plano:</p>
                <input type="text" defaultValue={Project.id && Project.plane} placeholder='Link' {...register('plane')} />
            </div>
            <div className='createGrid'>
                <p>Coordenadas:</p>
                <input type="text" defaultValue={Project.id && Project.coordinates} placeholder='Ej. 25.653315,-100.382917' {...register('coordinates')} />
            </div>
            <div className='createGrid'>
                <div>Referencias:</div>
                <input type="text" defaultValue={Project.id && Project.reference} placeholder='Ej. frente a un parque' {...register('reference')} />
            </div>
            <div className='createGrid'>
                <div>Ciudad:</div>
                <input type="text" defaultValue={Project.id && Project.city} placeholder='Ej. Monterrey' {...register('city')} />
            </div>
            <div className='createGrid'>
                <div>Estado:</div>
                <input type="text" defaultValue={Project.id && Project.state} placeholder='Ej. Nuevo Leon' {...register('state')} />
            </div>
            <div className='createGrid'>
                <div>Pais:</div>
                <input type="country" defaultValue={Project.id && Project.country} placeholder='Ej. Mexico' {...register('country')} />
            </div>
            <br />
            <button>{Project.id ? 'Actualizar' : 'Crear'}</button>
        </form>
    )
}

export default newProject