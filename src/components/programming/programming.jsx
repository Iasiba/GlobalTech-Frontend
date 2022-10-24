import React from 'react'
import './programming.css'
import DeployProgramming from './deployProgramming'
import AxiosGetHook from '../../hooks/axiosGetHook'
const programming = () => {
  const programing = AxiosGetHook('http://localhost:8000/api/v1/programmings')
  const AllProgrammings = programing.data.data?.programmingGuide
  return (
    <div>
      <div className="backupGrid tableHeader">
        <p>Nombre</p>
        <p>Manual</p>
        <p>Guia</p>
        <p>Tutorial</p>
      </div>
      {
        AllProgrammings && AllProgrammings?.map(Programming =>{ 
            return (<DeployProgramming key={Programming.id} programming={Programming}/>)
        })
      }
    </div>
  )
}

export default programming