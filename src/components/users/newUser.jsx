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
    const NewUserVisible = useSelector(state => state.NewsVisible)[9]
    const Roles = AxiosGetHook('http://192.168.0.253:8000/api/v1/roles')
    const AllRoles = Roles.data.data?.roles

    const [User, setUser] = useState('')
    const [RoleName, setRoleName] = useState('')
    const [Role, setRole] = useState('')
    const [RoleId, setRoleId] = useState('')
    const [RoleListVisible, setRoleListVisible] = useState(false)

    const { handleSubmit, reset, register } = useForm()

    const navigate = useNavigate()

    useEffect(() => { setRoleId(Role.id) }, [Role])

    const submit = data => {
        data.roleId = RoleId
        auxSubmit(data)
        navigate(-1)
    }
    async function auxSubmit(data) {
        const URL = `http://192.168.0.253:8000/api/v1/auth/register`
        const aux = await axios.post(URL, data, getConfig())
            .then(res => {
                console.log(res, "Usuario creado")
            })
            .catch(err => console.log(err))

        dispatch(setVisibleUser(!NewUserVisible))//Ocultar ventana de creacion de usuarios
        dispatch(updateRefresh())
    }

    return (
        <form onSubmit={handleSubmit(submit)} className='createCenter new' >
            <i className='bx bx-x-circle close' onClick={() => (dispatch(setVisibleUser(false)), dispatch(setItem(false)),navigate(-1))}></i>
            <h2>Nuevo Usuario</h2>
            <div className='createGrid'>
                <div>* Nombre:</div>
                <input type="text" required placeholder='' {...register('first_name')} />
            </div>
            <div className='createGrid'>
                <div>Apellidos:</div>
                <input type="text" placeholder='' {...register('last_name')} />
            </div>
            <div className='createGrid'>
                <div>Genero:</div>
                <input type="text" placeholder='' {...register('gender')} />
            </div>
            <div className='createGrid'>
                <div>* Email:</div>
                <input type="text" required placeholder='user@gmail.com' {...register('email')} />
            </div>
            <div className='createGrid'>
                <div>* Contraseña:</div>
                <input type="text" required placeholder='Ej. Password' {...register('password')} />
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
                <div>* Rol:</div>
                <input type="text" required onClick={() => setRoleListVisible(!RoleListVisible)} placeholder='Ej. admin' value={RoleName} {...register('roleName')} />
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

            <section>
                <h3>Permisos</h3>
                <div>
                    <aside>
                        <h4>Ver</h4>
                        <div className='checks'>
                            <aside className='check'>
                                <input type="checkbox" defaultChecked={User.id ? User.watchActivities : false}{...register('watchActivities')} />
                                <div>Actividades</div>
                            </aside>
                            <aside className='check'>
                                <input type="checkbox" defaultChecked={User.id ? User.watchDocumentation : false}{...register('watchDocumentation')} />
                                <div>Documentacion</div>
                            </aside>
                            <aside className='check'>
                                <input type="checkbox" defaultChecked={User.id ? User.watchHome : false}{...register('watchHome')} />
                                <div>Home</div>
                            </aside>
                            <aside className='check'>
                                <input type="checkbox" defaultChecked={User.id ? User.watchInventaries : false}{...register('watchInventaries')} />
                                <div>Inventarios</div>
                            </aside>
                            <aside className='check'>
                                <input type="checkbox" defaultChecked={User.id ? User.watchMyAccount : false}{...register('watchMyAccount')} />
                                <div>Mi Cuenta</div>
                            </aside>
                            <aside className='check'>
                                <input type="checkbox" defaultChecked={User.id ? User.watchMyHome : false}{...register('watchMyHome')} />
                                <div>My Home</div>
                            </aside>
                            <aside className='check'>
                                <input type="checkbox" defaultChecked={User.id ? User.watchProjects : false}{...register('watchProjects')} />
                                <div>Proyectos</div>
                            </aside>
                            <aside className='check'>
                                <input type="checkbox" defaultChecked={User.id ? User.watchTasks : false}{...register('watchTasks')} />
                                <div>Tareas</div>
                            </aside>
                            <aside className='check'>
                                <input type="checkbox" defaultChecked={User.id ? User.watchUsers : false}{...register('watchUsers')} />
                                <div>Usuarios</div>
                            </aside>
                        </div>
                    </aside>
                    <aside>
                        <h4>Crear y Editar</h4>
                        <div className='checks'>
                            <aside className='check'>
                                <input type="checkbox" defaultChecked={User.id ? User.createOrEditAccount : false}{...register('createOrEditAccount')} />
                                <div>Cuentas</div>
                            </aside>
                            <aside className='check'>
                                <input type="checkbox" defaultChecked={User.id ? User.createOrEditActivities : false}{...register('createOrEditActivities')} />
                                <div>Actividades</div>
                            </aside>
                            <aside className='check'>
                                <input type="checkbox" defaultChecked={User.id ? User.createOrEditArea : false}{...register('createOrEditArea')} />
                                <div>Area</div>
                            </aside>
                            <aside className='check'>
                                <input type="checkbox" defaultChecked={User.id ? User.createOrEditBackup : false}{...register('createOrEditBackup')} />
                                <div>Respaldo</div>
                            </aside>
                            <aside className='check'>
                                <input type="checkbox" defaultChecked={User.id ? User.createOrEditGuide : false}{...register('createOrEditGuide')} />
                                <div>Documentacion</div>
                            </aside>
                            <aside className='check'>
                                <input type="checkbox" defaultChecked={User.id ? User.createOrEditMaterial : false}{...register('createOrEditMaterial')} />
                                <div>Material</div>
                            </aside>
                            <aside className='check'>
                                <input type="checkbox" defaultChecked={User.id ? User.createOrEditInventary : false}{...register('createOrEditInventary')} />
                                <div>Inventario</div>
                            </aside>
                            <aside className='check'>
                                <input type="checkbox" defaultChecked={User.id ? User.createOrEditNote : false}{...register('createOrEditNote')} />
                                <div>Notas</div>
                            </aside>
                            <aside className='check'>
                                <input type="checkbox" defaultChecked={User.id ? User.createOrEditProject : false}{...register('createOrEditProject')} />
                                <div>Proyectos</div>
                            </aside>
                            <aside className='check'>
                                <input type="checkbox" defaultChecked={User.id ? User.createOrEditTask : false}{...register('createOrEditTask')} />
                                <div>Tareas</div>
                            </aside>
                            <aside className='check'>
                                <input type="checkbox" defaultChecked={User.id ? User.createOrEditUser : false}{...register('createOrEditUser')} />
                                <div>Usuarios</div>
                            </aside>
                        </div>
                    </aside>
                </div>
            </section>
            <br />
            <button>Crear</button>
        </form>
    )
}

export default newUser