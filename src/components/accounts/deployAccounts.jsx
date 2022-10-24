import React from 'react'
import { useState } from 'react'
const deployAccounts = ({ account }) => {
    const [Visible, setVisible] = useState(false)
    return (
        <>
            <div onClick={() => setVisible(!Visible)} className={` tableHover ${account.iscanceled && "canceled"} ${account.isfinished && "finished"}`}>
                <aside>
                    <p>{account.software}</p>
                </aside>
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