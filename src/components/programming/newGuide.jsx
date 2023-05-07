import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import './programming.css'
import AxiosGetHook from '../../hooks/axiosGetHook'
import '../../App.css'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setItem } from '../../store/slices/ItemSlice'
import { setVisibleGuide } from '../../store/slices/NewsVisibleSlice'
import { updateRefresh } from '../../store/slices/RefreshSlice'
const newGuide = () => {
    const dispatch = useDispatch()
    const Guide = useSelector(state => state.Item)
    console.log(Guide, "la guia")
    const NewGuideVisible = useSelector(state => state.NewsVisible)[10]
    const [File, setFile] = useState('')

    const { handleSubmit, reset, register } = useForm()
    const navigate = useNavigate()

    const tiempoTranscurrido = Date.now()
    const hoy = new Date(tiempoTranscurrido)
    const today = hoy.toLocaleDateString()
    const date = today.split('/')
    const year = date[2]
    const month = date[1]
    const day = date[0]

    const submit = data => {
        const Data = new FormData()
        const key = data.guide ? 'guide' : data.datasheet ? 'datasheet' : data.tutorial ? 'tutorial' : ''
        Data.append(key, File)

        data.date = year + '/' + month + '/' + day//Today // "2020/06/12"//
        data.name = data.name + year + month + day
        console.log(data, "dfdsgfgfgs")
        const URL = `http://192.168.0.253:8000/api/v1/programmings`
        axios.post(URL, data, getConfig())
            .then(res => {
                console.log(res)
                axios.post(`http://192.168.0.253:8000/api/v1/programmings/${res.data.programmingGuide.id}/${key}`, Data, getConfig())
                    .then(res => { console.log(res) })
            })
            .catch(err => console.log(err))
            .finally(dispatch(setItem(false)))
        dispatch(setVisibleGuide(!NewGuideVisible))
        dispatch(updateRefresh())
    }

    return (
        <form onSubmit={handleSubmit(submit)} className='createCenter new' >
            <i className='bx bx-x-circle close' onClick={() => (dispatch(setVisibleGuide(!NewGuideVisible)), dispatch(setItem(false)))}></i>
            <h2>Nueva Guia</h2>
            <div className='createGrid'>
                <div>* Sistema, Equipo o Software:</div>
                <input type="text" required
                    placeholder='Sistema' defaultValue={Guide.id && Guide.name}
                    {...register('name')}
                />
            </div>

            <div className='checks'>
                <aside className='check'>
                    <input type="checkbox" defaultChecked={false}{...register('tutorial')} />
                    <div>Tutorial</div>
                </aside>
                <aside className='check'>
                    <input type="checkbox" defaultChecked={false}{...register('datasheet')} />
                    <div>Manual</div>
                </aside>
                <aside className='check'>
                    <input type="checkbox" defaultChecked={false}{...register('guide')} />
                    <div>Guia</div>
                </aside>
            </div>

            <div className='createGrid'>
                <div>Respaldo:</div>
                <input type="file"  required onChange={event => setFile(event.target.files[0])} />
            </div>
            <br />
            <button>{Guide.id ? 'Actualizar' : 'Crear'}</button>
        </form>
    )
}

export default newGuide