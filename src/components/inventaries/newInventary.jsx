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
const newInventary = () => {
    const dispatch = useDispatch()
    const Inventary = useSelector(state => state.Item)
    const { handleSubmit, reset, register } = useForm()
    const navigate = useNavigate()

    const submit = data => {

        Inventary.id ?
            axios.put(`http://localhost:8000/api/v1/inventories/${Inventary.id}`, data, getConfig())
                .then(res => {
                    console.log(res, "Inventario creado")
                })
                .catch(err => console.log(err))
                .finally(
                    dispatch(setItem(false)),
                    navigate('/inventaries')
                )
            :
            axios.post(`http://localhost:8000/api/v1/inventories`, data, getConfig())
                .then(res => {
                    console.log(res, "Inventario creado")
                })
                .catch(err => console.log(err))
                .finally(
                    navigate('/inventaries')
                )
    }
    return (
        <form onSubmit={handleSubmit(submit)} className='createCenter' >
            <h2>{Inventary.id ? 'Editar Inventario' : 'Nuevo Inventario'}</h2>
            <div className='createGrid'>
                <p>Nombre:</p>
                <input type="text" defaultValue={Inventary.id && Inventary.name} placeholder='Ej. Herramientas' {...register('name')} />
            </div>
            <br />
            <button>{Inventary.id ? 'Actualizar' : 'Crear'}</button>
        </form>
    )
}

export default newInventary