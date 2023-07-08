import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import './login.css'
import { useSelector } from 'react-redux'
const Login = () => {
  const BackendAddress = useSelector(state => state.BackendAddress)
  const [isErrorLogin, setIsErrorLogin] = useState(false)
  const { handleSubmit, reset, register } = useForm()

  const navigate = useNavigate()
  const submit = data => {
    const URL = `http://${BackendAddress}/api/v1/auth/login`
    axios.post(URL, data)
      .then(res => {
        console.log("intento de logueo exitoso", res.data.token, "intento de logueo exitoso")
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
        <label className='necessary'>Email:</label>
        <input
          type="text"
          className='loginInput'
          autoComplete='off'
          {...register('email')}
        />
      </div>
      <div>
        <label className='necessary'>Contraseña:</label>
        <input
          type="text"
          className='loginInput'
          autoComplete='off'
          {...register('password')}
        />
      </div>
      <br />
      {
        isErrorLogin && <p>{'Credenciales Invalidas, intentelo de nuevo...'}</p>
      }
      <button className='boton'>Login</button>
      <div className='singUp'>
        <div>No tienes Cuenta?</div>
        <div className='SingUp'><Link to='/singup'>Registrarse</Link></div>
      </div>
    </form>
  )
}

export default Login