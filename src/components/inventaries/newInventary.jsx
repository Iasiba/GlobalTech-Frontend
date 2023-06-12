import React, { useState } from 'react'
import getConfig from '../../utils/getConfig'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import '../../App.css'
import './inventaries.css'
import { useSelector } from 'react-redux'
import { setItem } from '../../store/slices/ItemSlice'
import { useDispatch } from 'react-redux'
import { setVisibleInventary } from './../../store/slices/NewsVisibleSlice'
import { updateRefresh } from '../../store/slices/RefreshSlice'
const newInventary = () => {
    const dispatch = useDispatch()
    const Inventary = useSelector(state => state.Item)
    const NewInventaryVisible = useSelector(state => state.NewsVisible)[5]

    const navigate = useNavigate()
    const { handleSubmit, reset, register } = useForm()

    const submit = data => {

        Inventary.id ?
            axios.put(`http://192.168.0.253:8000/api/v1/inventories/${Inventary.id}`, data, getConfig())
                .then(res => {
                    console.log(res, "Inventario creado")
                })
                .catch(err => console.log(err))
                .finally(
                    dispatch(setItem(false))
                )
            :
            axios.post(`http://192.168.0.253:8000/api/v1/inventories`, data, getConfig())
                .then(res => {
                    console.log(res, "Inventario creado")
                })
                .catch(err => console.log(err))
        dispatch(setVisibleInventary(!NewInventaryVisible))//ocultar ventana de creacion de inventarios
        dispatch(updateRefresh())
        navigate(-1)
    }
    return (
        <form onSubmit={handleSubmit(submit)} className='createCenter new' >
            <i className='bx bx-x-circle close' onClick={() => (/*dispatch(setVisibleInventary(!NewInventaryVisible)),*/dispatch(setItem(false)), navigate(-1))}></i>
            <h2>{Inventary.id ? 'Editar Inventario' : 'Nuevo Inventario'}</h2>
            <div className='createGrid'>
                <label className='necessary'>Nombre:</label>
                <input type="text" autoComplete='off' required defaultValue={Inventary.id && Inventary.name} placeholder='Ej. Herramientas' {...register('name')} />
            </div>
            <br />
            <button>{Inventary.id ? 'Actualizar' : 'Crear'}</button>
        </form>
    )
}

export default newInventary