import React, { useEffect, useState } from 'react'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
const deploylist = ({ user, setmenuvisible, setUserListVisible, material, task, AssingItem, UserSelected,setUserSelected}) => {
    const [Selected, setSelected] = useState(false)
    const [Amount, setAmount] = useState(0)
    console.log(task, material)
    if(UserSelected===user){
        setSelected(true)
    }
    function asign() {
        if (Selected || Amount > 0) {
            if (material) {
                material.userId = user.id
                axios.put(`http://localhost:8000/api/v1/materials/${material.id}`, material, getConfig())
            }
            if (task) {
                task.userId = user.id
                axios.put(`http://localhost:8000/api/v1/tasks/${task.id}`, task, getConfig())
            }
            setUserListVisible(false)
        }
    }
    useEffect(() => { if (AssingItem) { asign() } }, [AssingItem])

    return (
        <section className='assignItems'>
            <div className='items itemsWidth' onClick={() => { task&&setSelected(!Selected), material&&setUserSelected(user)/*, setmenuvisible(false), setuserlistvisible(false), asign() */ }}>
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