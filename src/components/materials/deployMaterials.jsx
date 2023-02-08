import React from 'react'
import axios from 'axios'
import './materials.css'
import '../list/list.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import UserList from '../users/userList'
import getConfig from '../../utils/getConfig'
import { useDispatch, useSelector } from 'react-redux'
import { setItem } from '../../store/slices/ItemSlice'
import { setVisibleMaterial } from './../../store/slices/NewsVisibleSlice'
const deployMaterials = ({ material, MaterialList, searchMaterials, viewUserList }) => {
  const dispatch = useDispatch()
  const NewMaterialVisible = useSelector(state => state.NewsVisible)[6]
  const [Visible, setVisible] = useState(false)
  const [MenuVisible, setMenuVisible] = useState(false)
  const [UserListVisible, setUserListVisible] = useState(false)

  const [Selected, setSelected] = useState(false)
  //const [MaterialList, setMaterialList] = useState([])
  const [Refresh, setRefresh] = useState(false)
  const [UserSelected, setUserSelected] = useState('')
  return (
    <>
      <div className='deploy'>
        <div className='selectListBackground selectMaterial'
          onClick={
            () => {
              if (MaterialList.includes(material)) {
                for (let i = 0; i < MaterialList.length; i++) {
                  if (material === MaterialList[i]) {
                    MaterialList.splice(i, 1)
                  }
                }
              } else {
                MaterialList.push(material)
              }
              setRefresh(!Refresh)
              setSelected(!Selected)
            }
          }
        >
          <div className={'select Select ' + `${Selected && !material.onHold && 'selection'}`}></div>
        </div>
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
            {!material.onHold && <p className='items materialItemsWidth' onClick={() => { setUserListVisible(true), setMenuVisible(false) }}>Asignar</p>}
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
          /*UserListVisible
          viewUserList
          &&
          <UserList
            material={material}
            setmenuvisible={setMenuVisible}
            setuserlistvisible={setUserListVisible}
          />*/
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