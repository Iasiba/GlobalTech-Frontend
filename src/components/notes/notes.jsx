import React from 'react'
import './notes.css'
import DeployNotes from './deployNotes'
import AxiosGetHook from '../../hooks/axiosGetHook'
const notes = () => {
  const Notes = AxiosGetHook('http://localhost:8000/api/v1/notes')
  const AllNotes = Notes.data.data?.notes
  return (
    <div>
      <div className='noteGrid tableHeader'>
        <p>Titulo</p>
        <p>Apunte</p>
      </div>
      {
        AllNotes && AllNotes?.map(note => {
          return (<DeployNotes key={note.id} note={note} />)
        }
        )}
    </div>
  )
}

export default notes