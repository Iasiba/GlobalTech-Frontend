import React, { useEffect } from 'react'
import './home.css'
import Tasks from '../tasks/tasks'
import Notes from '../notes/notes'
import Materials from '../materials/materials'
import Activities from '../activities/activities'
import { useDispatch, useSelector } from 'react-redux'
import { setArea } from '../../store/slices/AreaSlice'
import NavBar from '../navBar/navBar'
const HomeScreen = () => {
  /*function downloadFile(link, fileName) {
   const downloadInstance = document.createElement('a')
   downloadInstance.href = link
   downloadInstance.target = '_blank'
   downloadInstance.download = fileName

   document.body.appendChild(downloadInstance)
   downloadInstance.click()
   document.body.removeChild(downloadInstance)
 }

 <button
       onClick={()=>
         downloadFile(
           'https://us02web.zoom.us/rec/play/PNjaV3dqhnocnrnM7JLK0SupjIYqBxeNl6wm0GOYeZ5EscAB2j2Plng3sKLstABJPInnEYvrC06Vgxvd.ltdXD6cF7q5qyGXW?continueMode=true&_x_zm_rtaid=3a__f7N8Q72eBX0n6YlKNw.1671595825733.f34ec884b7ed6bcedfd0aa3fe354146e&_x_zm_rhtaid=809',
           'xxx'
         )
       }
     >download</button>
 */
  const dispatch = useDispatch()
  const Refresh = useSelector(state => state.Refresh)
  useEffect(() => initial(), [Refresh])
  function initial() {
    dispatch(setArea("Home"))
  }
  return (
    <>
 
    <div className='home'>
      {/*<p>Notas</p>
      <Notes />*/}
      <h4>Pendientes</h4>
      <Tasks home={"home"} />
      <h4>Actividades</h4>
      <Activities home={"home"} />
      <h4>Materiales Faltantes</h4>
      <Materials home={"home"} />
    </div>
    </>
  )
}

export default HomeScreen