import React from 'react'
import axios from 'axios'
import './materials.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import UserList from '../users/userList'
import getConfig from '../../utils/getConfig'
import { useDispatch, useSelector } from 'react-redux'
import { setItem } from '../../store/slices/ItemSlice'
import { setVisibleMaterial } from './../../store/slices/NewsVisibleSlice'
const deployMaterials = ({ material, searchMaterials }) => {
  const dispatch = useDispatch()
  const NewMaterialVisible = useSelector(state => state.NewsVisible)[6]
  const [Visible, setVisible] = useState(false)
  const [MenuVisible, setMenuVisible] = useState(false)
  const [UserListVisible, setUserListVisible] = useState(false)
  return (
    <>
      <div className='deploy'>
        <div onClick={() => setVisible(!Visible)} className='materialsBody tableHover'>
          <p>{material.name}</p>
          <p>{material.amount}</p>
          {material.project?.name && <p>{material.project.name}</p>}
        </div>
        <aside className='threePoints' onClick={() => setMenuVisible(!MenuVisible)} ><p>...</p></aside>

        {

          <div className='backgroundthreePoints'>
          </div>
        }
        {
          MenuVisible &&
          <div className='itemList itemListPrimary '>
            {!material.onHold && <p className='items materialItemsWidth' onClick={() =>{ setUserListVisible(true),setMenuVisible(false)}}>Asignar</p>}
            <p className='items materialItemsWidth' onClick={() => { dispatch(setItem(material)), dispatch(setVisibleMaterial(true)), setMenuVisible(false) }}>Editar</p>
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
            setmenuvisible={setMenuVisible}
            setuserlistvisible={setUserListVisible}
          />
        }
      </div>
      {
        Visible && <div className='content'>
          <p>Cantidad: {material.amount}</p>
          {material.project?.name && <p>Proyecto: {material.project.name}</p>}
          <p>En espera: {material.onHold ? "si" : "no"}</p>
          <p>Entregado: {material.delivered ? "si" : "no"}</p>
          <p>Instalado: {material.installed ? "si" : "no"}</p>
          <p>Retornado: {material.returned ? "si" : "no"}</p>
          <p>Dañado: {material.damaged ? "si" : "no"}</p>
          <p>Inventario: {material.inventory.name}</p>
          <p>Usuario Asignado: {material.user.firstName + ' ' + (material.user && material.user.lastName)}</p>
        </div>
      }
    </>
  )
}

export default deployMaterials