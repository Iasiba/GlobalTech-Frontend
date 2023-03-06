import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setItem } from '../../store/slices/ItemSlice'
import getConfig from '../../utils/getConfig'
import { setVisibleAccount } from './../../store/slices/NewsVisibleSlice'
import { setRefresh } from '../../store/slices/RefreshSlice'
const deployAccounts = ({ account, searchAccounts }) => {
    const dispatch = useDispatch()
    const NewAccountVisible = useSelector(state => state.NewsVisible)[4]
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
                <div onClick={() => setVisible(!Visible)} className={`accountBody tableHover ${account.iscanceled && "canceled"} ${account.isfinished && "finished"}`}>
                    <aside>
                        <p>{account.software}</p>
                    </aside>
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
                        <p className='items materialItemsWidth' onClick={() => { dispatch(setItem(account)), setMenuVisible(!MenuVisible), dispatch(setVisibleAccount(true)) }}>Editar</p>
                        <p className='items materialItemsWidth' onClick={() => ((
                            axios.delete(`http://localhost:8000/api/v1/accounts/${account.id}`, getConfig())
                                .then(searchAccounts()),
                            setMenuVisible(!MenuVisible)))
                        }>Eliminar</p>
                    </div>
                }
            </div>
            {Visible && <div className='content'>
                <p>Propietario: {account.owner}</p>
                <p>Usuario: {account.user}</p>
                <p>Contraseña: {account.password}</p>
                <p>Direccion IP: {account.directionIp}</p>
            </div>}
        </>
    )
}

export default deployAccounts