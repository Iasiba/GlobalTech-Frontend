import React, { useEffect, useState } from 'react'
import './users.css'
import '../list/list.css'
import AxiosGetHook from '../../hooks/axiosGetHook'
//import List from '../list/xxx/list'
import Deploylist from '../list/deploylist'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
import { useDispatch, useSelector } from 'react-redux'
import { updateRefresh } from '../../store/slices/RefreshSlice'
const userList = ({ setmenuvisible, material, setMaterialList, setUserListVisible, task, setviewUserList }) => {
    const dispatch = useDispatch()
    const BackendAddress = useSelector(state => state.BackendAddress)
    const [AssingItem, setAssingItem] = useState(false)
    const [UserSelected, setUserSelected] = useState('')
    const [AllUsers, setAllUsers] = useState('')
    const [RefreshSelection, setRefreshSelection] = useState(false)
    function setSelectedToUser() {
        if (AllUsers) {
            for (let i = 0; i < AllUsers.length; i++) {
                AllUsers[i].selected = false;
            }
        }
    }
    useEffect(() => {
        axios.get(`http://${BackendAddress}/api/v1/users`, getConfig())
            .then(res => setAllUsers(res.data.users))
    }, [])
    useEffect(() => { setSelectedToUser() }, [AllUsers])
    useEffect(() => {
        for (let i = 0; i < AllUsers.length; i++) {
            if (AllUsers[i] === UserSelected) {
                AllUsers[i].selected = true
            } else {
                AllUsers[i].selected = false
            }
        }
        setRefreshSelection(!RefreshSelection)
    }, [UserSelected])

    function assignMaterial() {
        for (let i = 0; i < material.length; i++) {
            axios.put(`http://${BackendAddress}/api/v1/materials/${material[i].id}`, { "assigned": true, "userId": UserSelected.id }, getConfig())
                .then(() => console.log("Material asignado"))
        }
        setviewUserList(false)
        setRefreshSelection(!RefreshSelection)
        setMaterialList([])
        dispatch(updateRefresh())
    }
    return (
        <div className='itemLists  itemListSecondary'>
            {
                material
                &&
                <div className='TittleMaterialSelected'>
                    <div>Material Selecionado</div>
                    {material.map(material => <div className='MaterialSelected' key={material.id}>{material.name}</div>)}
                </div>
            }
            {
                task
                &&
                <div className='TittleMaterialSelected'>
                    <div>Tarea Selecionada</div>
                    <div>{task.description + " en " + task.room.name + "-" + task.room.project.name}</div>
                </div>
            }
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
                                    <div className='items itemsWidth' onClick={() => { setUserSelected(user) }}>
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
                <button className='assign' onClick={() => { material && assignMaterial(), task && (setAssingItem(!AssingItem)/*, setUserListVisible(false)*/) }}>Asignar</button>
            </div>
        </div>
    )
}

export default userList