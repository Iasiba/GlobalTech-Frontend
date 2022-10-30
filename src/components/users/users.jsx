import React from 'react'
import './users.css'
import DeployUser from './deployUser'
import AxiosGetHook from '../../hooks/axiosGetHook'
const users = () => {
  const Users = AxiosGetHook('http://localhost:8000/api/v1/users')
  const AllUsers = Users.data.data?.users
  console.log(AllUsers)
  return (
    <div>
      <div className="userHeader tableHeader">
        <p>Nombre</p>
        <p>Tarea Asignada</p>
      </div>
      {AllUsers && AllUsers?.map(user => {
        return (<DeployUser key={user.id} user={user} />)
      }
      )}
    </div>
  )
}

export default users