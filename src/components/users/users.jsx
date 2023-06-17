import React from 'react'
import './users.css'
import DeployUser from './deployUser'
import { useState } from 'react'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setArea } from '../../store/slices/AreaSlice'
const users = () => {
  const dispatch = useDispatch()
  const Refresh = useSelector(state => state.Refresh)
  const [AllUsers, setAllUsers] = useState('')
  useEffect(() => searchUsers(), [Refresh])

  function searchUsers() {
    dispatch(setArea("Usuarios"))
    axios.get('http://192.168.0.253:8000/api/v1/users', getConfig())
      .then(res => setAllUsers(res.data.users))
  }
  return (
    <div className='contentDeploy'>
      <div className="userHeader tableHeader">
        <p>Nombre</p>
        <p>Tarea Asignada</p>
      </div>
      {AllUsers && AllUsers?.map(user => {
        return (
          <DeployUser
            key={user.id}
            user={user}
          />
        )
      }
      )}
    </div>
  )
}

export default users