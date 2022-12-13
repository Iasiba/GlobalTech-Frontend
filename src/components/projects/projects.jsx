import React from 'react'
import DeployProject from './deployProject'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
const projects = () => {
  const [AllProjects, setAllProjects] = useState('')
  useEffect(() => searchProjects(), [])

  function searchProjects() {
    axios.get('http://localhost:8000/api/v1/projects', getConfig())
      .then(res => setAllProjects(res.data.projects))
  }
  return (
    <div>
      {
        AllProjects && AllProjects?.map(project => {
          return (
            <DeployProject
              key={project.id}
              project={project}
              searchProjects={searchProjects}
            />
          )
        }
        )
      }
    </div>
  )
}

export default projects