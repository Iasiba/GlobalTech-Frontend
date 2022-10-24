import React from 'react'
import DeployInventary from './deployInventary'
import AxiosGetHook from '../../hooks/axiosGetHook'
const inventaries = () => {
  const AllInventary = AxiosGetHook('http://localhost:8000/api/v1/inventories')
  const AllInventaries = AllInventary.data.data?.inventory
  return (
    <div>
      {
        AllInventaries && AllInventaries?.map(inventary => {
          return (<DeployInventary key={inventary.id} inventary={inventary} />)
        })
      }
    </div>
  )
}

export default inventaries