import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setItem } from '../../store/slices/ItemSlice'
import getConfig from '../../utils/getConfig'
const deployAccounts = ({ account, searchAccounts }) => {
    const dispatch = useDispatch()
    const [Visible, setVisible] = useState(false)
    const [MenuVisible, setMenuVisible] = useState(false)
    return (
        <>
            <div className='deploy'>
                <div onClick={() => setVisible(!Visible)} className={`accountBody tableHover ${account.iscanceled && "canceled"} ${account.isfinished && "finished"}`}>
                    <aside>
                        <p>{account.software}</p>
                    </aside>
                </div>
                <aside className='threePoints' onClick={() => setMenuVisible(!MenuVisible)} ><p>...</p></aside>
                {
                    MenuVisible
                    &&
                    <div className='itemList itemListPrimary '>
                        <p className='items materialItemsWidth' onClick={() => dispatch(setItem(account))}><Link to={'/newAccount'}  >Editar</Link></p>
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