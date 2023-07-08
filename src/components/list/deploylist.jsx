import React, { useEffect, useState } from 'react'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
import { useDispatch, useSelector } from 'react-redux'
import { updateRefresh } from '../../store/slices/RefreshSlice'
const deploylist = ({ user, setUserListVisible, material, task, AssingItem, UserSelected, setUserSelected }) => {
    const BackendAddress = useSelector(state => state.BackendAddress)
    const dispatch = useDispatch()
    const [Selected, setSelected] = useState(false)
    //const [Amount, setAmount] = useState(0)
    //console.log(task, material)
    if (UserSelected === user) {
        setSelected(true)
    }
    function asign() {

        if (Selected /*|| Amount > 0*/) {
            /*if (material) {
                material.userId = user.id
                axios.put(`http://192.168.0.253:8000/api/v1/materials/${material.id}`, material, getConfig())
            }*/
            if (task) {
                task.userId = user.id
                task.assigned = true
                axios.put(`http://${BackendAddress}/api/v1/tasks/${task.id}`, task, getConfig())
                    .then(res => {
                        console.log(res, "Tarea Actualizada")
                    })
                axios.post(`http://${BackendAddress}/api/v1/taskList`, { "userId": `${user.id}`, "taskId": `${task.id}` }, getConfig())
                    .then(res => console.log(res.data))
            }
            setUserListVisible(false)
        }
        dispatch(updateRefresh())
    }
    useEffect(() => { asign()  /*if (AssingItem) {  } */ }, [AssingItem])

    return (
        <section className='assignItems'>
            <div className='items itemsWidth' onClick={() => { task && setSelected(!Selected), material && setUserSelected(user)/*, setmenuvisible(false), setuserlistvisible(false), asign() */ }}>
                {user.firstName + " " + user.lastName}
                {
                    task
                    &&
                    <div className='selectListBackground'>
                        <div className={'select ' + `${Selected && 'selection'}`}></div>
                    </div>
                }
                {
                    material
                    &&
                    <div className='selectListBackground'>
                        <div className={'select ' + `${Selected && 'selection'}`}></div>
                    </div>
                }
            </div>
            {
                /*
                    material
                    &&
                    <div className='amount'>
                        <p onClick={() => { if (Amount > 0) { setAmount(Amount - 1) } }}>-</p>
                        <div>{Amount}</div>
                        <p onClick={() => { if (Amount < material.amount) { setAmount(Amount + 1) } }}>+</p>
                    </div>
                */
            }
        </section>
    )
}

export default deploylist