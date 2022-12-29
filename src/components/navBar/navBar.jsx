import React from 'react'
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
        <img src={logo} alt="" className='logo' />
        <p className='title'> {Area} </p>
        <div>
          <div className='menu-btn'>

          </div>
          <div className='Menu' onClick={() => (dispatch(setVisibleUserMenu(!UserMenuVisible)), dispatch(setVisiblePlusMenu(false)))}>
            <div className='wire rotateI'></div>
            <div className='wire wiremargin'></div>
            <div className='wire rotateD'></div>
          </div>
          <i className='Plus bx bx-plus plus' onClick={() => (dispatch(setVisiblePlusMenu(!PlusMenuVisible)), dispatch(setVisibleUserMenu(false)), {/*dispatch(setArea("PlusMenu"))*/ })}></i>
          <i className='bx bx-menu pages vaca' onClick={() => (dispatch(setVisibleUserMenu(!UserMenuVisible)), dispatch(setVisiblePlusMenu(false)), {/* dispatch(setArea("UserMenu"))*/ })}></i>
          {/*<i class='bx bx-menu'></i> */}
        </div>
      </div>
      {PlusMenuVisible && <MenuPlus />}
      {UserMenuVisible && <MenuUser />}
    </>
  )
}
export default NavBar