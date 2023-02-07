import React, { useEffect, useState } from 'react'
import './users.css'
import '../list/list.css'
import AxiosGetHook from '../../hooks/axiosGetHook'
//import List from '../list/xxx/list'
import Deploylist from '../list/deploylist'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
const userList = ({ setmenuvisible, material, setUserListVisible, task, setviewUserList }) => {
    const [AssingItem, setAssingItem] = useState(false)
    const [UserSelected, setUserSelected] = useState('')
    const [AllUsers, setAllUsers] = useState('')
    const [Selected, setSelected] = useState(false)
    function setSelectedToUser() {
        if (AllUsers) {
            for (let i = 0; i < AllUsers.length; i++) {
                AllUsers[i].selected = false;
            }
        }
        console.log(AllUsers, material, task)
    }
    useEffect(() => {
        axios.get('http://localhost:8000/api/v1/users', getConfig())
            .then(res => setAllUsers(res.data.users))
    }, [])
    useEffect(() => { setSelectedToUser() }, [AllUsers])
    useEffect(() => { 
        for (let i = 0; i < AllUsers.length; i++) {
            if(AllUsers[i]===UserSelected){
                AllUsers[i].selected=true
            }else{
                AllUsers[i].selected=false
            }
        }

    }, [UserSelected])
    

    return (
        <div className='itemList  itemListSecondary'>
            {material && <div className='materialAvailable'>{material.name + ' Disponibles:'}<div>{material.amount}</div></div>}
            {
                AllUsers.length && AllUsers.map(
                    user => (
                        <div key={user.id} >
                            {
                                task
                                &&
                                <Deploylist
                                    material={material}
                                    user={user}
                                    setmenuvisible={setmenuvisible}
                                    setUserListVisible={setUserListVisible}
                                    task={task}
                                    AssingItem={AssingItem}
                                    UserSelected={UserSelected}
                                    setUserSelected={setUserSelected}
                                />
                            }
                            {
                                material
                                &&
                                <section className='assignItems'>
                                    <div className='items itemsWidth' onClick={() => {setUserSelected(user),setUserSelected(user)}}>
                                        {user.firstName + " " + user.lastName}
                                        {
                                            material
                                            &&
                                            <div className='selectListBackground'>
                                                <div className={'select ' + `${user.selected && 'selection'}`}></div>
                                            </div>
                                        }
                                    </div>
                                </section>
                            }
                        </div>
                    )
                )
                /*
                    <List
                list={AllUsers}
                material={material}
                setmenuvisible={setmenuvisible}
                setuserlistvisible={setuserlistvisible}
                task={task}
            />
            */
            }
            <div>
                <button className='Cancel' onClick={() => { task && setUserListVisible(false), material && setviewUserList(false) }}>Cancelar</button>
                <button className='assign' onClick={() => { setAssingItem(true) }}>Asignar</button>
            </div>
        </div>
    )
}

export default userList