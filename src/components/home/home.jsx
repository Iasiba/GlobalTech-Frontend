import React from 'react'
import './home.css'
import Tasks from '../tasks/tasks'
import Notes from '../notes/notes'
import Materials from '../materials/materials'
import Activities from '../activities/activities'
const HomeScreen = () => {
  return (
    <div className='home'>
      <p>Pendientes</p>
      <Tasks home={"home"}/>
      <p>Actividades</p>
      <Activities home={"home"} />
      <p>Materiales Faltantes</p>
      <Materials home={"home"}/>
      <p>Notas</p>
      <Notes />
    </div>
  )
}

export default HomeScreen