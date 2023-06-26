import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setItem } from '../../store/slices/ItemSlice'
import getConfig from '../../utils/getConfig'
import Materials from '../materials/materials'
import { setVisibleInventary } from './../../store/slices/NewsVisibleSlice'
import { updateRefreshMenu } from '../../store/slices/RefreshMenuSlice'
import { updateRefresh } from '../../store/slices/RefreshSlice'
import { useNavigate } from 'react-router-dom'
const deployInventary = ({ inventary }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const NewInventaryVisible = useSelector(state => state.NewsVisible)[5]
    const [Visible, setVisible] = useState(false)
    const [MenuVisible, setMenuVisible] = useState(false)

    const [Click, setClick] = useState(false)
    const RefreshMenu = useSelector(state => state.RefreshMenu)
    useEffect(
        () => {
            if (Click) {
                setMenuVisible(!MenuVisible),
                    setClick(false)
            } else {
                setMenuVisible(false)
            }
        }, [RefreshMenu]
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
                            dispatch(updateRefreshMenu()),
                            setClick(true)
                        )
                    }
                ><p>...</p></aside>
                {
                    MenuVisible
                    &&
                    <div className='itemList itemListPrimary '>
                        <p className='items materialItemsWidth' onClick={() => { dispatch(setItem(inventary)), navigate('/NewInventary')/*, dispatch(setVisibleInventary(!NewInventaryVisible)), setMenuVisible(!MenuVisible) */ }}>Editar</p>
                        {!inventary.materials.length && <p className='items materialItemsWidth' onClick={() => ((
                            axios.delete(`http://192.168.0.253:8000/api/v1/inventories/${inventary.id}`, getConfig())
                                .then(dispatch(updateRefresh())),
                            setMenuVisible(!MenuVisible)))
                        }>Eliminar</p>}
                    </div>
                }
            </div>
            {Visible && <div className='content'>
                <Materials
                    materials={inventary.materials}
                />
            </div>}
        </>
    )
}

export default deployInventary