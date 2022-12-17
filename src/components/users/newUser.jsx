import React, { useState, useEffect } from 'react'
import getConfig from '../../utils/getConfig'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import AxiosGetHook from '../../hooks/axiosGetHook'
import '../../App.css'
import './users.css'
const newUser = () => {
    const Roles = AxiosGetHook('http://localhost:8000/api/v1/roles')
    const AllRoles = Roles.data.data?.roles

    const [RoleName, setRoleName] = useState('')
    const [Role, setRole] = useState('')
    const [RoleId, setRoleId] = useState('')
    const [RoleListVisible, setRoleListVisible] = useState(false)

    const { handleSubmit, reset, register } = useForm()

    const navigate = useNavigate()

    useEffect(() => { setRoleId(Role.id) }, [Role])

    const submit = data => {
        data.roleId = RoleId
        const URL = `http://localhost:8000/api/v1/auth/register`
        axios.post(URL, data, getConfig())
            .then(res => {
                console.log(res, "Usuario creado")
            })
            .catch(err => console.log(err))
    }
    return (
        <form onSubmit={handleSubmit(submit)} className='createCenter' >
            <h2>Nuevo Usuario</h2>
            <div className='createGrid'>
                <p>Nombre:</p>
                <input type="text" placeholder='' {...register('first_name')} />
            </div>
            <div className='createGrid'>
                <p>Apellidos:</p>
                <input type="text" placeholder='' {...register('last_name')} />
            </div>
            <div className='createGrid'>
                <p>Genero:</p>
                <input type="text" placeholder='' {...register('gender')} />
            </div>
            <div className='createGrid'>
                <p>Email:</p>
                <input type="text" placeholder='user@gmail.com' {...register('email')} />
            </div>
            <div className='createGrid'>
                <div>Contraseña:</div>
                <input type="text" placeholder='Ej. Password' {...register('password')} />
            </div>

            <div className='createGrid'>
                <div>phone:</div>
                <input type="text" placeholder='Ej. 81XXXXXXXX' {...register('phone')} />
            </div>
            <div className='createGrid'>
                <div>Fecha de Nacimiento:</div>
                <input type="date" placeholder='' {...register('birthday_date')} />
            </div>
            <div className='createGrid'>
                <div>DNI:</div>
                <input type="text" placeholder='DNI' {...register('dni')} />
            </div>
            <div className='createGrid'>
                <div>Direccion:</div>
                <input type="text" placeholder='Ej. calle vasconcelos 123' {...register('address')} />
            </div>
            <div className='createGrid'>
                <div>Pais:</div>
                <input type="text" placeholder='Mexico' {...register('country')} />
            </div>
            <div className='createGrid'>
                <div>Imagen de Perfil:</div>
                <input type="url" placeholder='URL' {...register('profile_image')} />
            </div>
            <div className='createGrid'>
                <div>Estado:</div>
                <input type="text" placeholder='Ej. Password' {...register('status')} />
            </div>
            <div className='createGrid'>
                <div>Verificado:</div>
                <input type="text" placeholder='default: no' {...register('verified')} />
            </div>
            <div className='createGrid'>
                <div>Rol:</div>
                <input type="text" onClick={() => setRoleListVisible(!RoleListVisible)} placeholder='Ej. admin' value={RoleName} {...register('roleName')} />
            </div>


            <div className='createGrid'>
                <div></div>
                <div>
                    {
                        RoleListVisible && AllRoles && AllRoles?.map(role => {
                            return (<p className='tableHeader tableHover list' onClick={() => { setRoleName(role.name), setRole(role), setRoleListVisible(!RoleListVisible) }} key={role.id}>{role.name}</p>)
                        }
                        )
                    }
                </div>
            </div>
            <br />
            <button>Crear</button>
        </form>
    )
}

export default newUser