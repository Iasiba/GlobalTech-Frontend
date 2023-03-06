import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setItem } from '../../store/slices/ItemSlice'
import getConfig from '../../utils/getConfig'
import Materials from '../materials/materials'
import { setVisibleInventary } from './../../store/slices/NewsVisibleSlice'
import { setRefresh } from '../../store/slices/RefreshSlice'
const deployInventary = ({ inventary, searchInventary }) => {
    const dispatch = useDispatch()
    const NewInventaryVisible = useSelector(state => state.NewsVisible)[5]
    const [Visible, setVisible] = useState(false)
    const [MenuVisible, setMenuVisible] = useState(false)

    const Refresh = useSelector(state => state.Refresh)
    const [Click, setClick] = useState(false)
    useEffect(
        () => {
            if (Click) {
                setMenuVisible(!MenuVisible),
                    setClick(false)
            } else {
                setMenuVisible(false)
            }
        }, [Refresh]
    )
    return (
        <>
            <div className='deploy'>
                <div onClick={() => setVisible(!Visible)} className={`inventoryBody tableHover ${inventary.iscanceled && "canceled"} ${inventary.isfinished && "finished"}`}>
                    <p>{inventary.name}</p>
                </div>
                <aside className='threePoints'
                    onClick={
                        () => (
                            dispatch(setRefresh(!Refresh)),
                            setClick(true)
                        )
                    }
                ><p>...</p></aside>
                {
                    MenuVisible
                    &&
                    <div className='itemList itemListPrimary '>
                        <p className='items materialItemsWidth' onClick={() => { dispatch(setItem(inventary)), dispatch(setVisibleInventary(!NewInventaryVisible)), setMenuVisible(!MenuVisible) }}>Editar</p>
                        <p className='items materialItemsWidth' onClick={() => ((
                            axios.delete(`http://localhost:8000/api/v1/inventories/${inventary.id}`, getConfig())
                                .then(searchInventary()),
                            setMenuVisible(!MenuVisible)))
                        }>Eliminar</p>
                    </div>
                }
            </div>
            {Visible && <div className='content'>
                <Materials materials={inventary.materials} />
            </div>}
        </>
    )
}

export default deployInventary