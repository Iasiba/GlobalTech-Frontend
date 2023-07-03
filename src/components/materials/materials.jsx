import React, { useEffect, useState } from 'react'
import './materials.css'
import DeployMaterials from './deployMaterials'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
import UserList from '../users/userList'
import { useSelector } from 'react-redux'
const materials = ({ projectId, myhome, home, materials }) => {
  const [Materials, setMaterials] = useState('')
  const [MaterialList, setMaterialList] = useState([])
  const [viewUserList, setviewUserList] = useState(false)
  const Refresh = useSelector(state => state.Refresh)

  useEffect(() => {
    if (materials) {
      setMaterials(materials)
    } else {
      searchMaterials()
    }
    setMaterialList([])
  }, [Refresh, projectId, myhome, home, materials])


  function searchMaterials() {
    let url = `http://192.168.0.253:8000/api/v1/materials`
    if (home) url = `http://192.168.0.253:8000/api/v1/materials/pendings`
    if (projectId) url = `http://192.168.0.253:8000/api/v1/projects/${projectId}/materials`
    if (myhome) url = `http://192.168.0.253:8000/api/v1/users/me/materials`
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
      {Materials.length > 0 && <div>
        <div className=" deploy backgroundhead">{/*materialsHeader taskHeader tableHeader flex */}
          <aside className='space'></aside>
          <div className={`tableHead`}>
            <p>Material</p>
            <p>Cantidad</p>
            <p>Proyecto</p>
          </div>
          <div className='userSelect' onClick={() => MaterialList.length && setviewUserList(!viewUserList)}><i className='bx bxs-user SelectUser'></i></div>
        </div>
      </div>}
      {Materials && Materials?.map(material => {
        return (
          < DeployMaterials
            key={material.id}
            MaterialList={MaterialList}
            material={material}
            setviewUserList={setviewUserList}
          />
        )
      }
      )}
      {
        viewUserList
        &&
        <div className='backgroundAssignMaterial'>
          <UserList
            material={MaterialList}
            setMaterialList={setMaterialList}
            setviewUserList={setviewUserList}
          />
        </div>
      }
    </div>
  )
}

export default materials