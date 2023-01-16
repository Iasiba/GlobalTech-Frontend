import React, { useState } from 'react'
import './users.css'
import '../list/list.css'
import AxiosGetHook from '../../hooks/axiosGetHook'
//import List from '../list/xxx/list'
import Deploylist from '../list/deploylist'
const userList = ({ setmenuvisible, setuserlistvisible, material, task }) => {
    const [AssingItem, setAssingItem] = useState(false)
    const Users = AxiosGetHook('http://localhost:8000/api/v1/users')
    const AllUsers = Users.data.data?.users
    return (
        <div className='itemList  itemListSecondary'>

            {material && <div className='materialAvailable'>{material.name + ' Disponibles:'}<div>{material.amount}</div></div>}
            {
                AllUsers && AllUsers.map(user =>
                    <Deploylist
                        material={material}
                        user={user}
                        key={user.id}
                        setmenuvisible={setmenuvisible}
                        setuserlistvisible={setuserlistvisible}
                        task={task}
                        AssingItem={AssingItem}
                    />
                )
                /* <List 
                 list={AllUsers}
                 material={material}
                 setmenuvisible={setmenuvisible} 
                 setuserlistvisible={setuserlistvisible} 
                 task={task}
                 />*/
            }
            <div>
                <button className='Cancel' onClick={() => setuserlistvisible(false)}>Cancelar</button>
                <button className='assign' onClick={() => { setAssingItem(true) }}>Asignar</button>
            </div>
        </div>
    )
}

export default userList