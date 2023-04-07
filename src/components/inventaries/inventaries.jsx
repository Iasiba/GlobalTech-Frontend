import { React, useState, useEffect } from 'react'
import DeployInventary from './deployInventary'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
import { useSelector } from 'react-redux'
const inventaries = () => {
  const Refresh = useSelector(state => state.Refresh)
  const [AllInventaries, setAllInventaries] = useState('')
  useEffect(() => searchInventary(), [Refresh])//useEffect(() => searchInventary(), [Refresh])

  function searchInventary() {
    axios.get('http://192.168.0.253:8000/api/v1/inventories', getConfig())
      .then(res => (setAllInventaries(res.data.inventory)))
  }

  return (
    <div className='contentDeploy'>
      {
        AllInventaries && AllInventaries?.map(inventary => {
          return (
            <DeployInventary
              key={inventary.id}
              inventary={inventary}
              searchInventary={searchInventary}
            />
          )
        })
      }
    </div>
  )
}

export default inventaries