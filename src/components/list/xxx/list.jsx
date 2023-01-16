import React from 'react'
import "../list.css"
import Deploylist from '../deploylist'
const list = ({ list, setmenuvisible, setuserlistvisible, material, task }) => {
    return (
        list?.map(user =>
            <Deploylist
                material={material}
                user={user}
                key={user.id}
                setmenuvisible={setmenuvisible}
                setuserlistvisible={setuserlistvisible}
                task={task}
            />
        )
    )
}
export default list