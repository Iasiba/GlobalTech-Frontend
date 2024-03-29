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
import { setArea } from '../../store/slices/AreaSlice'
const newGuide = () => {
    const dispatch = useDispatch()
    const BackendAddress = useSelector(state => state.BackendAddress)
    const Guide = useSelector(state => state.Item)
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
    useEffect(() => { dispatch(setArea(Guide.id ? 'Editar Guia' : 'Nueva Guia')) }, [])

    const submit = data => {
        const Data = new FormData()
        const key = data.guides ? 'guide' : data.datasheets ? 'datasheet' : data.tutorials ? 'tutorial' : ''
        Data.append(key, File)

        data.date = year + '/' + month + '/' + day//Today // "2020/06/12"//
        data.name = data.name + year + month + day
        console.log("dfdsgfgfgs", Guide)
        const URL = `http://${BackendAddress}/api/v1/programmings`
        Guide.id ?
            axios.post(`http://${BackendAddress}/api/v1/programmings/${Guide.id}/${key}`, Data, getConfig())
                .then(res => { console.log(res) })
                .finally(dispatch(setItem(false)))
            :
            axios.post(URL, data, getConfig())
                .then(res => {
                    console.log(res)
                    axios.post(`http://${BackendAddress}/api/v1/programmings/${res.data.programmingGuide.id}/${key}`, Data, getConfig())
                        .then(res => { console.log(res) })
                })
                .catch(err => console.log(err))
                .finally(dispatch(setItem(false)))

        dispatch(setVisibleGuide(!NewGuideVisible))
        dispatch(updateRefresh())
        navigate(-1)
    }

    return (
        <form onSubmit={handleSubmit(submit)} className='createCenter new' >
            <i className='bx bx-x-circle close' onClick={() => (dispatch(setVisibleGuide(!NewGuideVisible)), dispatch(setItem(false)), navigate(-1))}></i>

            <div className='createGrid'>
                <label className='necessary'>Sistema, Equipo o Software:</label>
                <input
                    type="text"
                    autoComplete='off'
                    required
                    placeholder='Sistema'
                    defaultValue={Guide.id && Guide.name}
                    {...register('name')}
                />
            </div>

            <div className='checks'>
                <aside className='check'>
                    <input
                        type="checkbox"
                        defaultChecked={false}
                        {...register('tutorials')}
                    />
                    <label>Tutorial</label>
                </aside>
                <aside className='check'>
                    <input
                        type="checkbox"
                        defaultChecked={false}
                        {...register('datasheets')}
                    />
                    <label>Manual</label>
                </aside>
                <aside className='check'>
                    <input
                        type="checkbox"
                        defaultChecked={false}
                        {...register('guides')}
                    />
                    <label>Guia</label>
                </aside>
            </div>

            <div className='createGrid'>
                <label className='necessary'>Respaldo:</label>
                <input
                    type="file"
                    required
                    onChange={event => setFile(event.target.files[0])}
                />
            </div>
            <br />
            <button>{Guide.id ? 'Actualizar' : 'Crear'}</button>
        </form>
    )
}

export default newGuide