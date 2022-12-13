import React from 'react'
import './accounts.css'
import DeployAccounts from './deployAccounts'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
import { useState } from 'react'
import { useEffect } from 'react'
const accounts = ({ projectId }) => {
  const [Accounts, setAccounts] = useState('')
  useEffect(() => searchAccounts(), [])

  function searchAccounts() {
    const URL = projectId ? `http://localhost:8000/api/v1/projects/${projectId}/accounts` : `http://localhost:8000/api/v1/accounts`
    axios.get(URL, getConfig())
      .then(res => {
        if (res.data?.accounts) {
          setAccounts(res.data?.accounts)
        } else {
          setAccounts(res.data)
        }
      }
      )
  }
  return (
    <div>
      {
        Accounts && Accounts?.map(account => {
          return (
            <DeployAccounts
              key={account.id}
              account={account}
              searchAccounts={searchAccounts}
            />
          )
        })
      }
    </div>
  )
}

export default accounts