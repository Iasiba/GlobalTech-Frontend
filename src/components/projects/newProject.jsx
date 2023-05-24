import React, { useState } from 'react'
import getConfig from '../../utils/getConfig'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import '../../App.css'
import './projects.css'
import { setItem } from '../../store/slices/ItemSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setVisibleProject } from './../../store/slices/NewsVisibleSlice'
import { updateRefresh } from '../../store/slices/RefreshSlice'
const newProject = () => {
    const NewProjectVisible = useSelector(state => state.NewsVisible)[0]
    const Project = useSelector(state => state.Item)
    const { handleSubmit, reset, register } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submit = data => {
        Project.id ?
            axios.put(`http://192.168.0.253:8000/api/v1/projects/${Project.id}`, data, getConfig())
                .then(res => {
                    console.log(res, "Proyecto Actualizado")
                })
                .catch(err => console.log(err))
                .finally(
                    dispatch(setItem(false)),
                )
            :
            axios.post(`http://192.168.0.253:8000/api/v1/projects`, data, getConfig())
                .then(res => {
                    console.log(res, "Proyecto creado")
                })
                .catch(err => console.log(err))
        dispatch(setVisibleProject(!NewProjectVisible))//ocultar ventana de creacion de projectos
        dispatch(updateRefresh())
        navigate(-1)
    }
    return (
        <form onSubmit={handleSubmit(submit)} className='createCenter newProject new' >
            <i className='bx bx-x-circle close' onClick={() => (dispatch(setVisibleProject(!NewProjectVisible)), dispatch(setItem(false)), navigate(-1))}></i>
            <h2>{Project.id ? 'Editar Proyecto' : 'Nuevo Proyecto'}</h2>
            <div className='createGrid'>
                <div>* Nombre:</div>
                <input type="text" required defaultValue={Project.id && Project.name} placeholder='Ej. Global' {...register('name')} />
            </div>
            <div className='createGrid'>
                <div>* Direccion:</div>
                <input type="text" required defaultValue={Project.id && Project.address} placeholder='Ej. calle matamorros # 503' {...register('address')} />
            </div>
            <div className='createGrid'>
                <div>Plano:</div>
                <input type="text" defaultValue={Project.id && Project.plane} placeholder='Link' {...register('plane')} />
            </div>
            <div className='createGrid'>
                <div>* Coordenadas:</div>
                <input type="text" required defaultValue={Project.id && Project.coordinates} placeholder='Ej. 25.653315,-100.382917' {...register('coordinates')} />
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