import React from 'react'

const deployProgramming = ({ programming }) => {
  return (
    <>
      <div className={`table backupGrid`}>
        <p>{programming.name}</p>
        <a href={`${programming.datasheet}`}><i className='bx bxs-download'></i></a>
        <a href={`${programming.guide}`}><i className='bx bxs-download'></i></a>
        <a href={`${programming.tutorial}`}><i className='bx bxs-download'></i></a>
      </div>
    </>
  )
}

export default deployProgramming