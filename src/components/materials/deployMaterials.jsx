import React, { useEffect } from 'react'
import axios from 'axios'
import './materials.css'
import '../list/list.css'
import { useState } from 'react'
import getConfig from '../../utils/getConfig'
import { useDispatch, useSelector } from 'react-redux'
import { setItem } from '../../store/slices/ItemSlice'
import { setVisibleMaterial } from './../../store/slices/NewsVisibleSlice'
import { updateRefresh } from '../../store/slices/RefreshSlice'
import { updateRefreshMenu } from '../../store/slices/RefreshMenuSlice'
import { useNavigate } from 'react-router-dom'
const deployMaterials = ({ material, MaterialList, setviewUserList }) => {
  const BackendAddress = useSelector(state => state.BackendAddress)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [Visible, setVisible] = useState(false)
  const [MenuVisible, setMenuVisible] = useState(false)

  const [Selected, setSelected] = useState(false)
  const [Actualizar, setActualizar] = useState(false)

  const RefreshMenu = useSelector(state => state.RefreshMenu)
  const Refresh = useSelector(state => state.Refresh)
  const [Click, setClick] = useState(false)
  useEffect(
    () => {
      if (Click) {
        setMenuVisible(!MenuVisible),
          setClick(false)
      } else {
        setMenuVisible(false)
      }
    }, [RefreshMenu]
  )

  useEffect(
    () => {
      /*if(MaterialList.length = 0){
        setSelected(false)
      }
      Se actualiza la informacion que se crea o borra*/
    }, [material, MaterialList]
  )
  useEffect(
    () => {
      setSelected(false)
    }, [Refresh]
  )


  function addToMaterialList() {
    if (MaterialList.includes(material)) {
      for (let i = 0; i < MaterialList.length; i++) {
        if (material === MaterialList[i]) {
          MaterialList.splice(i, 1)
        }
      }
      setSelected(false)
    } else {
      MaterialList.push(material)
      setSelected(true)
    }
    setActualizar(!Actualizar)
  }


  return (
    <>
      <div className='deploy'>
        <div className='selectListBackground selectMaterial'
          onClick={() => !material.onHold && addToMaterialList()}
        >
          <div
            className={'select  ' + `${Selected && !material.onHold && 'selection'}`}
          ></div>
        </div>

        <div onClick={() => setVisible(!Visible)} className={`materialsBody tableHover ${material.onHold ? "onHold" : (material.damaged ? "damaged" : (material.installed ? "installed" : material.assigned && "assigned"))}`}>
          <p><b>{material.name}</b></p>
          <p>{material.amount}</p>
          {material.project?.name && <p><b>{material.project.name}</b></p>}
        </div>

        <aside className='threePoints'
          onClick={
            () => (
              dispatch(updateRefreshMenu()),
              setClick(true)
            )
          }
        ><p>...</p></aside>

        {
          <div className='backgroundthreePoints'>
          </div>
        }
        {
          MenuVisible &&
          <div className='itemList itemListPrimary '>
            {!material.onHold && <p className='items materialItemsWidth' onClick={() => { addToMaterialList(), /*Selected ? setviewUserList(false)*/!Selected && setviewUserList(true)/*: setviewUserList(true)*/, setMenuVisible(false) }}>Asignar</p>}
            <p className='items materialItemsWidth' onClick={() => { dispatch(setItem(material)), navigate('/NewMaterial') /*,dispatch(setVisibleMaterial(true)), setMenuVisible(false)*/ }}>Editar</p>
            <p className='items materialItemsWidth'
              onClick={() => ((
                axios.delete(`http://${BackendAddress}/api/v1/materials/${material.id}`, getConfig())
                  .then(dispatch(updateRefresh())),
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

          <p><b>Inventario:</b> {material.inventory.name}</p>
          {<p><b>Modelo:</b> {material.model}</p>}
          {material.color && <p><b>Color:</b> {material.color}</p>}
          <p><b>Cantidad:</b> {material.amount}</p>
          {material.project?.name && <p><b>Proyecto:</b> {material.project.name}</p>}
          {material.room?.name && <p><b>Lugar de Instalacion:</b> {material.room.name}</p>}
          <p><b>En espera:</b> {material.onHold ? "si" : "no"}</p>
          <p><b>Asignado:</b> {material.assigned ? "si" : "no"}</p>
          <p><b>Entregado:</b> {material.delivered ? "si" : "no"}</p>
          <p><b>Instalado:</b> {material.installed ? "si" : "no"}</p>
          <p><b>Retornado:</b> {material.returned ? "si" : "no"}</p>
          <p><b>Dañado:</b> {material.damaged ? "si" : "no"}</p>
          <p><b>Usuario Asignado:</b> {material.user.firstName + ' ' + (material.user && material.user.lastName)}</p>
        </div>
      }
    </>
  )
}

export default deployMaterials