import React, { useEffect, useState } from 'react'
import './notes.css'
import DeployNotes from './deployNotes'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
import { useSelector } from 'react-redux'
const notes = () => {
  const Refresh = useSelector(state => state.Refresh)
  const [AllNotes, setAllNotes] = useState('')
  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/users/me/notes', getConfig())
      .then((res) => setAllNotes(res.data))
  }, [Refresh])

  return (
    <div>
      <div className='noteGrid tableHeader'>
        <p>Titulo</p>
        <p>Nota</p>
      </div>
      {
        AllNotes && AllNotes?.map(note => {
          return (<DeployNotes key={note.id} note={note} setAllNotes={setAllNotes} />)
        }
        )}
    </div>
  )
}

export default notes