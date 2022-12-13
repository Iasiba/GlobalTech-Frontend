import React from 'react'
import "./list.css"
import Deploylist from './deploylist'
const list = ({ list, menuvisible, setmenuvisible, userlistvisible, setuserlistvisible, material,task }) => {
    return (
        list?.map(user => <Deploylist
            material={material}
            user={user}
            key={user.id}
            menuvisible={menuvisible} setmenuvisible={setmenuvisible}
            userlistvisible={userlistvisible} setuserlistvisible={setuserlistvisible}
            task={task}
        />)
    )
}
export default list