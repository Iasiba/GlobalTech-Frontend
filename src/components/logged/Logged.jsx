import React, { useEffect, useState } from 'react'
import Login from './Login'

const Logged = () => {
    
  const [token, setToken] = useState('')

  const changedToken = localStorage.getItem('token')

  useEffect(() => {

    setToken(changedToken)
  }, [changedToken])
  return (
    <div className="Logged">
      {
        token ?
          <div className='Log'>
            <i className='bx bxs-user-check'></i>
            <h2>User Logged</h2>
          </div>
        :
          <Login />
      }
    </div>
  )
}

export default Logged