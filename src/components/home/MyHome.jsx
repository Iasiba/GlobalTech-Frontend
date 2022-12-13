import React from 'react'
import Tasks from '../tasks/tasks'
import Notes from '../notes/notes'
import Materials from '../materials/materials'
import Activities from '../activities/activities'
const technicalHome = () => {
  return (
    <div className='home'>
      <p>Mis Notas </p>
      <Notes />
      <p>Tareas Asignadas</p>
      <Tasks myhome={"myhome"} />
      <p>Mis Actividades</p>
      <Activities myhome={"myhome"} />
      <p>Materiales Asignados</p>
      <Materials myhome={"myhome"} />
    </div>
  )
}

export default technicalHome