import React, { useEffect, useState } from 'react'
import './programming.css'
import DeployProgramming from './deployProgramming'
import { useSelector } from 'react-redux'
import getConfig from '../../utils/getConfig'
import axios from 'axios'
const programming = () => {
  const [AllProgrammings, setAllProgrammings] = useState('')
  const Refresh = useSelector(state => state.Refresh)
  useEffect(() => {
    axios.get('http://192.168.0.253:8000/api/v1/programmings', getConfig())
      .then(res => setAllProgrammings(res.data.programmingGuide))
  }, [Refresh])
  return (
    <div className='contentDeploy'>
      <div className="programmingGridHeader tableHeader">
        <p>Nombre</p>
        <p>Manual</p>
        <p>Guia</p>
        <p>Tutorial</p>
        <aside>
        </aside>
      </div>
      {
        AllProgrammings && AllProgrammings?.map(Programming => {
          return (<DeployProgramming key={Programming.id} programming={Programming} />)
        })
      }
    </div>
  )
}

export default programming