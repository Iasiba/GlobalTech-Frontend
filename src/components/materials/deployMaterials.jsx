import React from 'react'
import axios from 'axios'
import './materials.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import UserList from '../users/userList'
import getConfig from '../../utils/getConfig'
import { useDispatch } from 'react-redux'
import { setItem } from '../../store/slices/ItemSlice'
const deployMaterials = ({ material, searchMaterials }) => {
  const dispatch = useDispatch()
  const [Visible, setVisible] = useState(false)
  const [MenuVisible, setMenuVisible] = useState(false)
  const [UserListVisible, setUserListVisible] = useState(false)
  return (
    <>
      <div className='deploy'>
        <div onClick={() => setVisible(!Visible)} className='materialsBody tableHover'>
          <p>{material.name}</p>
          <p>{material.amount}</p>
          <p>{material.project.name}</p>
        </div>
        <aside className='threePoints' onClick={() => setMenuVisible(!MenuVisible)} ><p>...</p></aside>
        {
          MenuVisible
          &&
          <div className='itemList itemListPrimary '>
            <p className='items materialItemsWidth' onClick={() => setUserListVisible(!UserListVisible)}>Asignar</p>
            <p className='items materialItemsWidth' onClick={() => dispatch(setItem(material))}><Link to={'/newMaterial'}  >Editar</Link></p>
            <p className='items materialItemsWidth'
              onClick={() => ((
                axios.delete(`http://localhost:8000/api/v1/materials/${material.id}`, getConfig())
                  .then(searchMaterials()),
                setMenuVisible(!MenuVisible)
              ))}
            >Eliminar</p>
          </div>
        }
        {
          UserListVisible
          &&
          <UserList
            material={material}
            menuvisible={MenuVisible} setmenuvisible={setMenuVisible}
            userlistvisible={UserListVisible} setuserlistvisible={setUserListVisible}
          />
        }
      </div>
      {
        Visible && <div className='content'>
          <p>Cantidad: {material.amount}</p>
          <p>Proyecto: {material.project.name}</p>
          <p>Instalado: { }</p>
          <p>Retornado: {material.returned ? "si" : "no"}</p>
          <p>Dañado: { }</p>
          <p>En espera: {material.onHold ? "si" : "no"}</p>
          <p>Inventario: {material.inventory.name}</p>
          <p>Usuario Asignado: { }</p>
        </div>
      }
    </>
  )
}

export default deployMaterials