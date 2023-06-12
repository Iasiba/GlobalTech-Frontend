import React, { useState, useEffect } from 'react'
import getConfig from '../../utils/getConfig'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import AxiosGetHook from '../../hooks/axiosGetHook'
import '../../App.css'
import './users.css'
import { setVisibleUser } from './../../store/slices/NewsVisibleSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setItem } from '../../store/slices/ItemSlice'
import { updateRefresh } from '../../store/slices/RefreshSlice'
const newUser = () => {
    const dispatch = useDispatch()
    const Roles = AxiosGetHook('http://192.168.0.253:8000/api/v1/roles')
    const AllRoles = Roles.data.data?.roles

    const NewUser = useSelector(state => state.Item)
    const [User, setUser] = useState('')
    const [RoleName, setRoleName] = useState('')
    const [Role, setRole] = useState('')
    const [RoleId, setRoleId] = useState('')
    const [RoleListVisible, setRoleListVisible] = useState(false)

    const { handleSubmit, reset, register } = useForm()

    const navigate = useNavigate()
    useEffect(() => assignUser(), [])
    useEffect(() => { setRoleId(Role.id) }, [Role])
    console.log(NewUser)
    console.log(User)
    const submit = data => {
        data.roleId = RoleId
        console.log(data)
        User.id ?
            axios.put(`http://192.168.0.253:8000/api/v1/users/me`, data, getConfig())
                .then(res => {
                    console.log(res, "Usuario editado")
                })
                .catch(err => console.log(err))
            :
            axios.post(`http://192.168.0.253:8000/api/v1/auth/register`, data, getConfig())
                .then(res => {
                    console.log(res, "Usuario creado")
                })
                .catch(err => console.log(err))
        dispatch(updateRefresh())
        navigate(-1)
    }
    function assignUser() {
        NewUser.id && setUser(NewUser)
        NewUser.id && (setRole(NewUser.role), setRoleName(NewUser.role.name))
    }
    return (
        <form onSubmit={handleSubmit(submit)} className='createCenter new' >
            <i className='bx bx-x-circle close' onClick={() => (dispatch(setVisibleUser(false)), dispatch(setItem(false)), navigate(-1))}></i>
            <h2>{User.id ? 'Editar Usuario' : 'Nuevo Usuario'}</h2>
            <div className='createGrid'>
                <label className='necessary'>Nombre:</label>
                <input
                    type="text"
                    autoComplete='off'
                    required
                    placeholder=''
                    defaultValue={NewUser.firstName}
                    {...register('firstName')} />
            </div>
            <div className='createGrid'>
                <label>Apellidos:</label>
                <input
                    type="text"
                    autoComplete='off'
                    placeholder=''
                    defaultValue={NewUser.lastName}
                    {...register('lastName')}
                />
            </div>
            <div className='createGrid'>
                <label>Genero:</label>
                <input
                    type="text"
                    autoComplete='off'
                    placeholder=''
                    defaultValue={NewUser.gender}
                    {...register('gender')}
                />
            </div>
            <div className='createGrid'>
                <label className='necessary'>Email:</label>
                <input
                    type="text"
                    autoComplete='off'
                    required
                    placeholder='user@gmail.com'
                    defaultValue={NewUser.email}
                    {...register('email')}
                />
            </div>
            {!User.id && <div className='createGrid'>
                <label className='necessary'>Contraseña:</label>
                <input
                    type="text"
                    autoComplete='off'
                    required
                    placeholder='Ej. Password'
                    {...register('password')}
                />
            </div>}

            <div className='createGrid'>
                <label>phone:</label>
                <input
                    type="text"
                    autoComplete='off'
                    placeholder='Ej. 81XXXXXXXX'
                    defaultValue={NewUser.phone}
                    {...register('phone')}
                />
            </div>
            <div className='createGrid'>
                <label>Fecha de Nacimiento:</label>
                <input
                    type="date"
                    defaultValue={NewUser.birthdayDate}
                    {...register('birthdayDate')}
                />
            </div>
            <div className='createGrid'>
                <label>DNI:</label>
                <input
                    type="text"
                    autoComplete='off'
                    placeholder='DNI'
                    defaultValue={NewUser.dni}
                    {...register('dni')}
                />
            </div>
            <div className='createGrid'>
                <label>Direccion:</label>
                <input
                    type="text"
                    autoComplete='off'
                    placeholder='Ej. calle vasconcelos 123'
                    defaultValue={NewUser.address}
                    {...register('address')}
                />
            </div>
            <div className='createGrid'>
                <label>Pais:</label>
                <input
                    type="text"
                    autoComplete='off'
                    placeholder='Mexico'
                    defaultValue={NewUser.country}
                    {...register('country')}
                />
            </div>
            <div className='createGrid'>
                <label>Imagen de Perfil:</label>
                <input
                    type="url"
                    autoComplete='off'
                    placeholder='URL'
                    defaultValue={NewUser.profileImage}
                    {...register('profileImage')}
                />
            </div>
            <div className='createGrid'>
                <label>Estado:</label>
                <input
                    type="text"
                    autoComplete='off'
                    placeholder='Ej. Password'
                    defaultValue={NewUser.status}
                    {...register('status')}
                />
            </div>
            <div className='createGrid'>
                <label>Verificado:</label>
                <input
                    type="text"
                    autoComplete='off'
                    placeholder='default: no'
                    defaultValue={NewUser.verified}
                    {...register('verified')}
                />
            </div>
            <div className='createGrid'>
                <label className='necessary'>Rol:</label>
                <input
                    type="text"
                    autoComplete='off'
                    required
                    onClick={() => setRoleListVisible(!RoleListVisible)}
                    placeholder='Ej. admin'
                    value={RoleName} /*defaultValue={User.role?.name}*/
                    {...register('roleName')}
                />
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

            <div>
                <h3>Permisos</h3>
                <div>
                    <aside>
                        <h4>Ver</h4>
                        <div className='checks'>
                            <aside className='check'>
                                <input
                                    type="checkbox"
                                    defaultChecked={NewUser.id ? NewUser.watchActivities : false}
                                    {...register('watchActivities')}
                                />
                                <label>Actividades</label>
                            </aside>
                            <aside className='check'>
                                <input
                                    type="checkbox"
                                    defaultChecked={NewUser.id ? NewUser.watchDocumentation : false}
                                    {...register('watchDocumentation')}
                                />
                                <label>Documentacion</label>
                            </aside>
                            <aside className='check'>
                                <input
                                    type="checkbox"
                                    defaultChecked={NewUser.id ? NewUser.watchHome : false}
                                    {...register('watchHome')}
                                />
                                <label>Home</label>
                            </aside>
                            <aside className='check'>
                                <input
                                    type="checkbox"
                                    defaultChecked={NewUser.id ? NewUser.watchInventaries : false}
                                    {...register('watchInventaries')}
                                />
                                <label>Inventarios</label>
                            </aside>
                            <aside className='check'>
                                <input
                                    type="checkbox"
                                    defaultChecked={NewUser.id ? NewUser.watchMyAccount : false}
                                    {...register('watchMyAccount')}
                                />
                                <label> Mi Cuenta</label>
                            </aside>
                            <aside className='check'>
                                <input
                                    type="checkbox"
                                    defaultChecked={NewUser.id ? NewUser.watchMyHome : false}
                                    {...register('watchMyHome')}
                                />
                                <label>My Home</label>
                            </aside>
                            <aside className='check'>
                                <input
                                    type="checkbox"
                                    defaultChecked={NewUser.id ? NewUser.watchProjects : false}
                                    {...register('watchProjects')}
                                />
                                <label>Proyectos</label>
                            </aside>
                            <aside className='check'>
                                <input
                                    type="checkbox"
                                    defaultChecked={NewUser.id ? NewUser.watchTasks : false}
                                    {...register('watchTasks')}
                                />
                                <label>Tareas</label>
                            </aside>
                            <aside className='check'>
                                <input
                                    type="checkbox"
                                    defaultChecked={NewUser.id ? NewUser.watchUsers : false}
                                    {...register('watchUsers')}
                                />
                                <label>Usuarios</label>
                            </aside>
                        </div>
                    </aside>
                    <aside>
                        <h4>Crear y Editar</h4>
                        <div className='checks'>
                            <aside className='check'>
                                <input
                                    type="checkbox"
                                    defaultChecked={NewUser.id ? NewUser.createOrEditAccount : false}
                                    {...register('createOrEditAccount')}
                                />
                                <label>Cuentas</label>
                            </aside>
                            <aside className='check'>
                                <input
                                    type="checkbox"
                                    defaultChecked={NewUser.id ? NewUser.createOrEditActivities : false}
                                    {...register('createOrEditActivities')}
                                />
                                <label>Actividades</label>
                            </aside>
                            <aside className='check'>
                                <input
                                    type="checkbox"
                                    defaultChecked={NewUser.id ? NewUser.createOrEditArea : false}
                                    {...register('createOrEditArea')}
                                />
                                <label>Area</label>
                            </aside>
                            <aside className='check'>
                                <input
                                    type="checkbox"
                                    defaultChecked={NewUser.id ? NewUser.createOrEditBackup : false}
                                    {...register('createOrEditBackup')}
                                />
                                <label>Respaldo</label>
                            </aside>
                            <aside className='check'>
                                <input
                                    type="checkbox"
                                    defaultChecked={NewUser.id ? NewUser.createOrEditGuide : false}
                                    {...register('createOrEditGuide')}
                                />
                                <label>Documentacion</label>
                            </aside>
                            <aside className='check'>
                                <input
                                    type="checkbox"
                                    defaultChecked={NewUser.id ? NewUser.createOrEditMaterial : false}
                                    {...register('createOrEditMaterial')}
                                />
                                <label>Material</label>
                            </aside>
                            <aside className='check'>
                                <input
                                    type="checkbox"
                                    defaultChecked={NewUser.id ? NewUser.createOrEditInventary : false}
                                    {...register('createOrEditInventary')}
                                />
                                <label>Inventario</label>
                            </aside>
                            <aside className='check'>
                                <input
                                    type="checkbox"
                                    defaultChecked={NewUser.id ? NewUser.createOrEditNote : false}
                                    {...register('createOrEditNote')}
                                />
                                <label>Notas</label>
                            </aside>
                            <aside className='check'>
                                <input
                                    type="checkbox"
                                    defaultChecked={NewUser.id ? NewUser.createOrEditProject : false}
                                    {...register('createOrEditProject')}
                                />
                                <label>Proyectos</label>
                            </aside>
                            <aside className='check'>
                                <input
                                    type="checkbox"
                                    defaultChecked={NewUser.id ? NewUser.createOrEditTask : false}
                                    {...register('createOrEditTask')}
                                />
                                <label>Tareas</label>
                            </aside>
                            <aside className='check'>
                                <input
                                    type="checkbox"
                                    defaultChecked={NewUser.id ? NewUser.createOrEditUser : false}
                                    {...register('createOrEditUser')}
                                />
                                <label>Usuarios</label>
                            </aside>
                        </div>
                    </aside>
                </div>
            </div>
            <br />
            <button>{User.id ? 'Actualizar' : 'Crear'}</button>
        </form>
    )
}

export default newUser