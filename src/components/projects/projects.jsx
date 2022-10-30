import React from 'react'
import DeployProject from './deployProject'
import AxiosGetHook from '../../hooks/axiosGetHook'
const projects = () => {
  const Projects = AxiosGetHook('http://localhost:8000/api/v1/projects' )
  const AllProjects = Projects.data.data?.projects
  return (
    <div>
      {
        AllProjects && AllProjects?.map(project => {
          return (<DeployProject key={project.id} project={project} />)
        }
        )}
    </div>
  )
}

export default projects