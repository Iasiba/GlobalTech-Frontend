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
      <Activities />
      <p>Materiales Faltantes</p>
      <Materials />
      <p>Notas</p>
      <Notes />
    </div>
  )
}

export default HomeScreen