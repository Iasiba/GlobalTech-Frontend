import React from 'react'
import Tasks from '../tasks/tasks'
import Notes from '../notes/notes'
import Materials from '../materials/materials'
import Activities from '../activities/activities'
const technicalHome = () => {
    return (
        <div className='home'>
          <p>Pendientes</p>
          <Tasks Thome={"THome"}/>
          <p>Actividades</p>
          <Activities Thome={"THome"}/>
          <p>Materiales Faltantes</p>
          <Materials Thome={"THome"}/>
          <p Thome={"THome"}>Notas </p>
          <Notes Thome={"THome"} />
        </div>
      )
}

export default technicalHome