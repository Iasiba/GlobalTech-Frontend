import React from 'react'
import './accounts.css'
import DeployAccounts from './deployAccounts'
import AxiosGetHook from '../../hooks/axiosGetHook'
const accounts = () => {
  const AllAccount = AxiosGetHook('http://localhost:8000/api/v1/accounts')
  const AllAccounts = AllAccount.data.data?.accounts
  return (
    <div>
      {
        AllAccounts && AllAccounts?.map(account => {
          return (<DeployAccounts key={account.id} account={account} />)
        })
      }
    </div>
  )
}

export default accounts