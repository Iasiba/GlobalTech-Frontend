import React from 'react'
import './myAccounts.css'
import AxiosGetHook from '../../hooks/axiosGetHook'
import { useNavigate } from 'react-router-dom'
import { setVisibleUser } from './../../store/slices/NewsVisibleSlice'
import { useDispatch } from 'react-redux'
import { setItem } from '../../store/slices/ItemSlice'
const myAccounts = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const Users = AxiosGetHook('http://localhost:8000/api/v1/users/me')
  const me = Users.data.data
  return (
    <>
      {me && <div className='content myAccount'>
        <i className='bx bx-edit-alt editMyAccount' onClick={()=>{dispatch(setItem(me)),dispatch(setVisibleUser(true))}}></i>
        <aside className='image'>
          <img src={me.profileImage ? "https://scontent.fmty4-1.fna.fbcdn.net/v/t1.6435-9/70394714_2241979079244013_2226972630676668416_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=8bfeb9&_nc_eui2=AeHFiT0RslXyQRQppMmKI1G7MRjnJWyCALcxGOclbIIAt7xlmk3Dxg36oGtDOPKSRHS5kZzPpvo52unwERE4MjXD&_nc_ohc=2DSl9NWtESkAX9-65i3&_nc_ht=scontent.fmty4-1.fna&oh=00_AT8biZr6CPY7ZxZpnClZ-LSehde0LS0CKH8SHGdUS2ENkQ&oe=637BB5C9" : me.profileImage} alt="" className='profileImage' />
        </aside>

        <p>{me.firstName}  {me.lastName}</p>
        <p>Email: {me.email}</p>
        <p>Celular: {me.phone}</p>
        <p>Fecha de nacimiento: {me.birthdayDate}</p>
        <p>Direccion: {me.address}</p>
      </div>}
    </>
  )
}

export default myAccounts