import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateRefreshMenu } from '../../store/slices/RefreshMenuSlice'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
import { updateRefresh } from '../../store/slices/RefreshSlice'
import { setItem } from '../../store/slices/ItemSlice'
import { setVisibleGuide } from '../../store/slices/NewsVisibleSlice'
import { useNavigate } from 'react-router-dom'

const deployProgramming = ({ programming }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const BackendAddress = useSelector(state => state.BackendAddress)
  const [MenuVisible, setMenuVisible] = useState(false)
  const [Click, setClick] = useState(false)
  const Refresh = useSelector(state => state.Refresh)
  const RefreshMenu = useSelector(state => state.RefreshMenu)
  const NewGuideVisible = useSelector(state => state.NewsVisible)[10]
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
  useEffect(() => { }, [programming, Refresh])
  return (
    <>
      <div className='deploy'>
        <div className={`programmingGrid`}>
          <p>{programming.name}</p>
          {programming.datasheet ? <a href={`${programming.datasheet}`} className='downloads'><i className='bx bxs-download'></i></a> : <p />}
          {programming.guide ? <a href={`${programming.guide}`} className='downloads'><i className='bx bxs-download'></i></a> : <p />}
          {programming.tutorial ? <a href={`${programming.tutorial}`} className='downloads'><i className='bx bxs-download'></i></a> : <p />}
          <aside className=''>
          </aside>
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
            <p className='items materialItemsWidth' onClick={() => { dispatch(setItem(programming)), navigate('/NewGuide') /*dispatch(setVisibleGuide(!NewGuideVisible))*/, setMenuVisible(false) }}>Editar</p>
            <p className='items materialItemsWidth' onClick={() => ((
              axios.delete(`http://${BackendAddress}/api/v1/programmings/${programming.id}`, getConfig())
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