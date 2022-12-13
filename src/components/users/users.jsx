import React from 'react'
import './users.css'
import DeployUser from './deployUser'
import { useState } from 'react'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
import { useEffect } from 'react'
const users = () => {
  const [AllUsers, setAllUsers] = useState('')
  useEffect(() => searchUsers(), [])

  function searchUsers() {
    axios.get('http://localhost:8000/api/v1/users', getConfig())
      .then(res => setAllUsers(res.data.users))
  }
  return (
    <div>
      <div className="userHeader tableHeader">
        <p>Nombre</p>
        <p>Tarea Asignada</p>
      </div>
      {AllUsers && AllUsers?.map(user => {
        return (
          <DeployUser
            key={user.id}
            searchUsers={searchUsers}
            user={user}
          />
        )
      }
      )}
    </div>
  )
}

export default users