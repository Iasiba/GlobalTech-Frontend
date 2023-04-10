import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateRefreshMenu } from '../../store/slices/RefreshMenuSlice'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
import { updateRefresh } from '../../store/slices/RefreshSlice'
import { setItem } from '../../store/slices/ItemSlice'

const deployProgramming = ({ programming }) => {
  const dispatch = useDispatch()
  const [MenuVisible, setMenuVisible] = useState(false)
  const [Click, setClick] = useState(false)
  const Refresh = useSelector(state => state.Refresh)
  const RefreshMenu = useSelector(state => state.RefreshMenu)
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
  useEffect(() => {}, [programming, Refresh])
  return (
    <>
      <div className='deploy'>
        <div className={`table backupGrid`}>
          <p>{programming.name}</p>
          <a href={`${programming.datasheet}`}><i className='bx bxs-download'></i></a>
          <a href={`${programming.guide}`}><i className='bx bxs-download'></i></a>
          <a href={`${programming.tutorial}`}><i className='bx bxs-download'></i></a>
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
          MenuVisible
          &&
          <div className='itemList itemListPrimary '>
            <p className='items materialItemsWidth' onClick={() => {dispatch(setItem(programming)), /*dispatch(setVisibleTask(true)), falta el poder dar de alta los manuales de programacion*/ setMenuVisible(false) }}>Editar</p>
            <p className='items materialItemsWidth' onClick={() => ((
              axios.delete(`http://192.168.0.253:8000/api/v1/programmings/${programming.id}`, getConfig())
                .then(dispatch(updateRefresh())),
                dispatch(updateRefresh()),
              setMenuVisible(!MenuVisible)))
            }>Eliminar</p>
          </div>
        }
      </div>
    </>
  )
}

export default deployProgramming