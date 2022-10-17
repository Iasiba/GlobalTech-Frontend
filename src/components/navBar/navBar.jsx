import React from 'react'
import './navBar.css'
import logo from '../../assets/Logo.jpg'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setVisibleUserMenu } from '../../store/slices/UserMenu'
import { setVisiblePlusMenu } from '../../store/slices/PlusMenu'
import { setArea } from '../../store/slices/AreaSlice'
import MenuPlus from '../menuPlus/menuPlus'
import MenuUser from '../menuUser/menuUser'


const NavBar = () => {
  const dispatch = useDispatch()

  let UserMenuVisible = useSelector(state => state.UserMenu)
  let PlusMenuVisible = useSelector(state => state.PlusMenu)
  let Area = useSelector(state => state.Area)

    useEffect(() => { }, [Area])

  return (
    < >
      <div className='navBar'>
        <img src={logo} alt="" className='logo' />
        <p className='title'> {Area} </p>
        <div>

        <i className='Plus bx bx-plus' onClick={() => (dispatch(setVisiblePlusMenu(!PlusMenuVisible)),{/*dispatch(setArea("PlusMenu"))*/})}></i>
        <i className='bx bx-user pages' onClick={() => (dispatch(setVisibleUserMenu(!UserMenuVisible)),{/* dispatch(setArea("UserMenu"))*/})}></i>
        </div>
      </div>
      {PlusMenuVisible && <MenuPlus />}
      {UserMenuVisible && <MenuUser />}
    </>

  )
}

export default NavBar