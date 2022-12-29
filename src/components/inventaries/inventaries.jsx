import React from 'react'
import DeployInventary from './deployInventary'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
import { useState } from 'react'
import { useEffect } from 'react'
const inventaries = () => {
  const [AllInventaries, setAllInventaries] = useState('')
  useEffect(() => searchInventary(), [])

  function searchInventary() {
    axios.get('http://localhost:8000/api/v1/inventories', getConfig())
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