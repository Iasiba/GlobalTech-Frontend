import React from 'react'
import DeployProject from './deployProject'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
import { useSelector } from 'react-redux'
const projects = () => {
  const Refresh = useSelector(state => state.Refresh)
  const [AllProjects, setAllProjects] = useState('')
  useEffect(() => searchProjects(), [Refresh])

  function searchProjects() {
    axios.get('http://192.168.0.253:8000/api/v1/projects', getConfig())
      .then(res => setAllProjects(res.data.projects))
  }
  return (
    <div className='contentDeploy'>
      {
        AllProjects && AllProjects?.map(project => {
          return (
            <DeployProject
              key={project.id}
              project={project}
            />
          )
        }
        )
      }
    </div>
  )
}

export default projects