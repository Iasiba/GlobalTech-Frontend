import React from 'react'
import { Link } from 'react-router-dom'
const SingUp = () => {
  return (
    <form action="" className='Login'>
      <h2>Sing Up</h2>
      <div>
        <label className='necessary'>Email</label>
        <input type="text" autoComplete='off'/>
      </div>
      <div>
        <div>First Name</div>
        <input type="text" autoComplete='off'/>
      </div>
      <div>
        <div>Last Name</div>
        <input type="text" autoComplete='off'/>
      </div>
      <div>
        <div>Password</div>
        <input type="text" autoComplete='off'/>
      </div>
      <div>
        <div>{"Phone (10 characters)"}</div>
        <input type="text" autoComplete='off'/>
      </div>
      <br />
      <button>Sing Up</button>
      <div>Already have an account?<Link to='/login'>.       Log in</Link> </div>
    </form>
  )
}

export default SingUp