import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setItem } from '../../store/slices/ItemSlice'
import getConfig from '../../utils/getConfig'
import { setVisibleAccount } from './../../store/slices/NewsVisibleSlice'
import { updateRefresh } from '../../store/slices/RefreshSlice'
import { updateRefreshMenu } from '../../store/slices/RefreshMenuSlice'
const deployAccounts = ({ account }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const NewAccountVisible = useSelector(state => state.NewsVisible)[4]
    const [Visible, setVisible] = useState(false)
    const [MenuVisible, setMenuVisible] = useState(false)

    const RefreshMenu = useSelector(state => state.RefreshMenu)
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
        }, [RefreshMenu]
    )
    useEffect(
        () => { }, [RefreshMenu, Refresh]
    )
    return (
        <>
            <div className='deploy'>
                <div onClick={() => setVisible(!Visible)} className={`accountBody tableHover ${account.iscanceled && "canceled"} ${account.isfinished && "finished"}`}>
                    <aside>
                        <p>{account.software}</p>
                    </aside>
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
                        <p className='items materialItemsWidth' onClick={() => { dispatch(setItem(account)), setMenuVisible(!MenuVisible), navigate('/NewAccount') /*dispatch(setVisibleAccount(true))*/ }}>Editar</p>
                        <p className='items materialItemsWidth' onClick={() => ((
                            axios.delete(`http://192.168.0.253:8000/api/v1/accounts/${account.id}`, getConfig())
                                .then(dispatch(updateRefresh())),
                            setMenuVisible(!MenuVisible)),
                            dispatch(updateRefresh())
                        )}>Eliminar</p>
                    </div>
                }
            </div>
            {Visible && <div className='content'>
                {account.owner && <p><b>Propietario:</b> {account.owner}</p>}
                <p><b>Usuario:</b> {account.user}</p>
                <p><b>Contraseña:</b> {account.password}</p>
                <p><b>Direccion IP:</b> {account.directionIp}</p>
            </div>}
        </>
    )
}

export default deployAccounts