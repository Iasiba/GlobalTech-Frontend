import React from 'react'
import './accounts.css'
import DeployAccounts from './deployAccounts'
import AxiosGetHook from '../../hooks/axiosGetHook'
const accounts = ({projectId}) => {
  const AllAccount = AxiosGetHook(projectId?`http://localhost:8000/api/v1/projects/${projectId}/accounts`:`http://localhost:8000/api/v1/accounts`)
  const Accounts =projectId?AllAccount.data?.data: AllAccount.data.data?.accounts
  return (
    <div>
      {
        Accounts && Accounts?.map(account => {
          return (<DeployAccounts key={account.id} account={account} />)
        })
      }
    </div>
  )
}

export default accounts