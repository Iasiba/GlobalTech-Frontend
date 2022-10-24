import React from 'react'
import './backups.css'
const deployBackups = ({backup}) => {
  return (
    <>
      <div className={`backupGrid table`}>
        <p>{backup.software}</p>
        <p>{backup.name}</p>
        <p>{backup.user.firstName}</p>
        <a href={`${backup.backup}`}>
          <i className='bx bxs-download'></i>
        </a>
      </div>
    </>
  )
}

export default deployBackups