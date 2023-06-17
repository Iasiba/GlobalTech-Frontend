import React from 'react'
import Tasks from '../tasks/tasks'
import Notes from '../notes/notes'
import Materials from '../materials/materials'
import Activities from '../activities/activities'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setArea } from '../../store/slices/AreaSlice'
const technicalHome = () => {
  const dispatch = useDispatch()
  useEffect(() => initial(), [])
  function initial() {
    dispatch(setArea("My Home"))
  }
  return (
    <div className='home'>
      <h4>Mis Notas </h4>
      <Notes />
      <h4>Tareas Asignadas</h4>
      <Tasks myhome={"myhome"} />
      <h4>Mis Actividades</h4>
      <Activities myhome={"myhome"} />
      <h4>Materiales Asignados</h4>
      <Materials myhome={"myhome"} />
    </div>
  )
}

export default technicalHome