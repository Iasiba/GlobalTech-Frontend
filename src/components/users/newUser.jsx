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
    //const NewUserVisible = useSelector(state => state.NewsVisible)[9]
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
    console.log(User.id)
    const submit = data => {
        data.roleId = RoleId
        auxSubmit(data)
        navigate(-1)
    }
    function auxSubmit(data) {
        console.log(data, 'xxx')

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

        //dispatch(setVisibleUser(!NewUserVisible))//Ocultar ventana de creacion de usuarios
        dispatch(updateRefresh())
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
                <div>* Nombre:</div>
                <input type="text" autoComplete='off' required placeholder='' defaultValue={NewUser.firstName} {...register('firstName')} />
            </div>
            <div className='createGrid'>
                <div>Apellidos:</div>
                <input type="text" autoComplete='off' placeholder='' defaultValue={NewUser.lastName} {...register('lastName')} />
            </div>
            <div className='createGrid'>
                <div>Genero:</div>
                <input type="text" autoComplete='off' placeholder='' defaultValue={NewUser.gender} {...register('gender')} />
            </div>
            <div className='createGrid'>
                <div>* Email:</div>
                <input type="text" autoComplete='off' required placeholder='user@gmail.com' defaultValue={NewUser.email} {...register('email')} />
            </div>
            {!User.id && <div className='createGrid'>
                <div>* Contraseña:</div>
                <input type="text" autoComplete='off' required placeholder='Ej. Password' {...register('password')} />
            </div>}

            <div className='createGrid'>
                <div>phone:</div>
                <input type="text" autoComplete='off' placeholder='Ej. 81XXXXXXXX' defaultValue={NewUser.phone} {...register('phone')} />
            </div>
            <div className='createGrid'>
                <div>Fecha de Nacimiento:</div>
                <input type="date" placeholder='' defaultValue={NewUser.birthdayDate} {...register('birthdayDate')} />
            </div>
            <div className='createGrid'>
                <div>DNI:</div>
                <input type="text" autoComplete='off' placeholder='DNI' defaultValue={NewUser.dni} {...register('dni')} />
            </div>
            <div className='createGrid'>
                <div>Direccion:</div>
                <input type="text" autoComplete='off' placeholder='Ej. calle vasconcelos 123' defaultValue={NewUser.address} {...register('address')} />
            </div>
            <div className='createGrid'>
                <div>Pais:</div>
                <input type="text" autoComplete='off' placeholder='Mexico' defaultValue={NewUser.country} {...register('country')} />
            </div>
            <div className='createGrid'>
                <div>Imagen de Perfil:</div>
                <input type="url" autoComplete='off' placeholder='URL' defaultValue={NewUser.profileImage} {...register('profileImage')} />
            </div>
            <div className='createGrid'>
                <div>Estado:</div>
                <input type="text" autoComplete='off' placeholder='Ej. Password' defaultValue={NewUser.status} {...register('status')} />
            </div>
            <div className='createGrid'>
                <div>Verificado:</div>
                <input type="text" autoComplete='off' placeholder='default: no' defaultValue={NewUser.verified} {...register('verified')} />
            </div>
            <div className='createGrid'>
                <div>* Rol:</div>
                <input type="text" autoComplete='off' required onClick={() => setRoleListVisible(!RoleListVisible)} placeholder='Ej. admin' value={RoleName} /*defaultValue={User.role?.name}*/{...register('roleName')} />
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
                                <input type="checkbox" defaultChecked={NewUser.id ? NewUser.watchActivities : false}{...register('watchActivities')} />
                                <div>Actividades</div>
                            </aside>
                            <aside className='check'>
                                <input type="checkbox" defaultChecked={NewUser.id ? NewUser.watchDocumentation : false}{...register('watchDocumentation')} />
                                <div>Documentacion</div>
                            </aside>
                            <aside className='check'>
                                <input type="checkbox" defaultChecked={NewUser.id ? NewUser.watchHome : false}{...register('watchHome')} />
                                <div>Home</div>
                            </aside>
                            <aside className='check'>
                                <input type="checkbox" defaultChecked={NewUser.id ? NewUser.watchInventaries : false}{...register('watchInventaries')} />
                                <div>Inventarios</div>
                            </aside>
                            <aside className='check'>
                                <input type="checkbox" defaultChecked={NewUser.id ? NewUser.watchMyAccount : false}{...register('watchMyAccount')} />
                                <div>Mi Cuenta</div>
                            </aside>
                            <aside className='check'>
                                <input type="checkbox" defaultChecked={NewUser.id ? NewUser.watchMyHome : false}{...register('watchMyHome')} />
                                <div>My Home</div>
                            </aside>
                            <aside className='check'>
                                <input type="checkbox" defaultChecked={NewUser.id ? NewUser.watchProjects : false}{...register('watchProjects')} />
                                <div>Proyectos</div>
                            </aside>
                            <aside className='check'>
                                <input type="checkbox" defaultChecked={NewUser.id ? NewUser.watchTasks : false}{...register('watchTasks')} />
                                <div>Tareas</div>
                            </aside>
                            <aside className='check'>
                                <input type="checkbox" defaultChecked={NewUser.id ? NewUser.watchUsers : false}{...register('watchUsers')} />
                                <div>Usuarios</div>
                            </aside>
                        </div>
                    </aside>
                    <aside>
                        <h4>Crear y Editar</h4>
                        <div className='checks'>
                            <aside className='check'>
                                <input type="checkbox" defaultChecked={NewUser.id ? NewUser.createOrEditAccount : false}{...register('createOrEditAccount')} />
                                <div>Cuentas</div>
                            </aside>
                            <aside className='check'>
                                <input type="checkbox" defaultChecked={NewUser.id ? NewUser.createOrEditActivities : false}{...register('createOrEditActivities')} />
                                <div>Actividades</div>
                            </aside>
                            <aside className='check'>
                                <input type="checkbox" defaultChecked={NewUser.id ? NewUser.createOrEditArea : false}{...register('createOrEditArea')} />
                                <div>Area</div>
                            </aside>
                            <aside className='check'>
                                <input type="checkbox" defaultChecked={NewUser.id ? NewUser.createOrEditBackup : false}{...register('createOrEditBackup')} />
                                <div>Respaldo</div>
                            </aside>
                            <aside className='check'>
                                <input type="checkbox" defaultChecked={NewUser.id ? NewUser.createOrEditGuide : false}{...register('createOrEditGuide')} />
                                <div>Documentacion</div>
                            </aside>
                            <aside className='check'>
                                <input type="checkbox" defaultChecked={NewUser.id ? NewUser.createOrEditMaterial : false}{...register('createOrEditMaterial')} />
                                <div>Material</div>
                            </aside>
                            <aside className='check'>
                                <input type="checkbox" defaultChecked={NewUser.id ? NewUser.createOrEditInventary : false}{...register('createOrEditInventary')} />
                                <div>Inventario</div>
                            </aside>
                            <aside className='check'>
                                <input type="checkbox" defaultChecked={NewUser.id ? NewUser.createOrEditNote : false}{...register('createOrEditNote')} />
                                <div>Notas</div>
                            </aside>
                            <aside className='check'>
                                <input type="checkbox" defaultChecked={NewUser.id ? NewUser.createOrEditProject : false}{...register('createOrEditProject')} />
                                <div>Proyectos</div>
                            </aside>
                            <aside className='check'>
                                <input type="checkbox" defaultChecked={NewUser.id ? NewUser.createOrEditTask : false}{...register('createOrEditTask')} />
                                <div>Tareas</div>
                            </aside>
                            <aside className='check'>
                                <input type="checkbox" defaultChecked={NewUser.id ? NewUser.createOrEditUser : false}{...register('createOrEditUser')} />
                                <div>Usuarios</div>
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