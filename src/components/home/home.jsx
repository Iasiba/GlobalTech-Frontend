import React from 'react'
import './home.css'
import Tasks from '../tasks/tasks'
import Notes from '../notes/notes'
import Materials from '../materials/materials'
import Activities from '../activities/activities'
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
  return (
    <div className='home'>
      <p>Pendientes</p>
      <Tasks home={"home"} />
      <p>Actividades</p>
      <Activities home={"home"} />
      <p>Materiales Faltantes</p>
      <Materials home={"home"} />
      <p>Notas</p>
      <Notes />
    </div>
  )
}

export default HomeScreen