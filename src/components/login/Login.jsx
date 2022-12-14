import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import './login.css'
const Login = () => {
  const [isErrorLogin, setIsErrorLogin] = useState(false)
  const { handleSubmit, reset, register } = useForm()

  const navigate = useNavigate()

  const submit = data => {
    const URL = 'http://localhost:8000/api/v1/auth/login'
    axios.post(URL, data)
      .then(res => {
        console.log("intento de logueo exitoso",res.data.token, "intento de logueo exitoso")
        localStorage.setItem('token', res.data.token)
        navigate('/')
      })
      .catch(err => {
        localStorage.removeItem('token')
        setIsErrorLogin(true)
        setTimeout(() => {
          setIsErrorLogin(false)
        }, 5000)
      })
    reset({
      email: '',
      password: ''
    })

  }
  return (
    <form onSubmit={handleSubmit(submit)} className='login'>
      <h2>Login</h2>
      <div>
        <div>Email:</div>
        <input type="text"  {...register('email')} />
      </div>
      <div>
        <div>Password:</div>
        <input type="text"  {...register('password')} />
      </div>
      <br />
      {
        isErrorLogin && 'Invalid credentials, try again...'
      }
      <button className='boton'>Login</button>

      <div className='singUp'>
        <div>Already have an account?</div>
        <div className='SingUp'><Link to='/singup'>Sing  Up</Link></div>
      </div>
    </form>
  )
}

export default Login