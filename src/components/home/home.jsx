import React from 'react'
import './home.css'
import Tasks from '../tasks/tasks'
const HomeScreen = () => {
  return (
    <div className='home'>
      <p>Pendientes</p>
      <Tasks />
      <p>Materiales Faltantes</p>
      <p>Notas</p>
    </div>
  )
}

export default HomeScreen