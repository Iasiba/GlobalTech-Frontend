import React from 'react'
import './materials.css'
import DeployMaterials from './deployMaterials'
import AxiosGetHook from '../../hooks/axiosGetHook'
const materials = () => {
  const Materials = AxiosGetHook('http://localhost:8000/api/v1/materials')
  const AllMaterials = Materials.data.data?.materials
  return (
    <div>
      <div className="materialsHeader taskHeader tableHeader">
        <p>Material</p>
        <p>Cantidad</p>
        <p>Proyecto</p>
      </div>
      {AllMaterials && AllMaterials?.map(material => {
        return (<DeployMaterials key={material.id} material={material} />)
      }
      )}
    </div>
  )
}

export default materials