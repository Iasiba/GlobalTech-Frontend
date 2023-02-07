import React, { useEffect, useState } from 'react'
import './materials.css'
import DeployMaterials from './deployMaterials'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
import UserList from '../users/userList'
const materials = ({ projectId, myhome, home, materials }) => {
  const [Materials, setMaterials] = useState('')
  const [MaterialList, setMaterialList] = useState([])
  const [viewUserList, setviewUserList] = useState(false)
  useEffect(() => {
    if (materials) {
      setMaterials(materials)
    } else {
      searchMaterials()
    }
  }, [])

  function searchMaterials() {
    let url = `http://localhost:8000/api/v1/materials`
    if (home) url = `http://localhost:8000/api/v1/materials/pendings`
    if (projectId) url = `http://localhost:8000/api/v1/projects/${projectId}/materials`
    if (myhome) url = `http://localhost:8000/api/v1/users/me/materials`
    axios.get(url, getConfig())
      .then(res => {
        if (res.data?.materials) {
          setMaterials(res.data.materials)
        } else {
          setMaterials(res.data)
        }
        /*
        if (home) setMaterials(res.data.materials)
        if (myhome) setMaterials(res.data)
        if (projectId) setMaterials(res.data.materials)
        if(!home&&!myhome&&!projectId) setMaterials(res.data.materials)// desde Materiales 
        */
      })
  }
  return (
    <div >
      <div>
        <div className="materialsHeader taskHeader tableHeader">
          <p>Material</p>
          <p>Cantidad</p>
          <p>Proyecto</p>
          <div className='userSelect' onClick={() => setviewUserList(!viewUserList)}><i className='bx bxs-user SelectUser'></i></div>
        </div>
      </div>
      {Materials && Materials?.map(material => {
        return (
          < DeployMaterials
            key={material.id}
            MaterialList={MaterialList}
            material={material}
            searchMaterials={searchMaterials}
            viewUserList={viewUserList}
          />
        )
      }
      )}
      {
        /*UserListVisible*/
        viewUserList
        &&
        <UserList
          material={MaterialList} /*{Materials}*/
          setviewUserList={setviewUserList}
        />
      }
    </div>
  )
}

export default materials