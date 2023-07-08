import React from 'react'
import DeployProject from './deployProject'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
import { useDispatch, useSelector } from 'react-redux'
import { setArea } from '../../store/slices/AreaSlice'
const projects = () => {
  const dispatch = useDispatch()
  const BackendAddress = useSelector(state => state.BackendAddress)
  const Refresh = useSelector(state => state.Refresh)
  const [AllProjects, setAllProjects] = useState('')
  useEffect(() => searchProjects(), [Refresh])

  function searchProjects() {
    axios.get(`http://${BackendAddress}/api/v1/projects`, getConfig())
      .then(res => setAllProjects(res.data.projects))
    dispatch(setArea("Proyectos"))
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