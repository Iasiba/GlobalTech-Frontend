import React, { useState } from 'react'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
const deploylist = ({ user, menuvisible, setmenuvisible, userlistvisible, setuserlistvisible, material, task }) => {
    function asign() {
        if (material) {
            material.userId = user.id
            axios.put(`http://localhost:8000/api/v1/materials/${material.id}`, material, getConfig())
        }
        if (task) {
            task.userId = user.id
            axios.put(`http://localhost:8000/api/v1/tasks/${task.id}`, task, getConfig())
        }
    }
    const [Selected, setSelected] = useState(false)
    return (
        <div className='items itemsWidth' onClick={() => { setSelected(!Selected), setmenuvisible(!menuvisible), setuserlistvisible(!userlistvisible), asign() }}>
            {user.firstName + " " + user.lastName}
            <div className='selectbackground'>
                {<div className={'select ' + `${Selected && 'selection'}`}></div>}
            </div>
        </div>
    )

}

export default deploylist