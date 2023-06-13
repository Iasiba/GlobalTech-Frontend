import React, { useState } from 'react'
import './navBar.css'
import logo from '../../assets/Logo.jpg'
import { useSelector, useDispatch } from 'react-redux'
import { setVisibleUserMenu } from '../../store/slices/UserMenu'
import { setVisiblePlusMenu } from '../../store/slices/PlusMenu'
import MenuPlus from '../menuPlus/menuPlus'
import MenuUser from '../menuUser/menuUser'
const NavBar = () => {
  const dispatch = useDispatch()
  let UserMenuVisible = useSelector(state => state.UserMenu)
  let PlusMenuVisible = useSelector(state => state.PlusMenu)
  let Area = useSelector(state => state.Area)
  return (
    < >
      <div className='navBar'>
        {/*<img src={logo} alt="" className='logo' />*/}
        <h3 className='title'> {Area} </h3>
        <div className={`menu-btn ${UserMenuVisible && 'open'} `} onClick={() => {dispatch(setVisibleUserMenu(!UserMenuVisible)), dispatch(setVisiblePlusMenu(false)) }}>
          <div className={`menu-btn__burger`}></div>
        </div>
        <i className={`Plus bx bx-plus plus ${PlusMenuVisible&&'plusOpen'}`} onClick={() => (dispatch(setVisiblePlusMenu(!PlusMenuVisible)), dispatch(setVisibleUserMenu(false)))}></i>
      </div>
      {<MenuPlus />}
      {<MenuUser />}
    </>
  )
}
export default NavBar