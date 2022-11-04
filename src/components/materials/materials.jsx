import React from 'react'
import './materials.css'
import DeployMaterials from './deployMaterials'
import AxiosGetHook from '../../hooks/axiosGetHook'
const materials = ({projectId}) => {
  const AllMaterials = AxiosGetHook(projectId?`http://localhost:8000/api/v1/projects/${projectId}/materials`:`http://localhost:8000/api/v1/materials`)
  const Materials =projectId?AllMaterials.data?.data: AllMaterials.data.data?.materials
  return (
    <div>
      <div className="materialsHeader taskHeader tableHeader">
        <p>Material</p>
        <p>Cantidad</p>
        <p>Proyecto</p>
      </div>
      {Materials && Materials?.map(material => {
        return (<DeployMaterials key={material.id} material={material} />)
      }
      )}
    </div>
  )
}

export default materials