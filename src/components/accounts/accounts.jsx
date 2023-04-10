import React from 'react'
import './accounts.css'
import DeployAccounts from './deployAccounts'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
const accounts = ({ projectId }) => {
  const [Accounts, setAccounts] = useState('')
  const Refresh = useSelector(state => state.Refresh)
  useEffect(() => searchAccounts(), [Refresh])
  function searchAccounts() {
    const URL = projectId ? `http://192.168.0.253:8000/api/v1/projects/${projectId}/accounts` : `http://192.168.0.253:8000/api/v1/accounts`
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
    <div >
      {
        Accounts && Accounts?.map(account => {
          return (
            <DeployAccounts
              key={account.id}
              account={account}
            />
          )
        })
      }
    </div>
  )
}

export default accounts