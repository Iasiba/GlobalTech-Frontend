import React from 'react'
import './users.css'
import AxiosGetHook from '../../hooks/axiosGetHook'
import List from '../list/list'
const userList = ({menuvisible, setmenuvisible, userlistvisible, setuserlistvisible, material,task}) => {
    const Users = AxiosGetHook('http://localhost:8000/api/v1/users')
    const AllUsers = Users.data.data?.users
    return (
        <div className='itemList  itemListSecondary'>
            <List 
            list={AllUsers}
            material={material}
            menuvisible={menuvisible} setmenuvisible={setmenuvisible} 
            userlistvisible={userlistvisible} setuserlistvisible={setuserlistvisible} 
            task={task}
            />
        </div>
    )
}

export default userList